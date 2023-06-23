import React, { Component } from 'react';
import {Link} from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import Logo from "../Logo/Logo";
import FormField from "../FormField/FormField";
import {EMAIL_PATTERN} from "../../utils/constants";
import './Interface.css';


export default class Interface extends Component {
    static contextType = CurrentUserContext;

    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.state = {
            isFormValid: false,
            fields: {
                name: new Field({ name: "name", label: "Имя", type: "text" }),
                email: new Field({ name: "email", label: "E-mail", type: "email", pattern: EMAIL_PATTERN }),
                password: new Field({ name: "password", label: "Пароль", type: "password" }),
            },
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleExtraButtonClick = this.handleExtraButtonClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const field = this.state.fields[event.target.name]
        field.isValid = true;
        field.errorMessage = "";
        field.value = event.target.value

        if (!this.form.current.elements[field.name].validity.valid) {
            field.isValid = false;
            field.errorMessage = this.form.current.elements[field.name].validationMessage;
        }
        if (field.pattern && !field.value.match(field.pattern)) {
            field.isValid = false;
            field.errorMessage = `Пожалуйста, введите валидный ${field.name}.`
        }
        this.updateFormValidity();
    }

    updateFormValidity() {
        const isFormValid = Object.values(this.state.fields).every(field => field.isValid);
        this.setState(({ isFormValid, ...this.state.fields }));
    }

    render() {
        return (
            <section className="user-interface">
                {this.isLogoVisible && <Logo />}
                <h2 className={`user-interface__title ${this.isTitleCentered ? "user-interface__title_centered" : ""}`}
                >{this.title}</h2>
                <form className="user-interface__form"
                      onSubmit={this.handleSubmit}
                      ref={this.form}>
                    {this.isNameFieldNeeded &&
                        <FormField type={this.state.fields.name.type}
                                   name={this.state.fields.name.name}
                                   onChange={this.handleInputChange}
                                   inputValue={this.state.fields.name.value}
                                   errorMessage={this.state.fields.name.errorMessage}
                                   isValid={this.state.fields.name.isValid}
                                   label={this.state.fields.name.label}
                                   extraLabel={this.context.name}
                                   isShallow={this.areExtraButtonsShallow}
                        />
                    }
                    {this.isEmailFieldNeeded &&
                        <FormField type={this.state.fields.email.type}
                                   name={this.state.fields.email.name}
                                   onChange={this.handleInputChange}
                                   inputValue={this.state.fields.email.value}
                                   errorMessage={this.state.fields.email.errorMessage}
                                   isValid={this.state.fields.email.isValid}
                                   label={this.state.fields.email.label}
                                   extraLabel={this.context.email}
                                   isShallow={this.areExtraButtonsShallow}
                        />
                    }
                    {this.isPasswordFieldNeeded &&
                        <FormField type={this.state.fields.password.type}
                                   name={this.state.fields.password.name}
                                   onChange={this.handleInputChange}
                                   inputValue={this.state.fields.password.value}
                                   errorMessage={this.state.fields.password.errorMessage}
                                   isValid={this.state.fields.password.isValid}
                                   label={this.state.fields.password.label}
                                   isShallow={this.areExtraButtonsShallow}
                        />
                    }
                    <div className="user-interface__button-container">
                        <button type="submit"
                                disabled={!this.state.isFormValid}
                                className="user-interface__submit-button"
                        >{this.submitButtonText}</button>
                        <p className="user-interface__extra">{this.extraButtonText}&ensp;
                            <Link className={`user-interface__extra-link ${this.isExtraButtonDanger ? " user-interface__extra-link_style_danger" : ""}`}
                                  onClick={this.handleExtraButtonClick}
                                  to={this.extraButtonRedirectTo}>{this.extraButtonLinkText}
                            </Link>
                        </p>
                    </div>
                </form>
            </section>
        );
    }

    handleSubmit(event) {
        return null
    }

    handleExtraButtonClick() {
        return null
    }

    get title() {
        return ""
    }

    get isTitleCentered() {
        return false
    }

    get isLogoVisible() {
        return true
    }

    get isNameFieldNeeded() {
        return true
    }

    get isEmailFieldNeeded() {
        return true
    }

    get isPasswordFieldNeeded() {
        return true
    }

    get submitButtonText() {
        return ""
    }

    get extraButtonText() {
        return ""
    }

    get extraButtonLinkText() {
        return ""
    }

    get extraButtonRedirectTo() {
        return ""
    }

    get isExtraButtonDanger() {
        return false
    }

    get areExtraButtonsShallow() {
        return true
    }
}

class Field {
    constructor({ name, label, extraLabel = "", type, value = "", isValid = false, errorMessage = "", pattern = null }) {
        this.name = name
        this.label = label
        this.extraLabel = extraLabel
        this.type = type
        this.value = value
        this.isValid = isValid
        this.errorMessage = errorMessage
        this.pattern = pattern
    }
}
