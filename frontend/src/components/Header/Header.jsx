import React, { Component } from 'react';

import logo from '../../images/header-logo.svg';
import Navigation from '../Navigation/Navigation';
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <header className={"header"}>
        <img src={logo} alt="Логотип" className={"header__logo"} />
        <Navigation />
      </header>
    )
  }
}
