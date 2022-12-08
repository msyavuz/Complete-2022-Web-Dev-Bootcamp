const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name cannot be empty!"],
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
    },
    review: String,
});

const Fruit = mongoose.model("Fruit", fruitsSchema);

const apple = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Pretty solid",
});

const banana = new Fruit({
    name: "Banana",
    rating: 10,
    review: "Best fruit ever",
});

banana.save()

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitsSchema,
});

const Person = new mongoose.model("Person", personSchema)

const john = new Person({
    name: "John",
    age: 16,
    favouriteFruit: banana
})

john.save()

