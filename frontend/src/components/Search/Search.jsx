import React, { Component } from 'react';

import './Search.css';


export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            onlyShort: false,
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);

    }

    render() {
        return (
            <section className="search">
                <form className="search__form">
                    <div className="search__bar-container">
                        <input className="search__bar-input"
                               value={this.state.query}
                               onChange={(event) => this.setState({ query: event.target.value })}
                               type="search"
                               placeholder="Фильм"
                               required />
                        <input onClick={this.handleSubmit}
                               className="search__bar-submit"
                               type="submit"
                               value="&#8635;" />
                    </div>
                    <div className="search__switch-container">
                        <label className="search__switch">
                            <input type="checkbox"
                                   value={this.state.onlyShort}
                                   onChange={() => this.setState({ onlyShort: !this.state.onlyShort })}
                            />
                            <span className="search__slider"></span>
                        </label>
                        <p className="search__switch-description">Короткометражки</p>
                    </div>
                </form>
            </section>
        )
    }
}
