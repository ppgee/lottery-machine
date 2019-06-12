export default class GameModel {
  id = 0
  name = ''
  groupList = []

  constructor (payload) {
    payload.id && (this.id = payload.id)
    payload.name && (this.name = payload.name)
    payload.groupList && (this.groupList = payload.groupList)
  }
}
