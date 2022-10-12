<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
    style="width: 200px"
  >
    <el-menu-item index="1" @click="homePage()">
      <template #title>
        <el-icon><location /></el-icon>
        <span>首頁</span>
      </template>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>ROCKET管理後台</span>
      </template>
      <el-menu-item-group title="ROCKET管理後台">
        <el-sub-menu index="1-1">
          <template #title>會員管理</template>
          <el-menu-item index="1-1-1" @click="memberDetail()">會員列表</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="1-2">
          <template #title>財務管理</template>
          <el-menu-item index="1-2-1" @click="rechargeList()">充值列表</el-menu-item>
          <el-menu-item index="1-2-2" @click="withdrawDetail()">提領列表</el-menu-item>
          <el-menu-item index="1-2-3" @click="profitSharingRecord()">分成紀錄</el-menu-item>
          <el-menu-item index="1-2-4" @click="pledgeList()">質押列表</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="1-3">
          <template #title>設定管理</template>
          <el-menu-item index="1-3-1" @click="pledgeListsetting()">質押列表設定</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="1-4">
          <template #title>頁面管理</template>
          <el-menu-item index="1-4-1" @click="news()">最新消息</el-menu-item>
        </el-sub-menu>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script>
import { defineComponent } from 'vue';
import {
  Location, Menu as IconMenu,
} from '@element-plus/icons';

export default defineComponent({
  name: 'SideBar',
  components: {
    Location,
    IconMenu,
  },
  setup() {
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {
      handleOpen,
      handleClose,
    };
  },
  computed: {
    // 获取菜单对象中不包含子级的菜单
    noChildren() {
      return this.asideMenu.filter((item) => !item.children);
    },
    // 获取菜单对象中包含子级的菜单
    hasChildren() {
      return this.asideMenu.filter((item) => item.children);
    },
  },
  data() {
    return {
      // 配置菜单路由
      // asideMenu: [
      //     {
      //         path: '/',
      //         name: 'home',
      //         label: '首页',
      //         icon: 's-home',
      //     },
      //     {
      //         path: '/testlogin',
      //         name: 'testlogin',
      //         label: '登入',
      //         icon: 'video-play',
      //     },
      //     {
      //         path: '/user',
      //         name: 'user',
      //         label: '用户管理',
      //         icon: 'user',
      //     },
      //     // 设置子级菜单路由
      //     {
      //         label: '首頁',
      //         icon: 'user',
      //         children: [
      //             {
      //                 path: '/page1',
      //                 name: 'page1',
      //                 label: '页面1',
      //                 icon: 'setting',
      //             },
      //             {
      //                 path: '/page2',
      //                 name: 'page2',
      //                 label: '页面2',
      //                 icon: 'setting',
      //             },
      //         ],
      //     },
      // ],
    };
  },
  methods: {
    clickMenu(item) {
      this.$store.commit('selectMenu', item);
    },
    homePage() {
      this.$router.push('/');
    },
    memberDetail() {
      this.$router.push('/memberlist');
    },
    moneyDetail() {
      this.$router.push('/main/money');
    },
    // 2-1
    rechargeList() {
      this.$router.push('/rechargelist');
    },
    // 2-2
    withdrawDetail() {
      this.$router.push('/withdraw');
    },
    // 2-3
    profitSharingRecord() {
      this.$router.push('/profitsharing');
    },
    // 2-4
    pledgeList() {
      this.$router.push('/pledgelist');
    },
    // 3-1
    pledgeListsetting() {
      this.$router.push('/pledgelistsetting');
    },
    // 4-1
    news() {
      this.$router.push('/news');
    },
  },
});
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  background: rgba(12, 11, 8, 0.829);
}
</style>
