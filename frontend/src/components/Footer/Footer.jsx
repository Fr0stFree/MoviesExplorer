import React, { Component } from 'react';

import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <footer className={`footer ${!this.props.isVisible ? "footer_hidden" : ""}`}>
        <p lang="en"
           className="footer__text">Movies Explorer</p>
      </footer>
    )
  }
}
