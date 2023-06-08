import React, { Component } from 'react'
import './Preloader.css'

export default class Preloader extends Component {
    render() {
        return (
            <div className="preloader">
                <div className="preloader__container">
                    <span className="preloader__round"></span>
                </div>
            </div>
        )
    }
}
