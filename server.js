var express = require('express');
var app = express();
var port = process.env.SERVER_PORT || 3000;
var path = require('path');
var bodyParser = require('body-parser');
var api = require('./server/routes/api');
var mongoose = require('mongoose');
var pass = 'T23Cd93@g62EmrQ';
// const DB_URL = `mongodb://REVOKED_vicki:${encodeURIComponent(pass)}@ds127506.mlab.com:27506/heroku_drzf9z0f`
var DB_URL = "mongodb+srv://vicki:" + encodeURIComponent(pass) + "@cluster0.vwzgp.mongodb.net/heroku_drzf9z0f?retryWrites=true&w=majority";
var connectionOptions = {
    // poolSize: 20,
    socketTimeoutMS: 0,
    connectTimeoutMS: 0,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
};
mongoose.connect(DB_URL, connectionOptions, function (err) {
    console.log('DB_URL', DB_URL);
    if (err) {
        console.log('blabalbal');
        console.log(err.message);
    }
    else {
        console.log('The Mongoose connection is ready');
    }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use('/', api);
app.listen(port, function () { return console.log("Server is running on port " + port); });
