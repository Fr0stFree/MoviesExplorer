import AbstractLibrary from "./AbstractLibrary";
import { searchMovies } from "../../utils/functions";
import { AFTERLOAD_MOVIES_AMOUNT, PRELOAD_MOVIES_AMOUNT } from "../../utils/constants";
import React from "react";

export default class FullLibrary extends AbstractLibrary {
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
        } catch (error) {
            this.props.onError(error.message);
        }
    }

    handleLoadMore = () => {
        this.setState({ isLoading: true });
        setTimeout(() => {
            this.setState({
                movies: [...this.state.movies, ...this.filteredMovies.splice(0, AFTERLOAD_MOVIES_AMOUNT)],
                isLoading: false
            });
        }, 500);
    }

    filterMovies = () => {
        this.filteredMovies = searchMovies(
            this.allMovies,
            { query: this.state.query, onlyLiked: false, onlyShort: this.state.onlyShort },
        );
        const moviesAmount = this.filteredMovies.length
        this.setState({ movies: this.filteredMovies.splice(0, PRELOAD_MOVIES_AMOUNT) });
        return moviesAmount
    }

    loadMovies = async () => {
        let remoteMovies = [];
        let savedMovies = [];

        if (localStorage.getItem('movies')) {
            remoteMovies = JSON.parse(localStorage.getItem('movies'));
            savedMovies = await this.moviesApi.getSavedMovies()
        } else {
            [ remoteMovies, savedMovies ] = await Promise.all([ this.moviesApi.getRemoteMovies(), this.moviesApi.getSavedMovies() ]);
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

    get localStorageKey() {
        return 'allMovies'
    }

    get movieButtonType() {
        return 'like'
    }

    get moreSection() {
        if (this.filteredMovies.length === 0) {
            return null;
        }
        return (
            <button className="library__load-button"
                    onClick={this.handleLoadMore}
            >Ещё</button>
        )
    }
}
