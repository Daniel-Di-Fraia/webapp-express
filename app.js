const express = require("express");
const app = express();
const port = 3000;

// usiamo il middleware static di express per file statici
app.use(express.static('public'));

// registro il body-parser
app.use(express.json());

// importiamo modulo router movies
const router = require("./routers/movies");

// impostiamo la rotta di index
app.get("/", (req, res) => {
    res.send('<h1>Server della mia webapp movies</h1>')
});

app.use("/movies", router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});