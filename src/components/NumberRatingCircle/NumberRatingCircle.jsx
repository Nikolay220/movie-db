import React from 'react'

import AppController from '../../services/AppController'

import styles from './NumberRatingCircle.module.scss'

function generateClasses(rating) {
  rating = Number(rating)
  let classes = 'number-rating-circle '
  if (!Number.isNaN(rating)) {
    if (rating >= 0 && rating < 3) classes += 'number-rating-circle--rate--0-3'
    if (rating >= 3 && rating < 5) classes += 'number-rating-circle--rate--3-5'
    if (rating >= 5 && rating < 7) classes += 'number-rating-circle--rate--5-7'
    if (rating >= 7) classes += 'number-rating-circle--rate--7-and-more'
  }
  return classes
}

export default function NumberRatingCircle({ rating }) {
  const appController = new AppController(styles)
  const f = appController.classesToCssModulesFormat.bind(appController)
  return (
    <div className={f(generateClasses(rating))}>
      <span className={f('number-rating-circle__rating text text--font-size--12px text--color--000')}>
        {rating ? rating : 0}
      </span>
    </div>
  )
}
