var express = require('express');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');


var app = express();

var routers = require('./routes/index');


// VARS
var config = {
	PORT: 8080
}

app.use(function (req, res, next) {

   // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', '*');

   // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

   // Request headers you wish to allow
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

   // Set to true if you need the website to include cookies in the requests sent
   // to the API (e.g. in case you use sessions)
   res.setHeader('Access-Control-Allow-Credentials', true);

	 res.setHeader('Content-Type', "application/json");

   // Pass to next layer of middleware
   next();
})

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
