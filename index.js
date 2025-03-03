const express = require("express");
const mongoose = require("mongoose");
<<<<<<< HEAD
require("dotenv").config({ path: "./config.env" });
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

const cors = require("cors")
app.use(cors())

const compression = require("compression")
app.use(compression())

app.set("view engine", "ejs");

const Article = require("./models/Article");

// connect db
const dbURI = process.env.MONGO_URI;

// If there is a problem connecting to the database
if (!dbURI) {
  console.error("Mongo URI is undefined. Please check your .env file.");
  process.exit(1);
}
 
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("connected successfully");
  })
  .catch((err) => {
    console.log(`error with connect to data base the error: ${err.message}`);
    process.exit(1);
  });

app.use(express.json());

const pages = [
  "login",
  "register",
  "home",
  "cart",
  "policy",
  "category",
  "products",
  "brands",
];

pages.map((page) => {
  app.get(`/${page}`, (req, res) => {
    res.send(`Hello From The Page ${page}`);
  });
});

app.get(`/`, (req, res) => {
  res.send(`Hello At Main Page`);
});

// ======= ARTICLES ENDPOINTS

// add new article
app.post("/articles", async (req, res) => {
  const newArticle = new Article();

  const name = req.body.name;
  const title = req.body.title;
  const description = req.body.description;

  newArticle.name = name;
  newArticle.title = title;
  newArticle.description = description;
  newArticle.numberOfLikes = 0;

  if (
    newArticle.name != "" &&
    newArticle.title != "" &&
    newArticle.description != "" &&
    newArticle.name.length >= 6 &&
    newArticle.title.length >= 10 &&
    newArticle.description.length >= 100
  ) {
    await newArticle.save();
  }

  if (newArticle.name.length < 6) {
    res.send("the length for name < 6 letters");
  } else if (newArticle.title.length < 10) {
    res.send("the length for title < 10 letters");
  } else if (newArticle.description.length < 100) {
    res.send("the length for description < 100 letters");
  } else {
    res.json(newArticle);
  }
});

// search all articles
app.get("/articles", async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

// search for article by id
app.get("/articles/:id", async (req, res) => {
  const getID = req.params.id;
  try {
    const articles = await Article.findById(getID);
    if (!articles) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// delete article by it
app.delete("/articles/:id", async (req, res) => {
  const getID = req.params.id;
  try {
    const articles = await Article.findByIdAndDelete(getID);
    if (!articles) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// show all article and view it in the ejs page
app.get("/showArticles", async (req, res) => {
  try {
    const articles = await Article.find();

    // إرسال الحقول الثلاثة بشكل منفصل في JSON
    res.render("articles.ejs", {
      Articles: articles,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// if the page search not found tell him
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}/login`);
=======

const app = express();

const Article = require("./models/Article");

mongoose
	.connect(
		"mongodb+srv://yarob2:yarob123@myfirstnodejscluster.toaytf9.mongodb.net/?retryWrites=true&w=majority"
	)
	.then(() => {
		console.log("connected successfully");
	})
	.catch((error) => {
		console.log("error with connecting with the DB ", error);
	});
// mongodb+srv://<username>:<password>@myfirstnodejscluster.toaytf9.mongodb.net/?retryWrites=true&w=majority

app.use(express.json());

app.get("/hello", (req, res) => {
	res.send("hello");
});

app.get("/", (req, res) => {
	res.send("hello in node js project");
});

app.get("/numbers", (req, res) => {
	let numbers = "";
	for (let i = 0; i <= 100; i++) {
		numbers += i + " - ";
	}
	// res.send(`the numbers are: ${numbers}`);

	// res.send(__dirname + "/views/numbers.html");
	// res.sendFile(__dirname + "/views/numbers.html");
	res.render("numbers.ejs", {
		name: "Ahmad",
		numbers: numbers,
	});
});

app.get("/findSummation/:number1/:number2", (req, res) => {
	const num1 = req.params.number1;
	const num2 = req.params.number2;

	const total = Number(num1) + Number(num2);

	res.send(`the total is ${total}`);
});

app.get("/sayHello", (req, res) => {
	// console.log(req.body);

	// console.log(req.query);
	// res.send(`Hello ${req.body.name}, Age is: ${req.query.age}`);

	res.json({
		name: req.body.name,
		age: req.query.age,
		language: "Arabic",
	});
});

app.put("/test", (req, res) => {
	res.send("hello world");
});

app.post("/addComment", (req, res) => {
	res.send("post request on add comment");
});

app.delete("/testingDelete", (req, res) => {
	res.send("delete request");
});

// ======= ARTICLES ENDPOINTS =====
app.post("/articles", async (req, res) => {
	const newArticle = new Article();

	const artTitle = req.body.articleTitle;
	const artBody = req.body.articleBody;

	newArticle.title = artTitle;
	newArticle.body = artBody;
	newArticle.numberOfLikes = 0;
	await newArticle.save();

	res.json(newArticle);
});

app.get("/articles", async (req, res) => {
	const articles = await Article.find();
	console.log("the articles are", articles);

	res.json(articles);
});

app.get("/articles/:articleId", async (req, res) => {
	const id = req.params.articleId;

	try {
		const article = await Article.findById(id);
		res.json(article);
		return;
	} catch (error) {
		console.log("error while reading article of id ", id);
		return res.send("error");
	}
});

app.delete("/articles/:articleId", async (req, res) => {
	const id = req.params.articleId;

	try {
		const article = await Article.findByIdAndDelete(id);
		res.json(article);
		return;
	} catch (error) {
		console.log("error while reading article of id ", id);
		return res.json(error);
	}
});

app.get("/showArticles", async (req, res) => {
	const articles = await Article.find();

	res.render("articles.ejs", {
		allArticles: articles,
	});
});
app.listen(3000, () => {
	console.log("I am listening in port 3000");
>>>>>>> a3f49482306d67a63d0f01d19361de4a10c3b0ec
});
