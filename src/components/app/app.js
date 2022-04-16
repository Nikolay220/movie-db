import React, { Component } from 'react'

import Header from '../header'
import MoviesList from '../movies-list'
import './app.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    if (window.matchMedia('(max-width: 944px)').matches && window.matchMedia('(max-width: 800px)').matches)
      this.state = {
        curMedia: 'mobile',
      }
    else if (window.matchMedia('(max-width: 944px)').matches) {
      this.state = {
        curMedia: 'tablet',
      }
    } else {
      this.state = {
        curMedia: 'desktop',
      }
    }
    this.changeWindowSizeHandler_944px = (e) => {
      if (e.matches) {
        this.setState({ curMedia: 'tablet' })
      } else {
        this.setState({ curMedia: 'desktop' })
      }
    }
    this.changeWindowSizeHandler_800px = (e) => {
      if (e.matches) {
        this.setState({ curMedia: 'mobile' })
      } else {
        this.setState({ curMedia: 'tablet' })
      }
    }
    window.matchMedia('(max-width: 944px)').addEventListener('change', this.changeWindowSizeHandler_944px)
    window.matchMedia('(max-width: 800px)').addEventListener('change', this.changeWindowSizeHandler_800px)

    this.generateDesktopApp = () => {
      return (
        <div className="app">
          <Header />
          <MoviesList curMedia={this.state.curMedia} />
        </div>
      )
    }
    this.generateTabletApp = () => {
      return (
        <div className="app app--tablet">
          <Header />
          <MoviesList curMedia={this.state.curMedia} />
        </div>
      )
    }
    // this.generateMobileApp = () => {
    //   return (
    //     <div className="app">
    //       <Header />
    //       <MoviesList matches_800px={this.state.matches_800px} />
    //     </div>
    //   )
    // }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.curMedia === 'desktop' ? this.generateDesktopApp() : this.generateTabletApp()}
      </React.Fragment>
    )
  }
}
