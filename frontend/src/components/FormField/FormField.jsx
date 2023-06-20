import React, { Component } from 'react';

import './FormField.css';

export default class FormField extends Component {
    render() {
        return (
            <div className="form-field">
                <div className="form-field__label-group">
                    <label htmlFor={`form-input-${this.props.name}`}
                           className={`form-field__label ${this.props.isShallow ? "form-field__label_type_shallow" 
                                                                                : "form-field__label_type_explicit"}`}
                    >{this.props.label}
                    </label>
                    {!this.props.isShallow &&
                        <span className="form-field__label form-field__label_type_explicit">{this.props.extraLabel}</span>
                    }
                </div>
                <input id={`form-input-${this.props.name}`}
                       type={this.props.type}
                       value={this.props.inputValue}
                       onChange={this.props.onChange}
                       className="form-field__input"
                       name={this.props.name}
                       required />
                <span className={`form-field__error ${!this.props.isValid ? "form-field__error_active" : ""}`}>{this.props.errorMessage}
                </span>
            </div>
        )
    }
}
