
// var fb = require('./customfield');
var app = require('express')();
var port = process.env.PORT || 8080;
var routes = require('./routes');
var swig = require('swig');
var path = require('path');


// templating boilerplate setup
app.set('views', path.join(__dirname, '/views')); // where to find the views
app.set('view engine', 'html'); // what file extension do our templates have
app.engine('html', swig.renderFile); // how to render html templates
swig.setDefaults({ cache: false });

app.use('/', routes);

app.listen(port);
console.log('Magic happening on: ', port);
