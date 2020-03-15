const express = require('express');               // a minimal and and flexible Node.js webapplication
const bodyParser = require('body-parser');        // parses (ontleed) de meeste dingen die je geeft (JSON, forms, etc.)
const multer = require('multer');                 // een middleware om om te gaan met multipart/form-data (files)
const upload = multer({dest: 'static/upload/' }); // Geeft aan waar de files heengaan als ze worden geuploadt
const mongo = require('mongodb');                 // mongo database
require('dotenv').config();                       // .env bestand
const path = require('path');                     // heeft met het pad naar een file te maken
const session = require('express-session');       // express.session, als gebruiker browser afsluit en weer terugkomt, zijn de ingevulde gegevens er nog
const app = express();                            // express
const port = 3000;                                // de poort waar de server mee verbindt

let db;
const MongoClient = mongo.MongoClient;
const uri = "mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@clustermatchie-dvmte.azure.mongodb.net/test?retryWrites=true&w=majority";
//verbinding maken met de Mongo database

MongoClient.connect(uri, function (err, client){
  if (err) {
    throw err;                                    //niet geconnect met de client? Dan geeft het een error
  }
  db = client.db(process.env.DB_NAME)             //wel geconnect? Dan de info in juiste database zetten. Name staat in de .env file.
})

app.use('/static', express.static(__dirname + '/static')); //zitten bestanden in die direct vanuit de server verzonden kunnen worden, zonder toestemming. Kan bv. HTML, CSS, images en JS in.
app.set('view engine', 'ejs');                    // template engine EJS, om variabele te vervangen met echte data
app.set('views', 'views');                        //EJS bestanden zitten in de views map
app.use(bodyParser.urlencoded({extended: true}))  // urlencoded = wat browsers gebruiken om forms te verzenden. body-parser ontleed de data en stored het in req.body, wat daarachter komt is van name attribuut van form types.
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET              //verwijzing naar data in .env bestand
}))


/***********************/
/********* GET *********/                         //Get request a resource
/***********************/


app.get('/', function(req, res){                  // zodat pagina het ook doet zonder de /aanmelden
  res.redirect('/aanmelden');
})


app.get('/aanmelden', function(req, res){
  res.render('aanmelden.ejs');                    // render = rendered op de server (gecombineerd met echte data). Uiteindelijke HTML wordt gestuurd naar de client.
})


app.get('/voornaam/:id', function(req, res){
  const id = req.params.id;                       // var id opslaan
  res.render('voornaam.ejs', req.session.user);   // twee parameters toegeven. de pagina en de unieke user waar data in wordt gezet.
})


app.get('/geboortedatum/:id', function(req, res){
  const id = req.params.id;                       //var id opslaan
  res.render('geboortedatum.ejs', req.session.user); // twee parameters toegeven. de pagina en de unieke user waar data in wordt gezet.
})


app.get('/provincie/:id', function(req, res){
  const id = req.params.id;                      //var id opslaan
  res.render('provincie.ejs', req.session.user); // twee parameters toegeven. de pagina en de unieke user waar data in wordt gezet.
})


app.get('/geslacht/:id', function(req, res){
  const id = req.params.id;                      //var id opslaan
  res.render('man_vrouw.ejs', req.session.user); // twee parameters toegeven. de pagina en de unieke user waar data in wordt gezet.
})


app.get('/afbeeldingen/:id', function(req, res){
  const id = req.params.id;                      //var id opslaan
  res.render('foto_toevoegen.ejs', req.session.user); // twee parameters toegeven. de pagina en de unieke user waar data in wordt gezet.
})


app.get('/tekst/:id', function(req, res){
  const id = req.params.id;                      //var id opslaan
  res.render('tekst_profiel.ejs', req.session.user); // twee parameters toegeven. de pagina en de unieke user waar data in wordt gezet.
})


app.get('/profiel/:id', function(req, res){
  const id = req.params.id;                      //var id opslaan
  res.render('mijn_profiel.ejs', req.session.user); // twee parameters toegeven. de pagina en de unieke user waar data in wordt gezet.
})


/************************/
/********* POST *********/                      //Submit a resource
/************************/


app.post('/aanmelden', addUser)

function addUser(req, res){                     //request, response
  req.session.user = {                          // pushed onderstaande ingevulde data in req.session.user
    email: req.body.email,
    id: req.body.userName,
    password: req.body.password
  }
  console.log(req.session.user);                //Laat in de terminal de ingevulde gegevens zien.
  res.redirect('voornaam/' + req.body.userName); //Dit is de route + de unieke id (username)
}


app.post('/voornaam', addFirstName)

function addFirstName(req, res){                //request, response
  req.session.user.firstName = req.body.firstName;
  console.log(req.session.user.firstName);      //Laat in de terminal de ingevulde gegevens zien.
  res.redirect('geboortedatum/' + req.body.id); //Dit is de route + de unieke id (username)
}


app.post('/geboortedatum', addDateOfBirth)

function addDateOfBirth(req, res){              //request, response
  req.session.user.dateOfBirth = req.body.dateOfBirth;
  console.log(req.session.user.dateOfBirth);    //Laat in de terminal de ingevulde gegevens zien.
  res.redirect('provincie/' + req.body.id);     //Dit is de route + de unieke id (username)
}


app.post('/provincie', addProvince)

function addProvince(req, res){                 //request, response
  req.session.user.province = req.body.province;
  console.log(req.session.user.province);       //Laat in de terminal de ingevulde gegevens zien.
  res.redirect('geslacht/' + req.body.id);      //Dit is de route + de unieke id (username)
}


app.post('/geslacht', addGender)

function addGender(req, res){                   //request, response
  req.session.user.gender = req.body.gender;
  console.log(req.session.user.gender);         //Laat in de terminal de ingevulde gegevens zien.
  res.redirect('afbeeldingen/' + req.body.id);  //Dit is de route + de unieke id (username)
}


app.post('/afbeeldingen', upload.single('pictures'), addPictures) // accepteert maar 1 image

function addPictures(req, res){                 //request, response
  req.session.user.profilePic = req.file;       // multer gebruikt req.file
  console.log(req.session.user.profilePic);     //Laat in de terminal de ingevulde gegevens zien.
  res.redirect('tekst/' + req.body.id);         //Dit is de route + de unieke id (username)
}


app.post('/tekst', addText)

function addText(req, res){                     //request, response

  req.session.user.textProfile = req.body.textProfile;
  db.collection('user').insertOne(req.session.user); //Alle info van die specifieke id/user naar database sturen.
  console.log(req.session.user.textProfile);    //Laat in de terminal de ingevulde gegevens zien.
  res.redirect('profiel/' + req.body.id);       //Dit is de route + de unieke id (username)
}


app.listen(port,  () => console.log(`Running my NodeJS server`))
