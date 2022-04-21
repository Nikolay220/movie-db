import React from 'react'

import styles from './GenreItem.module.scss'
function GenreItem({ genre }) {
  return <span className={styles['genre-panel']}>{genre}</span>
}

export default GenreItem
