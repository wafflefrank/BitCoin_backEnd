<template>
  <Loading :active="isLoading"></Loading>
  <div class="mb-4 withdraw_content bg-purple-dark text-center">
    <!-- 資料表單 -->
    <el-form class="demo-ruleForm justify-content-between">
      <!-- 第一列 -->
      <el-row>
        <!-- 左半邊 -->
        <el-col :span="24" class="add_left_style_1">
          <el-form-item label="幣別" class="updateTime_style me-2" prop="tagName">
            <el-select
              v-model="searchInfo.currency"
              placeholder="選擇幣別"
            >
              <el-option
                v-for="item in currencyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="text-center justify-content-between mt-3">
        <el-button class="editBtn ms-4" size="large" @click="getPledgeList()">
          <el-icon class="Search fs-4"> <Search></Search></el-icon>
          搜尋
        </el-button>
      </div>
    </el-form>
  </div>
  <el-row class="mb-2">
    <el-col :span="19" :offset="0"></el-col>
    <el-col :span="5" :offset="0" class="text-end">
      <el-button size="small" type="success" @click="createSetting()">新增</el-button>
    </el-col>
  </el-row>
  <!-- 資料表單 -->
  <el-table
    :data="tableData"
    border
    stripe
    style="width: 100%"
    :header-cell-class-name="'member_title_dark'"
  >
    <el-table-column label="質押訊息">
      <el-table-column prop="currency" sortable label="幣別"/>
      <el-table-column prop="amount" sortable label="金額" :formatter="stateFormat"/>
      <el-table-column prop="month_profit" sortable label="預估月收益率" :formatter="stateFormat"/>
      <el-table-column prop="percentage" sortable label="收益率"/>
      <el-table-column prop="days" sortable label="委託週期"/>
      <el-table-column prop="status" sortable label="狀態"/>
      <el-table-column prop="Updatetime" sortable label="更新時間" :formatter="timeFormat"/>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" type="primary" @click="getPledgeSettingDetial(scope.row)">修改</el-button>
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

  <!-- 修改彈窗 -->
  <el-dialog v-model="modalShow" :title="modalTitle" width="60%" center>
      <el-form>
        <el-form-item label="幣別">
          <el-select
              v-model="updateInfo.currency"
              placeholder="選擇幣別"
            >
              <el-option
                v-for="item in currencyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="收益率(%)">
          <el-input-number v-model="updateInfo.percentage" :min="0" :max="100" :step="0.1"/>
        </el-form-item>
        <el-form-item label="委託週期">
          <el-input-number v-model="updateInfo.days" :precision="0" :min="0" :max="100000" />
        </el-form-item>
        <el-form-item label="預估月收益(%)">
          <el-input-number v-model="updateInfo.month_profit" :min="0" :max="100" :step="0.1"/>
        </el-form-item>
        <el-form-item label="狀態">
          <el-select
              v-model="updateInfo.status"
              placeholder="狀態"
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
        </el-form-item>
      </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="modalShow = false">取消</el-button>
        <el-button type="primary" @click="updateSetting">確認</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import moment from 'moment';

export default {
  name: 'PledgeListSetting',
  data() {
    return {
      rootApi: process.env.VUE_APP_TESTAPI,
      modalShow: false,
      modalType: 'create',
      modalTitle: '新增質押設定',
      modalId: 0,
      small: true, // 分頁樣式大小
      total: 0, // 總共多少頁數
      currentPage: 1, // 當前頁數
      pageSize: 10, // 當前頁顯示多少條
      pageSizeInfo: [10, 20, 30, 50],
      tableData: [],
      modalData: [],
      searchInfo: {
        currency: 'BTC',
      },
      updateInfo: {
        currency: 'BTC',
        percentage: 0,
        days: 0,
        month_profit: 0,
        status: 1,
      },
      currencyOptions: [
        {
          label: 'BTC',
          value: 'BTC',
        },
        {
          label: 'ETH',
          value: 'ETH',
        },
        {
          label: 'USDT',
          value: 'USDT',
        },
      ],
      statusOptions: [
        {
          label: '開啟',
          value: 1,
        },
        {
          label: '關閉',
          value: 0,
        },
      ],
    };
  },
  methods: {
    getPledgeList() {
      this.isLoading = true;
      this.$http
        .get(
          `${this.rootApi}/backend/pledge/pledgeSetList?currency=${this.searchInfo.currency}`,
        )
        .then((res) => {
          this.isLoading = false;
          if (res.data.code === 200) {
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
          }
        });
    },
    getPledgeSettingDetial(data) {
      this.modalTitle = '修改質押設定';
      this.modalType = 'edit';
      this.modalId = data.id;
      this.updateInfo.currency = data.currency;
      this.updateInfo.percentage = Number(data.percentage.replace('%', ''));
      this.updateInfo.days = data.days;
      this.updateInfo.month_profit = Number(data.month_profit.replace('%', ''));
      this.updateInfo.status = data.status === '開啟' ? 1 : 0;
      this.modalShow = true;
    },
    createSetting() {
      this.modalShow = true;
      this.modalType = 'create';
      this.modalTitle = '新增質押設定';
    },
    editSetting() {
      this.modalShow = true;
      this.modalType = 'create';
      this.modalTitle = '新增質押設定';
    },
    updateSetting() {
      this.isLoading = true;
      if (this.modalType === 'create') {
        this.$http
          .post(
            `${this.rootApi}/backend/pledge/pledgeSetAdd`, this.updateInfo,
          )
          .then((res) => {
            this.isLoading = false;
            if (res.data.code === 200) {
              this.getPledgeList();
              this.modalShow = false;
            }
          });
      } else {
        const formData = {
          id: this.modalId,
          ...this.updateInfo,
        };

        this.$http
          .post(
            `${this.rootApi}/backend/pledge/pledgeSetUpdate`, formData,
          )
          .then((res) => {
            this.isLoading = false;
            if (res.data.code === 200) {
              this.getPledgeList();
              this.modalShow = false;
            }
          });
      }
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
    // 變換每頁的項目數量
    sizeChange(limit) {
      this.pageSize = limit;
      this.getPledgeList(limit);
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
