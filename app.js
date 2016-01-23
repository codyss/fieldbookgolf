
// var fb = require('./customfield');
var app = require('express')();
var port = process.env.PORT || 8080;
var routes = require('./routes');


app.use('/', routes);

app.listen(port);
console.log('Magic happening on: ', port);
