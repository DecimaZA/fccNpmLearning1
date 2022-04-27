require('dotenv').config();

var express = require('express');
const req = require('express/lib/request');
var app = express();
console.log("Hello ");

app.use(function middleware(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});

app.get(
    "/", 
    function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.use(
    "/public",
    express.static(__dirname + "/public")
    );

app.get("/json",
    function(req, res) {
        if (process.env.MESSAGE_STYLE === "uppercase") {
            res.json(
                {"message": "HELLO JSON"}
            );
        } else {
            res.json(
                {"message": "Hello json"}
            )
        }
    });

app.get(
    "/now",
    (req, res, next) => {
        req.time = new Date().toString();
        next();
    }, (req, res) => {
        res.json({time: req.time})
    }
);





 module.exports = app;
