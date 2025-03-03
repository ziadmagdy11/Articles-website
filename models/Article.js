const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
<<<<<<< HEAD
	name: String,
	title: String,
	description: String,
=======
	title: String,
	body: String,
>>>>>>> a3f49482306d67a63d0f01d19361de4a10c3b0ec
	numberOfLikes: Number,
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
