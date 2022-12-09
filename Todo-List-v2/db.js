const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemSchema = mongoose.Schema({
    name: String,
});

const Item = mongoose.model("Item", itemSchema);
const listSchema = mongoose.Schema({
    name: String,
    items: [itemSchema],
});

const List = mongoose.model("List", listSchema);

const createNewItem = async (itemName, listName = "") => {
    const newItem = new Item({
        name: itemName,
    });

    if (listName == "") {
        newItem.save();
    } else {
        const list = await List.findOne({ name: listName });
        await list.items.push(newItem);
        await list.save();
    }
};

const getAllItems = async () => {
    const items = await Item.find();
    return items;
};

const deleteById = (id, listName = "") => {
    if (listName == "") {
        Item.deleteOne({ _id: id }, (err,res) => {
            console.log(res);
        });
    } else {
        List.findOneAndUpdate(
            { name: listName },
            { $pull: { items: { _id: id } } },
            (err,res) => {
                console.log(res);
            }
        );
    }
};

const createNewList = (listName) => {
    const newList = new List({
        name: listName,
        items: [],
    });
    newList.save();
    return newList;
};

const findListByName = async (name) => {
    const list = await List.findOne({ name: name });
    return list;
};

module.exports = {
    getAllItems,
    createNewItem,
    deleteById,
    createNewList,
    findListByName,
};
