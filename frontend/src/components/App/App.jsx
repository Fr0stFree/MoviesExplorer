import React, { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import Landing from "../Landing/Landing";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Library from "../Library/Library";

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

    handleProfileUpdate = ({ email, name }) => {
        console.log(`Email: ${email} name: ${name}`);
    }

    handleLogout = () => {
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
