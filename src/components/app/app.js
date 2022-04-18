import React, { Component } from 'react'

import Header from '../header'
import MoviesList from '../movies-list'

import styles from './app.module.scss'

export default class App extends Component {
  constructor(props) {
    super(props)
    if (window.matchMedia('(max-width: 944px)').matches && window.matchMedia('(max-width: 830px)').matches)
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
    this.changeWindowSizeHandler_830px = (e) => {
      if (e.matches) {
        this.setState({ curMedia: 'mobile' })
      } else {
        this.setState({ curMedia: 'tablet' })
      }
    }
    window.matchMedia('(max-width: 944px)').addEventListener('change', this.changeWindowSizeHandler_944px)
    window.matchMedia('(max-width: 830px)').addEventListener('change', this.changeWindowSizeHandler_830px)

    this.generateDesktopApp = () => {
      return (
        <div className={styles.app}>
          <Header />
          <MoviesList curMedia={this.state.curMedia} />
        </div>
      )
    }
    this.generateTabletApp = () => {
      return (
        <div className={`${styles.app} ${styles['app--tablet']}`}>
          <Header />
          <MoviesList curMedia={this.state.curMedia} />
        </div>
      )
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.curMedia === 'desktop' ? this.generateDesktopApp() : this.generateTabletApp()}
      </React.Fragment>
    )
  }
}
