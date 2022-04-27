import React, { Component } from 'react'
import { Tabs } from 'antd'

import CustomSpinner from '../CustomSpinner'
import SearchPanel from '../SearchPanel'
const { TabPane } = Tabs
import TmdbApiService from '../../services/TmdbApiService'
import { TmdbServiceProvider } from '../TmdbServiceContext'
import RatedMovies from '../RatedMovies'

import styles from './App.module.scss'

import './App.scss'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.genres = null
    this.guestSessionId = null
    if (window.matchMedia('(max-width: 944px)').matches && window.matchMedia('(max-width: 830px)').matches)
      this.state = {
        windowSize: 'mobile',
        loading: true,
        ratingUpdated: 0,
      }
    else if (window.matchMedia('(max-width: 944px)').matches) {
      this.state = {
        windowSize: 'tablet',
        loading: true,
        ratingUpdated: 0,
      }
    } else {
      this.state = {
        windowSize: 'desktop',
        loading: true,
        ratingUpdated: 0,
      }
    }
    this.tmdbApiService = new TmdbApiService()
    this.onRatingUpdate = () => {
      this.setState((state) => {
        return { ratingUpdated: !state.ratingUpdated }
      })
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

    this.generateDesktopSearchPanel = () => {
      return (
        <div className={styles.app}>
          <SearchPanel windowSize={this.state.windowSize} />
        </div>
      )
    }
    this.generateTabletSearchPanel = () => {
      return (
        <div className={`${styles.app} ${styles['app--tablet']}`}>
          <SearchPanel windowSize={this.state.windowSize} />
        </div>
      )
    }
    this.generateMobileSearchPanel = () => {
      return (
        <div className={`${styles.app} ${styles['app--tablet']}`}>
          <SearchPanel windowSize={this.state.windowSize} />
        </div>
      )
    }
    this.generateDesktopRatedMovies = () => {
      return (
        <div className={styles.app}>
          <RatedMovies windowSize={this.state.windowSize} />
        </div>
      )
    }
    this.generateTabletRatedMovies = () => {
      return (
        <div className={`${styles.app} ${styles['app--tablet']}`}>
          <RatedMovies windowSize={this.state.windowSize} />
        </div>
      )
    }
    this.generateMobileRatedMovies = () => {
      return (
        <div className={`${styles.app} ${styles['app--tablet']}`}>
          <RatedMovies windowSize={this.state.windowSize} />
        </div>
      )
    }
    this.generateSearchPanel = (displayWidth) => {
      if (displayWidth === 'desktop') {
        return this.generateDesktopSearchPanel()
      } else if (displayWidth === 'tablet') {
        return this.generateTabletSearchPanel()
      } else {
        return this.generateMobileSearchPanel()
      }
    }
    this.generateRatedMovies = (displayWidth) => {
      if (displayWidth === 'desktop') {
        return this.generateDesktopRatedMovies()
      } else if (displayWidth === 'tablet') {
        return this.generateTabletRatedMovies()
      } else {
        return this.generateMobileRatedMovies()
      }
    }
  }
  componentDidMount() {
    let p1 = this.tmdbApiService.createGuestSession()
    let p2 = this.tmdbApiService.getAllGenres()
    Promise.all([p1, p2]).then((values) => {
      this.genres = values[1]
      this.setState({ loading: false })
    })
  }
  render() {
    if (this.state.loading) return <CustomSpinner />
    let genresIdsAndNames = this.genres
    let tmdbService = this.tmdbApiService
    let onRatingUpdate = this.onRatingUpdate
    let ratingUpdated = this.state.ratingUpdated
    return (
      <TmdbServiceProvider value={{ genresIdsAndNames, tmdbService, ratingUpdated }}>
        <Tabs onChange={() => onRatingUpdate()} defaultActiveKey="1" size={'small'} centered>
          <TabPane className={styles['tab-pane']} tab="Search" key="1">
            {this.generateSearchPanel(this.state.windowSize)}
          </TabPane>
          <TabPane tab="Rated" key="2">
            {this.generateRatedMovies(this.state.windowSize)}
          </TabPane>
        </Tabs>
      </TmdbServiceProvider>
    )
  }
}
