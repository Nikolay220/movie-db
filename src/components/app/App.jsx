import React, { Component } from 'react'
import { Tabs } from 'antd'

import Header from '../Header'
import SearchPanel from '../SearchPanel'

const { TabPane } = Tabs

import styles from './App.module.scss'
import './App.scss'

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
    return (
      <Tabs defaultActiveKey="1" size={'small'} centered>
        <TabPane className={styles['tab-pane']} tab="Search" key="1">
          {this.generateApp(this.state.windowSize)}
        </TabPane>
        <TabPane tab="Rated" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    )
  }
}
