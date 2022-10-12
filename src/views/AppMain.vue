<template>
  <el-container>
    <el-aside width="auto"><SideBar></SideBar></el-aside>
    <el-container>
      <el-header>
        <Header></Header>
        <!-- <BreadCrumb></BreadCrumb> -->
      </el-header>
      <el-main>
        <el-scrollbar style="padding: 20px; box-sizing: border-box; background: #e4ebf0">
          <router-view></router-view>
          <!-- <router-view v-slot="{ Component }">
            <transition name="el-zoom-in-top" mode="out-in">
              <component :key="routerAlive" :is="Component" />
            </transition>
          </router-view> -->
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from '../components/CommenHeader.vue';
import SideBar from '../components/SideBar.vue';
// import BreadCrumb from '../components/NavBar/breadcrumb.vue';

export default {
  name: 'AppMain',
  components: {
    SideBar,
    // BreadCrumb,
    Header,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.el-header {
  padding: 0px;
}
</style>
