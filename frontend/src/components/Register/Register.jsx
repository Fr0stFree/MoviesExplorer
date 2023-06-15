import React from "react";

import Interface from "../Interface/Interface";
import "./Register.css"
import CurrentUserContext from "../../contexts/CurrentUserContext";
import {Navigate} from "react-router-dom";

export default class Register extends Interface {
    static contextType = CurrentUserContext;

    get title() {
        return 'Добро пожаловать!'
    }

    get submitButtonText() {
        return 'Зарегистрироваться'
    }

    get extraButtonText() {
        return "Уже зарегистрированы?"
    }

    get extraButtonLinkText() {
        return "Войти"
    }

    get extraButtonRedirectTo() {
        return "/signin"
    }

    handleSubmit(event) {
        event.preventDefault()
        const name = this.state.fields.name.value
        const email = this.state.fields.email.value
        const password = this.state.fields.password.value
        this.props.onSubmit({ email, name, password });

    }

    render() {
        return (
          this.context.isAuthenticated ? <Navigate to="/movies" replace={true} /> : <main className="register">{super.render()}</main>
        )
    }
}
