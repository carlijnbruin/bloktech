console.log("helloyou");

var BdaySentence = "";
var Bdate = document.getElementById('birthdate').value;
var Bday = +new Date(Bdate);
var BdaySentence += "your are" + ~~ ((Date.now() - Bday) / (31557600000));
var theBday = document.getElementById('resultBday');
theBday.innerHTML = BdaySentence;
