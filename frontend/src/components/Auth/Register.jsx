import AbstractAuth from "./Interface/AbstractAuth";
import TextLink from "../TextLink/TextLink";

export default class Register extends AbstractAuth {
    get title() {
        return 'Добро пожаловать!'
    }

    get buttonText() {
        return 'Зарегистрироваться'
    }

    get buttonExtraText() {
        return 'Уже зарегистрированы?'
    }

    get buttonExtraLink() {
        return <TextLink to="/signin" text="Войти"/>
    }

    handleSubmit(event) {
        super.handleSubmit(event);
        const {name, email, password} = this.state;
        this.props.onSubmit(name, password, email);
    }
}
