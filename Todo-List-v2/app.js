const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const _ = require("lodash");
const db = require(path.join(__dirname, "/db.js"));

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async function (req, res) {
    const items = await db.getAllItems();
    res.render("list", { listTitle: "Today", newListItems: items });
});

app.post("/", async function (req, res) {
    const itemName = req.body.newItem;
    const listName = req.body.list;
    if (listName == "Today") {
        await db.createNewItem(itemName);
        res.redirect("/");
    } else {
        await db.createNewItem(itemName, listName);
        res.redirect(`/${listName}`);
    }
});

app.post("/delete", async (req, res) => {
    const id = req.body.checkbox;
    const listName = req.body.listTitle;

    if (listName == "Today") {
        await db.deleteById(id);
        res.redirect("/");
    } else {
        await db.deleteById(id, listName);
        res.redirect("/" + listName);
    }
});

app.get("/:customListName", async function (req, res) {
    let customListName = _.capitalize(req.params.customListName);
    const list = await db.findListByName(customListName);
    if (list) {
        res.render("list", { listTitle: list.name, newListItems: list.items });
    } else {
        const newList = db.createNewList(customListName);
        res.redirect(`/${newList.name}`);
    }
});

app.get("/about", function (req, res) {
    res.render("about");
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
