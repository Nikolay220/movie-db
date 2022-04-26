import NetworkError from './NetworkError'
export default class CreateGuestSessionError extends NetworkError {
  constructor(message) {
    super(message)
    this.name = 'CreateGuestSessionError'
  }
}
