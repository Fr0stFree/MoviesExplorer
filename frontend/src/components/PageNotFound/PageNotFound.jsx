import React, { Component } from 'react';

import './PageNotFound.css';

export default class PageNotFound extends Component {
  render() {
    return (
      <div className={"page-not-found"}>
        <h1 className={"page-not-found__title"}>404</h1>
        <p className={"page-not-found__subtitle"}>Страница не найдена</p>
      </div>
    )
  }
}