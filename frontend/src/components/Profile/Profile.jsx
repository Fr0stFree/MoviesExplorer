import React, { Component } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import TextLink from "../TextLink/TextLink";
import './Profile.css';

export default class Profile extends Component {
    static contextType = CurrentUserContext;

    render() {
        console.log('render')
        return (
            <section className="profile">
                <h2 className="profile__title">Привет, {this.context.name}!</h2>
                <div className="profile__property-container">
                    <span className="profile__property-key">Имя</span>
                    <span className="profile__property-value"
                    >{this.context.name}</span>
                </div>
                <div className="profile__property-container">
                    <span className="profile__property-key">E-mail</span>
                    <span className="profile__property-value"
                    >{this.context.email}</span>
                </div>
                <div className="profile__button-group">
                    <button className="profile__button profile__button_type_edit"
                            type="button"
                            aria-label="Редактировать профиль"
                            onClick={this.props.onEditProfile}>
                        Редактировать профиль
                    </button>
                    <button className="profile__button profile__button_type_logout"
                            type="button"
                            aria-label="Выйти из аккаунта"
                            onClick={this.props.onLogout}>
                        Выйти из аккаунта
                    </button>
                </div>
            </section>
        );
    }
}
