import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
// import profile from "../../images/profile.svg";

export default class Navigation extends Component {
  static contextType = CurrentUserContext;


  linkClassName = ({ isActive }) => {
    let linkClass = "navigation__link";
    if (isActive) {
      linkClass += " navigation__link_active";
    }
    return linkClass;
  }

  navigationBarForClient = () => {
    return (
      <ul className={"navigation"}>
        <li className={"navigation__item"}>
          <NavLink to="/signup"
                   className={this.linkClassName}>Регистрация</NavLink>
        </li>
        <li className={"navigation__item"}>
          <NavLink to="/signin"
                   className={this.linkClassName}>Войти</NavLink>
        </li>
      </ul>
    )
  }

  navigationBarForAuthUser = () => {
    return (
      <ul className={"navigation"}>
        <li className={"navigation__item"}>
          <NavLink to="/movies"
                   className={this.linkClassName}>Фильмы</NavLink>
        </li>
        <li className={"navigation__item"}>
          <NavLink to="/saved-movies"
                   className={this.linkClassName}>Сохранённые фильмы</NavLink>
        </li>
        <li className={"navigation__item navigation__corner-item"}>
          <NavLink to="/profile"
                   className={this.linkClassName}>Профиль</NavLink>
        </li>
      </ul>
    )
  }

  render() {
    const { isAuthenticated } = this.context;
    return (
      <>
        {isAuthenticated ? this.navigationBarForAuthUser() : this.navigationBarForClient()}
      </>
    )
  }
}
