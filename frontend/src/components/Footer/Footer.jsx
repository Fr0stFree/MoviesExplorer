import React, { Component } from 'react';

import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <ul className="footer__item-list">
          <li className="footer__item">&#169;2023</li>
          <li className="footer__item">Яндекс.Практикум</li>
          <li className="footer__item">Github</li>
        </ul>
      </footer>
    )
  }
}
