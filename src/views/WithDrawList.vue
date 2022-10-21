<template>
  <Loading :active="isLoading"></Loading>
  <div class="mb-4 withdraw_content bg-purple-dark text-center">
    <!-- 資料表單 -->
    <el-form class="demo-ruleForm justify-content-between">
      <!-- 第一列 -->
      <el-row>
        <!-- 左半邊 -->
        <el-col :span="12" class="add_left_style_1">
          <el-form-item label="帳號" class="updateTime_style me-2" prop="tagName">
            <el-input
              v-model="searchInfo.account"
              placeholder="請輸入帳號"
            />
          </el-form-item>
           <!-- 訂單編號 -->
           <el-form-item label="訂單編號" class="updateTime_style me-2" prop="tagName">
            <el-input
              v-model="searchInfo.number"
              placeholder="請輸入訂單編號"
            />
          </el-form-item>
        </el-col>
        <!-- 右半邊 -->
        <el-col :span="12" class="add_left_style_1">
          <!-- 時間區間 -->
          <el-form-item label="時間區間" class="updateTime_style me-2" prop="tagName">
            <el-select
              v-model="searchInfo.interval"
              placeholder="選擇區間"
            >
              <el-option
                v-for="item in intervalOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="text-center justify-content-between mt-3">
        <button type="button" class="btn btn-secondary" @click.prevent="resetForm()">重置</button>
        <el-button class="editBtn ms-4" size="large" @click="getRechargeList(10, 0, 'search')">
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
      <el-table-column prop="createTime" sortable label="註冊時間" :formatter="timeFormat"/>
    </el-table-column>
    <el-table-column label="提領訊息">
      <el-table-column prop="order_no" sortable label="單號"/>
      <el-table-column prop="currency" sortable label="幣別"/>
      <el-table-column prop="amount" sortable label="金額" :formatter="stateFormat"/>
      <el-table-column prop="fee" sortable label="手續費" :formatter="stateFormat"/>
      <el-table-column prop="status" sortable label="狀態"/>
      <el-table-column prop="rejectMsg" sortable label="駁回理由"/>
      <el-table-column prop="to_address" sortable label="錢包位置"/>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <div v-if="scope.row.status === '未審核'">
          <el-button size="small" type="primary" @click="verifyRecharge(scope.row, 'verify')">審核</el-button>
          <el-button size="small" type="warning" @click="verifyRecharge(scope.row, 'reject')">駁回</el-button>
        </div>
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
  <!-- 確認彈窗 -->
  <el-dialog v-model="modalShow" title="確認" width="60%" center>
    <div class="text-center justify-content-between pb-2">{{modalMessage}}</div>
    <template v-if="modalType === 'reject'">
      <el-form :rules="rules" ref="addReason_Form" :model="reasonForm_Data">
        <el-form-item label="駁回理由" prop="modalRejectMessage">
          <el-input
            v-model="reasonForm_Data.modalRejectMessage"
            placeholder="請輸入理由"
          />
        </el-form-item>
      </el-form>
      <el-row class="justify-content-between">
        <el-button type="primary" round @click="setRejectMessage('駁回理由1')">駁回理由1</el-button>
        <el-button type="primary" round @click="setRejectMessage('駁回理由2')">駁回理由2</el-button>
        <el-button type="primary" round @click="setRejectMessage('駁回理由3')">駁回理由3</el-button>
        <el-button type="primary" round @click="setRejectMessage('駁回理由4')">駁回理由4</el-button>
        <el-button type="primary" round @click="setRejectMessage('駁回理由5')">駁回理由5</el-button>
      </el-row>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="modalShow = false">取消</el-button>
        <el-button type="primary" @click="updateRecharge()">確認</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import moment from 'moment';

export default {
  name: 'WithDrawList',
  data() {
    return {
      modalShow: false, // 彈窗顯示
      modalType: 'verify',
      modalId: 0,
      modalMessage: '確認是否駁回',
      reasonForm_Data: {
        modalRejectMessage: '',
      },
      small: true, // 分頁樣式大小
      total: 0, // 總共多少頁數
      currentPage: 1, // 當前頁數
      pageSize: 10, // 當前頁顯示多少條
      pageSizeInfo: [10, 20, 30, 50],
      tableData: [],
      searchInfo: {
        account: '',
        number: '',
        interval: 'today',
      },
      intervalOptions: [
        {
          label: '當日',
          value: 'today',
        },
        {
          label: '近7日',
          value: 'week',
        },
        {
          label: '一個月',
          value: 'month',
        },
      ],
      // 充值表單規則
      rules: {
        // 轉帳網路
        modalRejectMessage: [
          {
            required: true,
            message: '請填入理由',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    getRechargeList(limit = 10, skip = 0, searchType = 'get') {
      this.isLoading = true;

      let url = `/backend/order/withdraw?skip=${skip}&limit=${limit}`;

      if (searchType === 'search') {
        this.currentPage = 1;
        if (this.searchInfo.account !== '') {
          url += `&account=${this.searchInfo.account}`;
        }

        if (this.searchInfo.number !== '') {
          url += `&order_no=${this.searchInfo.number}`;
        }

        url += `&interval=${this.searchInfo.interval}`;
      }
      this.$http
        .get(
          url,
        )
        .then((res) => {
          this.isLoading = false;
          if (res.data.code === 200) {
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
        this.getRechargeList(this.pageSize);
      } else if (skip > 1) {
        // 若當前頁數等於2.3.4.5頁.....
        this.getRechargeList(this.pageSize, this.pageSize * (skip - 1));
      }
    },
    // 變換每頁的項目數量
    sizeChange(limit) {
      this.pageSize = limit;
      this.getRechargeList(limit);
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
        number: '',
        interval: 'today',
      };

      this.getRechargeList();
    },
    verifyRecharge(data, type) {
      this.modalType = type;
      this.reasonForm_Data.modalRejectMessage = '';
      this.modalId = data.id;

      if (type === 'verify') {
        this.modalMessage = '確認是否審核';
      } else {
        this.modalMessage = '確認是否駁回';
      }

      this.modalShow = true;
    },
    updateRecharge() {
      const formData = {
        id: this.modalId,
        status: (this.modalType === 'verify') ? 1 : 9,
        msg: (this.modalType === 'verify') ? '' : this.reasonForm_Data.modalRejectMessage,
      };
      if (this.modalType === 'verify') {
        this.$http
          .post(
            '/backend/order/withdrawUpdate', formData,
          )
          .then((res) => {
            if (res.data.code === 200) {
              this.getRechargeList();
              this.$message({
                type: 'success',
                message: '執行成功',
              });
              this.modalShow = false;
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '執行失敗',
            });
          });
      } else {
        this.$refs.addReason_Form.validate((valid) => {
        // 表單驗證通過為true(才能送出)，有一個不通過就是false
          if (valid) {
            this.isValid = valid;
            console.log(valid);
            this.$http
              .post(
                '/backend/order/withdrawUpdate', formData,
              )
              .then((res) => {
                if (res.data.code === 200) {
                  this.getRechargeList();
                  this.$message({
                    type: 'success',
                    message: '執行成功',
                  });
                  this.modalShow = false;
                }
              })
              .catch(() => {
                this.$message({
                  type: 'error',
                  message: '執行失敗',
                });
              });
          }
          // 沒通過表單驗證
          console.log('驗證失敗');
          this.isValid = valid;
          return false;
        });
      }
    },
    setRejectMessage(message) {
      this.reasonForm_Data.modalRejectMessage = message;
    },
  },
  created() {
    this.getRechargeList();
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
