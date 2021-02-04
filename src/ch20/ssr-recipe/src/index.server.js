import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import {StaticRouter} from "react-router-dom"
import App from "./App"

const manifest = JSON.parse(
	fs.readFileSync(path.resolve("./build/asset-manifest.json"), "utf-8")
);

function createPage(root) {
	return `<!DOCTYPE html>
	<html lang="ko">
	<head>
		<meta charset="UTF-8"/>
		<meta name="viewport" content="width=device-width,initial=scale=1,shrink-to-fit=no" />
		<meta name="theme-color" content="#000000" />
		<title>React App</title>
		<link href="${manifest.files["main.css"]}" rel="stylesheet"/>
	</head>
	<body>
		<div id="root">
		${root}
		</div>
		<script src="${manifest.files["runtime-main.js"]}" />
		<script src="${manifest.files["main.js"]}" />
	</body>
	</html>
	`;
}

const app = express();

const serverRender = async (req, res, next) => {
	const context = {};
	const jsx = (
		<StaticRouter location={req.url} context={context}>
			<App/>
		</StaticRouter>
	);
	const root = ReactDOMServer.renderToString(jsx);
	res.send(createPage(root));
}

const serve = express.static(path.resolve("./build"), {
	index: false,
});


app.use(serve);
app.use(serverRender);

app.listen(5000, () => {
	console.log("Running on http://localhost:5000");
});