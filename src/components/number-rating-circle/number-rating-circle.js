import React from 'react'
import './number-rating-circle.css'

export default function NumberRatingCircle({ rating }) {
  return (
    <div className="number-rating-circle">
      <span className="number-rating-circle__rating text text--font-size--12px text--color--000">{rating}</span>
    </div>
  )
}
