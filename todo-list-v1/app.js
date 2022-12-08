import express from "express";
import bodyParser from "body-parser";
import { today } from "./date.js";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const items = [];
const workItems = [];

const day = today();

app.get("/", (req, res) => {
    res.render("list", { listTitle: day, list: items });
});

app.post("/", (req, res) => {
    if (req.body.list === "Work") {
        workItems.push(req.body.newItem);
        res.redirect("/work")
    } else {
        items.push(req.body.newItem);
        res.redirect("/");
    }
});

app.get("/work", (req, res) => {
    res.render("list", { listTitle: "Work", list: workItems });
});

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
