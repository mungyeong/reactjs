use reactblog
db.createUser({
	user:"reactblog",
	pwd:"reactblog1234567",
	roles:[{role:"dbOwner",db:"reactblog"}]
});