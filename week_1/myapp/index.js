const express = require('express'); // a minimal and and flexible Node.js webapplication
const bodyParser = require('body-parser');
const passport = require('passport');
const slug = require('slug');
const path = require('path');
const multer = require('multer');
const upload = multer({dest: 'static/upload/' });
const mongo = require('mongodb'); //om te verbinden met database
require('dotenv').config();
const session = require('express-session');
const app = express();
const port = 3000;

let db;
const MongoClient = mongo.MongoClient;
const uri = "mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@clustermatchie-dvmte.azure.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(uri, function (err, client){
  if (err) {
    throw err;
  }
  db = client.db(process.env.DB_NAME)
})

app.use('/static', express.static(__dirname + '/static'));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET
}))


/***********************/
/********* GET *********/
/***********************/


app.get('/', function(req, res){
  res.redirect('/aanmelden');
})

//GET to request data from a document
app.get('/aanmelden', function(req, res){
  res.render('aanmelden.ejs');
})

//GET, to request data from a document
app.get('/voornaam/:id', function(req, res){
  const id = req.params.id; // var id opslaan
  res.render('voornaam.ejs', req.session.user); // twee parameters toegeven. de pagina en de juiste user die is gekozen.
})

//GET, to request data from a document
app.get('/geboortedatum/:id', function(req, res){
  const id = req.params.id; //var id opslaan
  res.render('geboortedatum.ejs', req.session.user);
})

//GET, to request data from a document
app.get('/provincie/:id', function(req, res){
  const id = req.params.id; //var id opslaan
  res.render('provincie.ejs', req.session.user);
})

//GET, to request data from a document
app.get('/geslacht/:id', function(req, res){
  const id = req.params.id; //var id opslaan
  res.render('man_vrouw.ejs', req.session.user);
})

//GET, to request data from a document
app.get('/afbeeldingen/:id', function(req, res){
  const id = req.params.id; //var id opslaan
  res.render('foto_toevoegen.ejs', req.session.user);
})

//GET, to request data from a document
app.get('/tekst/:id', function(req, res){
  const id = req.params.id; //var id opslaan
  res.render('tekst_profiel.ejs', req.session.user);
})

//GET, to request data from a document
app.get('/profiel/:id', function(req, res){
  const id = req.params.id; //var id opslaan
  res.render('mijn_profiel.ejs', req.session.user); // Laat dit ejs bestand zien
})


/************************/
/********* POST *********/
/************************/


//POST, to send data from a document
app.post('/aanmelden', addUser)

//Functie die ingevulde  data terug gaat sturen naar de server en in de lege array 'user' stopt.
function addUser(req, res){ //request, response
  req.session.user = { // pushed onderstaande ingevulde data in req.session.user
    email: req.body.email,
    id: req.body.userName,
    password: req.body.password
  }
  console.log(req.session.user);  //Laat in de terminal de ingevulde gegevens zien.
  res.redirect('voornaam/' + req.body.userName); //Geeft bestand 'voornaam.ejs' weer bij client, plus de voornaam die de gebruiker heeft ingevuld.
  // Dit is de route!! Niet ejs bestand.
}


//POST, to send data from a document
app.post('/voornaam', addFirstName)

//Functie die ingevulde  data terug gaat sturen naar de server en in de array 'user' stopt. (komt niet bij de andere data??? vraag!)
function addFirstName(req, res){ //request, response
  req.session.user.firstName = req.body.firstName; // zet de input firstName in de user
  console.log(req.body.firstName); //Laat in de terminal de ingevulde gegevens zien.
  res.redirect('geboortedatum/' + req.body.id); //Geeft bestand 'geboortedatum.ejs' weer bij client. Dit is de route!! Niet ejs bestand.
}


//POST, to send data from a document
app.post('/geboortedatum', addDateOfBirth)

//Functie die ingevulde  data terug gaat sturen naar de server en in de array 'user' stopt. (komt niet bij de andere data??? vraag!)
function addDateOfBirth(req, res){ //request, response
  req.session.user.dateOfBirth = req.body.dateOfBirth;
  console.log(req.body.dateOfBirth); //Laat in de terminal de ingevulde gegevens zien.
  res.redirect('provincie/' + req.body.id); //Geeft bestand 'provincie.ejs' weer bij client. Dit is de route!! Niet ejs bestand.
}


//POST, to send data from a document
app.post('/provincie', addProvince)

//Functie die ingevulde  data terug gaat sturen naar de server en in de array 'user' stopt. (komt niet bij de andere data??? vraag!)
function addProvince(req, res){ //request, response
  req.session.user.province = req.body.province;
  console.log(req.body.province); //Laat in de terminal de ingevulde gegevens zien.
  res.redirect('geslacht/' + req.body.id); //Geeft bestand 'man_vrouw.ejs' weer bij client. Dit is de route!! Niet ejs bestand.
}


//POST, to send data from a document
app.post('/geslacht', addGender)

//Functie die ingevulde  data terug gaat sturen naar de server en in de array 'user' stopt. (komt niet bij de andere data??? vraag!)
function addGender(req, res){ //request, response
  req.session.user.gender = req.body.gender;
  console.log(req.body.gender); //Laat in de terminal de ingevulde gegevens zien.
  res.redirect('afbeeldingen/' + req.body.id); //Geeft bestand 'foto_toevoegen.ejs' weer bij client. Dit is de route!! Niet ejs bestand.
}


//POST, to send data from a document
app.post('/afbeeldingen', upload.single('pictures'), addPictures)


//Functie die ingevulde  data terug gaat sturen naar de server en in de array 'user' stopt. (komt niet bij de andere data??? vraag!)
function addPictures(req, res){ //request, response
  req.session.user.profilePic = req.file;
  console.log(req.body.profilePic); //Laat in de terminal de ingevulde gegevens zien.
  res.redirect('tekst/' + req.body.id); //Geeft bestand 'tekst_profiel.ejs' weer bij client. Dit is de route!! Niet ejs bestand.
}


//POST, to send data from a document
app.post('/tekst', addText)


//Functie die ingevulde  data terug gaat sturen naar de server en in de array 'user' stopt. (komt niet bij de andere data??? vraag!)
function addText(req, res){ //request, response

  req.session.user.textProfile = req.body.textProfile;

  db.collection('user').insertOne(req.session.user); //Alle info van die specifieke id/user naar database sturen. Heb de website van MongoDB hiervoor geraadpleegd.
  console.log(req.body.textProfile); //Laat in de terminal de ingevulde gegevens zien.
  res.redirect('profiel/' + req.body.id); //Geeft bestand 'mijn_profiel.ejs' weer bij client. Dit is de route!! Niet ejs bestand.
}

app.listen(port,  () => console.log(`Running my NodeJS server`))
