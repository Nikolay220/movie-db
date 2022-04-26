import GetAllGenresError from '../../Errors/GetAllGenresError'
import GetMoviesByNameError from '../../Errors/GetMoviesByNameError'

export default class TmdbApiService {
  constructor() {
    this._api_key = '3eb71cd42f58980962014e01b5dfda44'
    this._base_posters_url = 'https://image.tmdb.org/t/p/w185'
    this._curNumOfMovies = 0
  }

  getCurNumOfMovies() {
    return this._curNumOfMovies
  }
  getBasePostersUrl() {
    return this._base_posters_url
  }
  async getMoviesByName(pageNumber, name) {
    try {
      if (name) {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${this._api_key}&query=${name}&page=${pageNumber}&language=en-US`
        )
        const content = await response.json()

        this._curNumOfMovies = content.total_results
        return content.results
      }
      return []
    } catch (error) {
      throw new GetMoviesByNameError(error.message)
    }
  }

  async getAllGenres() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${this._api_key}&language=en-US`
      )
      const genres = await response.json()
      return genres.genres
    } catch (error) {
      throw new GetAllGenresError(error.message)
    }
  }

  async getMoviesByNameWithGenres(pageNumber, name) {
    let movies
    let genres
    movies = await this.getMoviesByName(pageNumber, name)
    genres = await this.getAllGenres()
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

  // async
}
