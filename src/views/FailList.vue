<template>
  <!-- body顯示 -->
  <el-table :data="failList" border stripe style="width: 100%">
    <el-table-column prop="id" label="ID" />
    <el-table-column prop="account" label="會員帳號" />
    <el-table-column prop="name" label="真實姓名"> </el-table-column>
    <el-table-column label="備註" />
    <el-table-column prop="status" label="狀態" />
    <el-table-column prop="loginTime" label="最後失敗登入時間" />
    <el-table-column prop="country" sortable label="國家" />

    <el-table-column label="次數" />
    <el-table-column prop="ip" label="IP位置" />
    <el-table-column label="平台" />
    <el-table-column prop="terrace" label="測試器/版本" />
    <el-table-column label="操作"> </el-table-column>
  </el-table>

  <!-- 分頁套件 -->
  <div class="block">
    <el-pagination
      background
      @current-change="handleCurrentChange"
      @size-change="sizechange"
      :current-page="currentPage"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      layout="prev, pager, next, sizes"
      :total="total"
      style="margin: 10px 0px"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'FailList',
  data() {
    return {
      failList: [],

      total: 60, // 總共多少頁數
      currentPage: 1, // 當前頁數
      pagesize: 10, // 當前頁顯示多少條
      pagesizes: [10, 20, 30, 50],
      search: '',
    };
  },
  methods: {
    getFailList() {
      const testapi = `${process.env.VUE_APP_TESTAPI}`;
      this.isLoading = true;
      this.$http
        .get(`${testapi}/backend/members/login_Log?skip=0&limit=20&order=DESC&orderType`)
        .then((res) => {
          this.isLoading = false;
          console.log(res.data);
          if (res.data.code === 200) {
            //   console.log(res.data.message);
            this.failList = res.data.data.list;
            // console.log(this.newMember);
            // console.log(this.newMemberList);
          }
          // console.log(res.data);
        });
    },
    // 變換當前頁數
    handleCurrentChange(skip) {
      this.currentPage = skip; // 定義當前頁數 等於 skip
      if (skip <= 1) {
        // 若當前頁數 等於或小於1頁時
        this.getFailList(this.pagesize);
      } else if (skip > 1) {
        // 若當前頁數等於2.3.4.5頁.....
        this.getFailList(this.pagesize, this.pagesize * (skip - 1));
      }
    },
    // 變換每頁的項目數量
    sizechange(limit) {
      this.pagesize = limit;
      this.getFailList(limit);
      this.currentPage = 1;
    },
  },
  created() {
    this.getFailList();
    // this.getAddValue()
  },
};
</script>

<style lang="scss" scoped></style>
