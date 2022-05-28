import React, { Component } from 'react'
import { Tabs, Alert } from 'antd'

import GetAllGenresError from '../../Errors/GetAllGenresError'
import CreateGuestSessionError from '../../Errors/CreateGuestSessionError'
import NetworkError from '../../Errors/NetworkError'
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
        alert: null,
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
    Promise.all([p1, p2]).then(
      (values) => {
        if (!values[0].success) {
          let error = new CreateGuestSessionError(values[0].status_message)
          this.setState({
            alert: (
              <Alert
                message="Error"
                description={
                  'Recommendations: ' +
                  error.checksRecommendations +
                  '. Mess:' +
                  error.message +
                  '.  Error name: ' +
                  error.name +
                  '.  Error stack: ' +
                  error.stack
                }
                type="error"
                showIcon
              />
            ),
            loading: false,
          })
        }
        if (values[1].genres) {
          this.genres = values[1].genres
          this.setState({ loading: false })
        } else {
          let error = new GetAllGenresError(values[1].status_message)
          this.setState({
            alert: (
              <Alert
                message="Error"
                description={
                  'Recommendations: ' +
                  error.checksRecommendations +
                  '. Mess:' +
                  error.message +
                  '.  Error name: ' +
                  error.name +
                  '.  Error stack: ' +
                  error.stack
                }
                type="error"
                showIcon
              />
            ),
            loading: false,
          })
        }
      },
      (reason) => {
        // eslint-disable-next-line no-debugger
        debugger
        reason = new NetworkError(reason.message)
        this.setState({
          alert: (
            <Alert
              message="Error"
              description={
                'Recommendations: ' +
                reason.checksRecommendations +
                '. Mess:' +
                reason.message +
                '.  Error name: ' +
                reason.name +
                '.  Error stack: ' +
                reason.stack
              }
              type="error"
              showIcon
            />
          ),
          loading: false,
        })
      }
    )
  }
  render() {
    if (this.state.loading) return <CustomSpinner />
    if (this.state.alert) return <React.Fragment>{this.state.alert}</React.Fragment>
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
