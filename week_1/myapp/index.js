const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/static', express.static(__dirname + '/static'));

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.write('<p>Hello World!<p>');
  res.end();
});

app.get('/about', (req, res) => {
  res.write('<p>It\'s allllll about me!<p>');
  res.end();
});

app.get('/voornaam/:id', function(req, res){
  res.send('My name is ' +req.params.id);
})

//Dit is een route parameter
app.get('/achternaam/:id', function(req, res){
  res.send('My last name is ' +req.params.id);
})

app.get('/students/:name', function(req, res){
  res.send('My student name is ' +req.params.name);
})

app.post('/login', function(req, res){
  console.log(req.body.email,req.body.password);
  res.send('okayy');
})

//pug oefening, template engine
app.get('/index', function(req, res){
  res.render('index.ejs', {title: 'Hey', message: 'Hello there!'});
})

/*
app.get('*', (req, res) => {
  res.status(404).render('not-found.pug', {message: 'This is an error'});
})
*/

app.listen(port,  () => console.log(`Running my NodeJS server`))
