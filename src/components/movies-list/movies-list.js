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

    this.generateRows = () => {
      return this.state.movies.map((value) => {
        const releaseDate = format(new Date(...value.release_date.split('-')), 'PPP')
        return (
          <Col key={value.id} span={12}>
            <div className="movie-cell">
              {/* <span>
                <img src={_base_posters_url + value.poster_path} width={183} />
              </span> */}
              <div
                className="poster-container"
                style={{ background: `url(${_base_posters_url + value.poster_path}) no-repeat 50% 0%` }}
              ></div>
              <div style={{ position: 'relative', marginLeft: '20px', flexBasis: '248px' }}>
                <Title className="movie-title text text--font-size--20px text--color--000" level={5}>
                  {value.title}
                </Title>
                <NumberRatingCircle rating={value.vote_average} />
                <Text className="movie-release-date text text--font-size--12px text--color--827E7E">{releaseDate}</Text>
                <Genres genres={value.genres} />
                <Text>{value.overview.split(' ').slice(0, 20).join(' ') + '...'}</Text>
                <StarsRatingPanel rating={value.vote_average} />
              </div>
            </div>
          </Col>
        )
      })
    }
  }

  render() {
    const movies = this.generateRows()

    return (
      <div className="movies-list">
        <Row gutter={[36, 36]}>{movies}</Row>
      </div>
    )
  }
}
