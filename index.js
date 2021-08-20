//https://stackoverflow.com/questions/9177049/express-js-req-body-undefined

var express = require("express");
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
    //var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express();

var tasks = []

var surrogateKey = 1;

app.get("/", (req, res, next) => {
    res.send("Tasks server online");
});

app.post("/tasks", jsonParser, (req, res, next) => {
    console.log(req.body)
    req.body.id = surrogateKey++;
    req.body.status = "pending";
    tasks.push(req.body);
    res.send("Task has been added.");
});


app.delete("/tasks/:taskId", jsonParser, (req, res, next) => {
    var id = parseInt(req.params.taskId);
    var i = tasks.findIndex(t => t.id === id);

    console.log(i);

    if (i >= 0) {
        tasks.splice(i, 1);
        res.send("Task has been deleted.");
    } else {
        res.send("Wrong task Id.");
    }
});

app.put('/tasks/:taskId', jsonParser, (req, res, next) => {
    const status = req.query.status;
    var id = parseInt(req.params.taskId);
    var i = tasks.findIndex(t => t.id === id)
    if (status) {
        console.log(status);
        if (i >= 0) {
            tasks[i].status = status;
            res.send("Task status -> " + status);
        } else {
            res.send("Wrong task Id.");
        }
    } else {
        if (i >= 0) {
            tasks[i].title = req.body.title;
            tasks[i].detail = req.body.detail;
            res.send("Task has been updated.")
        } else {
            res.send("Wrong task Id.");
        }
    }
});

app.get("/tasks", (req, res, next) => {
    res.json(tasks);
});

app.get("/tasks/:taskId", (req, res, next) => {
    var id = parseInt(req.params.taskId);
    var i = tasks.findIndex(t => t.id === id);
    if (i >= 0) {
        res.json(tasks[i]);
    }
});

app.listen(3000, () => {
    console.log("Servidor HTTP funcionando");
});