// Importiamo il file di connessione al database
const connection = require('../data/db');

function index(req, res) {

    console.log("richiesta rotta index");

}


function show(req, res) {

    console.log("richiesta rotta show");

}

// esportiamo
module.exports = { index, show }