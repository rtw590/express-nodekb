const express = require('express');
const path = require('path');

// Initialize the app
const app = express();

// Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home Route
app.get('/', function(req, res){
    let articles = [
        {
            id: 1,
            title: 'Article 1',
            author: 'Rob',
            body: 'This is article 1'
        },
        {
            id: 2,
            title: 'Article 2',
            author: 'Daniel',
            body: 'This is article 2'
        },
        {
            id: 3,
            title: 'Article 3',
            author: 'Bobby',
            body: 'This is article 3'
        }
    ];
    // index is the name of the view ie index.pug
    res.render('index', {
        title: 'Hello doggg',
        articles: articles
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