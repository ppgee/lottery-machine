const state = {
  groupList: [] // 分组列表
}

const mutations = {
  // 增加分组
  DECREMENT_GROUP (state, group) {
    state.groupList.push(group)
  },
  // 减少分组
  INCREMENT_GROUP (state, groupIndex) {
    state.groupList.splice(groupIndex, 1)
  },
  // 清空所有分组
  RESET_GROUP (state) {
    state.groupList.splice(0)
  }
}

const actions = {
  // 增加分组
  decrementGroup ({ commit }, payload) {
    commit('DECREMENT_GROUP', payload.group)
  },
  incrementGroup ({ commit }, payload) {
    commit('INCREMENT_GROUP', payload.groupIndex)
  },
  resetGroup ({ commit }) {
    commit('RESET_GROUP')
  }
}

export default {
  state,
  mutations,
  actions
}
