import GetAllGenresError from '../../Errors/GetAllGenresError'
import GetMoviesByNameError from '../../Errors/GetMoviesByNameError'
import CreateGuestSessionError from '../../Errors/CreateGuestSessionError'
import GetRatedMoviesError from '../../Errors/GetRatedMoviesError'
import SendMovieRateError from '../../Errors/SendMovieRateError'

export default class TmdbApiService {
  constructor() {
    this._api_key = '3eb71cd42f58980962014e01b5dfda44'
    this._base_posters_url = 'https://image.tmdb.org/t/p/w185'
    this._curNumOfMovies = 0
    this._base_url = 'https://api.themoviedb.org/3'
    this.guestSessionId = null
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
          `${this._base_url}/search/movie?api_key=${this._api_key}&query=${name}&page=${pageNumber}&language=en-US`
        )
        const content = await response.json()
        const movies = content.results
        const ratedMovies = await this.getRatedMovies()
        if (ratedMovies.length)
          movies.forEach((movie) => {
            let index = ratedMovies.findIndex((ratedMovie) => ratedMovie.id === movie.id)
            movie.rating = index != -1 ? ratedMovies[index].rating : 0
          })
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
      const response = await fetch(`${this._base_url}/genre/movie/list?api_key=${this._api_key}&language=en-US`)
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

  async createGuestSession() {
    try {
      const response = await fetch(`${this._base_url}/authentication/guest_session/new?api_key=${this._api_key}`)
      const content = await response.json()
      this.guestSessionId = content.guest_session_id
      return content.guest_session_id
    } catch (error) {
      throw new CreateGuestSessionError(error.message)
    }
  }

  async getRatedMovies() {
    try {
      const response = await fetch(
        `${this._base_url}/guest_session/${this.guestSessionId}/rated/movies?api_key=${this._api_key}`
      )
      const movies = await response.json()
      this._curNumOfMovies = movies.total_results
      return movies.results
    } catch (error) {
      throw new GetRatedMoviesError(error.message)
    }
  }

  async sendMovieRate(movieId, rate) {
    const data = { value: rate }
    try {
      const response = await fetch(
        `${this._base_url}/movie/${movieId}/rating?api_key=${this._api_key}&guest_session_id=${this.guestSessionId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(data),
        }
      )
      const content = await response.json()
      return content.status_code
    } catch (error) {
      throw new SendMovieRateError(error.message)
    }
  }
}
