export default class GroupModel {
  id = 0
  name = ''
  selected = false // 比赛结果

  constructor (payload) {
    payload.id && (this.id = payload.id)
    payload.name && (this.name = payload.name)
  }
}
