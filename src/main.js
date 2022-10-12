import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementPlus from 'element-plus'; // 引用 element-plus
import 'element-plus/dist/index.css'; // element-plus-樣式
import * as icons from '@element-plus/icons';
import locale from 'element-plus/lib/locale/lang/zh-tw'; // element-繁體中文版
import * as echarts from 'echarts'; // e-charts 圓餅圖
import _ from 'lodash'; // Lodash
import './mock/index'; // 自訂後端數據
import Loading from 'vue-loading-overlay'; // 讀取資料loading轉圈圈
import 'vue-loading-overlay/dist/vue-loading.css'; // 讀取資料loading轉圈圈-樣式
import VueSweetalert2 from 'vue-sweetalert2'; // 跳alert通知
import 'sweetalert2/dist/sweetalert2.min.css';

import moment from 'moment'; // 時間格式轉換
import App from './App.vue';
import router from './router';

const app = createApp(App);
// 全局註冊icons
Object.keys(icons).forEach((key) => {
  app.component(key, icons[key]);
});
// 圓餅圖
app.config.globalProperties.$echarts = echarts;
// 全局過濾
app.config.globalProperties.$filters = {
  currencyUSD(value) {
    return `$${value}`;
    // <p>{{ $filters.currencyUSD(accountBalance) }}</p> 全局註冊方法
  },
  dateTime(value) {
    return moment(value).format('YYYY-MM-DD');
  },
  dateTime2(value) {
    return moment(value).format('x');
  },
  dateTime3(value) {
    return moment(Number(value)).format('x');
  },
  // 轉換成時間日期+秒數
  dateTime4(value) {
    return moment(value).format('YYYY-MM-DD HH:mm:ss');
  },
};

app.component('Loading', Loading);
app.use(VueSweetalert2);
app.use(_);
app.use(moment);
app.use(router);
app.use(VueAxios, axios);
app.use(ElementPlus, { locale });
app.mount('#app');
