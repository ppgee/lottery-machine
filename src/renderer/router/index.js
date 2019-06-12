import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/group',
      name: 'group-page',
      component: require('@/modules/group').default
    },
    {
      path: '/game',
      name: 'game-page',
      component: require('@/modules/game').default
    },
    {
      path: '/game-detail',
      name: 'game-detail-page',
      component: require('@/modules/game-detail').default
    },
    {
      path: '*',
      redirect: '/group'
    }
  ]
})
