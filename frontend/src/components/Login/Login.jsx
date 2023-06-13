import React from "react";

import Interface from "../Interface/Interface";
import "./Login.css";
import {Navigate} from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default class Login extends Interface {
    static contextType = CurrentUserContext;

    get title() {
        return 'Рады видеть!'
    }

    get submitButtonText() {
        return 'Войти'
    }

    get extraButtonText() {
        return "Еще не зарегистрированы?"
    }

    get extraButtonLinkText() {
        return "Регистрация"
    }

    get extraButtonRedirectTo() {
        return "/signup"
    }

    get isNameFieldNeeded() {
        return false
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log(process.env)
        const email = this.state.fields.email.value
        const password = this.state.fields.password.value
        this.props.onSubmit({ email, password });
    }

    render() {
        return (
          this.context.isAuthenticated ? <Navigate to="/profile" replace={true} /> : <main className="login">{super.render()}</main>
        )
    }
}
