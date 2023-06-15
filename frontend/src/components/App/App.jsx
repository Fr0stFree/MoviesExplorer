import React, { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import Protected from "../Protected";
import MainApi from "../../utils/mainApi";
import Landing from "../Landing/Landing";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Library from "../Library/Library";
import Tooltip from "../Tooltip/Tooltip";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.mainApi = new MainApi();
        this.state = {
            isTooltipOpen: false,
            tooltipMessage: '',
            currentUser: {
                _id: '648ac4fd1f36a455e78a2d32',
                name: 'Jak',
                email: 'fake@gmal.com',
                isAuthenticated: Boolean(localStorage.getItem('token')),
            },
        }
    }

    componentDidMount = async () => {
        await this.handleAuthentication()
    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (this.state.currentUser.isAuthenticated !== prevState.currentUser.isAuthenticated) {
            try {
                await this.handleAuthentication();
            } catch (error) {
                this.openTooltip(error.message);
            }
        }
    }

    handleLogout = () => {
        localStorage.removeItem('token');
        this.setState({ currentUser: { isAuthenticated: false } });
    }

    handleLogin = async ({ email, password }) => {
        try {
            const { token } = await this.mainApi.login({ email, password });
            localStorage.setItem('token', token);
            this.setState({ currentUser: { isAuthenticated: true } });
        } catch (error) {
            this.openTooltip(error.message);
        }
    }

    handleAuthentication = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }
            const response = await this.mainApi.verifyToken(token);
            this.setState({ currentUser: { ...response, isAuthenticated: true } });
        } catch (error) {
            this.openTooltip(error.message);
        }
    }

    handleRegistration = async ({ name, email, password }) => {
        try {
            await this.mainApi.register({ name, email, password });
            await this.handleLogin({ email, password });
        } catch (error) {
            this.openTooltip(error.message);
        }
    }

    handleProfileUpdate = async ({ email, name }) => {
        try {
            const response = await this.mainApi.update({ email, name });
            this.setState({ currentUser: { ...response, isAuthenticated: true } });
            this.openTooltip('Changes have been made')
        } catch (error) {
            this.openTooltip(error.message);
        }
    }

    openTooltip = (message) => this.setState({ isTooltipOpen: true, tooltipMessage: message });

    render() {
        return (
            <div className="page">
                <CurrentUserContext.Provider value={this.state.currentUser}>
                    <Routes>
                        <Route path="/signup" element={<Register onSubmit={this.handleRegistration} />} />
                        <Route path="/signin" element={<Login onSubmit={this.handleLogin} />} />
                        <Route path="/profile" element={
                            <Protected navigateTo="/">
                                <Profile onSubmit={this.handleProfileUpdate}
                                         onExtraButtonClick={this.handleLogout} />
                            </Protected>} >
                        </Route>
                        <Route path="/movies" element={
                            <Protected navigateTo="/">
                                <Library onlySaved={false}
                                         onError={(message) => this.openTooltip(message)} />
                            </Protected>} >
                        </Route>
                        <Route path="/saved-movies" element={
                            <Protected navigateTo="/">
                                <Library onlySaved={true}
                                         onError={(message) => this.openTooltip(message)} />
                            </Protected>} >
                        </Route>
                        <Route path="/" element={<Landing />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Tooltip isOpen={this.state.isTooltipOpen}
                             message={this.state.tooltipMessage}
                             onClose={() => this.setState({ isTooltipOpen: false })} />
                </CurrentUserContext.Provider>
            </div>
        );
    }
}
