import React, { Component } from 'react'
import { Row, Col, Typography, Alert } from 'antd'
import { format } from 'date-fns'

import CustomSpinner from '../CustomSpinner'
import NumberRatingCircle from '../NumberRatingCircle'
import StarsRatingPanel from '../StarsRatingPanel'
import Genres from '../Genres'
import NoMoviesComponent from '../NoMoviesComponent'
const { Title, Text } = Typography
import AppController from '../../services/AppController'
import GetMoviesByNameError from '../../Errors/GetMoviesByNameError'
import GetMoviesError from '../../Errors/GetMoviesError'

import styles from './RatedMoviesList.module.scss'

const moviesNumOnPage = 6
export default class RatedMoviesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      alert: null,
      loading: true,
    }

    const _base_posters_url = this.props.tmdbApiService.getBasePostersUrl()
    const appController = new AppController(styles)
    const f = appController.classesToCssModulesFormat.bind(appController)

    this.updateComponent = (pageNumber, curQuery) => {
      this.setState({ loading: true })
      this.props
        .getMovies(pageNumber, curQuery)
        .then((movies) => {
          // eslint-disable-next-line no-debugger
          debugger
          if (movies.errors) {
            this.props.onMoviesNumberChange(0)
            this.setState({ movies: [], alert: null, loading: false })
          } else if (movies.results.length >= 0) {
            this.props.onMoviesNumberChange(this.props.tmdbApiService.getCurNumOfMovies())
            this.setState({ movies: movies.results.slice(0, moviesNumOnPage), alert: null, loading: false })
          } else if (movies.status_message) {
            let err = new GetMoviesError(movies.status_message)
            this.setState({
              alert: (
                <Alert
                  message="Error"
                  description={
                    'Recommendations: ' +
                    err.checksRecommendations +
                    '. Mess:' +
                    err.message +
                    '.  Error name: ' +
                    err.name +
                    '.  Error stack: ' +
                    err.stack
                  }
                  type="error"
                  showIcon
                />
              ),
              loading: false,
            })
          }
        })
        .catch((error) => {
          error = new GetMoviesByNameError(error.message)
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
        })
    }
    this.generateDesktopMovieCell = (movie) => {
      let releaseDate = null
      if (movie.release_date) releaseDate = format(new Date(...movie.release_date.split('-')), 'PPP')
      return (
        <div className={f('movie-cell')}>
          <div className={f('movie-cell-container')}>
            <div
              className={f('poster-container')}
              style={
                movie.poster_path && {
                  background: `url(${
                    _base_posters_url + (movie.poster_path ? movie.poster_path : '')
                  }) no-repeat 50% 0%`,
                }
              }
            ></div>
            <div style={{ position: 'relative', marginLeft: '20px', flexBasis: '248px' }}>
              <Title className={f('movie-title text text--font-size--20px text--color--000')} level={4}>
                {movie.title}
              </Title>
              {releaseDate && (
                <Text className={f('movie-release-date text text--font-size--12px text--color--827E7E')}>
                  {releaseDate}
                </Text>
              )}
              <Genres genres={movie.genre_ids} />
              <Text className={f('movie-description')}>
                {movie.overview ? movie.overview.split(' ').slice(0, 8).join(' ') + '...' : ''}
              </Text>
            </div>
          </div>
          <NumberRatingCircle rating={movie.vote_average} />
          <StarsRatingPanel updateMovieRating={this.updateMovieRating} rating={movie.rating} movieId={movie.id} />
        </div>
      )
    }
    this.generateTabletMovieCell = (movie) => {
      let releaseDate = null
      if (movie.release_date) releaseDate = format(new Date(...movie.release_date.split('-')), 'PPP')
      return (
        <div className={f('movie-cell movie-cell--tablet')}>
          <div className={f('movie-cell-container')}>
            <div
              className={f('poster-container poster-container--tablet')}
              style={
                movie.poster_path && {
                  background: `url(${
                    _base_posters_url + (movie.poster_path ? movie.poster_path : '')
                  }) no-repeat 50% 0%`,
                }
              }
            ></div>
            <div style={{ position: 'relative', marginLeft: '13px', flexBasis: '248px' }}>
              <Title
                className={f('movie-title movie-title--tablet text text--font-size--20px text--color--000')}
                level={4}
              >
                {movie.title}
              </Title>
              {releaseDate && (
                <Text className={f('movie-release-date text text--font-size--12px text--color--827E7E')}>
                  {releaseDate}
                </Text>
              )}
              <Genres genres={movie.genres} />
            </div>
          </div>
          <NumberRatingCircle rating={movie.vote_average} />
          <Text className={f('movie-description movie-description--tablet')}>
            {movie.overview ? movie.overview.split(' ').slice(0, 10).join(' ') + '...' : ''}
          </Text>
          <StarsRatingPanel updateMovieRating={this.updateMovieRating} rating={movie.rating} movieId={movie.id} />
        </div>
      )
    }

    this.generateMobileMovieCell = (movie) => {
      let releaseDate = null
      if (movie.release_date) releaseDate = format(new Date(...movie.release_date.split('-')), 'PPP')
      return (
        <div className={f('movie-cell movie-cell--mobile')}>
          <div className={f('movie-cell-container')}>
            <div
              className={f('poster-container poster-container--mobile')}
              style={
                movie.poster_path && {
                  background: `url(${
                    _base_posters_url + (movie.poster_path ? movie.poster_path : '')
                  }) no-repeat 50% 0%`,
                }
              }
            ></div>
            <div style={{ position: 'relative', marginLeft: '13px', flexBasis: '248px' }}>
              <Title
                className={f('movie-title movie-title--tablet text text--font-size--20px text--color--000')}
                level={4}
              >
                {movie.title}
              </Title>
              {releaseDate && (
                <Text className={f('movie-release-date text text--font-size--12px text--color--827E7E')}>
                  {releaseDate}
                </Text>
              )}
              <Genres genres={movie.genres} />
            </div>
          </div>
          <NumberRatingCircle rating={movie.vote_average} />
          <Text className={f('movie-description movie-description--tablet')}>
            {movie.overview ? movie.overview.split(' ').slice(0, 15).join(' ') + '...' : ''}
          </Text>
          <StarsRatingPanel updateMovieRating={this.updateMovieRating} rating={movie.rating} movieId={movie.id} />
        </div>
      )
    }
    this.generateMovieCell = (movie, displayWidth) => {
      if (displayWidth === 'desktop') {
        return this.generateDesktopMovieCell(movie)
      } else if (displayWidth === 'tablet') {
        return this.generateTabletMovieCell(movie)
      } else {
        return this.generateMobileMovieCell(movie)
      }
    }
    this.generateRows = (displayWidth) => {
      return this.state.movies.map((movie) => {
        if (Object.keys(movie).length) {
          let columnsWidth = 12
          if (displayWidth === 'mobile') columnsWidth = 24

          return (
            <Col key={movie.id} span={columnsWidth}>
              {this.generateMovieCell(movie, displayWidth)}
            </Col>
          )
        }
      })
    }

    this.updateMovieRating = (movieId, rating) => {
      this.setState((state) => {
        let newArr = state.movies.map((movie) => {
          return { ...movie }
        })
        let index = newArr.findIndex((value) => value.id === movieId)
        newArr[index].rating = rating
        return { movies: newArr }
      })
    }
  }

  componentDidMount() {
    this.updateComponent(this.props.curPage, this.props.curQuery)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.curQuery !== this.props.curQuery) {
      this.updateComponent(1, this.props.curQuery)
    }
    if (prevProps.curPage !== this.props.curPage) {
      this.updateComponent(this.props.curPage, this.props.curQuery)
    }
    if (prevProps.shouldUpdate !== this.props.shouldUpdate) {
      this.updateComponent(this.props.curPage, this.props.curQuery)
    }
  }

  render() {
    if (this.state.alert) return <React.Fragment>{this.state.alert}</React.Fragment>
    if (this.state.loading) return <CustomSpinner />
    if (this.state.movies.length === 0) return <NoMoviesComponent />

    const movies = this.generateRows(this.props.windowSize)
    let rowGutters = [0, 0]
    let moviesListClasses = ''
    if (this.props.windowSize === 'desktop') {
      rowGutters = [36, 36]
      moviesListClasses = 'movies-list'
    } else if (this.props.windowSize === 'tablet') {
      rowGutters = [20, 20]
      moviesListClasses = 'movies-list movies-list--tablet'
    } else if (this.props.windowSize === 'mobile') {
      rowGutters = [0, 20]
      moviesListClasses = 'movies-list movies-list--mobile'
    }
    return (
      <React.Fragment>
        <div className={moviesListClasses}>
          <Row gutter={rowGutters}>{movies}</Row>
        </div>
      </React.Fragment>
    )
  }
}
