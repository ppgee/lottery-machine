<template>
  <div class="game">
    <nut-navbar
      class="nav-bar"
      :leftShow="false" 
      :rightShow="false"
    >比赛项目</nut-navbar>
    <nut-textinput
      class="game-input"
      v-model="gameName"
      placeholder="请输入游戏名称"
      :clearBtn="true"
    />
    <nut-row class="game-btn">
      <nut-col :span="24">
        <nut-button
          @click="addGame"
          shape="circle"
          block>
          增加
        </nut-button>
      </nut-col>
    </nut-row>
    <div v-for="(game, index) in gameList" :key="index">
      <nut-cell
        :title="game | formatName(index)"
        :showIcon="true"
        @click.native="toGameDetail(index)"
        @contextmenu.prevent.native="deleteGame(index)"
      >
      </nut-cell>
    </div>
    <nut-row v-if="gameList.length > 0" class="game-btn">
      <nut-col :span="24">
        <nut-button
          @click="refreshSort"
          shape="circle"
          block>
          刷新排序
        </nut-button>
      </nut-col>
    </nut-row>
  </div>
</template>

<script>
import GameModel from '@/model/game'

export default {
  name: 'game-page',
  data () {
    return {
      gameName: '',
      groupCount: 0
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
    }
  },
  methods: {
    // 增加游戏
    addGame () {
      if (this.gameName.length === 0) {
        return
      }

      if (this.groupList.length === 0) {
        this.$toast.text('请先创建小组')
        return
      }

      let game = new GameModel({
        id: new Date().valueOf(),
        name: this.gameName, // 如果名字为空则为默认名称
        groupList: this.groupList.map(group => {
          let groupInfo = JSON.parse(JSON.stringify(group))
          group.selected = false
          return groupInfo
        })
      })
      this.$store.dispatch('decrementGame', {
        game
      })
    },
    // 跳转到比赛详情
    toGameDetail (gameIndex) {
      // 设置游戏详情
      this.$store.dispatch('setGameDetail', {
        gameIndex
      })
      // 跳转到游戏详情页
      this.$router.push({
        name: 'game-detail-page'
      })
    },
    // 删除游戏
    deleteGame (index) {
      // 获取实例
      let self = this

      // 弹窗提示
      this.$dialog({
        title: '确认删除比赛？',
        closeBtn: true, // 显式右上角关闭按钮
        onOkBtn: function () { // 确定按钮点击事件
          self.$store.dispatch('incrementGame', {
            gameIndex: index
          })
          this.close()
        }
      })
    },
    // 刷新排序
    refreshSort () {
      this.$store.dispatch('refreshGameSort')
    }
  },
  filters: {
    // 格式化名称
    formatName (game, index) {
      return `${index + 1}、${game.name}`
    }
  }
}
</script>

<style lang="scss" scoped>
.game {
  padding: 48px 10px 10px;
  overflow-y: scroll;
  h3 {
    margin-bottom: 12px;
  }
  .game-input {
    margin-bottom: 6px;
  }
  .game-btn {
    margin-top: 6px;
    margin-bottom: 12px;
  }
}
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 12;
}
</style>