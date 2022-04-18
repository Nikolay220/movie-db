import React from 'react'

import GenreItem from '../genre-item'

import styles from './genres.scss'

export default function Genres({ genres }) {
  const generateGenres = (genresArr) => {
    return genresArr.map((genre) => {
      return <GenreItem key={genre.id} genre={genre.name} />
    })
  }
  return <div className={styles['genres']}>{generateGenres(genres)}</div>
}
