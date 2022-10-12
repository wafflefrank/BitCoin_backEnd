<template>
  <Loading :active="isLoading"></Loading>
  <div class="mb-4 withdraw_content bg-purple-dark text-center">
    <!-- 資料表單 -->
    <el-form class="demo-ruleForm justify-content-between">
      <!-- 第一列 -->
      <el-row>
        <!-- 左半邊 -->
        <el-col :span="12" class="add_left_style_1">
          <el-form-item label="會員帳號" class="updateTime_style me-2" prop="tagName">
            <el-input
              v-model="searchInfo.account"
              placeholder="請輸入帳號"
            />
          </el-form-item>
        </el-col>
        <!-- 右半邊 -->
        <el-col :span="12" class="add_left_style_1">
          <!-- 訂單編號 -->
          <el-form-item label="訂單編號" class="updateTime_style me-2" prop="tagName">
            <el-input
              v-model="searchInfo.number"
              placeholder="請輸入訂單編號"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="text-center justify-content-between mt-3">
        <button type="button" class="btn btn-secondary" @click.prevent="resetForm()">重置</button>
        <el-button class="editBtn ms-4" size="large" @click="getPledgeList(10, 0, 'search')">
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
    </el-table-column>
    <el-table-column label="質押訊息">
      <el-table-column prop="order_no" sortable label="單號"/>
      <el-table-column prop="currency" sortable label="幣別"/>
      <el-table-column prop="amount" sortable label="金額" :formatter="stateFormat"/>
      <el-table-column prop="monthProfit" sortable label="預估月收益" :formatter="stateFormat"/>
      <el-table-column prop="start_time" sortable label="開始日期" :formatter="timeFormat"/>
      <el-table-column prop="end_time" sortable label="結束日期" :formatter="timeFormat"/>
      <el-table-column prop="pledgeDays" sortable label="質押天數"/>
      <el-table-column prop="status" sortable label="狀態"/>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" type="primary" @click="getPledgeDetial(scope.row.id)">詳情</el-button>
      </template>
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

  <!-- 詳情談窗 -->
  <el-dialog v-model="modalShow" title="詳情" width="60%" center>
    <el-table
      :data="modalData"
      border
      stripe
      style="width: 100%"
      :header-cell-class-name="'member_title_dark'"
    >
      <el-table-column label="會員訊息">
        <el-table-column prop="member_id" sortable label="會員id"/>
      </el-table-column>
      <el-table-column label="質押訊息">
        <el-table-column prop="order_no" sortable label="單號"/>
        <el-table-column prop="currency" sortable label="幣別"/>
        <el-table-column prop="createTime" sortable label="創建日期" :formatter="timeFormat"/>
        <el-table-column prop="profit" sortable label="收益" :formatter="stateFormat"/>
        <el-table-column prop="before_amount" sortable label="原始帳戶金額" :formatter="stateFormat"/>
        <el-table-column prop="after_amount" sortable label="收益後帳戶金額" :formatter="stateFormat"/>
      </el-table-column>
    </el-table>
    <div class="titleSt yle">
      <el-pagination
        class="pageStyle"
        background
        @current-change="modalHandleCurrentChange"
        @size-change="modalSizeChange"
        :current-page="modalCurrentPage"
        :page-sizes="pageSizeInfo"
        :page-size="modalPageSize"
        layout="prev, pager, next, sizes"
        :total="modalTotal"
        :small="small"
        style="margin: 10px 0px"
      ></el-pagination>
    </div>
  </el-dialog>
</template>

<script>
import moment from 'moment';

export default {
  name: 'PledgeList',
  data() {
    return {
      modalShow: false,
      small: true, // 分頁樣式大小
      total: 0, // 總共多少頁數
      currentPage: 1, // 當前頁數
      pageSize: 10, // 當前頁顯示多少條
      modalId: 0,
      modalTotal: 0,
      modalCurrentPage: 1,
      modalPageSize: 10,
      pageSizeInfo: [10, 20, 30, 50],
      tableData: [],
      modalData: [],
      searchInfo: {
        account: '',
        number: '',
      },
    };
  },
  components: {},
  methods: {
    getPledgeList(limit = 10, skip = 0, searchType = 'get') {
      this.isLoading = true;
      let url = `/backend/pledge/pledgeList?skip=${skip}&limit=${limit}`;

      if (searchType === 'search') {
        this.currentPage = 1;
        if (this.searchInfo.account !== '') {
          url += `&account=${this.searchInfo.account}`;
        }

        if (this.searchInfo.number !== '') {
          url += `&order_no=${this.searchInfo.number}`;
        }
      }
      console.log();
      this.$http
        .get(
          url,
        )
        .then((res) => {
          this.isLoading = false;
          if (res.data.code === 200) {
            console.log(res.data.data);
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
          }
        });
    },
    getPledgeDetial(id, limit = 10, skip = 0) {
      this.modalId = id;

      this.$http
        .get(
          `/backend/pledge/pledgeProfit?skip=${skip}&limit=${limit}&pledge_id=${id}`,
        )
        .then((res) => {
          this.isLoading = false;
          if (res.data.code === 200) {
            this.modalData = res.data.data.list;
            this.modalTotal = res.data.data.total;
            this.modalShow = true;
          }
        });
    },
    // 變換當前頁數
    handleCurrentChange(skip) {
      this.currentPage = skip; // 定義當前頁數 等於 skip
      if (skip <= 1) {
        // 若當前頁數 等於或小於1頁時
        this.getPledgeList(this.pageSize);
      } else if (skip > 1) {
        // 若當前頁數等於2.3.4.5頁.....
        this.getPledgeList(this.pageSize, this.pageSize * (skip - 1));
      }
    },
    modalHandleCurrentChange(skip) {
      this.modalCurrentPage = skip;
      if (skip <= 1) {
        this.getPledgeDetial(this.modalId, this.modalPageSize);
      } else if (skip > 1) {
        this.getPledgeDetial(this.modalId, this.modalPageSize, this.modalPageSize * (skip - 1));
      }
    },
    // 變換每頁的項目數量
    sizeChange(limit) {
      this.pageSize = limit;
      this.getPledgeList(limit);
      this.currentPage = 1;
    },
    modalSizeChange(limit) {
      this.modalPageSize = limit;
      this.getPledgeDetial(this.modalId, limit);
      this.modalCurrentPage = 1;
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
        id: '',
        number: '',
      };

      this.getPledgeList();
    },
  },
  created() {
    this.getPledgeList();
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
