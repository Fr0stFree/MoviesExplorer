import React, {Component} from "react";
import {Navigate} from "react-router-dom";

import CurrentUserContext from "../contexts/CurrentUserContext";

export default class Protected extends Component {
    static contextType = CurrentUserContext;

    render() {
        return (
            this.context.isAuthenticated ? this.props.children : <Navigate to={this.props.navigateTo} />
        )
    }
}
