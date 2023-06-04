import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

import './Navigation.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export default class Navigation extends Component {
    static contextType = CurrentUserContext;

    get navigationBarForClient() {
        return (
            <ul className="navigation navigation_reversed">
                <li className="navigation__item navigation__item_style_button">
                    <NavLink to="/signin"
                             className="navigation__link navigation__link_style_button"
                    >Войти</NavLink>
                </li>
                <li className="navigation__item">
                    <NavLink to="/signup"
                             className="navigation__link"
                    >Регистрация</NavLink>
                </li>
            </ul>
        )
    }

    get navigationBarForAuthUser() {
        return (
            <ul className="navigation">
                <li className="navigation__item">
                    <NavLink to="/movies"
                             className="navigation__link">Фильмы</NavLink>
                </li>
                <li className="navigation__item">
                    <NavLink to="/saved-movies"
                             className="navigation__link">Сохранённые фильмы</NavLink>
                </li>
                <li className="navigation__item">
                    <NavLink to="/profile"
                             className="navigation__link">Профиль</NavLink>
                </li>
            </ul>
        )
    }

    render() {
        // const { isAuthenticated } = this.context;
        const isAuthenticated = false;
        return (
            <>
                {isAuthenticated ? this.navigationBarForAuthUser : this.navigationBarForClient}
            </>
        )
    }
}
