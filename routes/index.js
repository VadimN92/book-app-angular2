var routes = require('express').Router();



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
];


var isAuth = function(req, res, next) {
	var user = users.find(u => req.cookies.token == u.token);
	console.log(user);
	if(!user) {
		console.log('No users');
		res.sendStatus(401);
	} else {
		/*var newCookie = Date.now();
		user.token = newCookie;
		res.cookie('token', newCookie);*/
		next();
	}

	
}


routes.post('/api/login', function(req, res) {
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

routes.get('/api/authors', isAuth, function(req, res) {
	res.json(authors);
})

routes.post('/api/authors', isAuth, function(req, res) {
	console.log(req.body);
	var newAuthor = {
		id: authors.length+1,
		name: req.body.name
	};
	authors.push(newAuthor);
	console.log(authors);
	res.status(201).send(newAuthor);
})

routes.put('/api/authors/:id', isAuth, function(req, res) {
	var id = req.params.id;
	console.log('Edit authot, id: ' + id);
	var author = authors.find(a => a.id == id);
	if(!author) {
		res.sendStatus(400);
	}

	author.name = req.body.name;
	res.json(author);
});

routes.delete('/api/authors/:id', isAuth, function(req, res) {
	var id = req.params.id;
	console.log('params id ' + id);
	var authorIndex = authors.findIndex(a => a.id == id);
	console.log(authors);
	console.log(authorIndex);
	if(authorIndex == -1) {
		res.sendStatus(404);
	}

	authors.splice(authorIndex, 1)
	res.json({id: id});
});

routes.get('/api/books', isAuth, function(req, res) {
	res.json(books);
})

routes.post('/api/books', isAuth, function(req, res) {
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

routes.delete('/api/books/:id', function(req, res) {
	var id = req.params.id;
	var bookIndex = books.findIndex(b => b.id == id);
	if(bookIndex == -1) {
		res.sendStatus(404);
	}

	books.splice(bookIndex, 1);
	res.json({id: id});
});

module.exports = routes;