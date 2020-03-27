"use strict";

const express = require('express'),
    morgan = require('morgan'),
    app = express();

const port = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));
app.use('/js', express.static('src'));

app.listen(port, function(){
    console.log("ready captain.");
});
