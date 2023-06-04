import React, { Component } from 'react';

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Intro from "../intro/Intro";
import About from "../About/About";
import './Landing.css';

export default class Landing extends Component {
    render() {
        return (
            <main className="landing">
                <Header isVisible={true}/>
                <Intro />
                <About />
                <Footer isVisible={true}/>
            </main>
        )
    }
}
