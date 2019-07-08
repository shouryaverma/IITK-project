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

app.get('/next', urlencodedParser, (req, res) => {
  res.render('next.hbs', {
    pageTitle: 'Next Page'
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
