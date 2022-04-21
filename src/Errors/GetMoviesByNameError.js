import NetworkError from './NetworkError'
export default class GetMoviesByNameError extends NetworkError {
  constructor(message) {
    super(message)
    this.name = 'GetMoviesByNameError'
  }
}
