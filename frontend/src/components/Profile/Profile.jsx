import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import Interface from "../Interface/Interface";
import Header from "../Header/Header";
import "./Profile.css";

export default class Profile extends Interface {
    static contextType = CurrentUserContext;

    get title() {
        return `Привет, ${this.context.name}`
    }

    get isLogoVisible() {
        return false
    }

    get submitButtonText() {
        return 'Редактировать'
    }

    get isSubmitButtonTransparent() {
        return true
    }

    get isPasswordFieldNeeded() {
        return false
    }

    get extraButtonLinkText() {
        return "Выйти из аккаунта"
    }

    get extraButtonRedirectTo() {
        return "/signin"
    }

    get isExtraButtonDanger() {
        return true
    }

    get isTitleCentered() {
        return true
    }

    get areExtraButtonsShallow() {
        return false
    }

    handleSubmit(event) {
        event.preventDefault()
        const email = this.state.fields.email.value
        const name = this.state.fields.name.value
        this.props.onSubmit({ email, name });
    }

    handleExtraButtonClick() {
        this.props.onExtraButtonClick();
    }

    render() {
        return (
            <>
                <Header />
                <main className="profile">{super.render()}</main>
            </>
        )
    }
}
