import Joi from "joi";
import mongoose from "mongoose";
import Post from "../../models/post";
import sanitizeHtml from "sanitize-html";

const {ObjectId} = mongoose.Types;

export const checkObjectId = (ctx, next) => {
	const {id} = ctx.params;
	if (!ObjectId.isValid(id)) {
		ctx.status = 400;
		return;
	}
	return next();
};

const sanitizeOption = {
	allowedTags: [
		"h1","h2","b","i","u","s","p","ul","ol","li","blockquote","a","img",
	],
	allowedAttributes: {
		a: ["href","name","target"],
		img: ["src"],
		li: ["class"],
	},
	allowedSchemes: ["data", "http"],
};

const removeHtmlAndShorten = body => {
	const filtered = sanitizeHtml(body, {
		allowedTags: [],
	});
	return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

export const write = async ctx => {
	const schema = Joi.object().keys({
		title: Joi.string().required(),
		body : Joi.string().required(),
		tags : Joi.array().items(Joi.string()).required(),
	});
	const result = schema.validate(ctx.request.body);
	if (result.error) {
		ctx.status = 400;
		ctx.body = result.error;
		return;
	}
	const {title, body, tags} = ctx.request.body;
	const post = new Post({
		title,
		body:sanitizeHtml(body,sanitizeOption),
		tags,
		user: ctx.state.user,
	});
	try {
		await post.save();
		ctx.body = post;
	} catch (err) {
		ctx.throw(500, err)
	}
};

export const list = async ctx => {
	const page = parseInt(ctx.query.page || "1", 10);
	if (page < 1) {
		ctx.status = 400;
		return;
	}
	const {tag, username} = ctx.query;
	const query = {
		...(username ?{"user.username":username}:{}),
		...(tag ?{"tags":tag}:{}),

	}

	try {
		const posts = await Post.find(query)
			.sort({ _id: -1 })
			.limit(10)
			.skip((page - 1) * 10)
			.lean()
			.exec();
		const postCount = await Post.countDocuments(query).exec();
		ctx.set("Last-Page", Math.ceil(postCount / 10));
		ctx.body = posts
			.map(post => ({
				...post,
				body: removeHtmlAndShorten(post.body),
			}));
	} catch (err) {
		ctx.throw(500, err);
	}
};

export const read = async ctx => {
	ctx.body = ctx.state.post;
};

export const remove = async ctx => {
	const {id} = ctx.params;
	try {
		await Post.findByIdAndRemove(id).exec();
		ctx.status = 204;
	} catch (err) {
		ctx.throw(500, err)
	}
};

export const update = async ctx => {
	const schema = Joi.object().keys({
		title: Joi.string(),
		body : Joi.string(),
		tags : Joi.array().items(Joi.string()),
	});
	const result = schema.validate(ctx.request.body);
	if (result.error) {
		ctx.status = 400;
		ctx.body = result.error;
		return;
	}
	const {id} = ctx.params;
	const nextData = {...ctx.request.body};
	if(nextData.body){
		nextData.body = sanitizeHtml(nextData.body, sanitizeOption);
	}
	try {
		const post = await Post.findByIdAndUpdate(id, nextData, {
			new: true,
		}).exec();
		if (!post) {
			ctx.status = 404;
			return;
		}
		ctx.body = post;
	} catch (err) {
		ctx.throw(500, err);
	}
};

export const getPostById = async (ctx, next) => {
	const {id} = ctx.params;
	if (!ObjectId.isValid(id)) {
		ctx.status = 400;
		return;
	}
	try {
		const post = await Post.findById(id);
		if (!post) {
			ctx.status = 404;
			return;
		}
		ctx.state.post = post;
		return next();
	} catch (err) {
		ctx.throw(500, err);
	}
}

export const checkOwnPost = (ctx, next) => {
	const {user, post} = ctx.state;
	if(post.user._id.toString() !== user._id) {
		ctx.status = 403;
		return;
	}
	return next();
};
