export const searchMovies = (movies, { query = "", onlyLiked = false }) => {
    let result = movies.filter(movie => movie.nameRU.toLowerCase().includes(query.toLowerCase()) || movie.nameEN.toLowerCase().includes(query.toLowerCase()));
    if (onlyLiked) {
        result = result.filter(movie => movie.isLiked)
    }
    return result;
}
