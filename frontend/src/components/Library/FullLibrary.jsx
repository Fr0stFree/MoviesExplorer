import AbstractLibrary from "./AbstractLibrary";
import { AFTERLOAD_MOVIES_AMOUNT, PRELOAD_MOVIES_AMOUNT } from "../../utils/constants";
import React from "react";

export default class FullLibrary extends AbstractLibrary {
    constructor(props) {
        super(props);
        this.movieButton = 'like';
        this.showOnlyLikedMovies = false;
        this.preloadMoviesAmount = PRELOAD_MOVIES_AMOUNT;
        this.afterLoadMoviesAmount = AFTERLOAD_MOVIES_AMOUNT;

        const state = JSON.parse(localStorage.getItem('libraryState'));
        this.state = {
            isLoading: false,
            movies: [],
            query: state?.query || '',
            isSearchDisabled: !(state && state.query.length !== 0),
            onlyShort: state?.onlyShort || false,
        }

    }

    componentDidMount() {
        this.allMovies = JSON.parse(localStorage.getItem('movies')) || [];
        this.filteredMovies = this.filterMovies(this.allMovies);
        const moviesLimit = JSON.parse(localStorage.getItem('libraryState'))?.moviesLimit || 0
        this.setState({ moviesLimit });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        super.componentDidUpdate(prevProps, prevState, snapshot);
        if ((prevState.onlyShort !== this.state.onlyShort) || (prevState.query !== this.state.query) || (prevState.movies !== this.state.movies)) {
            const { query, onlyShort, moviesLimit } = this.state;
            localStorage.setItem('libraryState', JSON.stringify({ query, onlyShort, moviesLimit }));
        }
    }

    handleToggleLike = async (movie) => {
        try {
            if (movie.isLiked) {
                await this.moviesApi.deleteMovie(movie);
                movie.isLiked = false;
                movie._id = null;
            } else {
                const savedMovie = await this.moviesApi.saveMovie(movie);
                movie.isLiked = true;
                movie._id = savedMovie._id;
            }
            this.setState({ movies: [...this.state.movies] });
            this.updateMovieLocally(movie);
        } catch (error) {
            this.props.onError(error.message);
        }
    }
}
