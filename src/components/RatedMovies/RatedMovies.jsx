import React, { Component, Fragment } from 'react'

import { TmdbServiceConsumer } from '../TmdbServiceContext'
import RatedMoviesList from '../RatedMoviesList'
import Paginator from '../Paginator'

export default class RatedMovies extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalMovies: 0,
      curPage: 1,
    }
    this.onCurPageChange = (curPage) => {
      this.setState({ curPage })
    }
    this.onMoviesNumberChange = (numOfMovies) => {
      this.setState({ totalMovies: numOfMovies })
    }
  }

  render() {
    let windowSize = this.props.windowSize
    return (
      <TmdbServiceConsumer>
        {({ tmdbService, ratingUpdated }) => {
          return (
            <Fragment>
              <RatedMoviesList
                windowSize={windowSize}
                onMoviesNumberChange={this.onMoviesNumberChange}
                curPage={this.state.curPage}
                tmdbApiService={tmdbService}
                getMovies={tmdbService.getRatedMovies.bind(tmdbService)}
                shouldUpdate={ratingUpdated}
              />
              {Boolean(this.state.totalMovies) && (
                <Paginator
                  totalMovies={this.state.totalMovies}
                  curPage={this.state.curPage}
                  onCurPageChange={this.onCurPageChange}
                />
              )}
            </Fragment>
          )
        }}
      </TmdbServiceConsumer>
    )
  }
}
