const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const slug = require('slug');
const path = require('path');
const multer = require('multer');
const upload = multer({dest: 'static/upload/' });
const mongo = require('mongodb');
require('dotenv').config();
const app = express();
const port = 3000;

let users = [];

let db;
const MongoClient = mongo.MongoClient;
const uri = "mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@clustermatchie-dvmte.azure.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(uri, function (err, client){
  if (err) {
    throw err;
  }
  db = client.db(process.env.DB_NAME)
  db.collection('user').insertOne({
    title: "hello world"
  })
})



// app.use(express.static(path.join(__dirname, 'static')));
app.use('/static', express.static(__dirname + '/static'));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({extended: true}))


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
  const user = users.filter(user => user.id === id)[0];
  res.render('voornaam.ejs', user); // twee parameters toegeven. de pagina en de juiste user die is gekozen.
})

//GET, to request data from a document
app.get('/geboortedatum/:id', function(req, res){
  const id = req.params.id; //var id opslaan
  const user = users.filter(user => user.id === id)[0] // kijken of id overeenkomt met de id hierboven.
  res.render('geboortedatum.ejs', user);
})

//GET, to request data from a document
app.get('/provincie/:id', function(req, res){
  const id = req.params.id; //var id opslaan
  const user = users.filter(user => user.id === id)[0] // kijken of id overeenkomt met de id hierboven.
  res.render('provincie.ejs', user);
})

//GET, to request data from a document
app.get('/geslacht/:id', function(req, res){
  const id = req.params.id; //var id opslaan
  const user = users.filter(user => user.id === id)[0] // kijken of id overeenkomt met de id hierboven.
  res.render('man_vrouw.ejs', user);
})

//GET, to request data from a document
app.get('/afbeeldingen/:id', function(req, res){
  const id = req.params.id; //var id opslaan
  const user = users.filter(user => user.id === id)[0] // kijken of id overeenkomt met de id hierboven.
  res.render('foto_toevoegen.ejs', user);
})

//GET, to request data from a document
app.get('/tekst/:id', function(req, res){
  const id = req.params.id; //var id opslaan
  const user = users.filter(user => user.id === id)[0] // kijken of id overeenkomt met de id hierboven.
  res.render('tekst_profiel.ejs', user);
})

//GET, to request data from a document
app.get('/profiel/:id', function(req, res){
  const id = req.params.id; //var id opslaan
  const user = users.filter(user => user.id === id)[0] // kijken of id overeenkomt met de id hierboven.
  res.render('mijn_profiel.ejs', user); // Laat dit ejs bestand zien
})


/************************/
/********* POST *********/
/************************/


//POST, to send data from a document
app.post('/aanmelden', addUser)

//Functie die ingevulde  data terug gaat sturen naar de server en in de lege array 'user' stopt.
function addUser(req, res){ //request, response

  users.push({ // pushed onderstaande ingevulde data in de array 'users'
    email: req.body.email,
    id: req.body.userName,
    password: req.body.password
  })

  console.log(req.body);  //Laat in de terminal de ingevulde gegevens zien.
  res.redirect('voornaam/' + req.body.userName); //Geeft bestand 'voornaam.ejs' weer bij client, plus de voornaam die de gebruiker heeft ingevuld.
  // Dit is de route!! Niet ejs bestand.
}





//POST, to send data from a document
app.post('/voornaam', addFirstName)


//Functie die ingevulde  data terug gaat sturen naar de server en in de array 'user' stopt. (komt niet bij de andere data??? vraag!)
function addFirstName(req, res){ //request, response

  const user = users.filter(user => user.id === req.body.id)[0] // kijken of id overeenkomt met de id hierboven.

  user.firstName = req.body.firstName;

  console.log(req.body); //Laat in de terminal de ingevulde gegevens zien.
  res.redirect('geboortedatum/' + req.body.id); //Geeft bestand 'geboortedatum.ejs' weer bij client. Dit is de route!! Niet ejs bestand.
}





//POST, to send data from a document
app.post('/geboortedatum', addDateOfBirth)


//Functie die ingevulde  data terug gaat sturen naar de server en in de array 'user' stopt. (komt niet bij de andere data??? vraag!)
function addDateOfBirth(req, res){ //request, response

  const user = users.filter(user => user.id === req.body.id)[0] // kijken of id overeenkomt met de id hierboven.

  user.dateOfBirth = req.body.dateOfBirth;

  console.log(req.body); //Laat in de terminal de ingevulde gegevens zien.
  res.redirect('provincie/' + req.body.id); //Geeft bestand 'provincie.ejs' weer bij client. Dit is de route!! Niet ejs bestand.
}





//POST, to send data from a document
app.post('/provincie', addProvince)


//Functie die ingevulde  data terug gaat sturen naar de server en in de array 'user' stopt. (komt niet bij de andere data??? vraag!)
function addProvince(req, res){ //request, response


  const user = users.filter(user => user.id === req.body.id)[0] // kijken of id overeenkomt met de id hierboven.

  user.province = req.body.province;

  console.log(req.body); //Laat in de terminal de ingevulde gegevens zien.
  res.redirect('geslacht/' + req.body.id); //Geeft bestand 'man_vrouw.ejs' weer bij client. Dit is de route!! Niet ejs bestand.
}






//POST, to send data from a document
app.post('/geslacht', addGender)


//Functie die ingevulde  data terug gaat sturen naar de server en in de array 'user' stopt. (komt niet bij de andere data??? vraag!)
function addGender(req, res){ //request, response

  const user = users.filter(user => user.id === req.body.id)[0] // kijken of id overeenkomt met de id hierboven.

  user.gender = req.body.gender;

  console.log(req.body); //Laat in de terminal de ingevulde gegevens zien.
  res.redirect('afbeeldingen/' + req.body.id); //Geeft bestand 'foto_toevoegen.ejs' weer bij client. Dit is de route!! Niet ejs bestand.
}






//POST, to send data from a document
app.post('/afbeeldingen', upload.single('pictures'), addPictures)


//Functie die ingevulde  data terug gaat sturen naar de server en in de array 'user' stopt. (komt niet bij de andere data??? vraag!)
function addPictures(req, res){ //request, response

  const user = users.filter(user => user.id === req.body.id)[0] // kijken of id overeenkomt met de id hierboven.

  user.profilePic = req.file;
  //user.pictures = req.body.pictures;

  console.log(req.body); //Laat in de terminal de ingevulde gegevens zien.
  res.redirect('tekst/' + req.body.id); //Geeft bestand 'tekst_profiel.ejs' weer bij client. Dit is de route!! Niet ejs bestand.
}





//POST, to send data from a document
app.post('/tekst', addText)


//Functie die ingevulde  data terug gaat sturen naar de server en in de array 'user' stopt. (komt niet bij de andere data??? vraag!)
function addText(req, res){ //request, response

  const user = users.filter(user => user.id === req.body.id)[0] // kijken of id overeenkomt met de id hierboven.

  user.textProfile = req.body.textProfile;

  console.log(user);
  console.log(req.body); //Laat in de terminal de ingevulde gegevens zien.
  res.redirect('profiel/' + req.body.id); //Geeft bestand 'mijn_profiel.ejs' weer bij client. Dit is de route!! Niet ejs bestand.
}




/*//ejs oefening, template engine
app.get('/index', function(req, res){
  res.render('index.ejs', {title: 'Hey', message: 'Hello there!'});
})
*/

app.listen(port,  () => console.log(`Running my NodeJS server`))
