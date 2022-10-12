<template>
  <Loading :active="isLoading"></Loading>
  <div class="mb-4 withdraw_content bg-purple-dark text-center">
    <!-- 資料表單 -->
    <el-form class="demo-ruleForm justify-content-between">
      <!-- 第一列 -->
      <el-row>
        <!-- 左半邊 -->
        <el-col :span="24" class="add_left_style_1">
          <el-form-item label="會員帳號" class="updateTime_style me-2" prop="tagName">
            <el-input
              v-model="searchInfo.account"
              placeholder="請輸入帳號"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="text-center justify-content-between mt-3">
        <button type="button" class="btn btn-secondary" @click.prevent="resetForm()">重置</button>
        <el-button class="editBtn ms-4" size="large" @click="getUserInfo(10, 0, 'search')">
          <el-icon class="Search fs-4"> <Search></Search></el-icon>
          搜尋
        </el-button>
      </div>
    </el-form>
  </div>

  <!-- 資料表單 -->
  <el-table
    :data="tableData"
    border
    stripe
    style="width: 100%"
    :header-cell-class-name="'member_title_dark'"
  >
    <el-table-column label="會員訊息">
      <el-table-column prop="account" sortable label="會員帳號"/>
      <el-table-column prop="Createtime" sortable label="註冊時間" :formatter="timeFormat"/>
    </el-table-column>
    <el-table-column label="錢包訊息">
      <el-table-column prop="btcAmount" sortable label="BTC" :formatter="stateFormat" />
      <el-table-column prop="ethAmount" sortable label="ETH" :formatter="stateFormat" />
      <el-table-column prop="usdtAmount" sortable label="USDT" :formatter="stateFormat"/>
    </el-table-column>
    <el-table-column label="上級訊息">
      <el-table-column prop="teacher_id" sortable label="上級ID"/>
      <el-table-column prop="teacher_code" sortable label="上級邀請碼"/>
    </el-table-column>
  </el-table>

  <!-- 分頁套件 -->
  <div class="titleSt yle">
    <el-pagination
      class="pageStyle"
      background
      @current-change="handleCurrentChange"
      @size-change="sizeChange"
      :current-page="currentPage"
      :page-sizes="pageSizeInfo"
      :page-size="pageSize"
      layout="prev, pager, next, sizes"
      :total="total"
      :small="small"
      style="margin: 10px 0px"
    ></el-pagination>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Member',
  data() {
    return {
      small: true, // 分頁樣式大小
      total: 0, // 總共多少頁數
      currentPage: 1, // 當前頁數
      pageSize: 10, // 當前頁顯示多少條
      pageSizeInfo: [10, 20, 30, 50],
      searchInfo: {
        account: '',
      },
      tableData: [],
    };
  },
  components: {},
  methods: {
    getUserInfo(limit = 10, skip = 0, searchType = 'get') {
      this.isLoading = true;
      let url = `/backend/members/members?skip=${skip}&limit=${limit}`;

      if (searchType === 'search') {
        this.currentPage = 1;
        if (this.searchInfo.account !== '') {
          url += `&account=${this.searchInfo.account}`;
        }
      }

      this.$http
        .get(
          url,
        )
        .then((res) => {
          this.isLoading = false;
          if (res.data.code === 200) {
            console.log('抓到table資料');
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
          }
        });
    },
    // 變換當前頁數
    handleCurrentChange(skip) {
      this.currentPage = skip; // 定義當前頁數 等於 skip
      if (skip <= 1) {
        // 若當前頁數 等於或小於1頁時
        this.getUserInfo(this.pageSize);
      } else if (skip > 1) {
        // 若當前頁數等於2.3.4.5頁.....
        this.getUserInfo(this.pageSize, this.pageSize * (skip - 1));
      }
    },
    // 變換每頁的項目數量
    sizeChange(limit) {
      this.pageSize = limit;
      this.getUserInfo(limit);
      this.currentPage = 1;
    },
    // 千分位
    stateFormat(row, column, cellValue) {
      if (cellValue) {
        let bellValue = cellValue;
        bellValue += '';
        if (!bellValue.includes('.')) bellValue += '.';
        return bellValue.replace(/(\d)(?=(\d{3})+\.)/g, ($0, $1) => `${$1},`).replace(/\.$/, '');
      }

      return 0;
    },
    timeFormat(row, column, cellValue) {
      const formatDate = moment(cellValue).format('lll');

      if (formatDate === 'Invalid date') {
        return '';
      }
      return moment(cellValue).format('lll');
    },
    resetForm() {
      this.searchInfo = {
        account: '',
      };

      this.getUserInfo();
    },
  },
  created() {
    this.getUserInfo();
  },
};
</script>

<style lang="scss">
.titleStyle {
  display: flex;
  margin-bottom: 20px;
  align-items: center;
}
.selectStyle {
  margin-right: 20px;
}
.el-pager + button.btn-next[type='button'] {
  margin-right: 20px;
}
.member_title_dark {
  color: rgb(212, 185, 28) !important;
  text-align: center !important;
}
.member_title_light {
  color: rgb(212, 185, 28) !important;
  text-align: center !important;
}
</style>
