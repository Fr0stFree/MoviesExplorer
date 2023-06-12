import React, { Component } from 'react';

import './Tooltip.css';

export default class Tooltip extends Component {
    render() {
        return (
            <div className={`tooltip${this.props.isOpen ? " tooltip_opened" : ""}`}>
                <div className="tooltip__container">
                    <button type="button"
                            onClick={this.props.onClose}
                            className="tooltip__close-button"
                            aria-label="Закрыть tooltip"></button>
                    <div className="tooltip__content">
                        <p className="tooltip__text">{this.props.message}</p>
                        <button className="tooltip__button"
                                onClick={this.props.onClose}
                        >Бывает</button>
                    </div>
                </div>
            </div>
        )
    }
}
