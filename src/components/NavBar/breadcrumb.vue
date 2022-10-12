<template>
  <div class="example-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in breadList"
        :key="index"
        :to="{ path: item.path }"
        >{{ item.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'breadcrumb',
  data() {
    return {
      breadList: [], // 路由集合
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  methods: {
    isHome(route) {
      return route.name === '首頁';
    },
    getBreadcrumb() {
      let { matched } = this.$route;
      // 如果不是首页
      if (!this.isHome(matched[0])) {
        matched = [{ path: '/home', meta: { title: '首頁' } }].concat(matched);
      }
      this.breadList = matched;
    },
  },
  created() {
    this.getBreadcrumb();
  },
};
</script>

<style lang="scss" scoped>
.red {
  color: #bf0e0e;
  font-weight: bold;
}
</style>
