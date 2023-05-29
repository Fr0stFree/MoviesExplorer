import React, { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import PageNotFound from "../PageNotFound/PageNotFound";
import Register from "../Register/Register";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Жак-Ив Кусто", isAuthenticated: true },
    }
  }

  render() {
    return (
      <div className="page">
        <CurrentUserContext.Provider value={this.state.currentUser}>
          <Header />
            <Routes>
              <Route path="/signup" element={<Register />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          <Footer />
        </CurrentUserContext.Provider>
      </div>
    );
  }
}
