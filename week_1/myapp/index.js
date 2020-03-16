const express = require('express');               // a minimal and and flexible Node.js webapplication
const bodyParser = require('body-parser');        // parses (ontleed) de meeste dingen die je geeft (JSON, forms, etc.)
const multer = require('multer');                 // een middleware om om te gaan met multipart/form-data (files)
const upload = multer({dest: 'static/upload/' }); // Geeft aan waar de files heengaan als ze worden geuploadt
const mongo = require('mongodb');                 // mongo database
require('dotenv').config();                       // .env bestand voor secret data van MongoDB
const session = require('express-session');       // express.session, als gebruiker browser afsluit en weer terugkomt, zijn de ingevulde gegevens er nog
const app = express();                            // express
const port = 3000;                                // de poort waar de server mee verbindt

let db;
const MongoClient = mongo.MongoClient;
const uri = 'mongodb+srv://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@clustermatchie-dvmte.azure.mongodb.net/test?retryWrites=true&w=majority';
//verbinding maken met de Mongo database

MongoClient.connect(uri, function (err, client){
	if (err) {
		throw err;                                    //niet geconnect met de client? Dan geeft het een error
	}
	db = client.db(process.env.DB_NAME);            //wel geconnect? Dan de info in juiste database zetten. Name staat in de .env file.
});

app.use('/static', express.static(__dirname + '/static')); //zitten bestanden in die direct vanuit de server verzonden kunnen worden, zonder toestemming. Kan bv. HTML, CSS, images en JS in.
app.set('view engine', 'ejs');                    // template engine EJS, om variabele te vervangen met echte data
app.set('views', 'views');                        //EJS bestanden zitten in de views map
app.use(bodyParser.urlencoded({extended: true}));  // urlencoded = wat browsers gebruiken om forms te verzenden. body-parser ontleed de data en stored het in req.body, wat daarachter komt is van name attribuut van form types.
app.use(session({
	resave: false,
	saveUninitialized: true,
	secret: process.env.SESSION_SECRET              //verwijzing naar data in .env bestand
	//jij gaat 24 uur mee, tijd meegeven aan session kan nog
}));


/***********************/
/********* GET *********/                         //Request a resource, server die stuurt data naar de client
/***********************/


app.get('/', function(req, res){                  // zodat pagina het ook doet zonder de /aanmelden
	res.redirect('/aanmelden');
});


app.get('/aanmelden', function(req, res){         // waar gebruiker naar navigeert in de browser /aanmelden
	res.render('aanmelden.ejs');                    // render = rendered op de server (gecombineerd met echte data)
});


app.get('/voornaam/:id', function(req, res){
	res.render('voornaam.ejs', req.session.user);   // Die tweede parameter is als je dus bv de username wilt renderen op de voornaam.ejs bestand. Dit haalt hij dan uit de req.session.user, waarbij de gebruiker de userName heeft aangemaakt.
});


app.get('/geboortedatum/:id', function(req, res){
	res.render('geboortedatum.ejs', req.session.user); // Die tweede parameter is als je dus bv de username wilt renderen op de voornaam.ejs bestand. Dit haalt hij dan uit de req.session.user, waarbij de gebruiker de userName heeft aangemaakt. In dit geval is het voor de backbutton, om een id uit de req.session.user te pakken.
});


app.get('/provincie/:id', function(req, res){
	res.render('provincie.ejs', req.session.user); // Die tweede parameter is als je dus bv de username wilt renderen op de voornaam.ejs bestand. Dit haalt hij dan uit de req.session.user, waarbij de gebruiker de userName heeft aangemaakt. In dit geval is het voor de backbutton, om een id uit de req.session.user te pakken.
});


app.get('/geslacht/:id', function(req, res){
	res.render('man_vrouw.ejs', req.session.user); // Die tweede parameter is als je dus bv de username wilt renderen op de voornaam.ejs bestand. Dit haalt hij dan uit de req.session.user, waarbij de gebruiker de userName heeft aangemaakt. In dit geval is het voor de backbutton, om een id uit de req.session.user te pakken.
});


app.get('/afbeeldingen/:id', function(req, res){
	res.render('foto_toevoegen.ejs', req.session.user); // Die tweede parameter is als je dus bv de username wilt renderen op de voornaam.ejs bestand. Dit haalt hij dan uit de req.session.user, waarbij de gebruiker de userName heeft aangemaakt. In dit geval is het voor de backbutton, om een id uit de req.session.user te pakken.
});


app.get('/tekst/:id', function(req, res){
	res.render('tekst_profiel.ejs', req.session.user); // Die tweede parameter is als je dus bv de username wilt renderen op de voornaam.ejs bestand. Dit haalt hij dan uit de req.session.user, waarbij de gebruiker de userName heeft aangemaakt. In dit geval is het voor de backbutton, om een id uit de req.session.user te pakken.
});


app.get('/profiel/:id', function(req, res){
	res.render('mijn_profiel.ejs', req.session.user); // Die tweede parameter is als je dus bv de username wilt renderen op de voornaam.ejs bestand. Dit haalt hij dan uit de req.session.user, waarbij de gebruiker de userName heeft aangemaakt. In dit geval is het voor de backbutton, om een id uit de req.session.user te pakken.
});


/************************/
/********* POST *********/                      // Submit a resource, de client stuurt data naar de server
/************************/


app.post('/sendFormAanmelden', addUser);                 // /aanmelden komt overeen met action in form

function addUser(req, res){                     // request, response
	req.session.user = {                          // pushed onderstaande ingevulde data in req.session.user, zonder session, is het altijd geldig
		email: req.body.email,
		id: req.body.userName,
		password: req.body.password
	};
	console.log(req.session.user);                //Laat in de terminal de ingevulde gegevens zien.
	res.redirect('voornaam/' + req.body.userName); //Dit is de route + de unieke id (username)
}


app.post('/sendFormVoornaam', addFirstName);             // /voornaam komt overeen met action in form

function addFirstName(req, res){                //request, response
	req.session.user.firstName = req.body.firstName; //Je slaat firstName op in de req.session.user
	console.log(req.session.user);                //Laat in de terminal de ingevulde gegevens zien
	res.redirect('geboortedatum/' + req.body.id); //Dit is de route + de unieke id (username)
}


app.post('/sendFormGeboortedatum', addDateOfBirth);      // /geboortedatum komt overeen met action in form

function addDateOfBirth(req, res){              //request, response
	req.session.user.dateOfBirth = req.body.dateOfBirth; //Je slaat dateOfBirth op in de req.session.user
	console.log(req.session.user);                //Laat in de terminal de ingevulde gegevens zien.
	res.redirect('provincie/' + req.body.id);     //Dit is de route + de unieke id (username)
}


app.post('/sendFormProvincie', addProvince);             // //provincie komt overeen met action in form

function addProvince(req, res){                 //request, response
	req.session.user.province = req.body.province;//Je slaat province op in de req.session.user
	console.log(req.session.user);                //Laat in de terminal de ingevulde gegevens zien.
	res.redirect('geslacht/' + req.body.id);      //Dit is de route + de unieke id (username)
}


app.post('/sendFormGeslacht', addGender);                // /geslacht komt overeen met action in form

function addGender(req, res){                   //request, response
	req.session.user.gender = req.body.gender;    //Je slaat gender op in de req.session.user
	console.log(req.session.user);                //Laat in de terminal de ingevulde gegevens zien.
	res.redirect('afbeeldingen/' + req.body.id);  //Dit is de route + de unieke id (username)
}


app.post('/sendFormAfbeeldingen', upload.single('pictures'), addPictures); // /afbeeldingen komt overeen met action in form, het accepteert maar 1 image

function addPictures(req, res){                 //request, response
	req.session.user.profilePic = req.file;       //Je slaat profilePic op in de req.session.user
	console.log(req.session.user);                //Laat in de terminal de ingevulde gegevens zien.
	res.redirect('tekst/' + req.body.id);         //Dit is de route + de unieke id (username)
}


app.post('/sendFormTekst', addText);                     // /tekst komt overeen met action in form

function addText(req, res){                     //request, response

	req.session.user.textProfile = req.body.textProfile; //Je slaat textProfile op in de req.session.user
	db.collection('user').insertOne(req.session.user); //Alle info van die specifieke id/user naar database sturen.
	console.log(req.session.user);                //Laat in de terminal de ingevulde gegevens zien.
	res.redirect('profiel/' + req.body.id);       //Dit is de route + de unieke id (username)
}


app.listen(port,  () => console.log('Running my NodeJS server')); // Indien de server is verbonden met de poort, krijg je de console.log te zien.
