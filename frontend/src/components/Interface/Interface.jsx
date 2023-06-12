import React, { Component } from 'react';

import CurrentUserContext from "../../contexts/CurrentUserContext";
import Logo from "../Logo/Logo";
import FormField from "../FormField/FormField";
import './Interface.css';
import {Link} from "react-router-dom";


export default class Interface extends Component {
    static contextType = CurrentUserContext;

    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.state = {
            isFormValid: false,
            errorMessage: "",
            fields: {
                name: new Field({ name: "name", label: "Имя", type: "text" }),
                email: new Field({ name: "email", label: "E-mail", type: "email" }),
                password: new Field({ name: "password", label: "Пароль", type: "password" }),
            },
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleExtraButtonClick = this.handleExtraButtonClick.bind(this);
    }

    handleInputChange = (event) => {
        const fieldKey = event.target.name
        const field = this.state.fields[fieldKey]

        field.value = event.target.value
        field.isValid = this.form.current.elements[fieldKey].validity.valid
        field.isValid ? field.errorMessage = "" : field.errorMessage = this.form.current.elements[fieldKey].validationMessage
        this.setState(prevState => ({ isFormValid: this.form.current.checkValidity(), fields: { ...prevState.fields, [fieldKey]: field }}))
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
                                className={`user-interface__submit-button ${this.isSubmitButtonTransparent ? "user-interface__submit-button_transparent" : ""}`}
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

    get isSubmitButtonTransparent() {
        return false
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
    constructor({ name, label, extraLabel = "", type, value = "", isValid = false, errorMessage = "" }) {
        this.name = name
        this.label = label
        this.extraLabel = extraLabel
        this.type = type
        this.value = value
        this.isValid = isValid
        this.errorMessage = errorMessage
    }
}
