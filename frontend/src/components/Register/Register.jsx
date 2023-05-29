import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../Navigation/Navigation.css'

export default class Auth extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			password: '',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange = event => this.setState({[event.target.name]: event.target.value})

	handleSubmit(event) {
		event.preventDefault();
		const { name, email, password } = this.state;
		this.props.onSubmit(password, email);
	}

	render() {
		return (
			<div className="register">
				<h2 className="register__title">Добро пожаловать!</h2>
				<form className="register_form"
							onSubmit={this.props.onSubmit}
							name={`${this.props.name}-form`}>
					<input id="form-name"
								 type="text"
								 value={this.state.name}
								 onChange={this.handleInputChange}
								 className="register__input register__input_type_text"
								 name="email"
								 placeholder="Email"
								 required />
					<input id="form-email"
								 type="email"
								 value={this.state.email}
								 onChange={this.handleInputChange}
								 className="register__input register__input_type_text"
								 name="email"
								 placeholder="Email"
								 required />
					<input id="form-password"
								 type="password"
								 value={this.state.password}
								 onChange={this.handleInputChange}
								 className="register__input register__input_type_text"
								 name="password"
								 placeholder="Пароль"
								 required />
					<button type="submit"
									onClick={this.handleSubmit}
									className="button register__input register__input_type_submit"
					>Зарегистрироваться</button>
				</form>
				<p>Уже зарегистрированы?
					<Link className={"navigation__link"}
								to="/signin"
					>Войти</Link>
				</p>
			</div>
		);
	}
}
