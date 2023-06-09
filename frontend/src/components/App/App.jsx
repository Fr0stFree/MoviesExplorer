import React, { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import { BACKEND_URL } from '../../config';
import MainApi from "../../utils/MainApi";
import Landing from "../Landing/Landing";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Library from "../Library/Library";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.mainApi = new MainApi({
            baseUrl: BACKEND_URL,
            headers: {
                "Content-Type": "application/json"
            }
        })
        this.state = {
            currentUser: {
                name: "Жак-Ив Кусто",
                email: "fake@admin.com",
                isAuthenticated: false,
            },
        }
    }

    handleProfileUpdate = ({ email, name }) => {
        console.log(`Email: ${email} name: ${name}`);
    }

    handleLogout = () => {
    }

    handleLogin = async ({ email, password }) => {
        const response = await this.mainApi.login({ email, password })
    }

    handleRegistration = async ({ name, email, password }) => {
        const response = await this.mainApi.register({ email, password })
    }

    render() {
        return (
            <div className="page">
                <CurrentUserContext.Provider value={this.state.currentUser}>
                    <Routes>
                        <Route path="/profile" element={<Profile onSubmit={this.handleProfileUpdate} />} />
                        <Route path="/signup" element={<Register onSubmit={this.handleRegistration} />} />
                        <Route path="/signin" element={<Login onSubmit={this.handleLogin} />} />
                        <Route path="/movies" element={<Library onlySaved={false} /> } />
                        <Route path="/saved-movies" element={<Library onlySaved={true}/> } />
                        <Route path="/" element={<Landing />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </CurrentUserContext.Provider>
            </div>
        );
    }
}
