import React, { Component } from 'react';

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
        this.preloadMoviesAmount = 5;
        this.afterloadMoviesAmount = 3;
        this.allMovies = []
        this.filteredMovies = []
        this.moviesApi = new MoviesApi();
        this.state = {
            isLoading: false,
            movies: [],
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true });
        try {
            const [ remoteMovies, localMovies ] = await Promise.all([this.moviesApi.getRemoteMovies(), this.moviesApi.getSavedMovies()]);
            remoteMovies.forEach(movie => {
                movie.isLiked = Boolean(localMovies.find(localMovie => localMovie.movieId === movie.movieId))
                movie._id = localMovies.find(localMovie => localMovie.movieId === movie.movieId)?._id;
            });
            this.allMovies = remoteMovies;
            if (this.props.onlySaved) {
                this.setState({ movies: this.allMovies.filter(movie => movie.isLiked) });
            } else {
                this.setState({ movies: this.allMovies.slice(0, this.preloadMoviesAmount) });
            }
        } catch (error) {
            this.props.onError(error.message);
        } finally {
            this.setState({ isLoading: false });
        }
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (prevProps.onlySaved !== this.props.onlySaved) {
            this.setState({ isLoading: true });
            if (this.props.onlySaved) {
                this.setState({ movies: this.allMovies.filter(movie => movie.isLiked) });
            } else {
                this.setState({ movies: this.allMovies.slice(0, this.preloadMoviesAmount) });
            }
            this.setState({ isLoading: false });
        }
    }

    _filterMovies = async (movies, { query, onlyShort }) => {
        let result = movies.filter(movie => movie.nameRU.toLowerCase().includes(query.toLowerCase()) || movie.nameEN.toLowerCase().includes(query.toLowerCase()));
        onlyShort && result.filter(movie => movie.duration <= 40);
        return result;
    }

    handleSearch = async ({ query, onlyShort }) => {
        this.setState({ isLoading: true, movies: [] });
        try {
            this.filteredMovies = await this._filterMovies(this.allMovies, { query, onlyShort });
            this.setState({ movies: this.filteredMovies.splice(0, this.preloadMoviesAmount) });
        } catch (error) {
            this.props.onError(error.message)
        } finally {
            this.setState({ isLoading: false });
        }
    }

    handleLoadMore = () => {
        this.setState({ isLoading: true });
        setTimeout(() => {
            this.setState({
                movies: [...this.state.movies, ...this.filteredMovies.splice(0, this.afterloadMoviesAmount)],
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
                    <Search onSubmit={this.handleSearch} />
                    <section className="library__movies">
                        <ul className="library__movies-list">
                            {this.state.movies.map(movie => <li key={movie.movieId} className="library__movies-item">
                                <Movie movie={movie}
                                       onToggleLike={this.handleToggleLike}
                                       onDelete={this.handleDelete}
                                       buttonType={this.props.onlySaved ? "delete" : "like"} />
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
