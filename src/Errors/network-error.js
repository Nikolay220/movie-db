export default class NetworkError extends Error {
  constructor(message) {
    super(message)
    this.checksRecommendations =
      'Check network connection. If network connection is right and error is stayed, write message with error screenshot to our-company@gmail.com.'
  }
}
