import React, {Component} from 'react';
import {Link} from "react-router-dom";

import './NotFound.css';

export default class NotFound extends Component {
    render() {
        return (
            <main className="not-found">
                <section className="not-found__container">
                    <h1 className="not-found__title">404</h1>
                    <p className="not-found__subtitle">Страница не найдена</p>
                    <Link className="not-found__go-back-link" to="/">Назад</Link>
                </section>
            </main>
        )
    }
}
