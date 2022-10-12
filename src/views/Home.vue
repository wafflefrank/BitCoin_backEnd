<template>
  <Loading :active="isLoading"></Loading>
  <div class="ve_home">
    <el-row>
      <el-col :span="16"><Shortcuts :shortcutsInfo="shortcutsInfo"/></el-col>
      <el-col :span="8">
        <el-calendar class="ve_calendar"></el-calendar>
      </el-col>
    </el-row>
    <LiveChart :liveChartInfo="liveChartInfo"/>
  </div>
</template>

<script>
import Shortcuts from '../components/Shortcuts.vue';
import LiveChart from '../components/LiveChart.vue';

export default {
  name: 'Home',
  components: {
    Shortcuts,
    LiveChart,
  },
  data() {
    return {
      rootApi: process.env.VUE_APP_TESTAPI,
      isLoading: false,
      shortcutsInfo: {},
      liveChartInfo: {},
    };
  },
  methods: {
    getHomeData() {
      this.isLoading = true;
      this.$http
        .get(
          `${this.rootApi}/backend/page/pageValue`,
        )
        .then((res) => {
          this.isLoading = false;
          if (res.data.code === 200) {
            this.shortcutsInfo = res.data.data;
            this.liveChartInfo = [
              { value: 1, name: 'ETH' },
              { value: 2, name: 'BTC' },
              { value: 3, name: 'USDT' },
            ];
            // this.liveChartInfo = res.data.data.walletData.currency;
          }
        });
    },
  },
  created() {
    this.getHomeData();
  },
};
</script>

<style lang="scss" scoped>
.ve_calendar {
  background: #29858b;
  border-radius: 10px;
  &:hover {
    box-shadow: 3px 3px 6px 1px rgba(0, 0, 0, 0.2);
  }

  :deep(.el-calendar__body) {
    padding-bottom: 12px !important;
    .el-calendar-day {
      height: auto !important;
    }
    .el-calendar-table td {
      border: none;
      text-align: center;
    }
  }
}
</style>
