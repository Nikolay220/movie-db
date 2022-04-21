import React, { Component } from 'react'
import { Row, Col, Typography, Alert } from 'antd'
import { format } from 'date-fns'

import CustomSpinner from '../CustomSpinner'
import NumberRatingCircle from '../NumberRatingCircle'
import StarsRatingPanel from '../StarsRatingPanel'
import Genres from '../Genres'
import NoMoviesComponent from '../NoMoviesComponent'
const { Title, Text } = Typography
import TmdbApiService from '../../services/TmdbApiService'
import AppController from '../../services/AppController'

import styles from './MoviesList.module.scss'

const moviesNumOnPage = 6
export default class MoviesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      alert: null,
      loading: true,
    }
    this.tmdbApiService = new TmdbApiService()
    const _base_posters_url = this.tmdbApiService.getBasePostersUrl()
    // this.generateGenres = (genresArr) => {
    //   return genresArr.map((genre) => {
    //     return <GenreItem key={genre.id} genre={genre.name} />
    //   })
    // }
    const appController = new AppController(styles)
    const f = appController.classesToCssModulesFormat.bind(appController)

    this.updateComponent = () => {
      this.setState({ loading: true })
      this.tmdbApiService
        .getMoviesByNameWithGenres(this.props.curQuery)
        .then((movies) => {
          this.setState({ movies: movies.slice(0, moviesNumOnPage), alert: null, loading: false })
        })
        .catch((error) => {
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
              <Genres genres={movie.genres} />
              <Text className={f('movie-description')}>
                {movie.overview ? movie.overview.split(' ').slice(0, 8).join(' ') + '...' : ''}
              </Text>
            </div>
          </div>
          <NumberRatingCircle rating={movie.vote_average} />
          <StarsRatingPanel rating={movie.vote_average} />
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
          <StarsRatingPanel rating={movie.vote_average} />
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
          <StarsRatingPanel rating={movie.vote_average} />
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
  }

  componentDidMount() {
    this.updateComponent()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.curQuery !== this.props.curQuery) {
      this.updateComponent()
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
