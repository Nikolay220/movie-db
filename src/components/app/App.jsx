import React, { Component } from 'react'
// import _ from 'lodash'

// const { Search } = Input

import Header from '../Header'
import SearchPanel from '../SearchPanel'

import styles from './App.module.scss'

export default class App extends Component {
  constructor(props) {
    super(props)
    if (window.matchMedia('(max-width: 944px)').matches && window.matchMedia('(max-width: 830px)').matches)
      this.state = {
        windowSize: 'mobile',
      }
    else if (window.matchMedia('(max-width: 944px)').matches) {
      this.state = {
        windowSize: 'tablet',
      }
    } else {
      this.state = {
        windowSize: 'desktop',
      }
    }
    this.changeWindowSizeHandler_944px = (e) => {
      if (e.matches) {
        this.setState({ windowSize: 'tablet' })
      } else {
        this.setState({ windowSize: 'desktop' })
      }
    }
    this.changeWindowSizeHandler_830px = (e) => {
      if (e.matches) {
        this.setState({ windowSize: 'mobile' })
      } else {
        this.setState({ windowSize: 'tablet' })
      }
    }
    window.matchMedia('(max-width: 944px)').addEventListener('change', this.changeWindowSizeHandler_944px)
    window.matchMedia('(max-width: 830px)').addEventListener('change', this.changeWindowSizeHandler_830px)

    this.generateDesktopApp = () => {
      return (
        <div className={styles.app}>
          <Header />
          <SearchPanel windowSize={this.state.windowSize} />
        </div>
      )
    }
    this.generateTabletApp = () => {
      return (
        <div className={`${styles.app} ${styles['app--tablet']}`}>
          <Header />
          <SearchPanel windowSize={this.state.windowSize} />
        </div>
      )
    }
    this.generateMobileApp = () => {
      return (
        <div className={`${styles.app} ${styles['app--tablet']}`}>
          <Header />
          <SearchPanel windowSize={this.state.windowSize} />
        </div>
      )
    }
    this.generateApp = (displayWidth) => {
      if (displayWidth === 'desktop') {
        return this.generateDesktopApp()
      } else if (displayWidth === 'tablet') {
        return this.generateTabletApp()
      } else {
        return this.generateMobileApp()
      }
    }
  }

  render() {
    return <React.Fragment>{this.generateApp(this.state.windowSize)}</React.Fragment>
  }
}
