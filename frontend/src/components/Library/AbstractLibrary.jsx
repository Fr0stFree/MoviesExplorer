import React, { Component } from 'react';

import {AFTERLOAD_MOVIES_AMOUNT, SHORT_MOVIE_DURATION} from "../../utils/constants";
import MoviesApi from "../../utils/moviesApi";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Search from "../Search/Search"
import Preloader from "../Preloader/Preloader";
import Movie from "../Movie/Movie";
import './AbstractLibrary.css';
import {searchMovies} from "../../utils/functions";

export default class AbstractLibrary extends Component {
    constructor(props) {
        super(props);
        this.movieButton = null
        this.showOnlyLikedMovies = null
        this.preloadMoviesAmount = null
        this.afterLoadMoviesAmount = null

        this.allMovies = [];
        this.filteredMovies = [];
        this.moviesApi = new MoviesApi();
        this.state = {
            isLoading: false,
            movies: [],
            query: '',
            onlyShort: false,
            isSearchDisabled: true,
            moviesLimit: 0
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.query !== this.state.query) {
            this.state.query.length === 0 ? this.setState({ isSearchDisabled: true }) : this.setState({ isSearchDisabled: false })
        }
        if ((prevState.moviesLimit !== this.state.moviesLimit) || (prevState.onlyShort !== this.state.onlyShort)) {
            if (this.state.onlyShort) {
                this.setState({ movies: this.filteredMovies.filter(movie => movie.duration <= SHORT_MOVIE_DURATION).slice(0, this.state.moviesLimit) })
            } else {
                this.setState({ movies: this.filteredMovies.slice(0, this.state.moviesLimit) })
            }
        }
    }

    handleSearch = async(event) => {
        event.preventDefault();
        this.setState({ isLoading: true });
        try {
            this.allMovies = await this.loadMovies();
            this.filteredMovies = this.filterMovies(this.allMovies);
            let preloadAmount = this.preloadMoviesAmount;
            this.state.moviesLimit >= this.preloadMoviesAmount ? preloadAmount-- : preloadAmount++
            this.filteredMovies.length !== 0 ? this.setState({ moviesLimit: preloadAmount })
                                             : this.props.onError('Ничего не найдено');

        } catch (error) {
            this.props.onError(error.message);
        } finally {
            this.setState({ isLoading: false });
        }

    }

    handleQueryChange = (query) => this.setState({ query });

    handleToggleOnlyShort = (onlyShort) => this.setState({ onlyShort });

    handleLoadMore = () => {
        this.setState({ isLoading: true });
        this.setState({ moviesLimit: this.state.moviesLimit + this.afterLoadMoviesAmount })
        setTimeout(() => this.setState({ isLoading: false }), 500);
    }

    filterMovies = (movies) => searchMovies(movies, { query: this.state.query, onlyLiked: this.showOnlyLikedMovies });

    render() {
        return (
            <>
                <Header />
                <main className="library">
                    <Search onSubmit={this.handleSearch}
                            query={this.state.query}
                            onlyShort={this.state.onlyShort}
                            isDisabled={this.state.isSearchDisabled}
                            onChange={this.handleQueryChange}
                            onToggle={this.handleToggleOnlyShort} />
                    <section className="library__movies">
                        <ul className="library__movies-list">
                            {this.state.movies.map(movie => <li key={movie.movieId} className="library__movies-item">
                                <Movie movie={movie}
                                       onToggleLike={this.handleToggleLike}
                                       onDelete={this.handleDelete}
                                       buttonType={this.movieButton}/></li>)
                            }
                        </ul>
                        <article className="library__more">
                            {this.state.isLoading ? <Preloader />
                                                  : this.hasMore && <button className="library__load-button"
                                                                            onClick={this.handleLoadMore}>Ещё</button>
                            }
                        </article>
                    </section>
                </main>
                <Footer />
            </>
        )
    }

    get hasMore() {
        if (this.state.onlyShort) {
            return this.filteredMovies.filter(movie => movie.duration <= SHORT_MOVIE_DURATION).length > this.state.moviesLimit
        } else {
            return this.filteredMovies.length > this.state.moviesLimit
        }
    }

    loadMovies = async () => {
        if (localStorage.getItem('movies')) {
            return JSON.parse(localStorage.getItem('movies'));
        }
        const [ allMovies, savedMovies ] = await Promise.all([ this.moviesApi.getRemoteMovies(), this.moviesApi.getSavedMovies() ]);
        allMovies.forEach(movie => {
            const correspondingMovie = savedMovies.find(savedMovie => savedMovie.movieId === movie.movieId);
            if (correspondingMovie) {
                movie.isLiked = true;
                movie._id = correspondingMovie._id;
            } else {
                movie.isLiked = false;
                movie._id = null;
            }
        });
        localStorage.setItem('movies', JSON.stringify(allMovies));
        return allMovies;
    }

    updateMovieLocally = (movie) => {
        const storedMovies = JSON.parse(localStorage.getItem('movies'))
        const correspondingMovie = storedMovies.find(savedMovie => savedMovie.movieId === movie.movieId);
        correspondingMovie.isLiked = movie.isLiked
        correspondingMovie._id = movie._id
        localStorage.setItem('movies', JSON.stringify(storedMovies));
        this.filteredMovies = this.filterMovies(storedMovies);
    }
}
