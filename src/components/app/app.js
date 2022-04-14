import React, { Component } from 'react'

import Header from '../header'
import MoviesList from '../movies-list'
import './app.css'

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <MoviesList />
      </div>
    )
  }
}
