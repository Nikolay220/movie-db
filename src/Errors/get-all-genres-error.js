import NetworkError from './network-error'
export default class GetAllGenresError extends NetworkError {
  constructor(message) {
    super(message)
    this.name = 'GetAllGenresError'
    this.rec
  }
}
