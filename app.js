var express = require("express"),
	app     = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mysql      = require('mysql'),
	connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  database : 'jumpstart',
	  password : 'password'
	});

// // Tables for mySQL
// create table tutors(
// 	name varchar(20),
// 	age int,
// 	linkedin varchar(200),
// 	id int auto_increment,
// 	message varchar(500),
// 	primary key(id)
// );
 
// create table users(
// 	name varchar(20),
// 	age int,
// 	user_id int auto_increment,
// 	primary key(user_id)
// );
 
//  create table reviews(
// 	message varchar(500),
// 	tutor_id int,
// 	users_id int,
// 	foreign key(tutor_id) references tutors(id),
// 	foreign key(users_id) references users(user_id)
// );
 



// Landing Page
app.get('/', function(req, res){
	res.render('landing.ejs')
});
// Tutors
app.get('/tutors', function(req, res){
	var q = 'select name, age, message, id, linkedin from tutors'
	connection.query(q, function(err, results){
		if(err) throw err;

		res.render('tutors.ejs', {result: results});
	});
});
// Chat
app.get('/chat', function(req, res){
	var q = 'select tutors.name, tutors.id from tutors join reviews on tutors.id = reviews.tutor_id where reviews.users_id = 1'
	connection.query(q, function(err, results){
		if(err) throw err;

		res.render('chat.ejs', {result: results});
	});
	// res.render('chat.ejs')
});
// Stem
app.get('/sample', function(req, res){
	res.render('stem.ejs')
});

// Signing Up As A Tutor
app.get('/signUpTutors', function(req, res){
	res.render('tutorSignUp.ejs')
});

app.post('/signUpTutors', function(req, res){
	var name = req.body.name;
	var age = req.body.age;
	var message = req.body.message;
	var link = req.body.link;

	var q = 'insert into tutors(name, age, message, linkedin) values("' + name + '",' + age + ', "' + message + '", "' + link + '")'
	connection.query(q, function(err, results){
		if(err) throw err;

		res.render('tutors.ejs', {result: results});
	});
	res.redirect('/tutors')
});

// Message Tutors
app.get('/message/:id', function(req, res){
	var q = 'select reviews.message, tutors.id, users.name, users.user_id as id, tutors.name as tutor from tutors join reviews on reviews.tutor_id = tutors.id join users on reviews.users_id = users.user_id where tutors.id = ' + req.params.id
	connection.query(q, function(err, results){
		if(err) throw err;

		res.render('tutorMessage.ejs', {result: results, results: req.params.id});
	});
	
});

app.post('/message/:id', function(req, res){
	var q = 'insert into reviews(message, tutor_id, users_id) values("' + req.body.message + '",' + req.params.id + ',1)'
	connection.query(q, function(err, results){
		if(err) throw err;

		res.redirect('/message/' + req.params.id)
	});
	
});

// Fields
app.get('/quiz', function(req, res){
	res.render('quiz.ejs')
});

app.get('/engineering', function(req, res){
	// var q = 'select code from youtube where category = "engineering"'
	// connection.query(q, function(err, results){
	// 	if(err) throw err;
		res.render('engineering.ejs')
	// });
});

app.get('/computerSci', function(req, res){
	// var q = 'select code from youtube where category = "computerSci"'
	// connection.query(q, function(err, results){
	// 	if(err) throw err;
		res.render('computerSci.ejs')
	
});

app.get('/medicine', function(req, res){
	
		res.render('medicing.ejs')
	
});

// Excel
app.get('/excel', function(req, res){
	res.render('excel.ejs');
});


// Pricing
app.get('/pricing', function(req, res){
	res.render('price.ejs')
})


// Chrome extension
app.get('/soon', function(req, res, next){
   	res.render('soon.ejs')
});

app.listen(3000)