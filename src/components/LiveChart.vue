<template>
  <div id="myChart" style="height: 500px; margin-top: 20px"></div>
</template>

<script>
export default {
  name: 'LiveChart',
  props: ['liveChartInfo'],
  data() {
    return {
      chartData: [],
    };
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'));
      // 绘制图表
      myChart.setOption({
        title: {
          text: '錢包圓餅圖',
        },
        tooltip: {},
        // xAxis: {
        //   data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        // },
        // yAxis: {},
        series: [
          {
            name: '數量',
            type: 'pie',
            radius: [50, 250],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8,
            },
            data: this.chartData,
          },
        ],
      });
    },
  },
  watch: {
    liveChartInfo() {
      if (Object.keys(this.liveChartInfo).length !== 0) {
        this.chartData = this.liveChartInfo;
        this.drawLine();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
