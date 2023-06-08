import React, { Component } from 'react';

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Intro from "../intro/Intro";
import About from "../About/About";
import Tech from "../Tech/Tech";
import Student from "../Student/Student";
import './Landing.css';

export default class Landing extends Component {
    render() {
        return (
            <>
                <Header />
                <main className="landing">
                    <Intro />
                    <About />
                    <Tech />
                    <Student />
                </main>
                <Footer />
            </>
        )
    }
}
