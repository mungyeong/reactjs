import {ChunkExtractor, ChunkExtractorManager} from "@loadable/server";
import express from "express";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import {Provider} from "react-redux";
import {StaticRouter} from "react-router-dom"
import {applyMiddleware, createStore} from "redux";
import createSagaMiddleware, {END} from "redux-saga";
import thunk from "redux-thunk";
import App from "./App"
import PreloadContext from "./lib/PreloadContext";
import rootReducer, {rootSaga} from "./modules";

const statsFile = path.resolve('./build/loadable-stats.json');


function createPage(root, tags) {
	return `<!DOCTYPE html>
	<html lang="ko">
	<head>
		<meta charset="UTF-8"/>
		<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
		<meta name="theme-color" content="#000000" />
		<title>React App</title>
		${tags.styles}
		${tags.links}
	</head>
	<body>
		<div id="root">
		${root}
		</div>
		${tags.scripts}
	</body>
	</html>
	`;
}

const app = express();

const serverRender = async (req, res, next) => {
	const context = {};
	const sagaMiddleware = createSagaMiddleware();
	const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware));
	const sagaPromise = sagaMiddleware.run(rootSaga).toPromise();
	const preloadContext = {
		done    : false,
		promises: [],
	}

	const extractor = new ChunkExtractor({statsFile});

	const jsx = (
		<ChunkExtractorManager extractor={extractor}>
			<PreloadContext.Provider value={preloadContext}>
				<Provider store={store}>
					<StaticRouter location={req.url} context={context}>
						<App/>
					</StaticRouter>
				</Provider>
			</PreloadContext.Provider>
		</ChunkExtractorManager>
	);

	ReactDOMServer.renderToStaticMarkup(jsx);
	store.dispatch(END);
	try {
		await sagaPromise;
		await Promise.all(preloadContext.promises);
	} catch (err) {
		return res.status(500);
	}

	preloadContext.done = true;


	const root = ReactDOMServer.renderToString(jsx);

	const stateString = JSON.stringify(store.getState()).replace(/</g, "\\u003c");
	const stateScript = `<script>__PRELOADED_STATE__ = ${stateString}</script>`;

	const tags = {
		scripts: stateScript + extractor.getScriptTags(),
		links: extractor.getLinkTags(),
		styles: extractor.getStyleTags(),
	};

	res.send(createPage(root, tags));
}

const serve = express.static(path.resolve("./build"), {
	index: false,
});


app.use(serve);
app.use(serverRender);

app.listen(5000, () => {
	console.log("Running on http://localhost:5000");
});