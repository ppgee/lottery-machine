<template>
  <div id="app">
    <router-view></router-view>
    <nut-tabbar @tab-switch="changeTab" :tabbarList="tabList" :bottom="true"></nut-tabbar>
  </div>
</template>

<script>
export default {
  name: 'lottery-machine',
  data () {
    return {
      // tab 列表
      tabList: [
        {
          tabTitle: '比赛',
          name: 'game-page',
          curr: false,
          icon: require('@/assets/icons/game.png'),
          activeIcon: require('@/assets/icons/game-active.png')
        },
        {
          tabTitle: '分组',
          name: 'group-page',
          curr: true,
          icon: require('@/assets/icons/group.png'),
          activeIcon: require('@/assets/icons/group-active.png')
        }
      ]
    }
  },
  methods: {
    // 改变tab
    changeTab ({ name }) {
      this.$router.push({
        name
      })
    }
  }
}
</script>

<style lang="scss">
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

body {
  font-family: 'Source Sans Pro', sans-serif;
  min-width: 100vw;
  min-height: 100vh;
  background: #f6f6f6;
}

#app {
  padding-bottom: 70px;
}
</style>

