import NetworkError from './network-error'
export default class GetMoviesByNameError extends NetworkError {
  constructor(message) {
    super(message)
    this.name = 'GetMoviesByNameError'
  }
}
