import {NavLink} from "react-router-dom";
import React, {Component} from "react";

import profile from "../../images/profile.svg"
import './Aside.css';

export default class Aside extends Component {
    constructor(props) {
        super(props);
        this.asideRef = React.createRef();
    }

    closeAside = () => {
        this.asideRef.current.classList.remove('aside__menu_opened');
        this.props.onClose();
    }

    render() {
        return (
            <aside className={`aside ${!this.props.isOpen ? 'aside_hidden' : ''}`}>
                <div className={`aside__menu ${this.props.isOpen ? 'aside__menu_opened' : ''}`}
                     ref={this.asideRef}>
                    <button className="aside__close-button"
                            onClick={this.closeAside}>
                    </button>
                    <ul className="aside__menu-list">
                        <li className="aside__menu-item">
                            <NavLink to="/"
                                     className="aside__link"
                            >Главная</NavLink>
                        </li>
                        <li className="aside__menu-item">
                            <NavLink to="/movies"
                                     className="aside__link"
                            >Фильмы</NavLink>
                        </li>
                        <li className="aside__menu-item">
                            <NavLink to="/saved-movies"
                                     className="aside__link"
                            >Сохраненные фильмы</NavLink>
                        </li>
                        <li className="aside__menu-item">
                            <NavLink to="/profile"
                                     className="aside__link">
                                <img src={profile} alt="Профиль" />
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </aside>
        )
    }
}

