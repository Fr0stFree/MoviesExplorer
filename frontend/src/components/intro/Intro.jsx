import React, { Component } from 'react';

import './Intro.css';


export default class Intro extends Component {
    handleAnchorClick = (evt) => {
        evt.preventDefault();
        const anchor = evt.target.getAttribute('href')
        document.querySelector(anchor).scrollIntoView({ behavior: 'smooth' });
    }

    render() {
        return (
            <section className="intro">
                <h2 className="intro__title">Учебный проект студента<br/>факультета Веб-разработки.</h2>
                <ul className="intro__nav-list">
                    <li className="intro__nav-item">
                        <a className="intro__nav-link"
                           onClick={this.handleAnchorClick}
                           href="#about"
                        >О проекте</a>
                    </li>
                    <li className="intro__nav-item">
                        <a className="intro__nav-link"
                           onClick={this.handleAnchorClick}
                           href="#tech"
                        >Технологии</a>
                    </li>
                    <li className="intro__nav-item">
                        <a className="intro__nav-link"
                           onClick={this.handleAnchorClick}
                           href="#student"
                        >Студент</a>
                    </li>
                </ul>
            </section>
        )
    }
}


