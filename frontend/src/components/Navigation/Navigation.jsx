import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.css';
import profile from "../../images/profile.svg";

export default class Navigation extends Component {
  render() {
    return (
      <ul className={"navigation"}>
        <li>
          <NavLink to="/movies"
                   className={"navigation__link"}
                   activeClassName={"navigation__link_active"}>Фильмы</NavLink>
        </li>
        <li>
          <NavLink to="/saved-movies"
                   className={"navigation__link"}
                   activeClassName={"navigation__link_active"}>Сохранённые фильмы</NavLink>
        </li>
        <NavLink to={"/profile"}
                 className={"navigation__link navigation__link_profile"}
                 activeClassName={"navigation__link_active"}>
          <img src={profile} alt="Профиль" className={"navigation__profile"} />
        </NavLink>
      </ul>
    )
  }
}