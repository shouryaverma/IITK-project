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

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

// hbs.registerHelper('getCurrentYear', () => {
//   return new Date().getFullYear();
// });

// hbs.registerHelper('screamIt', (text) => {
//   return text.toUpperCase();
// });

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

app.get('/next', urlencodedParser, (req, res) => {
  res.render('next.hbs', {
    pageTitle: 'Next Page'
  });
});

//forms

// app.get('/form', (req, res) => {
//   var html='';
//   html +="<body>";
//   html += "<form action='/thank'  method='post' name='form1'>";
//   html += "First Name:<input type='text' name='firstname'></p>";
//   html += "Last Name:<input type='text' name='lastname'></p>";
//   html += "<input type='submit' value='submit'>";
//   html += "<input type='reset'  value='reset'>";
//   html += "<input type='file' value='upload'>";
//   html += "</form>";
//   html += "</body>";
//   res.send(html);
// });
//
// app.post('/thank', urlencodedParser, (req, res) => {
//   var reply='';
//   reply += "Your first name is " + req.body.firstname;
//   reply += "<br> Your last name is " + req.body.lastname;
//   reply += "<br> Your uploaded file is " + req.body.upload;
//   res.send(reply);
//  });

//forms

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
