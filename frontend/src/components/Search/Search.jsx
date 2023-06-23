import React, { Component } from 'react';

import './Search.css';


export default class Search extends Component {

    render() {
        return (
            <section className="search">
                <form className="search__form">
                    <div className="search__bar-container">
                        <input className="search__bar-input"
                               value={this.props.query}
                               onChange={(event) => this.props.onChange(event.target.value)}
                               type="search"
                               minLength="1"
                               placeholder="Фильм"
                               required />
                        <input onClick={this.props.onSubmit}
                               className="search__bar-submit"
                               type="submit"
                               disabled={this.props.isDisabled}
                               value="&#8635;" />
                    </div>
                    <div className="search__switch-container">
                        <label className="search__switch">
                            <input type="checkbox"
                                   checked={this.props.onlyShort}
                                   onChange={(event) => this.props.onToggle(event.target.checked)} />
                            <span className="search__slider"></span>
                        </label>
                        <p className="search__switch-description">Короткометражки</p>
                    </div>
                </form>
            </section>
        )
    }
}
