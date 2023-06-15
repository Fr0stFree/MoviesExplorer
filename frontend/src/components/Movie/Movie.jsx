import React, { Component } from 'react';
import {Link} from "react-router-dom";

import './Movie.css';

export default class Movie extends Component {
    constructor(props) {
        super(props);
    }

    get likeButton() {
        return (
            <button className={`movie__button movie__like-button ${this.props.movie.isLiked ? "movie__like-button_active" : ""}`}
                    onClick={async () => this.props.onToggleLike(this.props.movie)}>
            </button>
        )
    }

    get deleteButton() {
        return (
            <button className="movie__button movie__delete-button"
                    onClick={async () => await this.props.onDelete(this.props.movie)}>
            </button>
        )
    }

    get duration() {
        const minutes = this.props.movie.duration % 60;
        const hours = (this.props.movie.duration - minutes) / 60;
        return `${hours}ч ${minutes}м`
    }

    render() {
        return (
            <article className="movie">
                <h3 className="movie__title">{this.props.movie.nameRU}</h3>
                <p className="movie__duration">{this.duration}</p>
                {this.props.buttonType === "like" ? this.likeButton : this.deleteButton}
                <Link to={this.props.movie.trailerLink} target="blank" className="movie__poster">
                    <img className="movie__poster-image" src={this.props.movie.image} alt={this.props.movie.nameRU} />
                </Link>
            </article>
        )
    }
}
