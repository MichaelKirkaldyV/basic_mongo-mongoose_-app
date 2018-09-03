
var express = require("express");
var app = express();
var mongoose = require('mongoose');
var path = require("path");
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname + "./static")));
app.use(bodyParser.urlencoded({extended : true}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//connecting database defined in terminal.
mongoose.connect('mongodb://localhost/users');


var UserSchema = new mongoose.Schema({
 name: String,
 age: Number
})
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'
 
//---------------------------------ROUTES---------------------------------//


app.get('/', function(req, res) {

	User.find({}, function(err, users) {

		if(err) {
	      console.log('something went wrong');
	    } 
	    else { 
	      console.log('Users found!');
	    }
	    res.render('index', {users: users});
	})
})

app.post('/users', function(req, res) {
    console.log("POST DATA", req.body);
  
  	//saves user to the database.
  	//Mongoose uses the appropriate naming(plural for collections(tables) and singular for (Models)).
    var user = new User({name: req.body.username, age: req.body.age});

    user.save(function(err) {
    // if there is an error console.log that something went wrong!
    if(err) {
      console.log('something went wrong');
    } 
    else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added a user!');
      res.redirect('/');
    }
  })
})

var server = app.listen(8000, function() {
	console.log("listening on port 8000");
});