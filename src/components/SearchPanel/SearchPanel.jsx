import React, { Component, Fragment } from 'react'
import _ from 'lodash'

import { TmdbServiceConsumer } from '../TmdbServiceContext'
import SearchInput from '../SearchInput'
import MoviesList from '../MoviesList'
import Paginator from '../Paginator'

export default class SearchPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      queryStr: 'return',
      totalMovies: 0,
      curPage: 1,
    }
    this.onCurPageChange = (curPage) => {
      this.setState({ curPage })
    }

    this.onSearchInputChange = (evt) => {
      this.setState({ queryStr: evt.target.value, curPage: 1 })
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
              <SearchInput
                curQuery={this.state.queryStr}
                onChange={_.debounce(this.onSearchInputChange, 2000)}
                windowSize={windowSize}
              />
              <MoviesList
                windowSize={windowSize}
                curQuery={this.state.queryStr}
                onMoviesNumberChange={this.onMoviesNumberChange}
                curPage={this.state.curPage}
                tmdbApiService={tmdbService}
                getMovies={tmdbService.getMoviesByName.bind(tmdbService)}
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
