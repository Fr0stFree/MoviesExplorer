import React, { Component } from 'react';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import './Header.css';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            className: `header ${this.props.extraClass}`,
        }
    }

    render() {
        return (
            <header className={this.state.className}>
                <Logo />
                <Navigation />
            </header>
        )
    }
}
