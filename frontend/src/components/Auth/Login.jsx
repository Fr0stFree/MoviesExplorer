import AbstractAuth from "./Interface/AbstractAuth"
import TextLink from "../TextLink/TextLink";

export default class Login extends AbstractAuth {
    get title() {
        return 'Добро пожаловать!'
    }

    get buttonText() {
        return 'Войти'
    }

    get buttonExtraText() {
        return 'Уже зарегистрированы?'
    }

    get buttonExtraLink() {
        return <TextLink to="/signup" text="Зарегистрироваться"/>
    }

    get nameElement() {
        return null
    }

    handleSubmit(event) {
        super.handleSubmit(event);
        const {email, password} = this.state;
        this.props.onSubmit(password, email);
    }
}
