export default class SessionStorageService {
  static setGuestSessionId(guestSessionId) {
    sessionStorage.setItem('guestSessionId', guestSessionId)
  }
  static getGuestSessionId() {
    return sessionStorage.getItem('guestSessionId')
  }
  static clearStorage() {
    sessionStorage.clear()
  }
}
