import React, { Component, Fragment } from 'react'
import _ from 'lodash'

import SearchInput from '../SearchInput'
import MoviesList from '../MoviesList'
import Paginator from '../Paginator'

export default class SearchPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      queryStr: 'return',
    }

    this.onSearchInputChange = (evt) => {
      this.setState({ queryStr: evt.target.value })
    }
  }

  render() {
    let windowSize = this.props.windowSize
    return (
      <Fragment>
        <SearchInput onChange={_.debounce(this.onSearchInputChange, 2000)} windowSize={windowSize} />
        <MoviesList windowSize={windowSize} curQuery={this.state.queryStr} />
        <Paginator />
      </Fragment>
    )
  }
}
