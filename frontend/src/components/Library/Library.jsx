import React, { Component } from 'react';

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Search from "../Search/Search"
import Movies from "../Movies/Movies";
import './Library.css';


export default class Library extends Component {
    render() {
        return (
            <>
                <Header />
                <main className="library">
                    <Search />
                    <Movies onlySaved={this.props.onlySaved}/>
                </main>
                <Footer />
            </>
        )
    }
}
