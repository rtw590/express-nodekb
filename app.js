const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = config.database;
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

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));

// Express Messages Middleware

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
}));

// Passport config 
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// 
app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
});

// Home Route
app.get('/', function(req, res){
    Article.find({}, function(err, articles){
        // index is the name of the view ie index.pug
        if(err){
            console.log(err);
        } else {
            res.render('index', {
                title: 'Hello doggg',
                articles:articles
            });
        }
    });
});

// Catan Route
app.get('/catan', function(req, res){
    res.sendfile(__dirname + '/remote-catan-player2/index.html');
  });

// Route Files
let articles = require('./routes/articles');
let users = require('./routes/users');
app.use('/articles', articles);
app.use('/users', users);

// Start Server
app.listen(3000, function(){
    console.log('Server started on port 3000');
});
