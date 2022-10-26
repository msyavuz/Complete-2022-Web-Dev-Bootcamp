const express = require("express");
const bodyParser = require("body-parser");

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    const num1 = Number(req.body.num1);
    const num2 = Number(req.body.num2);

    const result = num1 + num2;

    res.send("Result is " + result);
});

app.get("/bmicalculator", (req, res) => {
    res.sendFile(__dirname + "/bmicalculator.html");
});

app.post("/bmicalculator", (req, res) => {
    const weight = Number(req.body.weight);
    const height = Number(req.body.height);
    const result = weight / Math.pow(height, 2);
    res.send("Your BMI is " + result);
});

app.listen(port, () => {
    console.log("Listening on port: " + port);
});
