import React, { Component } from 'react';

import Navigation from '../Navigation/Navigation';
import './Header.css';

export default class Header extends Component {
    render() {
        return (
            <header className="header">
                <Navigation />
            </header>
        )
    }
}
