var routes = require('express').Router();
/*var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });*/



var users = [
	{
		email: 'vadim@vadim.ua',
		password: '123456',
		token: null
	},
	{
		email: 'admin@admin.ua',
		password: 'admin',
		token: null
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
	var user = users.find(function(u) {
    return req.headers.token == u.token;
  });
	if(!user) {
		console.log('No users');
		res.sendStatus(401);
	} else {
		return next();
	}
};


routes.post('/api/login', function(req, res) {
	console.log(req.body);
	var authenticatedUser = users.find(function(u) {
	  return req.body.email === u.email;
  });

	if(authenticatedUser && authenticatedUser.password === req.body.password) {
		var newTokin = Date.now();
		authenticatedUser.token = newTokin;
		return res.json({'token': newTokin});
	}
	res.send(404);
});

routes.get('/api/authors', isAuth, function(req, res) {
	res.json(authors);
});

routes.post('/api/authors', isAuth, function(req, res) {
	console.log('Add author ' + JSON.stringify(req.body));
	var newAuthor = {
		id: authors.length+1,
		name: req.body.name
	};
	authors.push(newAuthor);
	console.log(authors);
	res.status(201).send(newAuthor);
});

routes.put('/api/authors/:id', isAuth, function(req, res) {
	var id = req.params.id;
	console.log('Edit authot, id: ' + id);
	var author = authors.find(function(a) {
	  return a.id == id;
  });
	if(!author) {
		res.sendStatus(400);
	}

	author.name = req.body.name;
	res.json(author);
});

routes.delete('/api/authors/:id', isAuth, function(req, res) {
	var id = req.params.id;
	console.log('params id ' + id);
	var authorIndex = authors.findIndex(function(a) {
	  return a.id == id;
  });
	console.log(authors);
	console.log(authorIndex);
	if(authorIndex == -1) {
		res.sendStatus(404);
	}

	authors.splice(authorIndex, 1);
	res.json({id: id});
});

routes.get('/api/books', isAuth, function(req, res) {
	res.json(books);
});

routes.post('/api/books', isAuth, function(req, res) {
	console.log(req.body);
	var author = authors.find(function(a) {
	  return a.id == req.body.authorId;
	}) || {name: ''};
	var newBook = {
		id: books.length+1,
		name: req.body.name,
		author: author
	};
	books.push(newBook);
	console.log(books);
	res.status(201);
	res.send(newBook);
});

routes.put('/api/books/:id', isAuth, function(req, res) {
	var id = req.params.id;
	var author = authors.find(function(a) {
	  return a.id == req.body.authorId;
    }) || {name: ''};
	console.log('Edit book, id: ' + id);
	var book = books.find(function(b) {
	  return b.id == id;
  });
	if(!book) {
		res.sendStatus(400);
	}

	book = {
		name: req.body.name,
		author: author
	};
	res.json(book);
});

routes.delete('/api/books/:id', isAuth, function(req, res) {
	var id = req.params.id;
	var bookIndex = books.findIndex(function(b) {
	  return b.id == id;
  });
	if(bookIndex == -1) {
		res.sendStatus(404);
	}

	books.splice(bookIndex, 1);
	res.json({id: id});
});

module.exports = routes;
