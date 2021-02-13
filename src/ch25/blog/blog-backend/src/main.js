require("dotenv").config();
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";
import mongoose from "mongoose";
import api from './api';
import createFakeDate from "./createFackData";
import jwtMiddleware from "./lib/jwtMiddleware";


const {PORT, MONGO_DB, MONGO_ID, MONGO_PASSWORD} = process.env;

const MONGO_URI = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:27017/${MONGO_DB}`;

mongoose.connect(MONGO_URI, {
	dbName         : MONGO_DB,
	useNewUrlParser: true,
	useCreateIndex : true,
})
	.then(() => {
		console.log("Connected to MongoDB");
		// createFakeDate();
	})
	.catch(e => {
		console.error(e);
	});

const app = new Koa();
const router = new Router();

router.use("/api", api.routes());

app.use(bodyParser());
app.use(jwtMiddleware);

app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;

app.listen(port, () => {
	console.log("Listening to port %d", port);
});
