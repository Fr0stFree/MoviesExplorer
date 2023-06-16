import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import Interface from "../Interface/Interface";
import Header from "../Header/Header";
import "./Profile.css";


export default class Profile extends Interface {
    static contextType = CurrentUserContext;

    componentDidMount() {
        this.setState({
            isFormValid: false,
            fields: {
                email: { ...this.state.fields.email, value: this.context.email },
                name: { ...this.state.fields.name, value: this.context.name }
            }
        })
    }

    handleInputChange = (event) => {
        super.handleInputChange(event)
        const { email, name } = this.state.fields
        if (email.value === this.context.email && name.value === this.context.name) {
            const errorMessage = "Данные должны отличаться от текущих"
            this.setState({
                fields: {
                    ...this.state.fields,
                    email: { ...email, isValid: false, errorMessage },
                    name: { ...name, isValid: false, errorMessage }
                },
                isFormValid: false
            })
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        const email = this.state.fields.email.value
        const name = this.state.fields.name.value
        this.props.onSubmit({ email, name });
        this.setState({ isFormValid: false })
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

    get title() {
        return `Привет, ${this.context.name}`
    }

    get isLogoVisible() {
        return false
    }

    get submitButtonText() {
        return 'Редактировать'
    }

    get isPasswordFieldNeeded() {
        return false
    }

    get extraButtonLinkText() {
        return "Выйти из аккаунта"
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
}
