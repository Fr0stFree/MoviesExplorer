import React, { Component } from 'react';

import Movie from "../Movie/Movie";
import Preloader from "../Preloader/Preloader";
import './Movies.css';
import { testMovieData, testNewMovieData } from "../../utils/testData";

export default class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }

    buildMovie = ({ title, duration, image, isLiked }) => {
        return (
            <Movie title={title}
                   duration={duration}
                   image={image}
                   isLiked={isLiked}
                   buttonType={this.props.onlySaved ? "delete" : "like"} />
        )
    }

    handleLoad = () => {
        this.setState({ isLoading: true });
        setTimeout(() => {
            testMovieData.push(...testNewMovieData);
            this.setState({ isLoading: false });
        }, 2000);
    }

    get moreSection() {
        if (this.props.onlySaved) {
            return null;
        }
        if (this.state.isLoading) {
            return <Preloader />;
        }
        return <button className="movies__load-button"
                       onClick={this.handleLoad}>Ещё</button>;

    }

    render() {
        return (
            <section className="movies">
                <ul className="movies__list">
                    {testMovieData.map(movie => <li key={movie._id} className="movies__list-item">{this.buildMovie(movie)}</li>)}
                </ul>
                <article className="movies__more">{this.moreSection}</article>
            </section>
        )
    }
}
