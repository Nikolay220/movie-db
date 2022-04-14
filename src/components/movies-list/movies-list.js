import React, { Component } from 'react'
import { Row, Col, Typography } from 'antd'
const { Title, Text } = Typography
import { format } from 'date-fns'

import TmdbApiService from '../../services/tmdb-api-service'

import './movies-list.css'

export default class MoviesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
    }
    const tmdbApiService = new TmdbApiService()
    const _base_posters_url = tmdbApiService.getBasePostersUrl()
    let p1 = tmdbApiService.getMoviesByName('return')
    let p2 = tmdbApiService.getAllGenres()
    Promise.all([p1, p2]).then(([movies, genres]) => {
      movies.forEach((movie) => {
        movie.genres = []
        movie.genre_ids.forEach((id) => {
          const index = genres.findIndex((value) => {
            return value.id === Number(id)
          })
          movie.genres.push(genres[index].name)
        })
      })

      this.setState({ movies })
    })

    this.generateRows = () => {
      return this.state.movies.map((value) => {
        const releaseDate = format(new Date(...value.release_date.split('-')), 'PPP')
        return (
          <Col key={value.id} span={12}>
            <div className="flex-col">
              <img src={_base_posters_url + value.poster_path} width={183} />
              <div>
                <Title className="text text--font-size--20px" level={5}>
                  {value.title}
                </Title>
                <div>
                  <Text className="text text--font-size--12px">{releaseDate}</Text>
                </div>
                <span className="genre-panel">{value.genres[0]}</span>
                {/* <span className="genre-panel">asdasdasdas</span> */}
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
      <>
        <Row gutter={[36, 36]}>{movies}</Row>
      </>
    )
  }
}
