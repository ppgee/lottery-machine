export default class GameItemModel {
  id = 0
  name = ''
  gameNodes = []

  constructor (payload) {
    payload.id && (this.id = new Date().valueOf())
    payload.name && (this.name = payload.name)
    payload.gameNodes && (this.gameNodes = payload.gameNodes)
  }
}
