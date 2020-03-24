const express = require('express');              // a minimal and and flexible Node.js webapplication
const bodyParser = require('body-parser');        // parses (ontleed) de meeste dingen die je geeft (JSON, forms, etc.)
const multer = require('multer');                 // een middleware om om te gaan met multipart/form-data (files)
const upload = multer({dest: 'static/upload/' }); // Geeft aan waar de files heengaan als ze worden geuploadt
require('dotenv').config();                       // .env bestand voor secret data van MongoDB
const session = require('express-session');       // express.session, als gebruiker browser afsluit en weer terugkomt, zijn de ingevulde gegevens er nog
const MongoClient = require('mongodb').MongoClient, // mongo database
	ObjectID = require('mongodb').ObjectID; 			// mongo database
const app = express();                            // express
const port = 3000;                                // de poort waar de server mee verbindt

let db;
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
	db.collection('user').findOne(										// vindt 1 object uit de 'user' collection van m'n Mongo database
		{_id: ObjectID(req.params.id)},									// Zoek de _id in het ObjectID van MongoDB, met param.id die uit de url komt. De specifieke _id uit MongoDB, van de gebruiker die hier in de req.params.id zit.
		function (err, result) {												// Deze functie gaat af indien er iets is gevonden / of niet.
			if (err) throw err; 													// error
			console.log('result:', result);								// in result zit het antwoord
			res.render('mijn_profiel.ejs', result); 			// als je iets uit result wilt renderen in je ejs - mongo database
		}
	);
});

app.get('/bewerken/:id', findID);

function findID(req, res) {
	db.collection('user').findOne(										// vindt 1 object uit de 'user' collection van m'n Mongo database
		{_id: ObjectID(req.params.id)},									// Zoek de _id in het ObjectID van MongoDB, met param.id die uit de url komt. De specifieke _id uit MongoDB, van de gebruiker die hier in de req.params.id zit.
		function (err, result) {												// Deze functie gaat af indien er iets is gevonden / of niet
			if (err) throw err; 													// error
			console.log('result:', result);								// in result zit het antwoord
			res.render('update.ejs', result);							// als je iets uit result wilt renderen in je ejs - mongo database
		}
	);
}

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


app.post('/sendFormTekst', addText);            // /tekst komt overeen met action in form

function addText(req, res){                     //request, response

	req.session.user.textProfile = req.body.textProfile; //Je slaat textProfile op in de req.session.user
	db.collection('user').insertOne(req.session.user, callback); // data van gebruiker (req.session.user) in database stoppen. Function callback af laten gaan.
	function callback (err, result) {							// keuze uit error of result
		if (err) throw err;													// Geef error
		console.log('test:', result);
		req.session.user._id = result.insertedId;		// Zet de inserted (insertOne) id, die in result zit, in req.session.user._id, dus in _id. Local.
		res.redirect('profiel/' + req.session.user._id); //Dit is de route + de mongoDB id. Neemt deze data mee naar profiel/
	}
}


app.post('/sendUpdate', updateText);            // tekst komt overeen met action in form

function updateText(req, res){
	db.collection('user').updateOne(							// Update iets wat in de collection 'user' zit van MongoDB.
		{_id: ObjectID(req.body._id)},							// Zoek de _id in het ObjectID van MongoDB, met param.id die uit de url komt. De specifieke _id uit MongoDB, van de gebruiker die hier in de req.body.id zit.
		{ $set: {textProfile: req.body.updateTextProfile} }, // verandert in de Mongo database de textProfile naar updateTextProfile die is ingevuld.
		(err)=>{																		// nieuwe manier van function schrijven.
			if (err) throw err;												// indien error, stuur error
			res.redirect('profiel/' + req.body._id);	// ga terug naar de mijn_profiel.ejs incl. de juiste _id uit de database. Geen req.session.user._id, omdat dat local was en je hier dus niet kan gebruiken.
		});
}


app.listen(port,  () => console.log('Running my NodeJS server')); // Indien de server is verbonden met de poort, krijg je de console.log te zien.
