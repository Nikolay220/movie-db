export default class TmdbApiService {
  constructor() {
    this._api_key = '3eb71cd42f58980962014e01b5dfda44'
    this._base_posters_url = 'https://image.tmdb.org/t/p/w185'
  }
  getBasePostersUrl() {
    return this._base_posters_url
  }
  async getMoviesByName(name) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${this._api_key}&query=${name}&page=1&language=en-US`
      )
      const content = await response.json()
      return content.results
    } catch (error) {
      console.error('Something wrong with fetch function, error:' + error.message)
      throw error
    }
  }

  async getAllGenres() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${this._api_key}&language=en-US`
      )
      const genres = await response.json()
      return genres.genres
    } catch (err) {
      console.error('Something wrong with fetch function, error:' + err.message)
      throw err
    }
  }

  async getMoviesByNameWithGenres(name) {
    let movies = await this.getMoviesByName(name)
    let genres = await this.getAllGenres()
    movies.forEach((movie) => {
      movie.genres = []
      movie.genre_ids.forEach((id) => {
        const index = genres.findIndex((value) => {
          return value.id === Number(id)
        })
        movie.genres.push({ name: genres[index].name, id })
      })
    })
    return movies
  }

  // async getGenreById(id) {
  //   const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this._api_key}`)
  //   const genres = await response.json()
  //   const index = genres.findIndex((value) => {
  //     return value.id === Number(id)
  //   })
  //   return genres[index].name
  // }
}
