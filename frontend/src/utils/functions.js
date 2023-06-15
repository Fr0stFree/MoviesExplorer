import {SHORT_MOVIE_DURATION} from "./constants";
import MoviesApi from "../utils/moviesApi";

const moviesApi = new MoviesApi();

export const loadMovies = async () => {
    let remoteMovies = [];
    let savedMovies = [];

    if (localStorage.getItem('movies')) {
        remoteMovies = JSON.parse(localStorage.getItem('movies'));
        savedMovies = await moviesApi.getSavedMovies()
    } else {
        [ remoteMovies, savedMovies ] = await Promise.all([ moviesApi.getRemoteMovies(), moviesApi.getSavedMovies() ]);
    }
    remoteMovies.forEach(movie => {
        const correspondingSavedMovie = savedMovies.find(savedMovie => savedMovie.movieId === movie.movieId);
        if (correspondingSavedMovie) {
            movie.isLiked = true;
            movie._id = correspondingSavedMovie._id;
        } else {
            movie.isLiked = false;
            movie._id = null;
        }
    });
    localStorage.setItem('movies', JSON.stringify(remoteMovies));
    return remoteMovies;
}

export const searchMovies = (movies, { query = "", onlyShort = false, onlyLiked = false }) => {
    let result = movies.filter(movie => movie.nameRU.toLowerCase().includes(query.toLowerCase()) || movie.nameEN.toLowerCase().includes(query.toLowerCase()));
    if (onlyShort) {
        result = result.filter(movie => movie.duration < SHORT_MOVIE_DURATION);
    } else {
        result = result.filter(movie => movie.duration >= SHORT_MOVIE_DURATION);
    }
    if (onlyLiked) {
        result = result.filter(movie => movie.isLiked)
    }
    return result;
}
