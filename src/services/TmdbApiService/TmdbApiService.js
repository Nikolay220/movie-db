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

  async updateRatedMovies(movies) {
    let newArr
    if (movies.results)
      newArr = movies.results.map((value) => {
        return { ...value }
      })
    else return movies
    let ratedMovies = await this.getRatedMovies()
    this._curNumOfMovies = movies.total_results
    if (ratedMovies['total_results'] >= 0) ratedMovies = ratedMovies.results
    if (ratedMovies.length)
      newArr.forEach((movie) => {
        let index = ratedMovies.findIndex((ratedMovie) => ratedMovie.id === movie.id)
        movie.rating = index != -1 ? ratedMovies[index].rating : 0
      })
    return { ...movies, ...{ results: newArr } }
  }
  async getMoviesByName(pageNumber, name) {
    const response = await fetch(
      `${this._base_url}/search/movie?api_key=${this._api_key}&query=${name}&page=${pageNumber}&language=en-US`
    )
    const content = await response.json()
    return await this.updateRatedMovies(content)
  }

  async getAllGenres() {
    const response = await fetch(`${this._base_url}/genre/movie/list?api_key=${this._api_key}&language=en-US`)
    const genres = await response.json()
    return genres
  }

  async createGuestSession() {
    const response = await fetch(`${this._base_url}/authentication/guest_session/new?api_key=${this._api_key}`)
    const guest_session = await response.json()
    this.guestSessionId = guest_session.guest_session_id ? guest_session.guest_session_id : null
    return guest_session
  }

  async getRatedMovies() {
    const response = await fetch(
      `${this._base_url}/guest_session/${this.guestSessionId}/rated/movies?api_key=${this._api_key}`
    )
    const movies = await response.json()
    this._curNumOfMovies = movies.total_results ? movies.total_results : 0
    return movies
  }

  async sendMovieRate(movieId, rate) {
    const data = { value: rate }
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
    return content
  }
}
