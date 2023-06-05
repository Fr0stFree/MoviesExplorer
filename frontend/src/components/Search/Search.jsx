import React, { Component } from 'react';

import './Search.css';


export default class Search extends Component {

    handleChange = (event) => {
        console.log(event.target.value);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("Search submitted");
    }

    render() {
        return (
            <section className="search">
                <form className="search__form">
                    <div className="search__bar-container">
                        <input className="search__bar-input"
                               onChange={this.handleChange}
                               type="search"
                               placeholder="Фильм" />
                        <input onClick={this.handleSubmit}
                               className="search__bar-submit"
                               type="submit"
                               value="&#8635;" />
                    </div>
                    <div className="search__switch-container">
                        <label className="search__switch">
                            <input type="checkbox" />
                            <span className="search__slider"></span>
                        </label>
                        <p className="search__switch-description">Короткометражки</p>
                    </div>
                </form>
            </section>
        )
    }
}
