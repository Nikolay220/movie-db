export default class TmdbApiService {
  constructor() {
    this._api_key = '3eb71cd42f58980962014e01b5dfda44'
    this._base_posters_url = 'https://image.tmdb.org/t/p/w185'
  }
  getBasePostersUrl() {
    return this._base_posters_url
  }
  async getMoviesByName(name) {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${this._api_key}&query=${name}&page=1`
    )
    const content = await response.json()
    // const genres = await this.getAllGenres()

    // content.results.forEach((movie, movie_index) => {
    //   movie[movie_index].genres = []
    //   movie.genre_ids.forEach((id) => {
    //     const index = genres.findIndex((value) => {
    //       return value.id === Number(id)
    //     })
    //     movie[movie_index].genres.push(genres[index].name)
    //   })
    // })
    return content.results
  }

  async getAllGenres() {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this._api_key}`)
    const genres = await response.json()
    return genres.genres
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
