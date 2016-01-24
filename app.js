
// var fb = require('./customfield');
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var routes = require('./routes');
var swig = require('swig');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');


// templating boilerplate setup
app.set('views', path.join(__dirname, '/views')); // where to find the views
app.set('view engine', 'html'); // what file extension do our templates have
app.engine('html', swig.renderFile); // how to render html templates
swig.setDefaults({ cache: false });

app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits


app.use('/', routes);

// logging middleware
app.use(morgan('dev'));

app.listen(port);
console.log('Magic happening on: ', port);


// use express static middleware.
app.use(express.static(path.join(__dirname, '/public')));
