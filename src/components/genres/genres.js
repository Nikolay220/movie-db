import React from 'react'
import './genres.css'

import GenreItem from '../genre-item'

export default function Genres({ genres }) {
  const generateGenres = (genresArr) => {
    return genresArr.map((genre) => {
      return <GenreItem key={genre.id} genre={genre.name} />
    })
  }
  return <div className="genres">{generateGenres(genres)}</div>
}
