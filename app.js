const express = require('express');
const path = require('path');

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://user1:password1@ds113826.mlab.com:13826/nodekb';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Test connection

db.once('open', function(){
    console.log('Connected to mongoDB');
});


// Initialize the app
const app = express();

// Bring in models
let Article = require('./models/article');

// Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home Route
app.get('/', function(req, res){
    Article.find({}, function(err, articles){
        // index is the name of the view ie index.pug
        if(err){
            console.log(err);
        } else {
            res.render('index', {
                title: 'Hello doggg',
                articles: articles
            });
        }
    });
});

// Add Route
app.get('/articles/add', function(req, res){
    // add is the name of the view ie add.pug
    res.render('add_article', {
        title: 'Add Articles'
    });
});

// Start Server
app.listen(3000, function(){
    console.log('Server started on port 3000');
});