import React from 'react'

import GenreItem from '../GenreItem'

import styles from './Genres.module.scss'

export default function Genres({ genres }) {
  const generateGenres = (genresArr) => {
    if (genresArr)
      return genresArr.map((genre) => {
        return <GenreItem key={genre.id} genre={genre.name} />
      })
  }
  return <div className={styles['genres']}>{generateGenres(genres)}</div>
}

Genres.defaultProps = {
  genres: [],
}
