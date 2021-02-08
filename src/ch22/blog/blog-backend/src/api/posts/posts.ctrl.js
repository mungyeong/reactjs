import Joi from "@hapi/joi";
import mongoose from "mongoose";
import Post from "../../models/post";

const {ObjectId} = mongoose.Types;

export const checkObjectId = (ctx, next) => {
	const {id} = ctx.params;
	if (!ObjectId.isValid(id)) {
		ctx.status = 400;
		return
	}
	return next();
};

export const write = async ctx => {
	const schema = Joi.object().keys({
		title: Joi.string(),
		body : Joi.string(),
		tags : Joi.array().items(Joi.string()),
	});
	const result = schema.validate(ctx.request.body);
	if(result.error) {
		ctx.status = 400;
		ctx.body = result.error;
		return;
	}
	const {title, body, tags} = ctx.request.body;
	const post = new Post({
		title,
		body,
		tags,
	});
	try {
		await post.save();
		ctx.body = post;
	} catch (err) {
		ctx.throw(500,err)
	}
};

export const list = async ctx => {
	try {
		const posts = await Post.find().exec();
		ctx.body = posts;
	} catch (err) {
		ctx.throw(500, err);
	}
};

export const read = async ctx => {
	const {id} = ctx.params;
	try {
		const post = await Post.findById(id).exec();
		if (!post) {
			ctx.status = 404;
			return;
		}
	} catch (err) {
		ctx.throw(500, err);
	}
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
	const {id} = ctx.params;
	try {
		const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
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
