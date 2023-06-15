import React, { Component } from 'react';

import {
    PRELOAD_MOVIES_AMOUNT,
    AFTERLOAD_MOVIES_AMOUNT,
    SHORT_MOVIE_DURATION,
} from "../../utils/constants";
import { searchMovies, loadMovies } from "../../utils/functions";
import MoviesApi from "../../utils/moviesApi";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Search from "../Search/Search"
import Preloader from "../Preloader/Preloader";
import Movie from "../Movie/Movie";
import './Library.css';

export default class Library extends Component {
    constructor(props) {
        super(props);
        this.allMovies = []
        this.filteredMovies = []
        this.moviesApi = new MoviesApi();
        const { query = '', onlyShort = false } = JSON.parse(localStorage.getItem("searchQuery"))
        this.state = {
            isLoading: false,
            movies: [],
            query: query || '',
            onlyShort: onlyShort || false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true });
        try {
            this.allMovies = await loadMovies();
            if (this.props.onlySaved) {
                this.filteredMovies = searchMovies(this.allMovies, { onlyShort: this.state.onlyShort, onlyLiked: true });
                console.log(this.filteredMovies)
                this.setState({ movies: this.filteredMovies });
            } else {
                this.filteredMovies = searchMovies(this.allMovies, { onlyShort: this.state.onlyShort, onlyLiked: false })
                this.setState({ movies: this.filteredMovies.splice(0, PRELOAD_MOVIES_AMOUNT) });
            }
        } catch (error) {
            this.props.onError(error.message);
        } finally {
            this.setState({ isLoading: false });
        }
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (prevProps.onlySaved !== this.props.onlySaved) {
            this.filteredMovies = searchMovies(this.allMovies, { onlyShort: this.state.onlyShort, onlyLiked: this.props.onlySaved });
            if (this.props.onlySaved) {
                this.setState({ movies: this.filteredMovies });
            } else {
                this.setState({ movies: this.filteredMovies.splice(0, PRELOAD_MOVIES_AMOUNT) });
            }

        } else if (prevState.onlyShort !== this.state.onlyShort) {
            if (this.state.onlyShort) {
                this.beforeShortFilter = this.state.movies;
                this.setState({ movies: this.state.movies.filter(movie => movie.duration <= SHORT_MOVIE_DURATION) });
            } else {
                this.beforeShortFilter = this.beforeShortFilter || [];
                this.setState({ movies: this.beforeShortFilter });
            }
        }
    }

    componentWillUnmount = () => {
        const { query, onlyShort } = this.state;
        localStorage.setItem("searchQuery", JSON.stringify({ query, onlyShort }));
    }

    handleSearch = async (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });
        this.filteredMovies = searchMovies(
            this.allMovies,
            { query: this.state.query, onlyShort: this.state.onlyShort, onlyLiked: this.props.onlySaved }
        );
        if (this.filteredMovies.length === 0) {
            this.props.onError('Ничего не найдено');
        } else {
            this.setState({ movies: this.filteredMovies.splice(0, PRELOAD_MOVIES_AMOUNT) });
        }
        this.setState({ isLoading: false });

    }

    handleQueryChange = (query) => this.setState({ query });

    handleToggleOnlyShort = (onlyShort) => this.setState({ onlyShort });

    handleLoadMore = () => {
        this.setState({ isLoading: true });
        setTimeout(() => {
            this.setState({
                movies: [...this.state.movies, ...this.filteredMovies.splice(0, AFTERLOAD_MOVIES_AMOUNT)],
                isLoading: false
            });
        }, 500);
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
        } catch (error) {
            this.props.onError(error.message);
        }
    }

    handleDelete = async (movie) => {
        try {
            await this.moviesApi.deleteMovie(movie);
            movie.isLiked = false;
            movie._id = null;
            this.setState({ movies: this.state.movies.filter(m => m._id !== movie._id) });
        } catch (error) {
            this.props.onError(error.message);
        }
    }

    get moreSection() {
        if (this.props.onlySaved || this.filteredMovies.length === 0) {
            return null;
        }
        return (
            <button className="library__load-button"
                    onClick={this.handleLoadMore}
            >Ещё</button>
        )
    }

    render() {
        return (
            <>
                <Header />
                <main className="library">
                    <Search onSubmit={this.handleSearch}
                            query={this.state.query}
                            onlyShort={this.state.onlyShort}
                            onChange={this.handleQueryChange}
                            onToggle={this.handleToggleOnlyShort} />
                    <section className="library__movies">
                        <ul className="library__movies-list">
                            {this.state.movies.map(movie => <li key={movie.movieId} className="library__movies-item">
                                <Movie movie={movie}
                                       onToggleLike={this.handleToggleLike}
                                       onDelete={this.handleDelete}
                                       buttonType={this.props.onlySaved ? "delete" : "like"}/>
                            </li>)}
                        </ul>
                        <article className="library__more">
                            {this.state.isLoading ? <Preloader /> : this.moreSection}
                        </article>
                    </section>
                </main>
                <Footer />
            </>
        )
    }
}
