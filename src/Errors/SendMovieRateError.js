import NetworkError from './NetworkError'
export default class SendMovieRateError extends NetworkError {
  constructor(message) {
    super(message)
    this.name = 'SendMovieRateError'
  }
}
