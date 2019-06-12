import { shuffle } from '@/utils'
import GameItemModel from '../../model/game-item'
import GameModel from '../../model/game'

const state = {
  gameList: [], // 比赛列表
  gameDetail: {}, // 比赛详情
  currentGame: [] // 当前比赛数据
}

const mutations = {
  // 增加比赛
  DECREMENT_GAME (state, game) {
    state.gameList.push(game)
  },
  // 减少比赛
  INCREMENT_GAME (state, gameIndex) {
    state.gameList.splice(gameIndex, 1)
  },
  // 刷新排序
  REFRESH_GAME_SORT (state) {
    state.gameList = shuffle(state.gameList)
    // 触发刷新
    state.gameList.splice(state.gameList.length)
  },
  // 设置详情页数据
  SET_GAME_DETAIL (state, gameIndex) {
    const game = state.gameList[gameIndex]

    // 设置当前游戏数据
    let currentGame = state.gameDetail[game.id] || {}

    // 如果不存在则新建
    if (!state.gameDetail[game.id]) {
      let gameItem = JSON.parse(JSON.stringify(state.gameList[gameIndex]))

      currentGame = new GameItemModel({
        name: state.gameList[gameIndex].name,
        gameNodes: [new GameModel({
          id: new Date().valueOf(),
          name: gameItem.name,
          groupList: gameItem.groupList
        })]
      })
    }

    state.gameDetail[game.id] = currentGame
    state.currentGame = currentGame
  },
  // 改变比赛数据
  CHANGE_GAME_ITEM (state, { gameIndex, groupIndex }) {
    const gameId = state.currentGame.id
    const preSelected = state.currentGame.gameNodes[gameIndex].groupList[groupIndex].selected

    state.currentGame.gameNodes[gameIndex].groupList[groupIndex].selected = !preSelected
    state.currentGame.gameNodes[gameIndex].groupList.splice(state.currentGame.gameNodes[gameIndex].groupList.length)
    state.gameDetail[gameId] = Object.assign({}, state.currentGame)
  },
  // 改变比赛匹配小组
  REFRESH_GAME_GROUP (state, { gameIndex }) {
    const gameId = state.currentGame.id
    state.currentGame.gameNodes[gameIndex].groupList = shuffle(state.currentGame.gameNodes[gameIndex].groupList)
    // 触发刷新
    state.currentGame.gameNodes[gameIndex].groupList.splice(state.currentGame.gameNodes[gameIndex].groupList.length)
    state.gameDetail[gameId] = Object.assign({}, state.currentGame)
  },
  // 新增一轮比赛数据
  ADD_GAME_ROUND (state, { gameItemList }) {
    const gameId = state.currentGame.id
    state.currentGame.gameNodes.push(gameItemList)
    // 触发刷新
    state.currentGame.gameNodes.splice(state.currentGame.gameNodes.length)
    state.gameDetail[gameId] = Object.assign({}, state.currentGame)
  },
  // 清空所有比赛数据
  RESET_ALL_GAMES (state) {
    state.gameList = []
    state.gameDetail = {}
    state.currentGame = {}
  }
}

const actions = {
  // 增加比赛
  decrementGame ({ commit }, payload) {
    commit('DECREMENT_GAME', payload.game)
  },
  // 减少比赛
  incrementGame ({ commit }, payload) {
    commit('INCREMENT_GAME', payload.gameIndex)
  },
  // 刷新比赛排序
  refreshGameSort ({ commit }) {
    commit('REFRESH_GAME_SORT')
  },
  // 设置详情页数据
  setGameDetail ({ commit }, payload) {
    commit('SET_GAME_DETAIL', payload.gameIndex)
  },
  // 改变比赛数据
  changeGameItem ({ commit }, { gameIndex, groupIndex }) {
    commit('CHANGE_GAME_ITEM', { gameIndex, groupIndex })
  },
  // 改变小组排序
  refreshGameGroup ({ commit }, { gameIndex }) {
    commit('REFRESH_GAME_GROUP', { gameIndex })
  },
  // 新增一轮比赛数据
  addGameRound ({ commit }, { gameItemList }) {
    commit('ADD_GAME_ROUND', { gameItemList })
  },
  // 清空所有比赛数据
  resetAllGames ({ commit }) {
    commit('RESET_ALL_GAMES')
  }
}

export default {
  state,
  mutations,
  actions
}
