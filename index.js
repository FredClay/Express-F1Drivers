const express = require("express");

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

let names = [];


const requestRecieved = (req, res, next) => {
    console.log(new Date());
    console.log("*BING! REQUEST RECEIVED!*");
    return next();
};


app.get("/greeting", (req, res) => {
    return res.send("Welcome to Fred's Formula 1 Driver API!");
});

app.post("/createDriver", requestRecieved, (req, res) => {
    console.log("Req Body:", req.body);
    names.push(req.body["name"]);
    return res.status(201).send();
});

app.get("/getAll", (req, res) => {
    return res.send(names);
})

app.get("/getById/:id", (req, res) => {
    console.log(`Getting driver ID No. ${req.params}.`);
    return res.send(names[req.params.id-1]);
});

app.patch("/updateDriver/:id", (req, res) => {
    console.log(`Query: ${req.query.name}`);
    names[req.params.id-1] = req.query.name;
    return res.send();
});

app.delete("/deleteDriver/:id", (req, res) => {
    console.log(`Deleting driver ID No. ${req.params}.`);
    names.splice(req.params-1, 1);
    return res.send();
});

app.get("/getError", (req, res, next) => {
    return next({status: 418, msg: "Problem?"});
});

// will catch all requests to non existent endpoints.
app.use("*", (req, res, next) => {
    return next({status: 404, msg: "No Valid URL Found"});
});

// first error handler
app.use((err, req, res, next) => {
    console.log("Error encountered:");
    console.log(err.msg);
    return res.status(err.status).send(err.msg);
})

const server = app.listen(4494, () => {
    console.log(`Started server on port No. ${server.address().port}`);
});
