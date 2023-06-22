import AbstractLibrary from "./AbstractLibrary";
import React from "react";

export default class SavedLibrary extends AbstractLibrary {
    constructor(props) {
        super(props);
        this.movieButton = 'delete'
        this.showOnlyLikedMovies = true
        this.preloadMoviesAmount = 100
        this.afterLoadMoviesAmount = 100
    }

    async componentDidMount() {
        this.allMovies = await this.loadMovies();
        this.filteredMovies = this.allMovies.filter(movie => movie.isLiked);
        this.setState({ moviesLimit: this.preloadMoviesAmount });
    }

    handleDelete = async (movie) => {
        try {
            await this.moviesApi.deleteMovie(movie);
            this.setState({ movies: this.state.movies.filter(item => item._id !== movie._id) });
            movie.isLiked = false;
            movie._id = null;
            this.updateMovieLocally(movie);
        } catch (error) {
            this.props.onError(error.message);
        }
    }

}
