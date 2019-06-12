<template>
  <div class="group">
    <nut-navbar
      class="nav-bar"
      :leftShow="false" 
      :rightShow="true"
    >
      <span>分组信息</span>
      <a slot="more-icon" class="clear-btn" @click="resetAll">重置应用</a>
    </nut-navbar>
    <nut-textinput
      class="group-input"
      v-model="groupName"
      :placeholder="nextDefaultName"
      :clearBtn="true"
    />
    <nut-row class="group-btn">
      <nut-col :span="24">
        <nut-button
          @click="addGroup"
          shape="circle"
          block>
          增加
        </nut-button>
      </nut-col>
    </nut-row>
    <div v-for="(group, index) in groupList" :key="index">
      <nut-cell
        :title="group.name"
        :showIcon="true"
        @click.native="deleteGroup(index)"
      >
      </nut-cell>
    </div>
  </div>
</template>

<script>
import GroupModel from '@/model/group'

export default {
  name: 'group-page',
  data () {
    return {
      nextDefaultName: '小组1', // 默认分组名
      groupName: '' // 分组名
    }
  },
  computed: {
    // 分组列表
    groupList () {
      return this.$store.state.group.groupList
    }
  },
  methods: {
    // 增加分组
    addGroup () {
      let group = new GroupModel({
        id: new Date().valueOf(),
        name: this.groupName || this.nextDefaultName // 如果名字为空则为默认名称
      })
      this.$store.dispatch('decrementGroup', {
        group
      })

      // 更新默认名
      this.nextDefaultName = `小组${this.groupList.length + 1}`
    },
    // 删除分组
    deleteGroup (index) {
      // 获取实例
      let self = this

      // 弹窗提示
      this.$dialog({
        title: '确认删除小组？',
        content: '删除后，以往比赛结果将重置',
        closeBtn: true, // 显式右上角关闭按钮
        onOkBtn: function () { // 确定按钮点击事件
          self.$store.dispatch('incrementGroup', {
            groupIndex: index
          })
          this.close()
        }
      })
    },
    // 重置全部
    resetAll () {
      let self = this
      // 弹窗提示
      this.$dialog({
        title: '确认重置应用？',
        content: '重置后所有数据将清空',
        closeBtn: true, // 显式右上角关闭按钮
        onOkBtn: function () { // 确定按钮点击事件
          self.$store.dispatch('resetGroup')
          self.$store.dispatch('resetAllGames')
          this.close()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.group {
  padding: 48px 10px 10px;
  overflow-y: scroll;
  h3 {
    margin-bottom: 12px;
  }
  .group-input {
    margin-bottom: 6px;
  }
  .group-btn {
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
.clear-btn {
  cursor: pointer;
}
</style>