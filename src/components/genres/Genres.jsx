import React from 'react'

import GenreItem from '../GenreItem'
import { TmdbServiceConsumer } from '../TmdbServiceContext'

import styles from './Genres.module.scss'

export default function Genres({ genres }) {
  const generateGenres = (genresArr, genresIdsAndNames) => {
    if (genresArr.length) {
      return genresArr.map((genreId) => {
        const index = genresIdsAndNames.findIndex((val) => val.id === genreId)
        return <GenreItem key={genreId} genre={genresIdsAndNames[index].name} />
      })
    }
  }
  return (
    <TmdbServiceConsumer>
      {({ genresIdsAndNames }) => {
        return <div className={styles['genres']}>{generateGenres(genres, genresIdsAndNames)}</div>
      }}
    </TmdbServiceConsumer>
  )
}

Genres.defaultProps = {
  genres: [],
}
