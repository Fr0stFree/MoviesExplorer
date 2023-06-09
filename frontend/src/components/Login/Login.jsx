import React from "react";

import Interface from "../Interface/Interface";
import "./Login.css";

export default class Login extends Interface {
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
        const email = this.state.fields.email.value
        const password = this.state.fields.password.value
        this.props.onSubmit({ email, password });
    }

    render() {
        return (
            <main className="login">
                {super.render()}
            </main>
        )
    }
}
