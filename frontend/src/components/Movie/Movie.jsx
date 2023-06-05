import React, { Component } from 'react';

import './Movie.css';


export default class Movie extends Component {
    handleToggleLike = (event) => {
        if (event.target.classList.contains('movie__like-button_active')) {
            event.target.classList.remove('movie__like-button_active');
            // this.props.onDislike();
        } else {
            event.target.classList.add('movie__like-button_active');
            // this.props.onLike();
        }
    }

    handleDelete = (event) => {
        // this.props.onDelete();
    }

    get likeButton() {
        let className = "movie__button movie__like-button";
        if (this.props.isLiked) {
            className += " movie__like-button_active";
        }
        return (
            <button className={className}
                    onClick={this.handleToggleLike}>
            </button>
        )
    }

    get deleteButton() {
        return (
            <button className="movie__button movie__delete-button"
                    onClick={this.handleDelete}>
            </button>
        )
    }

    render() {
        return (
            <article className="movie">
                <h3 className="movie__title">{this.props.title}</h3>
                <p className="movie__duration">{this.props.duration}</p>
                {this.props.buttonType === "like" ? this.likeButton : this.deleteButton}
                <img className="movie__poster" src={this.props.image} alt={this.props.title} />
            </article>
        )
    }
}
