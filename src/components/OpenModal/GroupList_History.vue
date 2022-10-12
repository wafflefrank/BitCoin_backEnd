<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">調整層級紀錄</h5>
        </div>
        <div class="modal-body">
          <!-- 組設置  上半部分-->
          <el-row class="mb-4 mt-4">
            <el-col :span="24">
              <div class="group_set_content bg-purple-dark">
                <h5 class="text-start mb-4 ms-2 mustType text-dark">搜尋選項</h5>
                <!-- 資料表單 -->
                <div>
                  <el-form
                    ref="searchOption1"
                    :model="searchOption"
                    :rules="rules"
                    class="demo-ruleForm"
                  >
                    <el-row>
                      <!-- 左半邊 -->
                      <el-col :span="10">
                        <!-- 日期 -->
                        <el-row>
                          <el-col :span="24" class="add_left_style_1">
                            <!-- 日期1 🌭-->
                            <el-form-item label="日期" class="ms-2 dateStyle" prop="date1">
                              <!-- value-format="MMMM Do YYYY, h:mm:ss a" -->
                              <el-date-picker
                                v-model="searchOption.date1"
                                type="daterange"
                                range-separator="-"
                                start-placeholder="起始日期"
                                end-placeholder="結束日期"
                              />
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <!-- 會員帳號 -->
                        <el-row>
                          <el-col :span="24" class="add_left_style_2">
                            <el-form-item
                              label="會員帳號"
                              class="ms-2 groupName_style"
                              prop="memberAccount"
                            >
                              <el-select
                                v-model="searchOption.memberAccount"
                                placeholder="選擇帳號"
                                @change="chooseAccount(searchOption.memberAccount)"
                              >
                                <el-option
                                  v-for="item in searchOption.accountOptions"
                                  :key="item.id"
                                  :label="item.account"
                                  :value="item"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                            <el-form-item class="ms-2 groupName_style">
                              <el-input disabled v-model="searchOption.memberAccount"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-col>
                      <!-- 中間 -->
                      <el-col :span="5">
                        <!-- 幣別 -->
                        <el-row>
                          <el-col :span="24" class="add_left_style_1">
                            <el-form-item label="幣別" class="groupName_style" prop="currency"
                              ><el-select
                                v-model="searchOption.currency"
                                placeholder="選擇幣別"
                                @change="chooseCurrency(searchOption.currency)"
                              >
                                <el-option
                                  v-for="item in searchOption.currencyOptions"
                                  :key="item.id"
                                  :label="item.currency"
                                  :value="item"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-row>

                        <!-- 操作人員 -->
                        <el-row>
                          <el-col :span="24" class="add_left_style_1">
                            <el-form-item label="操作人員" class="groupName_style"
                              ><el-input disabled></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-col>
                      <!-- 右半邊 -->
                      <el-col :span="9">
                        <!-- 調整前層級 -->
                        <el-row>
                          <el-col :span="24" class="add_left_style_1">
                            <el-form-item
                              label="調整前層級"
                              class="groupName_style"
                              prop="g_original"
                              ><el-select
                                v-model="searchOption.g_original"
                                placeholder="選擇前層級"
                                @change="chooseG_original(searchOption.g_original)"
                              >
                                <el-option
                                  v-for="item in searchOption.g_originalOptions"
                                  :key="item.id"
                                  :label="item.g_original"
                                  :value="item"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                            <!-- 調整後層級 -->
                            <el-form-item
                              label="調整後層級"
                              class="ms-2 groupName_style"
                              prop="g_new"
                            >
                              <el-select
                                v-model="searchOption.g_new"
                                placeholder="選擇後層級"
                                @change="chooseG_new(searchOption.g_new)"
                              >
                                <el-option
                                  v-for="item in searchOption.g_newOptions"
                                  :key="item.id"
                                  :label="item.g_new"
                                  :value="item"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <!-- 調整類型 -->
                        <el-row>
                          <el-col :span="24" class="add_left_style_1">
                            <el-form-item
                              label="調整類型"
                              class="groupName_style"
                              prop="adjust_type"
                              ><el-select
                                v-model="searchOption.adjust_type"
                                placeholder="選擇類型"
                                @change="chooseAdjust_type(searchOption.adjust_type)"
                              >
                                <el-option
                                  v-for="item in searchOption.adjust_typeOptions"
                                  :key="item.id"
                                  :label="item.adjust_type"
                                  :value="item"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                    <div class="text-center justify-content-between pb-2">
                      <button
                        type="button"
                        class="btn btn-secondary me-1"
                        @click.prevent="resetForm()"
                      >
                        重置
                      </button>
                      <el-button class="editBtn ms-1" size="large" @click="imtScreen()">
                        <el-icon class="Search fs-4"> <Search></Search></el-icon>
                        搜尋
                      </el-button>
                    </div>
                  </el-form>
                </div>
              </div></el-col
            >
          </el-row>
          <!--層級設置 下半部分  -->
          <el-row class="mb-4 mt-4">
            <el-col :span="24">
              <div class="group_set_content bg-purple-dark">
                <h5 class="text-start mb-4 ms-2 mustType text-dark">層級調整紀錄</h5>
                <!-- 全局註冊方法 -->
                <!-- <p>{{ $filters.dateTime(date) }}</p> -->

                <!-- 資料表單 -->
                <div>
                  <el-row>
                    <el-col :span="24">
                      <el-table
                        ref="rankHistory"
                        :data="rankHistory.tableData"
                        style="width: 100%"
                        :header-cell-class-name="classNameFunc"
                        class="rank_table_style"
                      >
                        <!-- # -->
                        <el-table-column label="#" width="80" prop="id" align="center">
                        </el-table-column>
                        <!-- 更新時間 -->
                        <el-table-column
                          label="更新時間"
                          width="240"
                          prop="Createtime"
                          align="center"
                          sortable
                        >
                        </el-table-column>
                        <!-- 會員帳號-->
                        <el-table-column label="會員帳號" width="120" prop="account" align="center">
                        </el-table-column>
                        <!-- 幣別 -->
                        <el-table-column label="幣別" width="100" prop="currency" align="center">
                        </el-table-column>
                        <!-- 調整類型 -->
                        <el-table-column label="調整類型" prop="adjust_type" align="center">
                        </el-table-column>
                        <!-- 調整後層級 -->
                        <el-table-column label="調整前層級" prop="g_original" align="center">
                        </el-table-column>
                        <!-- 調整後層級 -->
                        <el-table-column label="調整後層級" prop="g_new" align="center">
                        </el-table-column>
                        <!-- 操作 -->
                        <el-table-column
                          label="操作人員"
                          width="120"
                          prop="Updateuser"
                          align="center"
                        >
                        </el-table-column>
                      </el-table>
                    </el-col>
                  </el-row>
                </div></div
            ></el-col>
          </el-row>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click.prevent="getRankHistory()">
            重置
          </button>
          <button type="button" class="btn btn-primary" @click="doRegister()">送出</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import moment from 'moment';
import { Search } from '@element-plus/icons';
// import { ElMessage } from 'element-plus';
import Modal from 'bootstrap/js/dist/modal';
// import Color from 'element-plus/es/components/color-picker/src/color';

export default {
  name: 'GroupList_History',
  data() {
    // 驗證下方表單的輸入值是否為數字
    const validateID = (rule, value, callback) => {
      if (!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)) {
        callback(new Error('請輸入正確ID數字'));
      } else {
        callback();
      }
    };
    // 驗證下方表單的輸入值是否為數字
    const validateNumber = (rule, value, callback) => {
      console.log(`value:${value}`);
      if (!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)) {
        callback(new Error('請輸入金額'));
      } else {
        callback();
      }
    };
    // 驗證下方表單的輸入值是否為數字(次數)
    const validateTimes = (rule, value, callback) => {
      console.log(`value:${value}`);
      if (!/^([0-9])$/.test(value)) {
        callback(new Error('至少填入0~9次'));
      } else {
        callback();
      }
    };

    return {
      // 打開Modal相關套件
      modal: {},
      // 上方搜尋區間
      searchOption: {
        memberAccount: '', // 會員帳號
        currency: '', // 幣種
        adjust_type: '', // 調整類型
        g_original: '', // 調整前層級
        g_new: '', // 調整後層級
        date_range: [], // 複選逗號區隔
        date1: '', // 起始時間
        date2: '', // 結束時間
        accountOptions: [], // 會員帳號下拉選項
        currencyOptions: [], // 幣別下拉選項
        adjust_typeOptions: [], // 調整類型下拉選項
        g_originalOptions: [], // 調整前層級下拉選項
        g_newOptions: [], // 調整後層級下拉選項
      },
      // 自動層級設置-讀取圖示
      loading1: false,
      // 下方層級設置
      rankHistory: {
        skip: '0', // 跳過幾筆
        limit: '20', // 一次幾筆
        orderType: 'ASC', // ID排序方式(DESC , ASC )
        orderBy: '', // 餘額排序( 輸入... money )
        tableData: [], // 層級資料顯示
        filterTableData: [], // 篩選後儲存資料的地方
        // 下方層級規則
        botRules: {
          group_id: [
            // 驗證1
            {
              required: true,
              message: 'ID必須填寫',
              trigger: 'blur',
            },
            // 驗證2
            { trigger: 'blur', validator: validateID },
          ],
          name: [
            {
              required: true,
              message: '組名稱必須填寫',
              trigger: 'blur',
            },
          ],
          name_show: [
            {
              required: true,
              message: '請填入層級顯示',
              trigger: 'blur',
            },
          ],
          upgrade_deposit: [
            {
              required: true,
              trigger: 'blur',
              validator: validateNumber,
            },
          ],
          upgrade_bet: [
            {
              required: true,
              trigger: 'blur',
              validator: validateNumber,
            },
          ],
          reserve_deposit: [
            {
              required: true,
              trigger: 'blur',
              validator: validateNumber,
            },
          ],
          reserve_bet: [
            {
              required: true,
              trigger: 'blur',
              validator: validateNumber,
            },
          ],
          deposit_min: [
            {
              required: true,
              trigger: 'blur',
              validator: validateNumber,
            },
          ],
          deposit_max: [
            {
              required: true,
              trigger: 'blur',
              validator: validateNumber,
            },
          ],
          withdraw_min: [
            {
              required: true,
              trigger: 'blur',
              validator: validateNumber,
            },
          ],
          withdraw_max: [
            {
              required: true,
              trigger: 'blur',
              validator: validateNumber,
            },
          ],
          withdraw_max_day: [
            {
              required: true,
              trigger: 'blur',
              validator: validateNumber,
            },
          ],
          withdraw_remind: [
            { required: true, message: '請填入次數' },
            { trigger: 'blur', validator: validateTimes },
          ],
          withdraw_remind_day: [
            {
              required: true,
              trigger: 'blur',
              validator: validateTimes,
            },
          ],
        },
      },
      // 上方層級規則
      rules: {
        memberAccount: [
          {
            required: false,
            message: '會員帳號必須填寫',
            trigger: 'blur',
          },
        ],
        currency: [
          {
            required: false,
            message: '幣別必須填寫',
            trigger: 'blur',
          },
        ],
        adjust_type: [
          {
            required: false,
            trigger: 'blur',
          },
        ],
        g_original: [
          {
            required: false,
            trigger: 'blur',
          },
        ],
        g_new: [
          {
            required: false,
            trigger: 'blur',
          },
        ],
        date_range: [
          {
            type: 'array',
            required: true,
            message: '請至少選擇一種日期區間',
            trigger: 'change',
          },
        ],
      },
    };
  },
  methods: {
    showModal() {
      this.modal.show();
    },
    // 隱藏會員視窗
    hideModal() {
      this.modal.hide();
    },
    // 取得層級調整紀錄
    getRankHistory() {
      const testapi = `${process.env.VUE_APP_TESTAPI}`;
      this.isLoading = true;
      this.$http
        .get(
          `${testapi}/backend/members/group_log?skip=${this.rankHistory.skip}&limit=${this.rankHistory.limit}&order=${this.rankHistory.orderType}&orderBy=${this.rankHistory.orderBy}`,
        )
        .then((res) => {
          this.isLoading = false;
          if (res.data.code === 200) {
            console.log(res.data.data.list);
            this.rankHistory.tableData = res.data.data.list;
            this.searchOption.currencyOptions = res.data.data.list;
            this.searchOption.accountOptions = res.data.data.list;
            this.searchOption.adjust_typeOptions = res.data.data.list;
            this.searchOption.g_originalOptions = res.data.data.list;
            this.searchOption.g_newOptions = res.data.data.list;
            // 篩選重複的幣種
            this.searchOption.currencyOptions = _.uniqBy(
              this.searchOption.currencyOptions,
              (item) => item.currency,
            );
            // 篩選重複的使用者帳號
            this.searchOption.accountOptions = _.uniqBy(
              this.searchOption.accountOptions,
              (item) => item.account,
            );
            // 篩選調整類型
            this.searchOption.adjust_typeOptions = _.uniqBy(
              this.searchOption.adjust_typeOptions,
              (item) => item.adjust_type,
            );
            // 篩選調整前級層級
            this.searchOption.g_originalOptions = _.uniqBy(
              this.searchOption.g_originalOptions,
              (item) => item.g_original,
            );
            // 篩選調整後級層級
            this.searchOption.g_newOptions = _.uniqBy(
              this.searchOption.g_newOptions,
              (item) => item.g_new,
            );
            // this.rankHistory.filterTableData = res.data.data.list;
            console.log(this.rankHistory.filterTableData);
            _.forEach(this.rankHistory.tableData, (item, key) => {
              console.log(item, key);
              console.log(item.Createtime);
              this.rankHistory.tableData[key].Createtime = this.$filters.dateTime(item.Createtime);
              // this.rankHistory.tableData[key].Createtime = '測試';
            });
            console.log(this.rankHistory.filterTableData);
          }
        });
    },
    // 取得日期篩選的data
    getRankHistory2() {
      const testapi = `${process.env.VUE_APP_TESTAPI}`;
      this.isLoading = true;
      this.$http
        .get(
          `${testapi}/backend/members/group_log?skip=${this.rankHistory.skip}&limit=${this.rankHistory.limit}&order=${this.rankHistory.orderType}&orderBy=${this.rankHistory.orderBy}`,
        )
        .then((res) => {
          this.isLoading = false;
          if (res.data.code === 200) {
            console.log(res.data.data.list);
            this.rankHistory.filterTableData = res.data.data.list;
            console.log(this.rankHistory.filterTableData);
            _.forEach(this.rankHistory.filterTableData, (item, key) => {
              console.log(item, key);
              console.log(item.Createtime);
              this.rankHistory.filterTableData[key].Createtime = this.$filters.dateTime(
                item.Createtime,
              );
              console.log(item.Createtime);
              // this.rankHistory.tableData[key].Createtime = '測試';
            });
            console.log(this.rankHistory.filterTableData);
          }
        });
    },
    // 篩選後的日期
    filterDate(time, stime, etime) {
      return time >= stime && time <= etime;
    },
    // 客製欄位樣式
    classNameFunc({ rowIndex, columnIndex }) {
      console.log(rowIndex, columnIndex);
      if (
        (columnIndex === 0 && rowIndex === 0)
        || (columnIndex === 2 && rowIndex === 0)
        || (columnIndex === 4 && rowIndex === 0)
        || (columnIndex === 6 && rowIndex === 0)
        || (columnIndex === 8 && rowIndex === 0)
        || (columnIndex === 10 && rowIndex === 0)
      ) {
        return 'header_title_dark';
      }
      if (
        (rowIndex === 1 && columnIndex === 0)
        || (rowIndex === 1 && columnIndex === 1)
        || (rowIndex === 2 && columnIndex === 2)
      ) {
        return 'header_title_dark';
      }
      return 'header_title_light';
    },
    // 重置搜尋表單
    resetForm() {
      this.$refs.searchOption1.resetFields();
      // this.$refs.rankSetting.resetFields();
    },
    // 送出新增會員表單
    doRegister() {
      const testapi = `${process.env.VUE_APP_TESTAPI}`;
      // 執行校驗
      this.$refs.ruleFormRef3.validate((valid) => {
        // 沒通過校驗
        if (!valid) {
          console.log('驗證失敗,表單格式不正缺');
          return false;
        }
        // 驗證通過為true，有一個不通過就是false
        console.log('可以註冊');
        // 通過校驗
        // 登入處理
        // ....
        // axios
        this.$http
          .post(`${testapi}/backend/members/group_add`, this.addRuleForm)
          .then((response) => {
            if (response.data.code === 200) {
              this.$swal.fire('新增成功!', `'${response.data.msg}`, 'success');
              this.modal.hide();
              this.$router.push('grouplist');

              console.log(response.data);
            } else {
              this.$swal.fire('註冊失敗', `${response.data.msg}`, 'error');
              console.log(response.data);
            }
          })
          .catch((error) => {
            console.log(error);
            console.log('新增失敗');
          });

        return true;
      });
      //   resetForm(); // 把表單重置成預設值
    },
    // 切換選擇的幣種
    chooseCurrency(item) {
      console.log(item.currency);
      this.searchOption.currency = item.currency;
    },
    // 切換選擇的帳號
    chooseAccount(item) {
      console.log(item.account);
      this.searchOption.memberAccount = item.account;
    },
    // 切換調整類型
    chooseAdjust_type(item) {
      console.log(item.adjust_type);
      this.searchOption.adjust_type = item.adjust_type;
    },
    // 切換調整前級
    chooseG_original(item) {
      console.log(item.g_original);
      this.searchOption.g_original = item.g_original;
    },
    // 切換調整後級
    chooseG_new(item) {
      console.log(item.g_new);
      this.searchOption.g_new = item.g_new;
    },
    // 搜尋
    imtScreen() {
      // 判断是否輸入搜尋欄位
      if (
        (!this.searchOption.date1[0] || !this.searchOption.date1[1])
        && !this.searchOption.memberAccount
        && !this.searchOption.currency
        && !this.searchOption.adjust_type
        && !this.searchOption.g_original
        && !this.searchOption.g_new
      ) {
        this.$message({
          type: 'warning',
          message: '請選擇搜尋範圍！',
        });
      } else if (
        this.searchOption.date1[0] !== undefined
        && this.searchOption.date1[1] !== undefined
      ) {
        // 获取全部表格数据
        // this.getRankHistory();
        console.log('抓到時間範圍囉');
        console.log('start ', this.searchOption.date1[0], this.searchOption.date1[1]);
        const stime = this.searchOption.date1[0].getTime(); // 起始時間
        const etime = this.searchOption.date1[1].getTime(); // 結束時間
        console.log('end ', stime, etime);
        // 原表格數據  = 篩選後的表格內容
        // _.forEach(this.rankHistory.filterTableData, (item, key) => {
        //   this.rankHistory.filterTableData[key].Createtime
        // = this.$filters.dateTime3(item.Createtime);
        //   console.log(item.Createtime, key);
        // });
        console.log(this.rankHistory.tableData);
        this.rankHistory.tableData = this.rankHistory.filterTableData.filter((item1) => {
          // const test = moment(item1.Createtime).toDate();
          // const time = test.getTime();
          // 把時間格式轉換成秒數
          const test = moment(item1.Createtime).valueOf();
          console.log(item1.Createtime, test);
          return test >= stime && test <= etime;
        });
        // 依會員帳號搜尋
      } else if (this.searchOption.memberAccount !== '') {
        this.rankHistory.tableData = this.rankHistory.filterTableData.filter((item1) => {
          console.log(item1.account);
          return item1.account === this.searchOption.memberAccount;
        });
        // 依貨幣搜尋
      } else if (this.searchOption.currency !== '') {
        this.rankHistory.tableData = this.rankHistory.filterTableData.filter((item1) => {
          console.log(item1.currency);
          return item1.currency === this.searchOption.currency;
        });
        // 依調整類型搜尋
      } else if (this.searchOption.adjust_type !== '') {
        this.rankHistory.tableData = this.rankHistory.filterTableData.filter((item1) => {
          console.log(item1.adjust_type);
          return item1.adjust_type === this.searchOption.adjust_type;
        });
        // 依調整前級搜尋
      } else if (this.searchOption.g_original !== '') {
        this.rankHistory.tableData = this.rankHistory.filterTableData.filter((item1) => {
          console.log(item1.g_original);
          return item1.g_original === this.searchOption.g_original;
        });
        // 依調整後級搜尋
      } else if (this.searchOption.g_new !== '') {
        this.rankHistory.tableData = this.rankHistory.filterTableData.filter((item1) => {
          console.log(item1.g_new);
          return item1.g_new === this.searchOption.g_new;
        });
      } else {
        console.log('啥都沒跑');
      }
    },
    testRow(scope) {
      console.log(scope, scope.row, scope.$index, scope.row.group_id);
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
    this.getRankHistory();
    this.getRankHistory2();
    // this.modal.show();
  },
  // created() {
  //   this.getRankHistory();
  // },
  components: {
    Search,
  },
};
</script>

<style lang="scss">
.group_set_content {
  padding: 10px 0 0;
  border-radius: 10px;
  flex-wrap: wrap;
  //   min-height: 36px;
}
.bg-purple-dark {
  background: #eff3f8;
}
.add_left_style_1 {
  & .el-form-item {
    display: inline-block; //el-form-item的標題顯示再輸入框上面
    margin-bottom: 15px;
  }
}
.add_left_style_2 {
  & .el-form-item {
    display: inline-block; //el-form-item的標題顯示再輸入框上面
    margin-bottom: 15px;
  }
}
.grid-content {
  padding: 10px 10px;
  border-radius: 10px;
  flex-wrap: wrap;
  //   min-height: 36px;
}
.bg-purple-dark {
  background: #eff3f8;
}
.botSetStyle .el-input__inner {
  border: 1px solid #dcdfe6;
  padding: 0 !important;
  text-align: center;
  &:focus {
    border-color: #409eff !important;
  }
}
.groupName_style .el-input__inner {
  width: 200px;
  padding: 10px;
  border: 1px solid #dcdfe6;
  &:focus {
    border-color: #409eff !important;
  }
}
.dateStyle .el-input__inner {
  width: 100%;
  padding: 0 26px;
  border: 1px solid #dcdfe6;
  &:focus {
    border-color: #409eff !important;
  }
}

.content_style .el-textarea__inner {
  width: 300px;
}
// 層級設置 欄位頭樣式
.rank_table_style {
  border-radius: 10px;
}
.header_title_dark {
  background: #575656 !important;
  color: white;
  text-align: center !important;
}
.header_title_light {
  background: #888686 !important;
  color: white;
  text-align: center !important;
}
// .table_row_center {
//   text-align: center;
//   background: #bb0011;
// }
.addStyle {
  //新增樣式
  background: none;
  color: #409eff;
  &:hover {
    transition: 0.7s;
    background: #236aa5;
    color: #fff;
  }
}
.deleteStyle {
  //刪除樣式
  background: none;
  color: #bb0011;
  &:hover {
    transition: 0.7s;
    background: #bb0011;
    color: #fff;
  }
}
.editBtn {
  background: #0b5ed7;
  color: #fff;
  &:hover {
    transition: 0.5s;
    background: #236aa5;
    color: #fff;
  }
}
</style>
