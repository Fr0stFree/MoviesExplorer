import React, { Component } from "react";

import './About.css';

export default class About extends Component {
    render() {
        return (
            <section className="about">
                <h2 className="about__title">О проекте</h2>
                <ul className="about__task-list">
                    <li className="about__task">
                        <h3 className="about__task-title">
                            Дипломный проект включал 5 этапов
                        </h3>
                        <p className="about__task-text">
                            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                        </p>
                    </li>
                    <li className="about__task">
                        <h3 className="about__task-title">
                            На выполнение диплома ушло 5 недель
                        </h3>
                        <p className="about__task-text">
                            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                        </p>
                    </li>
                </ul>
                <div className="about__progress">
                    <div className="about__progress-bar about__progress-bar_type_backend">1 неделя</div>
                    <div className="about__progress-bar about__progress-bar_type_frontend">4 недели</div>
                    <p className="about__progress-title">Back-end</p>
                    <p className="about__progress-title">Front-end</p>
                </div>
            </section>
        )
    }
}

