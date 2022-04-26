import NetworkError from './NetworkError'
export default class GetAllGenresError extends NetworkError {
  constructor(message) {
    super(message)
    this.name = 'GetAllGenresError'
  }
}
