/* eslint-env browser */

console.log('helloyou');

const btn = document.querySelector('#button1');
btn.addEventListener('click', () => {
	console.log('It works!');
});

const mail = document.getElementById('email');
console.log(mail);
