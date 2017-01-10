var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');


var app = express();

var routers = require('./routes/index');


// VARS
var config = {
	PORT: 8080
}

// MIDDLEWARES
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())

// middleware function to serve static files
app.use(express.static(__dirname))

app.use(cookieParser())

app.use('/', routers);



app.listen(config.PORT, function() {
	console.log('Server run on ' + config.PORT);
})
