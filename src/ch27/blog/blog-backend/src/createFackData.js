import Post from "./models/post";

export default function createFakeDate() {
	const posts = [...Array(40).keys()].map(i => ({
		title: `포스트 #${i}`,
		body : "test",
		tags  : [`test${i}`],
	}));
	Post.insertMany(posts, (err, doce) => {
		console.log(doce);
	});
};