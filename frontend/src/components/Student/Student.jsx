import React, { Component } from "react";
import {Link} from "react-router-dom";

import avatar from "../../images/avatar.jpg";
import "./Student.css";

export default class Student extends Component {
    render() {
        return (
            <section className="student">
                <article className="student__info">
                    <h2 className="student__info-title">Студент</h2>
                    <div className="student__info-container">
                        <p className="student__name">Данила</p>
                        <p className="student__stats">Разработчик, 26 лет</p>
                        <p className="student__bio">
                            Я родился в Новороссийске, живу в Москве, получил образование инженера.
                            У меня нет детей и я одинок. Я люблю слушать музыку, а ещё увлекаюсь тяжелой атлетикой.
                            Недавно начал кодить. С 2020 года работаю в ноу-нейм компаниях.
                            После того, как прошёл курс по веб-разработке, начал заниматься ерундой и ушёл в запой.
                        </p>
                        <Link className="student__github-link"
                              to="https://github.com/Fr0stFree"
                        >GitHub</Link>
                        <figure className="student__avatar"></figure>
                    </div>
                </article>
                <article className="student__portfolio">
                    <h2 className="student__portfolio-title">Портфолио</h2>
                    <ul className="student__portfolio-list">
                        <li className="student__portfolio-item">
                            <Link className="student__project-link"
                                  to="https://github.com/Fr0stFree/Website-Teammates"
                            >Статичный сайт<span className="student__project-link-arrow">↗</span></Link>

                        </li>
                        <li className="student__portfolio-item">
                            <Link className="student__project-link"
                                  to="https://github.com/Fr0stFree/Yandex-Frontend-Sprint-3"
                            >Адаптивный сайт<span className="student__project-link-arrow">↗</span></Link>
                        </li>
                        <li className="student__portfolio-item">
                            <Link className="student__project-link"
                                  to="https://github.com/Fr0stFree/Yandex-Frontend-Sprint-14"
                            >Одностраничное приложение<span className="student__project-link-arrow">↗</span></Link>
                        </li>
                    </ul>
                </article>
            </section>
        )
    }
}
