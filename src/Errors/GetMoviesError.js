import NetworkError from './NetworkError'
export default class GetMoviesError extends NetworkError {
  constructor(message) {
    super(message)
    this.name = 'GetMoviesError'
  }
}
