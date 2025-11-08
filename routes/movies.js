import express from 'express';
import 'dotenv/config'; // automatically loads .env to get secret API Key
const router = express.Router();

// Load OMDb API key from environment
const API_KEY = process.env.OMDB_API_KEY;

// JSON endpoint for API clients
router.get('/api', async (request, response) => {
    const searchQuery = request.query.searchQuery;

    if (!searchQuery) {
        return response.status(400).json({ error: "Missing search query" });
    }

    try {
        const { movies, error } = await fetchMovies(searchQuery);

        if (error) {
            return response.status(404).json({ error });
        }

        response.json(movies);
    } catch (err) {
        console.error("OMDb API Error:", err);
        response.status(500).json({ error: "Error fetching data from OMDb" });
    }
});

// Frontend endpoint to render Pug page
router.get('/search', async (request, response) => {
    const searchQuery = request.query.searchQuery;

    if (!searchQuery) {
        return response.redirect('/home');
    }

    try {
        const { movies, error } = await fetchMovies(searchQuery);

        response.render('homepage', {
            movies,
            searchQuery,
            error
        });
    } catch (err) {
        console.error("OMDb API Error:", err);
        response.render('homepage', {
            movies: [],
            searchQuery,
            error: "Error fetching data from OMDb"
        });
    }
});

// Get movie from external API based on search query
async function fetchMovies(searchQuery) {
    if (!API_KEY) {
        throw new Error("OMDb API key not set");
    }

    const apiUrl = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchQuery)}`;
    const apiResponse = await fetch(apiUrl);
    const data = await apiResponse.json();

    if (data.Response === "False") {
        return { error: data.Error, movies: [] };
    }

    return { movies: data.Search, error: null };
}

export default router;
