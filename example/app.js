var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');

var mongo = 'mongodb://localhost:27017/sparklingdb';

var sparkling = require('../');

var app = express();
var reactive = sparkling(app, {mongo: {connection: mongo, db: 'sparklingdb'}});

app.use(morgan('combined'));
app.use(reactive());
app.use(bodyParser.json());
app.use(methodOverride());

app.listen(3000, function () {
    console.log('reactive api server started on port 3000...');
});
