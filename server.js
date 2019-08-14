const express = require('express');
var app = express();
const hbs = require('hbs');
const fs = require('fs');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var http = require("http");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n',(err)=>{
    if (err){
      console.log('Unable to append to server.log.')
    }
  });
  next();
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Web App',
    welcomeMessage: 'Welcome to the app'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/view-feedbacks', (req, res) => {
  res.render('feedback.hbs', {
    pageTitle: 'Feedback Page'
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

var http = require('http');
var qs = require('querystring');
var MongoClient = require('mongodb').MongoClient;
var url ="mongodb://localhost:27017/iit-k";
var client = new MongoClient(url, { useNewUrlParser: true });

app.use(function(req,res){
	if(req.url == "/"){
		res.writeHead(200,{"Content-Type":"text/html"});
    //make sure you enter the correct path of the directory in which the drag and drop form is as the first argument of this function
	}
	if (req.method == "POST"){
		var data ="";
		req.on("data",function(parts){
			data+=parts;
		});
		req.on("end", function(parts){

			const q = qs.parse(data);
			client.connect(err => {
			if(err) throw err;
  			const collection = client.db("iit-k").collection("records");
  			collection.insertOne(q,function(err,res){
						console.log("Data entered");
                client.close();
				});
			});
		});
	};
});

app.use(function(req,res){
  client.connect(err => {
    if(err) throw err;
    const collection = client.db("iit-k").collection("records");
    collection.find({}).toArray(function(err,result){
      if(err) throw err;
      res.writeHead(200,{"Content-Type":"text/html"});
      res.end(JSON.stringify(result));
      console.log("Data found");
      client.close();
    });
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
