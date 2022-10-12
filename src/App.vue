<template>
  <!-- Modal -->
  <router-view v-if="isRouterAlive" />
</template>

<script>
export default {
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    // 頁面重新整理
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style lang="scss">
@import './assets/all.scss';
.add_left_style_1 {
  & .el-form-item {
    display: inline-block; //el-form-item的標題顯示再輸入框上面
    margin-bottom: 10px;
    text-align: left;
  }
}
.el-select-dropdown__item.selected {
  color: #3d8ed5;
  font-weight: 700;
  &:hover {
    color: white;
    background: #3d8ed5;
    transition: 0.5s;
    font-weight: bold;
  }
}
// 編輯Icon 樣式
.editBtn2 {
  background: none;
  color: #409eff;
  &:hover {
    transition: 0.5s;
    background: #236aa5;
    color: #fff;
  }
  & .edit {
    font-size: 20px;
  }
}
.el-select-dropdown__item {
  color: #3d8ed5;
  font-weight: 700;
  &:hover {
    color: white;
    background: #3d8ed5;
    transition: 0.5s;
    font-weight: bold;
  }
}
</style>
