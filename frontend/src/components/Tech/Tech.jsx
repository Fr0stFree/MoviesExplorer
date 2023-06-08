import React, { Component } from "react";

import "./Tech.css"
import {Link} from "react-router-dom";

export default class Tech extends Component {
    render() {
        return (
            <section className="tech" id="tech">
                <h2 className="tech__title">Технологии</h2>
                <h3 className="tech__subtitle">7 технологий</h3>
                <p className="tech__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className="tech__tech-list">
                    <li className="tech__tech-item">
                        <Link className="tech__tech-link"
                              target="_blank"
                              to="https://developer.mozilla.org/ru/docs/Web/HTML"
                        >HTML</Link>
                    </li>
                    <li className="tech__tech-item">
                        <Link className="tech__tech-link"
                              target="_blank"
                              to="https://developer.mozilla.org/en-US/docs/Web/CSS"
                        >CSS</Link>
                    </li>
                    <li className="tech__tech-item">
                        <Link className="tech__tech-link"
                              target="_blank"
                              to="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                        >JS</Link>
                    </li>
                    <li className="tech__tech-item">
                        <Link className="tech__tech-link"
                              target="_blank"
                              to="https://react.dev/"
                        >React</Link>
                    </li>
                    <li className="tech__tech-item">
                        <Link className="tech__tech-link"
                              target="_blank"
                              to="https://git-scm.com/"
                        >Git</Link>
                    </li>
                    <li className="tech__tech-item">
                        <Link className="tech__tech-link"
                              target="_blank"
                              to="https://expressjs.com/"
                        >Express.js</Link>
                    </li>
                    <li className="tech__tech-item">
                        <Link className="tech__tech-link"
                              target="_blank"
                              to="https://www.mongodb.com/"
                        >mongoDB</Link>
                    </li>
                </ul>
            </section>
        )
    }
}
