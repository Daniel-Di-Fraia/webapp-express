// Importiamo il file di connessione al database
const connection = require('../data/db');

function index(req, res) {

    // prepariamo la query
    const sql = 'SELECT * FROM movies';

    // eseguiamo la query
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' })

        const movies = results.map(movie => {
            return {
                ...movie,
                image: req.imagePath + movie.image
            }
        });

        res.json(movies);
    });
}


function show(req, res) {

    // recuperiamo l'id 
    const id = req.params.id

    // prima query di rireca di singolo movie
    const movieSql = 'SELECT * FROM movies WHERE id = ?';

    // Prepariamo la query per le reviews con join e where
    const reviewsSql = 'SELECT * FROM reviews WHERE movie_id = ?';

    // Eseguiamo la prima query per il movie
    connection.query(movieSql, [id], (err, movieResults) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (movieResults.length === 0) return res.status(404).json({ error: 'Movie not found' });

        // Recuperiamo il film (movie)
        const movie = movieResults[0];
        movie.image = req.imagePath + movie.image;

        // eseguiamo la seconda query per le reviews
        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });

            // Aggiungiamo i le reviews dei movies
            movie.reviews = reviewsResults;
            res.json(movie);
        });
    });

}

// esportiamo
module.exports = { index, show }