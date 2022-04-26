import React from 'react'
import { Rate } from 'antd'

import AppController from '../../services/AppController'

import styles from './StarsRatingPanel.module.scss'
import './StarsRatingPanel.scss'

export default function StarsRatingPanel() {
  const appController = new AppController(styles)
  const f = appController.classesToCssModulesFormat.bind(appController)
  // const generateStars = () => {

  //   return starsArr
  // }
  return (
    <div className={f('stars-rating-panel')}>
      <Rate
        allowClear={false}
        allowHalf
        count={10}
        onChange={(value) => {
          alert(value)
        }}
      />
    </div>
  )
}
