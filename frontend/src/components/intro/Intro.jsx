import React, { Component } from 'react';

import './Intro.css';
import { Link } from "react-router-dom";


export default class Intro extends Component {
    render() {
        return (
            <section className="intro">
                <h2 className="intro__title">Учебный проект студента<br/>факультета Веб-разработки.</h2>
                <ul className="intro__nav-list">
                    <li className="intro__nav-item">
                        <Link className="intro__nav-link" to="#">О проекте</Link>
                    </li>
                    <li className="intro__nav-item">
                        <Link className="intro__nav-link" to="#">Технологии</Link>
                    </li>
                    <li className="intro__nav-item">
                        <Link className="intro__nav-link" to="#">Студент</Link>
                    </li>
                </ul>
            </section>
        )
    }
}


