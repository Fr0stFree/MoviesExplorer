import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import Logo from "../Logo/Logo";
import profile from "../../images/profile.svg"
import './Navigation.css';
import Aside from "../Aside/Aside";

export default class Navigation extends Component {
    static contextType = CurrentUserContext;

    constructor(props) {
        super(props);
        this.state = {
            isAsideOpen: false,
        }
    }


    closeAsideMenu = () => this.setState({ isAsideOpen: false })

    openAsideMenu = () => this.setState({ isAsideOpen: true })


    get navigationBarForClient() {
        return (
            <ul className="navigation__list navigation__list_reversed">
                <li className="navigation__item">
                    <NavLink to="/signup"
                             className="navigation__link"
                    >Регистрация</NavLink>
                </li>
                <li className="navigation__item navigation__item_style_button">
                    <NavLink to="/signin"
                             className="navigation__link navigation__link_style_button"
                    >Войти</NavLink>
                </li>
            </ul>
        )
    }

    get navigationBarForAuthUser() {
        return (
            <ul className="navigation__list">
                <li className="navigation__item">
                    <NavLink to="/movies"
                             className="navigation__link">Фильмы</NavLink>
                </li>
                <li className="navigation__item">
                    <NavLink to="/saved-movies"
                             className="navigation__link">Сохранённые фильмы</NavLink>
                </li>
                <li className="navigation__item navigation__item_type_profile">
                    <NavLink to="/profile"
                             className="navigation__link">
                        <img src={profile}
                             alt="Профиль" />
                    </NavLink>
                </li>
            </ul>
        )
    }

    render() {
        // const { isAuthenticated } = this.context;
        // for testing purposes
        let isAuthenticated = true
        if (window.location.href.endsWith('/')) {
            isAuthenticated = false
        }

        return (
            <nav className="navigation">
                <Logo />
                <Aside onClose={this.closeAsideMenu}

                       isOpen={this.state.isAsideOpen} />
                <button className="navigation__item navigation__dropdown-menu-button"
                        onClick={this.openAsideMenu}>
                </button>
                {isAuthenticated ? this.navigationBarForAuthUser
                                 : this.navigationBarForClient}
            </nav>
        )
    }
}
