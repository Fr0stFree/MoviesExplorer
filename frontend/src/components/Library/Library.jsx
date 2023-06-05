import React, { Component } from 'react';

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Search from "../Search/Search"
import Movies from "../Movies/Movies";
import './Library.css';


export default class Library extends Component {
    render() {
        return (
            <main className="library">
                <Header />
                <Search />
                <Movies onlySaved={this.props.onlySaved}/>
                <Footer />
            </main>
        )
    }
}
