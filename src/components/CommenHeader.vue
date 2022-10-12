<template>
  <header class="navbar">
    <div class="l-content">
      <el-button type="warning" style="margin: 0px 20px"
        ><el-icon style="font-size: 30px"><Menu /></el-icon
      ></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="(item, index) in breadList"
          :key="index"
          :to="{ path: item.path }"
          >{{ item.name }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <span class="testAdmin" style="font-size: 20px; color: #fff; margin-right: 20px">{{
        accountName
      }}</span>
        <el-icon style="font-size: 30px" color="#fff"><avatar /></el-icon>
      <el-dropdown size="small">
        <span class="el-dropdown-link">
          <el-icon class="el-icon--right">
            <arrow-down class="arrow"></arrow-down>
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">登出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { Menu, ArrowDown, Avatar } from '@element-plus/icons';
import { ElMessage } from 'element-plus';

export default {
  name: 'CommenHeader',
  data() {
    return {
      accountName: '',
      breadList: [], // 路由集合
    };
  },
  methods: {
    logout() {
      this.$router.push('/login');
      ElMessage({ showClose: true, message: '已登出!', type: 'success' });
    },
    isHome(route) {
      return route.name === 'home';
    },
    getBreadcrumb() {
      let { matched } = this.$route;
      // 如果不是首頁
      if (!this.isHome(matched[0])) {
        matched = [{ path: '/home', meta: { title: '首頁' } }].concat(matched);
      }
      this.breadList = matched;
    },
    // getLogincheck() {
    //   this.$http.get('/testapi/backend/loginCheck').then((res) => {
    //     if (res.data.code === 200) {
    //       // console.log(res.data.data.account)
    //       this.accountName = res.data.data.account;
    //     }
    //   });
    // },
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  components: {
    Menu,
    ArrowDown,
    Avatar,
  },
};
</script>

<style lang="scss" scoped>
.el-button {
  padding: 5px 5px;
}
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  background: rgba(12, 11, 8, 0.829);
}
.arrow {
  font-size: 20px;
  color: white;
}

.l-content,
.r-content {
  display: flex;
  align-items: center;
}
.el-dropdown-link {
  margin-right: 30px;
}
</style>
<style lang="scss">
.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
  color: rgb(255, 255, 255);
}
</style>
