const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
	name: String,
	title: String,
	description: String,
	numberOfLikes: Number,
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
