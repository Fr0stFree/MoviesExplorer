import React, { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import NotFound from "../NotFound/NotFound";
import Profile from "../Profile/Profile";
import Register from "../Auth/Register";
import Login from "../Auth/Login";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {
                name: "Жак-Ив Кусто",
                email: "fake@admin.com",
                isAuthenticated: true,
            },
        }
    }

    handleLogin = ({ email, password }) => {
        console.log(`Email: ${email} Password: ${password}`);
    }

    handleRegistration = ({ name, email, password }) => {
        console.log(`Name: ${name} Email: ${email} Password: ${password}`);
    }

    render() {
        return (
            <div className="page">
                <CurrentUserContext.Provider value={this.state.currentUser}>
                    <Header extraClass="page__header_none"/>
                    <div className="page__content">
                        <Routes>
                            <Route path="/me" element={<Profile />} />
                            <Route path="/signup" element={<Register onSubmit={this.handleLogin} />} />
                            <Route path="/signin" element={<Login onSubmit={this.handleRegistration} />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                    <Footer extraClass="page__footer_none"/>
                </CurrentUserContext.Provider>
            </div>
        );
    }
}
