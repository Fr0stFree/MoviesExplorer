import React, {Component} from "react";
import {Navigate} from "react-router-dom";

export default class Protected extends Component {
    render() {
        return (
            this.props.condition ? this.props.children : <Navigate to={this.props.navigateTo} />
        )
    }
}
