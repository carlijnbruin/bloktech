# Welkom!

In deze repository kunt u mijn nieuwe project zien, namelijk een datingssite met de naam Matchie.
Dit project heb ik gemaakt voor het vak Backend voor de studie Communication and Multimedia Design van de Hogeschool van Amsterdam. Mijn naam is Carlijn Bruin en ik zit in het tweede studiejaar.

## Over Backend:

<img width="872" alt="Schermafbeelding 2020-03-15 om 21 33 47" src="https://user-images.githubusercontent.com/59669604/76710088-af7daa80-6704-11ea-8561-15d5c1d374b2.png">

Een web app bestaat uit frontend en backend. Backend is het deel dat ontzichtbaar is voor de gebruiker en frontend is hetgene wat de gebruiker ziet. Frontend noemen we de client en backend de server. De server stuurt bestanden naar de client, en de client kan weer dingen, zoals data, terugsturen naar de server, wat de server bijvoorbeeld weer in de database kan zetten. Dit gaat middels requests en responses.

Om met de server te communiceren gebruiken we een command-line-interface, in een terminal. We bouwen web apps (server side) door middel van Node, dit is een open-source, cross-platform, run-time omgeving die JavaScript code server side uitvoert. Het is gebouwd in Chrome zijn V8 Javascript engine. Hierin gebruiken we NPM packages, dit zijn codes die al zijn geschreven door derden. We communiceren via http, renderen data via de server side door middel van templating, hiervoor heb ik EJS gebruikt, omdat dit het meest lijkt op HTML, waarin ik de client side bouw. Ten slotte stoppen we data in een database, die we later weer op kunnen vragen.

## Uitleg over mijn project:

Voor mijn datingssite project heb ik een jobstory bedacht, namelijk:
Wanneer ik opzoek ga naar een date, wil ik mij kunnen registreren op een datingssite en een profiel aanmaken, zodat ik in in contact kan komen met andere singles en zij met mij.

Bij dit project ga ik mij dus bezighouden met het registreren van gebruikers, en daarmee het aanmaken van een profiel. Hiervoor gaan gebruikers dus per pagina gevraagde gegevens over zichzelf invullen, wat daarna terecht komt op hun eigen specifieke profiel.

## Hoe kan je mijn project installeren?

1. Haal de repository binnen, dat kan door rechtsboven op clone or download te klikken. Downloadt de repository dan als een zip bestand.

2. Vraag mij persoonlijk om de .env file te verkrijgen.

3. Vraag mij naar mijn IP-adres, zodat de MongoDB database werkt. Whitelist dan mijn IP-adres. 

4. Installeer de node_modules, door in de terminal in het mapje 'myapp' te zetten: ```npm install```.

5. Open je terminal en run het project, in mijn geval de map 'myapp', door ```node index.js``` in te voeren.

6. Open de pagina door deze URL in je browser te zetten: http://localhost:3000/.

7. Tada! Het werkt.

## Hoe ziet mijn web app eruit qua uiterlijk?

De web app is responsive gemaakt, hieronder ziet u enkel de structuur en lay-out voor een small device. De afbeeldingen zijn op volgorde, van het eerste scherm naar het eind scherm.

<img width="300" alt="Schermafbeelding 2020-03-15 om 20 18 43" src="https://user-images.githubusercontent.com/59669604/76708975-6a08af80-66fb-11ea-9f75-18ffe845b4df.png"><img width="300" alt="Schermafbeelding 2020-03-15 om 20 18 56" src="https://user-images.githubusercontent.com/59669604/76708981-6ecd6380-66fb-11ea-8763-079c1b75c9a7.png"><img width="300" alt="Schermafbeelding 2020-03-15 om 20 19 30" src="https://user-images.githubusercontent.com/59669604/76708984-74c34480-66fb-11ea-8523-eff9721f03a7.png"><img width="300" alt="Schermafbeelding 2020-03-15 om 20 19 45" src="https://user-images.githubusercontent.com/59669604/76708986-7987f880-66fb-11ea-8b1a-91eb58f3f576.png"><img width="300" alt="Schermafbeelding 2020-03-15 om 20 19 54" src="https://user-images.githubusercontent.com/59669604/76708987-7d1b7f80-66fb-11ea-9988-0b0cdb046a0c.png"><img width="300" alt="Schermafbeelding 2020-03-15 om 20 20 17" src="https://user-images.githubusercontent.com/59669604/76708991-81479d00-66fb-11ea-8efc-d65292f2a2d2.png"><img width="300" alt="Schermafbeelding 2020-03-15 om 20 23 12" src="https://user-images.githubusercontent.com/59669604/76708992-84428d80-66fb-11ea-9538-e7b7c09899d2.png"><img width="300" alt="Schermafbeelding 2020-03-15 om 20 23 25" src="https://user-images.githubusercontent.com/59669604/76708994-886eab00-66fb-11ea-873e-11302e8dae4d.png">

## Uitleg over mijn code, van boven naar onder (zie ook de comments in de index.js file):

1.
```
const express = require('express');              
const bodyParser = require('body-parser');       
const multer = require('multer');                
const upload = multer({dest: 'static/upload/' }); 
require('dotenv').config();                       
const session = require('express-session');      
const MongoClient = require('mongodb').MongoClient, 
	ObjectID = require('mongodb').ObjectID; 				
const app = express();                            
const port = 5000;   
```

Met deze variabelen geef je aan dat je deze NPM packages wil gebruiken en op welke poort je zit, namelijk de 5000 poort.

2.
```
let db;
const MongoClient = mongo.MongoClient;
const uri = "mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@clustermatchie-dvmte.azure.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(uri, function (err, client){
  if (err) {
    throw err;
  }
  db = client.db(process.env.DB_NAME)
})
```

Dit gaat over de database die ik gebruik, namelijk MongoDB. Dit is een open-source, cross-platform, document-oriented database programma. Geclassificeerd als een non-SQL database programma. Het gebruikt een JSON-like document met schema's. MongoDB staat bekend om de snelheid die de database heeft. Om deze database te gebruiken maak je een .env file aan. Hierin zet je informatie, die je niet in je index.js bestand wil zetten, zoals je MongoDB username en wachtwoord. Deze .env file zet je in je .gitignore file, omdat je niet wil dat andere gebruikers van Github deze gegevens in kunnen zien. In de const uri code regel (dit is een url regel) refereer je naar de gegevens in de .env bestand. In de if statement daaronder geef je aan dat wanneer de mongoClient niet verbonden is met de server, je een error te zien krijgt, en anders krijg je het juiste bestand te zien.

3.
```
app.use('/static', express.static(__dirname + '/static'));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET
}))
```

Hiermee registreer je de npm packages die hierboven zijn geplaats en geef je een bepaalde route mee, van waar ze te vinden zijn, zoals bij static, kan je zien waar het static mapje te vinden is in de folderstructuur. In deze static map, zet je je CSS file, eigenlijk alle files waar je zonder toestemming bij kan komen.

4.
```
app.get('/', function(req, res){                 
	res.redirect('/aanmelden');
});


app.get('/aanmelden', function(req, res){  
	res.render('signup.ejs');
})


app.get('/voornaam/:id', function(req, res){
	res.render('firstname.ejs', req.session.user); 
})


app.get('/geboortedatum/:id', function(req, res){
	res.render('datofbirth.ejs', req.session.user); 
})


app.get('/provincie/:id', function(req, res){
	res.render('province.ejs', req.session.user);
})


app.get('/geslacht/:id', function(req, res){
	res.render('gender.ejs', req.session.user); 
})


app.get('/afbeeldingen/:id', function(req, res){
	res.render('profilepic.ejs', req.session.user);
})


app.get('/tekst/:id', function(req, res){
	res.render('text.ejs', req.session.user); 	
})


app.get('/profiel/:id', function(req, res){
	db.collection('user').findOne(									
		{_id: ObjectID(req.params.id)},								
		function (err, result) {											
			if (err) throw err; 										
			console.log('result:', result);							
			res.render('profile.ejs', result); 					
		}
	);
});


app.get('/bewerken/:id', findID);

function findID(req, res) {
	db.collection('user').findOne(									
		{_id: ObjectID(req.params.id)},						
		function (err, result) {											
			if (err) throw err; 											
			console.log('result:', result);				
			res.render('update.ejs', result);					
		}
	);
}
```

App.get zorgt ervoor dat de server data stuurt naar de client. In dit geval, het ejs bestand die je opgeeft door res.render. Deze file wordt doorgestuurd naar de client, en mocht je in de ejs file refereren naar informatie uit de req.session.user (de ingevulde gegevens van de gebruiker komt hierin te staan), dan kan je een html tag veranderen met de ingevulde data door de gebruiker. Dan komt er bijvoorbeeld bij voornaam te staan: ```<label> Hi <%= id %>, wat is je echte voornaam?</label>```, waardoor de eerste echte id, in mijn geval de userName, bij de client wordt weergegeven.

In de laatste twee app.get, gebruik ik een findOne method. Dit is een method vanuit de database MongoDB. Met deze findOne method ben ik opzoek gegaan naar 1 specifieke gebruiker, namelijk, de huidige gebruiker die bezig is met registreren. Hij zoekt in de collection 'user' en is opzoek naar een _ id. Dit is een _ id die MongoDB automatisch genereert bij elke geregistreerde gebruiker. Hij is opzoek naar de specifieke _ id in de database, van de gebruiker die aan het registreren is en hier komt hij aan doordat ik een id telkens meegeef in de url balk en NodeJS deze eruit haalt door req.params.id te gebruiken. Het resultaat van de findOne komt in de result te zitten. Dit is een callback functie.

5.

```
app.post('/sendFormAanmelden', addUser)

function addUser(req, res){ 
  req.session.user = {
    email: req.body.email,
    id: req.body.userName,
    password: req.body.password
  }
  console.log(req.session.user); 
  res.redirect('voornaam/' + req.body.userName);
}
```

Door middel van een app.post stuurt de client data naar de server. Dus de ingevulde data.

Door middel van de req.session.user, zet je het object wat daaronder staat, in de session.user. Session zorgt ervoor dat als de gebruiker de browser weg drukt en weer terug komt op de browser, de ingevulde gegevens niet verloren gaan en de gebruiker weer verder kan gaan waar hij/zij gebleven is. Je kan hier een bepaalde tijd op zetten, hoelang je wilt dat de browser de gegevens opslaat. 

Ik heb een id met req.body.userName aangemaakt, om hiermee een unieke gebruiker aan te geven en alle ingevulde gegevens onder deze specifieke id op te slaan.

De res.redirect zorgt ervoor dat wanneer de gevraagde gegevens ingevuld zijn, je door wordt gezonden naar de volgende pagina. voornaam/ + req.body.userName is de route, dit ziet de gebruiker in de url staan. De pagina naam, niet het .ejs bestand, maar de gegeven route, plus de specifieke id, dus de username van de gebruiker. De naam van deze route, in dit geval dus: voornaam/ komt overeen met de route die in het formulier achter de action staat. Hier wordt het formulier naartoe verzonden.


```
app.post('/sendFormVoornaam', addFirstName)

function addFirstName(req, res){
  req.session.user.firstName = req.body.firstName;
  console.log(req.session.user); 
  res.redirect('geboortedatum/' + req.body.id);
}


app.post('/sendFormDateOfBirth', addDateOfBirth)

function addDateOfBirth(req, res){ 
  req.session.user.dateOfBirth = req.body.dateOfBirth;
  console.log(req.session.user);
  res.redirect('provincie/' + req.body.id);
}


app.post('/sendFormProvince', addProvince)

function addProvince(req, res){ 
  req.session.user.province = req.body.province;
  console.log(req.session.user); 
  res.redirect('geslacht/' + req.body.id);
}


app.post('/sendFormGender', addGender)

function addGender(req, res){ 
  req.session.user.gender = req.body.gender;
  console.log(req.session.user); 
  res.redirect('afbeeldingen/' + req.body.id); 
}


app.post('/sendFormProfilePic', upload.single('pictures'), addPictures)

function addPictures(req, res){ 
  req.session.user.profilePic = req.file;
  console.log(req.session.user);
  res.redirect('tekst/' + req.body.id);
}


app.post('/sendFormText', addText)

function addText(req, res){

  req.session.user.textProfile = req.body.textProfile;

	db.collection('user').insertOne(req.session.user, callback); 
	function callback (err, result) {	
  		if (err) throw err;		
      console.log('test:', result);
      req.session.user._id = result.insertedId;	
      res.redirect('profiel/' + req.session.user._id);
  }
}
```

De `db.collection('user').insertOne(req.session.user);` code regel, zorgt ervoor dat alles wat in de 'req.session.user' is gestopt, bij elke app.post functie, dat al deze ingevulde gegevens in een keer in de mongoDB database komt te staan. Dit komt door de method 'insertOne'. Ik heb er dus voor gekozen dat wanneer alle gegevens ingevuld zijn van de gebruiker, dat het dan pas door wordt gestuurd naar de database. Het resultaat komt in result te staan. Daarna zorg ik ervoor dat de id, van de huidige gebruiker, waarvan de data net is opgestuurd naar de database, ook in de req.session.user komt te staan. Hierin voeg je dus de _ id toe. Deze _ id ziet de gebruiker dan ook terug in de url.

6.

```
app.post('/sendUpdate', updateText); 

function updateText(req, res){
	db.collection('user').updateOne(
    {_id: ObjectID(req.body._id)},	
    { $set: {textProfile: req.body.updateTextProfile} },
   	(err)=>{		
  	if (err) throw err;	
 		res.redirect('profiel/' + req.body._id);
    });
}
```

Net zoals de method findOne, heb je ook een method die heet updateOne. Hiermee kan je data die in de database staan bewerken. Eerst ga je weer opzoek naar de juiste _ id in de database, namelijk van de huidige gebruiker die bezig is met registreren. Bij een app.get komt dit in je req.params te staan en in een app.post in je req.body. Doormiddel van $set geef je aan dat je data wil veranderen. Dus in dit geval wil ik de textprofile veranderen, door wat er in de updateTextProfile ingevuld wordt door de gebruiker. Dit komt in de req.body.updateTextProfile te staan. Hierdoor wordt de textProfile dus bewerkt in de database. Mocht dit niet lukken, dan geeft het een error door de callback, mocht het wel lukken, dan wordt het aangepast in de database en wordt je geredirect naar de profiel pagina, met in de url de _ id van de MongoDB database.


7.

```
app.listen(port,  () => console.log(`Running my NodeJS server`))
```

De server zit op poort 3000 en luistert dus ook telkens naar deze poort, om te kijken of hij codes uit moet voeren.

De data komt daarwerkelijk in de MongoDB database, zie hier:

<img width="1000" alt="Schermafbeelding 2020-03-15 om 20 34 35" src="https://user-images.githubusercontent.com/59669604/76709134-6cb7d480-66fc-11ea-9cb3-229d419b1ab4.png">


## Het proces:

1. Ik heb het een en ander geïnstalleerd, zoals een text editor (Atom), GitHub, Git, wat ik heb geconnect met met GitHub via de  terminal, Node en MongoDB geïnstalleerd in de terminal en Slack, om te communiceren met studiegenoten en leraren.

2. Folder structuur aangemaakt, d.m.v. een 'myapp' map, met daarin een node_modules (met alle NPM packages), JavaScript (met een frontend javascript bestand), views (met .ejs bestanden) en een static map (voor alle public files, die direct vanuit de server wordt verzonden, zonder enige toestemming nodig te hebebn). Daarnaast zitten er in de myapp map ook nog een README.md bestand (uitleg over het project), .gitignore (files die ik niet met iedereen wil delen), .env (voor de mongoDB database), een package.json (hierin staat welke npm packages je hebt gedownloadt onder Dependencies en welke versies je daarvan hebt, aanmaken kan d.m.v. npm init) en een index.js file waar alle JavaScript codes in staan voor de server side.

3. Het installeren van NPM packages die ik nodig heb voor mijn project, namelijk: EXPRESS, Body-parser, Multer, MongoDB, Dotenv en Express-Session.

4. Het aanmaken van HTML files (formulieren) en een CSS file, voor frontend, voor de structuur en lay-out van de web app. Ik heb

5. Kennis opdoen over requests (opvragen van bestand), status codes (zoals 404, error), response (reageren op request), routes en URL's, app.use, app.get (komt in de url te staan, info ophalen, zoals een bestand) en app.post (submit a resource, komt niet in de url te staan) codes en deze ook toepassen op mijn project. Ook hoe je een website dynamisch kan maken, door de input van de gebruiker ergens anders op de site te laten verschijnen, door middel van JavaScript te gebruiken vanuit je index.js file naar je EJS files.

_Voorbeeld (zie de <%= .. %> tags, hier komt de ingevulde input, d.m.v. het 'name' attribuut bij formulier elementen (input types bv.):_

```
  <a href="/tekst_profiel/<%= id %>" class="backButton"><img src="/static/img/nav_pijltje.png" class="pijltjeTerug" alt="navigatie naar vorige pagina"></a>
      <h1 class="stappen">Mijn profiel</h1>
    </nav>
  </header>

<div class="mijnProfielNaarLinks">
  <div class="profielBackground">
    <h2><%= firstName %>, <span><%= dateOfBirth %></span></h2>
    <img src="/static/img/location_icon.png" alt="locatie icoon">

    <p><%= province %></p>
    <img src="/<%= profilePic.path %>" id="profielfoto" alt="mijn profiel foto">

    <div class="location"></div>

    <p>'<%= textProfile %>'</p>
```

6. Het opslaan van ingevulde data in het formulier door een gebruiker en elke gebruiker een specifieke ID te geven. Dit was een uitdaging, omdat ik meerdere EJS files gebruik en er op elk EJS file dit een ander form ingevuld moet worden door de gebruiker. De ID moet ik dus bij elk file meenemen naar het volgende file.

7. Meerdere app.get en app.post aangemaakt met elke app.post een nieuwe functie. In deze functie zorg ik ervoor dat de ingevulde gegevens onder deze specifieke id/gebruiker komt te staan en verzonden wordt naar de MongoDB database. Daarnaast zorg ik ervoor dat de gegevens per functie in een Express session komt te staan. Dit zorgt ervoor dat als de gebruiker de browser weg drukt en weer terug komt op de browser, de ingevulde gegevens niet verloren gaan en de gebruiker weer verder kan gaan waar hij/zij gebleven is. Door middel van de res.redirect wordt de gebruiker doorverwezen naar een nieuw EJS bestand en wordt de al ingevulde gegevens meeverstuurd. Bij de laatste redirect worden de ingevulde gegevens pas doorgestuurd naar de mongoDB database.

8. De ingevulde gegevens verstuur ik door middel van de EJS templating/JavaScript in de EJS files door naar de uiteindelijke eind pagina, namelijk de 'mijn_profiel.ejs' pagina. Hier vindt de gebruiker alle ingevulde gegevens in 1 overzicht terug.

9. Daarna heb ik mij verdiept in de updateOne en de findOne method van MongoDB. Ik heb een extra .ejs file aangemaakt, een bewerk pagina, waarin je te textProfile kan aanpassen en het werkt.

9. De puntjes op de i gezet en de laatste comments in het bestand gezet. Kijk hiervoor naar de index.js file.

## Tot slot

Ik heb hard mijn best gedaan om het werkend te laten maken en het werkt! Ik ben zeer tevreden met het eindresultaat voor backend. Tips en tops zijn uiteraard altijd welkom.

### Bronnen

* Slides van de Backend lessen van de HvA

* wStack Overflow - Where Developers Learn, Share, & Build Careers. (z.d.). Geraadpleegd op 10 februari 2020, van https://stackoverflow.com/

* Introduction to Node.js. (z.d.). Geraadpleegd op 10 februari 2020, van https://nodejs.dev/

* The Fundamentals - Server Side . (z.d.). Geraadpleegd op 24 februari 2020, van https://syntax.fm/show/188/the-fundamentals-server-side

* Hallie, L. (2019, 13 december). 🚀⚙️ JavaScript Visualized: the JavaScript Engine. Geraadpleegd op 11 februari 2020, van https://dev.to/lydiahallie/javascript-visualized-the-javascript-engine-4cdf

* Danny de Vries. (2020, 16 januari). Be() - client & server. Geraadpleegd op 13 februari 2020, van https://www.youtube.com/watch?v=HAE-iYJ8_14

* Danny de Vries. (2020b, 16 januari). Be() - modules. Geraadpleegd op 12 februari 2020, van https://www.youtube.com/watch?v=t64md6HAztU

* FreeCodeCamp.org. (z.d.). Geraadpleegd op 15 februari 2020, van https://www.freecodecamp.org

* Danny de Vries. (2020c, 16 januari). Be() - npm. Geraadpleegd op 20 februari 2020, van https://www.youtube.com/watch?v=jgtXhdxVisw

* Danny de Vries. (2020d, 23 januari). Be() - npm  en packages (demo). Geraadpleegd op 25 februari 2020, van https://www.youtube.com/watch?v=tdqXTNqNrr0

* Express - Node.js web application framework. (z.d.). Geraadpleegd op 26 februari 2020, van https://expressjs.com

* Frontend vs Backend. (2019, 24 juli). Geraadpleegd op 25 februari 2020, van https://zellwk.com/blog/frontend-vs-backend/

* Embedded JavaScript templating. (z.d.). Geraadpleegd op 20 februari 2020, van https://ejs.co/

* Getting Started – Pug. (z.d.). Geraadpleegd op 20 februari 2020, van https://pugjs.org/api/getting-started.html

* HTTP Status Codes — httpstatuses.com. (z.d.). Geraadpleegd op 2 maart 2020, van https://httpstatuses.com/

* Managed MongoDB Hosting | Database-as-a-Service. (z.d.). Geraadpleegd op 10 maart 2020, van https://www.mongodb.com/cloud/atlas

* Copes, F. (2018, 2 september). Express Sessions. Geraadpleegd op 10 maart 2020, van https://flaviocopes.com/express-sessions/

* Licensing a repository - GitHub Help. (z.d.). Geraadpleegd op 15 maart 2020, van https://help.github.com/en/github/creating-cloning-and-archiving-repositories/licensing-a-repository

* Goldspink, M. (2017, 18 januari). Best Text Editor? Atom vs Sublime vs Visual Studio Code vs Vim. Geraadpleegd op 19 maart 2020, van https://www.codementor.io/@mattgoldspink/best-text-editor-atom-sublime-vim-visual-studio-code-du10872i7

* C. (z.d.). Cxpartners/coding-standards. Geraadpleegd op 20 maart 2020, van https://github.com/cxpartners/coding-standards

* Gezond verstand
