import React, { Component } from 'react'
import { Row, Col, Typography } from 'antd'
import { format } from 'date-fns'

import NumberRatingCircle from '../number-rating-circle'
import StarsRatingPanel from '../stars-rating-panel'
import Genres from '../genres'
const { Title, Text } = Typography
import TmdbApiService from '../../services/tmdb-api-service'
import './movies-list.css'

const moviesNumOnPage = 6
export default class MoviesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
    }
    const tmdbApiService = new TmdbApiService()
    const _base_posters_url = tmdbApiService.getBasePostersUrl()
    tmdbApiService.getMoviesByNameWithGenres('return').then((movies) => {
      this.setState({ movies: movies.slice(0, moviesNumOnPage) })
    })

    // this.generateGenres = (genresArr) => {
    //   return genresArr.map((genre) => {
    //     return <GenreItem key={genre.id} genre={genre.name} />
    //   })
    // }
    this.generateDesktopMovieCell = (movie) => {
      const releaseDate = format(new Date(...movie.release_date.split('-')), 'PPP')
      return (
        <div className="movie-cell">
          <div className="movie-cell-container">
            <div
              className="poster-container"
              style={{ background: `url(${_base_posters_url + movie.poster_path}) no-repeat 50% 0%` }}
            ></div>
            <div style={{ position: 'relative', marginLeft: '20px', flexBasis: '248px' }}>
              <Title className="movie-title text text--font-size--20px text--color--000" level={4}>
                {movie.title}
              </Title>
              <Text className="movie-release-date text text--font-size--12px text--color--827E7E">{releaseDate}</Text>
              <Genres genres={movie.genres} />
              <Text className="movie-description">{movie.overview.split(' ').slice(0, 8).join(' ') + '...'}</Text>
            </div>
          </div>
          <NumberRatingCircle rating={movie.vote_average} />
          <StarsRatingPanel rating={movie.vote_average} />
        </div>
      )
    }
    this.generateTabletMovieCell = (movie) => {
      const releaseDate = format(new Date(...movie.release_date.split('-')), 'PPP')
      return (
        <div className="movie-cell movie-cell--tablet">
          <div className="movie-cell-container">
            <div
              className="poster-container poster-container--tablet"
              style={{ background: `url(${_base_posters_url + movie.poster_path}) no-repeat 50% 0%` }}
            ></div>
            <div style={{ position: 'relative', marginLeft: '13px', flexBasis: '248px' }}>
              <Title className="movie-title movie-title--tablet text text--font-size--20px text--color--000" level={4}>
                {movie.title}
              </Title>
              <Text className="movie-release-date text text--font-size--12px text--color--827E7E">{releaseDate}</Text>
              <Genres genres={movie.genres} />
            </div>
          </div>
          <NumberRatingCircle rating={movie.vote_average} />
          <Text className="movie-description movie-description--tablet">
            {movie.overview.split(' ').slice(0, 10).join(' ') + '...'}
          </Text>
          <StarsRatingPanel rating={movie.vote_average} />
        </div>
      )
    }

    this.generateMobileMovieCell = (movie) => {
      const releaseDate = format(new Date(...movie.release_date.split('-')), 'PPP')
      return (
        <div className="movie-cell movie-cell--mobile">
          <div className="movie-cell-container">
            <div
              className="poster-container poster-container--mobile"
              style={{ background: `url(${_base_posters_url + movie.poster_path}) no-repeat 50% 0%` }}
            ></div>
            <div style={{ position: 'relative', marginLeft: '13px', flexBasis: '248px' }}>
              <Title className="movie-title movie-title--tablet text text--font-size--20px text--color--000" level={4}>
                {movie.title}
              </Title>
              <Text className="movie-release-date text text--font-size--12px text--color--827E7E">{releaseDate}</Text>
              <Genres genres={movie.genres} />
            </div>
          </div>
          <NumberRatingCircle rating={movie.vote_average} />
          <Text className="movie-description movie-description--tablet">
            {movie.overview.split(' ').slice(0, 15).join(' ') + '...'}
          </Text>
          <StarsRatingPanel rating={movie.vote_average} />
        </div>
      )
    }

    this.generateRows = (displayWidth) => {
      return this.state.movies.map((value) => {
        let columnsWidth = 12
        if (displayWidth === 'mobile') columnsWidth = 24

        // const releaseDate = format(new Date(...value.release_date.split('-')), 'PPP')
        return (
          <Col key={value.id} span={columnsWidth}>
            {displayWidth === 'desktop'
              ? this.generateDesktopMovieCell(value)
              : displayWidth === 'tablet'
              ? this.generateTabletMovieCell(value)
              : this.generateMobileMovieCell(value)}
          </Col>
        )
      })
    }
  }

  render() {
    const movies = this.generateRows(this.props.curMedia)
    let rowGutters = [0, 0]
    let moviesListClasses = ''
    if (this.props.curMedia === 'desktop') {
      rowGutters = [36, 36]
      moviesListClasses = 'movies-list'
    } else if (this.props.curMedia === 'tablet') {
      rowGutters = [20, 20]
      moviesListClasses = 'movies-list movies-list--tablet'
    } else if (this.props.curMedia === 'mobile') {
      rowGutters = [0, 20]
      moviesListClasses = 'movies-list movies-list--mobile'
    }
    return (
      <div className={moviesListClasses}>
        <Row gutter={rowGutters}>{movies}</Row>
      </div>
    )
  }
}
