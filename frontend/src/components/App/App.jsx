import React, { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import PageNotFound from "../PageNotFound/PageNotFound";

export default class App extends Component {
  render() {
    return (
      <div className="page">
        <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        <Footer />
      </div>
    );
  }
}