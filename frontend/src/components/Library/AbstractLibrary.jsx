import React, { Component } from 'react';

import { SHORT_MOVIE_DURATION } from "../../utils/constants";
import MoviesApi from "../../utils/moviesApi";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Search from "../Search/Search"
import Preloader from "../Preloader/Preloader";
import Movie from "../Movie/Movie";
import './AbstractLibrary.css';

export default class AbstractLibrary extends Component {
    constructor(props) {
        super(props);
        this.allMovies = []
        this.filteredMovies = []
        this.moviesApi = new MoviesApi();
        this.state = {
            isLoading: false,
            movies: [],
            query: '',
            onlyShort: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true });
        try {
            this.setState({
                query: JSON.parse(localStorage.getItem(this.localStorageKey))?.query || '',
                onlyShort: JSON.parse(localStorage.getItem(this.localStorageKey))?.onlyShort || false,
            })
            this.allMovies = await this.loadMovies();
            this.filterMovies();
        } catch (error) {
            this.props.onError(error.message);
        } finally {
            this.setState({ isLoading: false });
        }
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if ((prevState.onlyShort !== this.state.onlyShort) || (prevState.query !== this.state.query)) {
            const { query, onlyShort } = this.state;
            localStorage.setItem(this.localStorageKey, JSON.stringify({ query, onlyShort }));
        }
    }

    handleSearch = async (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });
        const moviesAmount = this.filterMovies();
        this.setState({ isLoading: false });
        if (moviesAmount === 0) {
            this.props.onError('Ничего не найдено');
        }
    }

    handleQueryChange = (query) => this.setState({ query });

    handleToggleOnlyShort = (onlyShort) => this.setState({ onlyShort });


    renderMovie = (movie) => {
        if (this.state.onlyShort && movie.duration >= SHORT_MOVIE_DURATION) {
            return null
        }
        return (
            <li key={movie.movieId} className="library__movies-item">
                <Movie movie={movie}
                       onToggleLike={this.handleToggleLike}
                       onDelete={this.handleDelete}
                       buttonType={this.movieButtonType}/></li>
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
                            {this.state.movies.map(movie => this.renderMovie(movie))}
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

    filterMovies = () => {
        return null
    }

    loadMovies = async () => {
        return null
    }

    get localStorageKey() {
        return ''
    }

    get movieButtonType() {
        return null
    }

    get moreSection() {
        return null
    }
}
