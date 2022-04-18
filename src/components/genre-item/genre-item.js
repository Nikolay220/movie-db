import React from 'react'

import styles from './genre-item.scss'
function GenreItem({ genre }) {
  return <span className={styles['genre-panel']}>{genre}</span>
}

export default GenreItem
