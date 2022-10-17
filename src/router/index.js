import { createRouter, createWebHashHistory } from 'vue-router';
import { ElMessage } from 'element-plus';
import axios from 'axios';
// import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'ROCKET管理後台',
    component: () => import('@/views/AppMain.vue'),
    redirect: { name: '首頁' },
    meta: {
      requireAuth: true, // 判斷是否需要驗證會員登入
    },
    children: [
      {
        path: 'home',
        name: '首頁',
        component: () => import('@/views/Home.vue'),
        meta: { title: '首頁' },
      },
      {
        path: 'memberlist',
        name: '會員列表',
        component: () => import(/* webpackChunkName: "about" */ '../views/Member.vue'),
        meta: {
          title: '在線會員',
          module: '個人資訊',
        },
      },
      // 充值列表
      {
        path: 'rechargelist',
        name: '充值列表',
        component: () => import(/* webpackChunkName: "about" */ '../views/RechargeList.vue'),
        meta: {
          title: '充值列表頁面',
          module: '充值列表頁面',
        },
      },
      // 提領列表
      {
        path: 'withdraw',
        name: '提領列表',
        component: () => import(/* webpackChunkName: "about" */ '../views/WithDrawList.vue'),
        meta: {
          title: '提領列表頁面',
          module: '提領列表頁面',
        },
      },
      // 分成紀錄
      {
        path: 'profitsharing',
        name: '分成紀錄',
        component: () => import(/* webpackChunkName: "about" */ '../views/ProfitSharingRecord.vue'),
        meta: {
          title: '分成紀錄頁面',
          module: '分成紀錄頁面',
        },
      },
      // 質押列表
      {
        path: 'pledgelist',
        name: '質押列表',
        component: () => import(/* webpackChunkName: "about" */ '../views/PledgeList.vue'),
        meta: {
          title: '質押列表頁面',
          module: '質押列表頁面',
        },
      },
      // 質押列表設定
      {
        path: 'pledgelistsetting',
        name: '質押列表設定',
        component: () => import(/* webpackChunkName: "about" */ '../views/PledgeListSetting.vue'),
        meta: {
          title: '質押列表設定頁面',
          module: '質押列表設定頁面',
        },
      },
      // 最新消息
      {
        path: 'news',
        name: '最新消息',
        component: () => import(/* webpackChunkName: "about" */ '../views/News.vue'),
        meta: {
          title: '最新消息頁面',
          module: '最新消息頁面',
        },
      },
    ],
  },
  {
    path: '/memberlist',
    name: '會員管理',
    component: () => import('../views/Member.vue'),
    // children: [
    //   {
    //     path: 'home',
    //     name: '首頁',
    //     component: () => import('@/views/Home.vue'),
    //     meta: { title: '首頁' },
    //   },
    //   {
    //     path: 'account',
    //     name: '會員列表',
    //     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    //     meta: {
    //       title: '關於測試',
    //       module: '個人資訊',
    //     },
    //   },
    // ],
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
  {
    path: '/shortcuts',
    name: 'Shortcuts',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Shortcuts.vue'),
  },
  {
    path: '/livechart',
    name: 'livechart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/LiveChart.vue'),
  },
  {
    path: '/products',
    name: 'products',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/OpenModal/Products.vue'),
  },
  {
    path: '/memberdetailmodal',
    name: 'memberdetailmodal',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/OpenModal/MemberDetial.vue'),
  },
  {
    path: '/grouplist_add',
    name: '組列表-新增組',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/OpenModal/GroupList_Add.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((m) => m.meta.requireAuth)) {
    axios.post('/backend/loginCheck').then((res) => {
      console.log('抓到後台登入狀態了', res.data);
      // 對路由進行驗證
      if (res.data.code === 200) {
        console.log('後臺成功登入', res.data);
        // 已經登陸
        next(); // 正常跳轉到你設定好的頁面
      } else {
        // 未登入則跳轉到登陸介面
        ElMessage({ showClose: true, message: '請先登入!', type: 'warning' });
        next({ path: '/login' });
      }
    });
    // console.log(document.cookie);
    // console.log(localStorage.getItem('user'));
  } else {
    next();
  }
});
export default router;
