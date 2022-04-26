import React, { Component } from 'react'
import { Rate } from 'antd'

import AppController from '../../services/AppController'
import { TmdbServiceConsumer } from '../TmdbServiceContext'

import styles from './StarsRatingPanel.module.scss'
import './StarsRatingPanel.scss'

export default class StarsRatingPanel extends Component {
  render() {
    const { movieId, updateMovieRating } = this.props
    const appController = new AppController(styles)
    const f = appController.classesToCssModulesFormat.bind(appController)

    return (
      <TmdbServiceConsumer>
        {({ tmdbService }) => {
          return (
            <div className={f('stars-rating-panel')}>
              <Rate
                allowClear={false}
                allowHalf
                count={10}
                value={this.props.rating}
                onChange={(value) => {
                  tmdbService.sendMovieRate(movieId, value).then(() => {
                    updateMovieRating(movieId, value)
                  })
                }}
              />
            </div>
          )
        }}
      </TmdbServiceConsumer>
    )
  }
}
