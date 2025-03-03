const express = require("express");
const mongoose = require("mongoose");
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
});
