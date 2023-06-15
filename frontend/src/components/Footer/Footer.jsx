import React, { Component } from 'react';
import {Link} from "react-router-dom";

import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <ul className="footer__item-list">
          <li className="footer__item"><p className="footer__item-text">&#169;2023</p></li>
          <li className="footer__item"><Link className="footer__link"
                                             target="_blank"
                                             to="https://practicum.yandex.ru/"
                                             >Яндекс.Практикум</Link>
          </li>
          <li className="footer__item"><Link className="footer__link"
                                             target="_blank"
                                             to="https://github.com/"
                                             >GitHub</Link>
          </li>
        </ul>
      </footer>
    )
  }
}
