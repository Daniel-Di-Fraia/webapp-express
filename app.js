const express = require("express");
const app = express();
const port = 3000;

// importiamo middleware gestione path imgs
const imagePath = require("./middlewares/imagePath");

// usiamo il middleware static di express per file statici
app.use(express.static('public'));

// registro il body-parser
app.use(express.json());

//usiamo middleware gestione path imgs per le rotte
app.use(imagePath);

// importiamo modulo router movies
const router = require("./routers/movies");

//importiamo middleware errorServer
const errorServer = require("./middlewares/errorServer");

//importiamo middleware notFound
const notFound = require("./middlewares/notFound");

// impostiamo la rotta di index
app.get("/", (req, res) => {
    res.send('<h1>Server della mia webapp movies</h1>')
});

app.use("/movies", router);

// richiamiamo middleware gestione errori
app.use(errorServer);

//richiamiamo middleware errore 404 per rotta non trovata
app.use(notFound);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});