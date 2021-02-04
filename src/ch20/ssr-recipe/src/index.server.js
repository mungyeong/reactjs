import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import {Provider} from "react-redux";
import {StaticRouter} from "react-router-dom"
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import App from "./App"
import createSagaMiddleware,{END} from "redux-saga";
import rootReducer, { rootSaga } from "./modules";
import PreloadContext from "./lib/PreloadContext";

const manifest = JSON.parse(
	fs.readFileSync(path.resolve("./build/asset-manifest.json"), "utf-8")
);

const chunks = Object.keys(manifest.files)
	.filter((key) => /chunk\.js$/.exec(key))
	.map((key) => `<script src="${manifest.files[key]}"></script>`)
	.join("");

function createPage(root,stateScript) {
	return `<!DOCTYPE html>
	<html lang="ko">
	<head>
		<meta charset="UTF-8"/>
		<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
		<meta name="theme-color" content="#000000" />
		<title>React App</title>
		<link href="${manifest.files["main.css"]}" rel="stylesheet"/>
	</head>
	<body>
		<div id="root">
		${root}
		</div>
		${stateScript}
		<script src="${manifest.files["runtime-main.js"]}" />
		${chunks}
		<script src="${manifest.files["main.js"]}" />
	</body>
	</html>
	`;
}

const app = express();

const serverRender = async (req, res, next) => {
	const context = {};
	const sagaMiddleware = createSagaMiddleware();
	const store = createStore(rootReducer, applyMiddleware(thunk,sagaMiddleware));
	const sagaPromise = sagaMiddleware.run(rootSaga).toPromise();
	const preloadContext = {
		done:false,
		promises: [],
	}
	const jsx = (
		<PreloadContext.Provider value={preloadContext}>
		<Provider store={store}>
			<StaticRouter location={req.url} context={context}>
				<App/>
			</StaticRouter>
		</Provider>
		</PreloadContext.Provider>
	);

	ReactDOMServer.renderToStaticMarkup(jsx);
	store.dispatch(END);
	try {
		await sagaPromise;
		await Promise.all(preloadContext.promises);
	} catch (err) {
		return res.status(500);
	}

	preloadContext.done= true;


	const root = ReactDOMServer.renderToString(jsx);

	const stateString = JSON.stringify(store.getState()).replace(/</g, "\\u003c");
	const stateScript = `<script>__PRELOADED_STATE__ = ${stateString}</script>`;


	res.send(createPage(root,stateScript));
}

const serve = express.static(path.resolve("./build"), {
	index: false,
});


app.use(serve);
app.use(serverRender);

app.listen(5000, () => {
	console.log("Running on http://localhost:5000");
});