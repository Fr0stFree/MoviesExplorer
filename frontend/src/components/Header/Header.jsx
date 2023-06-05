import React, { Component } from 'react';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import './Header.css';

export default class Header extends Component {
    render() {
        return (
            <header className="header">
                <Logo />
                <Navigation />
            </header>
        )
    }
}
