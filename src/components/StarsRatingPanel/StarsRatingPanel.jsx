import React, { Component } from 'react'
import { Rate, Alert } from 'antd'

import AppController from '../../services/AppController'
import { TmdbServiceConsumer } from '../TmdbServiceContext'

import styles from './StarsRatingPanel.module.scss'
import './StarsRatingPanel.scss'

export default class StarsRatingPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alert: null,
    }
  }
  render() {
    const { movieId, updateMovieRating } = this.props
    const appController = new AppController(styles)
    const f = appController.classesToCssModulesFormat.bind(appController)
    return (
      <TmdbServiceConsumer>
        {({ tmdbService }) => {
          if (this.state.alert)
            return (
              <Alert
                message="Error"
                type="error"
                showIcon
                closable
                onClose={() => {
                  this.setState({ alert: null })
                }}
              />
            )
          return (
            <div className={f('stars-rating-panel')}>
              <Rate
                allowClear={false}
                allowHalf
                count={10}
                value={this.props.rating}
                onChange={(value) => {
                  tmdbService.sendMovieRate(movieId, value).then(
                    () => {
                      updateMovieRating(movieId, value)
                    },
                    (error) => {
                      this.setState({ alert: error })
                    }
                  )
                }}
              />
            </div>
          )
        }}
      </TmdbServiceConsumer>
    )
  }
}
