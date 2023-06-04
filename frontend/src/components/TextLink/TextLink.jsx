import React, { Component } from 'react';

import './TextLink.css';
import { Link } from "react-router-dom";

export default class TextLink extends Component {
    render() {
        return <Link className="text__link" to={this.props.to}>{this.props.text}</Link>
    }
}
