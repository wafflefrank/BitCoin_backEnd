<template>
  <el-container>
    <el-aside width="220px">
      <leftMenu :menu="menu"></leftMenu>
    </el-aside>
    <el-main>
      <el-scrollbar>
        <el-backtop></el-backtop>
        <breadcrumb
          :firstTitle="firstTitle"
          :secondTitle="secondTitle"
          :thirdTitle="thirdTitle"
        ></breadcrumb>
        <router-view />
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script>
import leftMenu from '../components/LeftMenu.vue';
import breadcrumb from '../components/NavBar/breadcrumb.vue';

export default {
  name: 'TestHome',
  components: {
    leftMenu,
    breadcrumb,
  },
  data() {
    return {
      menu: [
        {
          title: '总览',
          index: '/system/overview',
        },
        {
          title: '资产管理',
          index: '/assets',
          children: [
            {
              title: '硬件资产',
              index: '/system/assets/hardware',
            },
            {
              title: '软件资产',
              index: '/system/assets/software',
            },
          ],
        },
        {
          title: '账户管理',
          index: '/system/account',
        },
        {
          title: '角色管理',
          index: '/system/role',
        },
      ],
    };
  },
  computed: {
    // 一级面包屑都是系统管理，不需要动态
    firstTitle() {
      return '系统管理';
    },
    // 二级面包屑除了资产管理都是动态赋值，所以设置默认为资产管理
    secondTitle() {
      const secondTitle = '资产管理';
      this.menu.forEach((item) => {
        if (item.index === this.$route.path) return secondTitle === item.title;
        return true;
      });
      return secondTitle;
    },
    // 赋值资产管理下三级面包屑
    thirdTitle() {
      const thirdTitle = '';
      this.menu.forEach((item) => {
        if (item.children) {
          item.children.forEach((subitem) => {
            if (subitem.index === this.$route.path) return thirdTitle === subitem.title;
            return true;
          });
        }
      });
      return thirdTitle;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  :deep(.el-scrollbar__thumb) {
    background: linear-gradient(#00dbde 0%, #fc00ff 100%);
  }

  .el-aside {
    background: #f9f9f9;
    height: 100%;

    .el-menu {
      width: 100%;

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
          height: 70px;
          line-height: 70px;
          font-size: 18px;
          transition: all 0.2s;

          > img {
            width: 10px;
            height: 10px;
            margin-right: 20px;
          }
        }
      }

      .el-menu-item.is-active {
        background: #f4e2e2 !important;
        font-weight: 700;
        border-left: 10px solid #bf0f0f;
        color: #bf0f0f;
      }
    }
  }

  .el-main {
    .el-scrollbar {
      padding: 20px;
    }

    .el-breadcrumb {
      font-size: 16px;
      height: 32px;
    }
  }
}
</style>
