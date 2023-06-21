import AbstractLibrary from "./AbstractLibrary";
import {searchMovies} from "../../utils/functions";

export default class SavedLibrary extends AbstractLibrary {
    handleDelete = async (movie) => {
        try {
            await this.moviesApi.deleteMovie(movie);
            this.setState({ movies: this.state.movies.filter(m => m._id !== movie._id) });
        } catch (error) {
            this.props.onError(error.message);
        }
    }

    filterMovies = () => {
        this.filteredMovies = searchMovies(
            this.allMovies,
            { query: this.state.query, onlyLiked: false, onlyShort: this.state.onlyShort },
        );
        const moviesAmount = this.filteredMovies.length
        this.setState({ movies: this.filteredMovies });
        return moviesAmount
    }

    loadMovies = async () => {
        const movies = await this.moviesApi.getSavedMovies();
        movies.forEach(movie => movie.isLiked = true);
        return movies;
    }

    get localStorageKey() {
        return 'savedMovies'
    }

    get movieButtonType() {
        return 'delete'
    }
}
