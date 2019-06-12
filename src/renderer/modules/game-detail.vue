<template>
  <div class="game-detail">
    <nut-navbar
      @on-click-back="goBack" 
      class="nav-bar"
      :leftShow="true" 
      :rightShow="false"
    >{{currentGame.name}}</nut-navbar>
    <div class="nut-tab">
      <div class="nut-tab-title based">
        <span v-for="(gameNode, index) in currentGameNodes"
          @click="changeGameItem(index)"
          :key="'gameNode' + index"
          :class="['nut-title-nav-list', 'nut-title-nav', {'nut-tab-active': index === currTab}]">
          <a href="javascript:void(0)" class="nut-tab-link">{{gameNode | formatName(index)}}</a>
        </span>
      </div>
    </div>

    <nut-cell class="game-group" v-for="(group, index) in currentGame.gameNodes[currTab].groupList" :key="'group' + index">
      <nut-checkbox
        slot="title"
        :value="group.selected"
        :disabled="currTabDisabled"
        @click.native="checkboxChange(index)"
        size="large">
        {{group.name}}
      </nut-checkbox>
    </nut-cell>

    <nut-row v-if="!currTabMatched" class="game-btn">
      <nut-col :span="24">
        <nut-button
          @click="matchGroup"
          shape="circle"
          block>
          开始匹配
        </nut-button>
      </nut-col>
    </nut-row>
    <nut-row v-if="currTabMatched && !currentGame.gameNodes[currTab + 1] && !this.finished" class="game-btn">
      <nut-col :span="24">
        <nut-button
          @click="createNextGameItem"
          shape="circle"
          block>
          进入下一轮比赛
        </nut-button>
      </nut-col>
    </nut-row>
  </div>
</template>

<script>
import GameModel from '@/model/game'

export default {
  name: 'game-detail-page',
  data () {
    return {
      currTab: 0,
      finished: false
    }
  },
  computed: {
    // 游戏列表
    gameList () {
      return this.$store.state.game.gameList
    },
    // 分组列表
    groupList () {
      return this.$store.state.group.groupList
    },
    // 当前比赛详情
    currentGame () {
      return this.$store.state.game.currentGame
    },
    // 当前比赛节点列表
    currentGameNodes () {
      return this.$store.state.game.currentGame.gameNodes
    },
    // 当前tab是否已经勾选，勾选则无法再随机匹配
    currTabMatched () {
      return this.$store.state.game.currentGame.gameNodes[this.currTab].groupList.some((group) => {
        return group.selected
      })
    },
    // 如果已经生成下一轮比赛，则禁用checkbox
    currTabDisabled () {
      return !!this.$store.state.game.currentGame.gameNodes[this.currTab + 1] || this.finished
    }
  },
  methods: {
    // 返回上一页
    goBack () {
      this.$router.go(-1)
    },
    // 切换比赛结果
    changeGameItem (itemTab) {
      this.currTab = itemTab
    },
    // 选中 / 取消选中
    checkboxChange (groupIndex) {
      if (this.currTabDisabled) {
        return
      }
      // 更新数据
      this.$store.dispatch('changeGameItem', {
        gameIndex: this.currTab,
        groupIndex
      })
    },
    // 匹配小组
    matchGroup () {
      // 刷新小组
      this.$store.dispatch('refreshGameGroup', {
        gameIndex: this.currTab
      })
    },
    // 生成下一轮比赛
    createNextGameItem () {
      // 当前比赛的小组情况
      const gameItemGroup = this.currentGame.gameNodes[this.currTab].groupList

      // 计算赢家
      const winners = gameItemGroup.reduce((preWinners, currGroup) => {
        if (currGroup.selected) {
          let nextRoundGroup = JSON.parse(JSON.stringify(currGroup))
          nextRoundGroup.selected = false
          preWinners.push(nextRoundGroup)
        }

        return preWinners
      }, [])

      // 如果只有一个，则为最终赢家
      if (winners.length === 1) {
        this.finished = true
        return
      }

      let game = new GameModel({
        id: new Date().valueOf(),
        name: this.currentGame.name, // 如果名字为空则为默认名称
        groupList: winners
      })
      this.$store.dispatch('addGameRound', {
        gameItemList: game
      })
    }
  },
  filters: {
    // 格式化名称
    formatName (gameItem, index) {
      if (index === 0) {
        return '小组赛'
      }

      return `淘汰赛${index + 1}`
    }
  }
}
</script>

<style lang="scss" scoped>
.game-detail {
  padding: 48px 10px 10px;
  overflow-y: scroll;
}
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 12;
}
.game-btn {
  margin-top: 6px;
  margin-bottom: 12px;
}
.game-group {
  &:nth-child(2n) {
    margin-bottom: 8px;
  }
}
.nut-tab-active {
  border-bottom: 1px solid #f0250f;
}
</style>