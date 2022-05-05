export default class NetworkError extends Error {
  constructor(message) {
    super(message)
    this.checksRecommendations = 'Write message with error screenshot to our-company@gmail.com please'
  }
}
