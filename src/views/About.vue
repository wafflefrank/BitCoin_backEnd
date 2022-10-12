<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'About',
  // 挂载的时候获取新闻列表
  mounted() {
    axios.get('/mock/testdata').then((res) => {
      // url即在mock.js中定义的
      console.log(res.data); // 打印一下响应数据
    });
  },
};
</script>
