const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = mongoose.Schema({
    title: String,
    content: String,
});

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
    .get((req, res) => {
        Article.find({}, (err, result) => {
            if (!err) {
                res.send(result);
            }
        });
    })
    .post((req, res) => {
        const newTitle = req.body.title;
        const newContent = req.body.content;

        const newArticle = new Article({
            title: newTitle,
            content: newContent,
        });
        newArticle.save((err) => {
            if (!err) {
                res.sendStatus(201);
            } else {
                res.sendStatus(500);
            }
        });
    })
    .delete((req, res) => {
        Article.deleteMany({}, (err) => {
            if (!err) {
                res.sendStatus(200);
            } else {
                res.status(500).send(err);
            }
        });
    });

app.route("/articles/:articleTitle")
    .get((req, res) => {
        Article.findOne({ title: req.params.articleTitle }, (err, result) => {
            if (!err) {
                res.send(result);
            } else {
                res.sendStatus(404);
            }
        });
    })
    .put((req, res) => {
        Article.replaceOne(
            { title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content },
            { overwrite: true },
            (err) => {
                if (!err) {
                    res.sendStatus(200);
                } else {
                    res.status(500).send(err.message);
                }
            }
        );
    })
    .patch((req, res) => {
        Article.updateOne(
            { title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content },
            (err) => {
                if (!err) {
                    res.sendStatus(200);
                } else {
                    res.status(500).send(err.message);
                }
            }
        );
    })
    .delete((req, res) => {
        Article.deleteOne({ title: req.params.articleTitle }, (err) => {
            if (!err) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        });
    });

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
