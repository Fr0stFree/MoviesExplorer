import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import Interface from "../Interface/Interface";
import Header from "../Header/Header";
import "./Profile.css";


export default class Profile extends Interface {
    static contextType = CurrentUserContext;

    componentDidMount() {
        this.prevContext = this.context
        this.setState({
            isFormValid: false,
            fields: {
                email: { ...this.state.fields.email, value: this.context.email, isValid: true },
                name: { ...this.state.fields.name, value: this.context.name, isValid: true },
            }
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(this.prevContext) !== JSON.stringify(this.context)) {
            this.prevContext = this.context;
            this.setState({
                isFormValid: false,
                fields: {
                    email: { ...this.state.fields.email, value: this.context.email, isValid: true },
                    name: { ...this.state.fields.name, value: this.context.name, isValid: true },
                }
            });
        }
    }

    handleInputChange = (event) => {
        const { email, name } = this.state.fields;
        const field = this.state.fields[event.target.name];
        field.value = event.target.value
        if (email.value === this.context.email && name.value === this.context.name) {
            field.errorMessage = "Данные должны отличаться от текущих";
            field.isValid = false;
            return super.updateFormValidity();
        }
        super.handleInputChange(event);

    }

    handleSubmit(event) {
        event.preventDefault();
        const email = this.state.fields.email.value;
        const name = this.state.fields.name.value;
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
        delete this.state.fields.password;
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
