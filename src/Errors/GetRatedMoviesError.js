import NetworkError from './NetworkError'
export default class GetRatedMoviesError extends NetworkError {
  constructor(message) {
    super(message)
    this.name = 'GetRatedMoviesError'
  }
}
