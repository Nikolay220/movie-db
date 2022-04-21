import React from 'react'

import AppController from '../../services/AppController'

import styles from './NumberRatingCircle.module.scss'

export default function NumberRatingCircle({ rating }) {
  const appController = new AppController(styles)
  const f = appController.classesToCssModulesFormat.bind(appController)
  return (
    <div className={f('number-rating-circle')}>
      <span className={f('number-rating-circle__rating text text--font-size--12px text--color--000')}>
        {rating ? rating : 0}
      </span>
    </div>
  )
}
