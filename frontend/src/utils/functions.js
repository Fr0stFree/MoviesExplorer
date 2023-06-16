import {SHORT_MOVIE_DURATION} from "./constants";

export const searchMovies = (movies, { query = "", onlyShort = false, onlyLiked = false }) => {
    let result = movies.filter(movie => movie.nameRU.toLowerCase().includes(query.toLowerCase()) || movie.nameEN.toLowerCase().includes(query.toLowerCase()));
    if (onlyShort) {
        result = result.filter(movie => movie.duration <= SHORT_MOVIE_DURATION);
    }
    if (onlyLiked) {
        result = result.filter(movie => movie.isLiked)
    }
    return result;
}
