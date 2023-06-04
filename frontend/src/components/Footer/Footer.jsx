import React, { Component } from 'react';

import './Footer.css';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      className: `footer ${this.props.extraClass}`,
    }
  }

  render() {
    return (
      <footer className={this.state.className}>
        <p lang="en"
           className="footer__text">Movies Explorer</p>
      </footer>
    )
  }
}
