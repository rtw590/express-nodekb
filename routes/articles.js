const express = require('express');
const router = express.Router();

// Bring in Article model
let Article = require('../models/article');

// Load Edit Form
// :id is a placeholder and could be anything
router.get('/edit/:id', function(req, res){
    Article.findById(req.params.id, function(err, article){
        res.render('edit_article', {
            title: 'Edit Article',
            article: article
        });
    });
});

// Add Route
router.get('/add', function(req, res){
    // add_article is the name of the view ie add.pug
    res.render('add_article', {
        title: 'Add Articles'
    });
});

// Add Submit POST route
// Catches submitted items from add_article

router.post('/add', function(req, res){
    // Setting rules/validation for submitting form
    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('author', 'Author is required').notEmpty();
    req.checkBody('body', 'Body is required').notEmpty();

    // Get Errors

    let errors = req.validationErrors();

    if(errors){
        res.render('add_article', {
            title: 'Add Article',
            errors: errors
        });
    } else {
        // This is using our models
        let article = new Article();
        // This is using body parser
        article.title = req.body.title 
        article.author = req.body.author 
        article.body = req.body.body 

        article.save(function(err){
            if(err){
                console.log(err);
                return;
            } else {
                req.flash('success', 'Article Added');
                res.redirect('/');
            }
        });        
    }
});

// Update Submit  POST route
// Catches submitted items from edit_article

router.post('/edit/:id', function(req, res){
    let article = {};
    // This is using body parser
    article.title = req.body.title 
    article.author = req.body.author 
    article.body = req.body.body 

    let query = {_id:req.params.id}

    Article.update(query, article, function(err){
        if(err){
            console.log(err);
            return;
        } else {
            req.flash('success', 'Article Updated');
            res.redirect('/');
        }
    });
});

router.delete('/:id', function(req, res){
    let query = {_id:req.params.id}
    Article.remove(query, function(err){
        if(err){
            console.log(err);
        }
        res.send('Success');
    });
});

// Get Single Article
// :id is a placeholder and could be anything
router.get('/:id', function(req, res){
    Article.findById(req.params.id, function(err, article){
        res.render('article', {
            article: article
        });
    });
});

module.exports = router;
