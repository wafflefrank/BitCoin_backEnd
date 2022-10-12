<template>
  <el-menu
    :default-active="defaultActive"
    router
    unique-opened
    background-text-color="#F4E2E2"
    background-color="#F9F9F9"
    text-color="#333333"
    active-text-color="#BF0E0E"
  >
    <!-- 由模块的home页面传来名为menu的数组，根据menu中值动态渲染左侧导航菜单-->
    <div v-for="(item, index) in menu" :key="index">
      <!-- 存在item.children,说明是二级菜单，渲染二级菜单 -->
      <el-submenu :index="index + ''" v-if="item.children">
        <template #title>
          <img :src="item.img" />
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item
          v-for="(subitem, subindex) in item.children"
          :index="subitem.index"
          :key="subitem.index"
          @click="giveAllTitle(subindex + 1)"
        >
          <template #title>
            <img :src="subitem.img" />
            <span>{{ subitem.title }}</span>
          </template>
        </el-menu-item>
      </el-submenu>
      <!-- 否则渲染一级菜单即可 -->
      <el-menu-item v-else :index="item.index">
        <img :src="item.img" />
        <template #title>{{ item.title }}</template>
      </el-menu-item>
    </div>
  </el-menu>
</template>

<script>
export default {
  name: 'LeftMenu',
  props: {
    menu: Array,
  },
  data() {
    return {
      defaultActive: '',
    };
  },
  mounted() {
    // 我设置el-menu-item的index跟routes中路由路径相同，所以this.$route.path设置为defaultActive，即可切换菜单活跃
    this.defaultActive = this.$route.path;
  },
};
</script>

<style lang="scss" scoped>
.el-menu {
  .el-submenu {
    :deep(.el-submenu__title) {
      background: #f9f9f9;
      height: 70px;
      line-height: 70px;
      font-size: 18px;
      transition: all 0.2s;
    }

    img {
      width: 30px;
      height: 30px;
      margin-right: 20px;
    }

    .el-menu-item {
      > img {
        width: 10px;
        height: 10px;
        margin-right: 20px;
      }
    }
  }

  .el-menu-item {
    height: 70px;
    line-height: 70px;
    font-size: 18px;
    transition: all 0.2s;
    img {
      width: 30px;
      height: 30px;
      margin-right: 20px;
    }
  }
  .el-menu-item.is-active {
    background: #f4e2e2 !important;
    font-weight: 700;
    border-left: 10px solid #bf0f0f;
  }
}
</style>
