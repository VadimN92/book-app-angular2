var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();


// VARS
var config = {
	PORT: 8080
}
var users = [
	{
		email: 'vadim@vadim.ua',
		password: '123456',
		token: undefined
	},
	{
		email: 'admin@admin.ua',
		password: 'admin',
		token: undefined
	}
];
var authors = [
	{
		id: 1,
		name: "Vadim Nagirniak"
	}
];
var books = [
	{ 
		id: 1, 
		name: 'Roottttin', 
		author: '' 
	}
]

// MIDDLEWARES
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())

// middleware function to serve static files
app.use(express.static(__dirname))

app.use(cookieParser())


var isAuth = function(req, res, next) {
	var user = users.find(u => req.cookies.token == u.token);
	if(!user) {
		res.sendStatus(401).end();
	}
	/*var newCookie = Date.now();
	user.token = newCookie;
	res.cookie('token', newCookie);*/
	next();
}

app.post('/api/login', function(req, res) {
	console.log(req.body);
	var authenticatedUser = users.find(u => req.body.email === u.email);
	
	if(authenticatedUser && authenticatedUser.password === req.body.password) {
		var newCookie = Date.now();
		authenticatedUser.token = newCookie;
		res.cookie('token', newCookie);
		return res.end();
	}
	res.send(401);
})

app.get('/api/authors', isAuth, function(req, res) {
	res.json(authors);
})

app.post('/api/authors', isAuth, function(req, res) {
	console.log(req.body);
	var newAuthor = {
		id: authors.length+1,
		name: req.body.name
	};
	authors.push(newAuthor);
	console.log(authors);
	res.status(201);
	res.send(newAuthor);
})

app.delete('/api/authors/:id', function(req, res) {
	var id = req.params.id;
	var authorIndex = authors.findIndex(a => a.id == id);
	if(authorIndex == -1) {
		res.sendStatus(400);
	}

	authors.splice(authorIndex, 1)
	res.json({id: id});
});

app.get('/api/books', isAuth, function(req, res) {
	res.json(books);
})

app.post('/api/books', isAuth, function(req, res) {
	console.log(req.body);
	var author = authors.find(a => a.id == req.body.authorId) || {name: ''};
	var newBook = {
		id: books.length+1,
		name: req.body.name,
		author: author
	};
	books.push(newBook);
	console.log(books);
	res.status(201);
	res.send(newBook);
})

app.delete('/api/books/:id', function(req, res) {
	var id = req.params.id;
	var bookIndex = books.findIndex(b => b.id == id);
	if(bookIndex == -1) {
		res.sendStatus(400);
	}

	books.splice(bookIndex, 1);
	res.json({id: id});
});



app.listen(config.PORT, function() {
	console.log('Server run on ' + config.PORT);
})
