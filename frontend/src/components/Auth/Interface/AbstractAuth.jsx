import React, { Component } from 'react';

import Logo from "../../Logo/Logo";
import './AbstractAuth.css';

export default class AbstractAuth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    get title() {
        return null
    }

    get buttonText() {
        return null
    }

    get buttonExtraText() {
        return null
    }

    get buttonExtraLink() {
        return null
    }

    get nameElement() {
        return (
            <div className="abstract-auth__input-container">
                <label htmlFor="abstract-auth-name"
                       className="abstract-auth__label">Имя</label>
                <input id="abstract-auth-name"
                       type="text"
                       value={this.state.name}
                       onChange={this.handleInputChange}
                       className="abstract-auth__input abstract-auth__input_type_text"
                       name="name"
                       required/>
                <p id="babstract-auth-name-error"
                   className="abstract-auth__error">error</p>
            </div>
        )
    }

    get emailElement() {
        return (
            <div className="abstract-auth__input-container">
                <label htmlFor="abstract-auth-email"
                       className="abstract-auth__label">E-mail</label>
                <input id="abstract-auth-email"
                       type="email"
                       value={this.state.email}
                       onChange={this.handleInputChange}
                       className="abstract-auth__input abstract-auth__input_type_text"
                       name="email"

                       required />
                <p id="abstract-auth-email-error"
                   className="abstract-auth__error">error</p>
            </div>
        )
    }

    get passwordElement() {
        return (
            <div className="abstract-auth__input-container">
                <label htmlFor="abstract-auth-password"
                       className="abstract-auth__label">Пароль</label>
                <input id="abstract-auth-password"
                       type="password"
                       value={this.state.password}
                       onChange={this.handleInputChange}
                       className="abstract-auth__input abstract-auth__input_type_text"
                       name="password"
                       required />
                <p id="abstract-auth-password-error"
                   className="abstract-auth__error">error</p>
            </div>
        )
    }

    handleInputChange = event => this.setState({[event.target.name]: event.target.value})

    render() {
        return (
            <section className="abstract-auth">
                <Logo />
                <h2 className="abstract-auth__title">{this.title}</h2>
                <form className="abstract-auth__form"
                      onSubmit={this.handleSubmit}>
                    {this.nameElement}
                    {this.emailElement}
                    {this.passwordElement}
                    <button type="submit"
                            className="abstract-auth__submit-button"
                    >{this.buttonText}</button>
                </form>
                <p className="abstract-auth__text">
                    {this.buttonExtraText}&nbsp;{this.buttonExtraLink}
                </p>
            </section>
        );
    }
}
