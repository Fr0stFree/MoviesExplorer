import { Link } from 'react-router-dom';

import React, { Component } from 'react';
import logo from '../../images/header-logo.svg';
import './Logo.css';

export default class Logo extends Component {
    render() {
        return (
            <Link to="/" className="logo" >
                <img src={logo} alt="Логотип" />
            </Link>
        )
    }
}
