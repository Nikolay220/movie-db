import React, { Component, Fragment } from 'react'

import { TmdbServiceConsumer } from '../TmdbServiceContext'
import MoviesList from '../MoviesList'
import Paginator from '../Paginator'

export default class RatedMovies extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // queryStr: 'return',
      totalMovies: 0,
      curPage: 1,
    }
    this.onCurPageChange = (curPage) => {
      this.setState({ curPage })
    }

    // this.onSearchInputChange = (evt) => {
    //   this.setState({ queryStr: evt.target.value, curPage: 1 })
    // }

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
              <MoviesList
                windowSize={windowSize}
                onMoviesNumberChange={this.onMoviesNumberChange}
                curPage={this.state.curPage}
                tmdbApiService={tmdbService}
                getMovies={tmdbService.getRatedMovies.bind(tmdbService)}
                shouldUpdate={ratingUpdated}
              />
              <Paginator
                totalMovies={this.state.totalMovies}
                curPage={this.state.curPage}
                onCurPageChange={this.onCurPageChange}
              />
            </Fragment>
          )
        }}
      </TmdbServiceConsumer>
    )
  }
}
