<template>
  <!-- 載入讀取 -->
  <Loading :active="isLoading"></Loading>
  <div class="text-end mb-3">
    <button type="button" class="btn hotSort btn-sm me-3" @click="filter_status()">銀行配置</button>
    <button type="button" class="btn hotSort btn-sm me-3" @click="filter_status()">帳戶紀錄</button>
    <button type="button" class="btn hotSort btn-sm" @click="$refs.addThirdpay_Modal.showModal">
      新增
    </button>
  </div>
  <!-- 新增三方支付彈窗 -->
  <ThirdpayAdd ref="addThirdpay_Modal"></ThirdpayAdd>
  <!-- 組設置  上半部分-->
  <el-row>
    <el-col :span="24">
      <div class="mb-4 bg-purple-dark withdraw_content">
        <!-- 資料表單 -->
        <div>
          <el-form ref="search_form" :model="searchOption" class="demo-ruleForm">
            <el-row>
              <!-- 資料內容 -->
              <el-col :span="24" class="add_left_style_1">
                <div class="d-flex justify-content-between">
                  <!-- 第三方平台🍖 -->
                  <el-form-item label="第三方平台" class="thirdPay_style me-2" prop="platform">
                    <el-select
                      v-model="searchOption.platform"
                      placeholder="選擇第三方平台名稱"
                      @change="chooseThird_platform(searchOption.platform)"
                    >
                      <el-option label="全部" value="all"></el-option>
                      <el-option
                        v-for="item in searchOption.thirdPlatform_options"
                        :key="item.id"
                        :label="item.platform"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <!-- 平台種類🍖 -->
                  <el-form-item label="平台種類" class="thirdPay_style me-2" prop="platform_type">
                    <el-select
                      v-model="searchOption.platform_type"
                      placeholder="選擇平台種類"
                      @change="choosePlatform_type(searchOption.platform_type)"
                    >
                      <el-option label="全部" value="all"></el-option>
                      <el-option
                        v-for="item in searchOption.platformType_options"
                        :key="item.id"
                        :label="item.platform_type"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <!-- 支付類型 🍖-->
                  <el-form-item label="支付類型" class="thirdPay_style me-2" prop="pay_type">
                    <el-select
                      v-model="searchOption.pay_type"
                      placeholder="選擇類型"
                      @change="choosePay_type(searchOption.pay_type)"
                    >
                      <el-option label="全部" value="all"></el-option>
                      <el-option label="記憶卡" value="memoryCard"></el-option>
                      <el-option label="網銀掃碼" value="qrCode"></el-option>
                      <el-option label="MoMo" value="MoMo"></el-option>
                      <el-option label="Zalo" value="Zalo"></el-option>
                      <el-option label="Viettel Pay" value="Viettel Pay"></el-option>
                      <el-option label="刮刮卡" value="letto"></el-option>
                    </el-select>
                  </el-form-item>
                  <!-- 幣別 🍖-->
                  <el-form-item label="幣別" class="thirdPay_style me-2" prop="currency">
                    <el-select
                      v-model="searchOption.currency"
                      placeholder="選擇幣別"
                      @change="choose_currency(searchOption.currency)"
                    >
                      <el-option label="全部" value="all"></el-option>
                      <el-option
                        v-for="item in searchOption.currency_options"
                        :key="item.id"
                        :label="item.currency"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <!-- 狀態 🍖-->
                  <el-form-item label="收款狀態" class="thirdPay_style me-2" prop="deposit_status">
                    <el-select
                      v-model="searchOption.deposit_status"
                      placeholder="選擇狀態"
                      @change="choose_status(searchOption.deposit_status)"
                    >
                      <el-option label="全部" value="all"></el-option>
                      <el-option label="啟動" value="enable"></el-option>
                      <el-option label="關閉" value="disable"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <div class="text-center justify-content-between mt-3">
              <button type="button" class="btn btn-secondary me-1" @click.prevent="resetForm()">
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
  <!-- 第三方 下半部份 -->
  <div class="d-flex justify-content-between">
    <h5 class="text-start mb-4 ms-2 mustType text-dark">第三方支付平台列表</h5>
  </div>
  <el-table
    ref="bankList_table"
    :data="thirdPay_list.thirdPayList_table"
    style="width: 100%"
    :header-cell-class-name="classNameFunc"
    class="tags_table_style"
  >
    <el-table-column prop="platform" label="第三方平台" align="center" width="110">
      <template v-slot="{ row }">
        <el-tag
          effect="dark"
          :type="
            row.platform === '123Pay'
              ? 'success'
              : 'danger' && row.platform === 'KolaPay'
              ? 'warning'
              : 'danger' && row.platform === 'MomoPay'
              ? ''
              : 'danger'
          "
        >
          {{ row.platform }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="title" width="110" label="顯示名稱" align="center"> </el-table-column>
    <el-table-column prop="currency" width="100" label="幣別" align="center">
      <template v-slot="{ row }">
        <el-tag :type="row.currency === '越南盾' ? 'danger' : 'success'">
          {{ row.currency }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="支付類型" align="center">
      <!-- 記憶卡 -->
      <el-table-column prop="debit_card" label="記憶卡" align="center">
        <template v-slot="{ row }">
          <el-tag :type="row.debit_card === '7' ? 'success' : 'danger'">
            {{ formatgmtUsed(row.debit_card) }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- 網銀掃碼 -->
      <el-table-column
        prop="bank_qr"
        label="網銀掃碼"
        width="100"
        align="center"
        class="image_size"
      >
        <template v-slot="{ row }">
          <img
            class="qrCode_size"
            src="../../assets/1200px-QRcode_image.svg.png"
            :alt="row.bank_qr"
          />
        </template>
      </el-table-column>
      <!-- MoMo -->
      <el-table-column prop="momo_pay" width="100" label="MoMo" align="center">
        <template v-slot="{ row }">
          <img
            class="qrCode_size"
            src="../../assets/pwegh6kadcb37kuz0woj.webp"
            :alt="row.momo_pay"
          />
        </template>
      </el-table-column>
      <!-- Zalo -->
      <el-table-column prop="zalo_pay" label="Zalo" align="center">
        <template v-slot="{ row }">
          <img class="zaloPay_size" src="../../assets/ZaloPay_logo.webp" :alt="row.zalo_pay" />
        </template>
      </el-table-column>
      <!-- viettel_pay -->
      <el-table-column width="150" prop="viettel_pay" label="Viettel Pay" align="center">
        <template v-slot="{ row }">
          <img
            class="viettelPay_size"
            src="../../assets/Viettel_pay_logo_2019.webp"
            :alt="row.viettel_pay"
          />
        </template>
      </el-table-column>
      <!-- 刮刮卡 -->
      <el-table-column prop="vng_card" label="刮刮卡" align="center">
        <template v-slot="{ row }">
          <el-tag :type="row.status === 'enable' ? 'success' : 'danger'">
            {{ '啟動' }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table-column>

    <!-- 出款 -->
    <el-table-column
      :formatter="stateFormat"
      width="110"
      prop="hierarchy_detail_id"
      label="VIP等級"
      align="center"
    >
    </el-table-column>
    <el-table-column
      width="130"
      :formatter="stateFormat"
      prop="deposit_limit_day"
      label="單日存款額上限"
      align="center"
    >
    </el-table-column>
    <el-table-column
      width="130"
      :formatter="stateFormat"
      prop="deposit_limit_total"
      label="累計存款額上限"
      align="center"
    >
    </el-table-column>
    <!-- 更新人員 -->
    <el-table-column width="110" prop="Updateuser" label="更新人員" align="center" />
    <!-- 更新時間  -->
    <el-table-column width="200" prop="Updatetime" label="更新時間" align="center" />
    <!-- 狀態 -->
    <el-table-column width="110" prop="income_status" label="狀態" align="center">
      <template v-slot="{ row }">
        <el-tag :type="row.income_status === 'enable' ? 'success' : 'danger'">
          {{ formatgmtUsed(row.income_status) }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column width="110" prop="" label="操作" align="center">
      <template #default="scope">
        <el-button class="editBtn2" size="small" @click="openModal(scope.row)"
          ><el-icon class="edit"> <Edit></Edit></el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import _ from 'lodash';
import ThirdpayAdd from '../../components/OpenModal/FinancialModal/ThirdPay_Add.vue';

export default {
  name: 'ThirdPay',
  components: {
    ThirdpayAdd,
  },
  data() {
    return {
      isLoading: false, // 轉圈讀條
      // 上方搜尋區間
      searchOption: {
        platform: '',
        platform_type: '',
        title: '',
        pay_type: '',
        bank_transfer: '', // 銀行轉出顯示
        bank_link: '', // 銀行綁定
        currency: '', // 幣別
        deposit_status: '', // 收款狀態
        dispensing_status: '', // 出款狀態
        currency_options: [], // 幣別下拉選項
        thirdPlatform_options: [], // 第三方平台下拉選項
        platformType_options: [], // 平台下拉選項
        payType_options: [], // 支付類型下拉選項
        status_options: [], // 收款狀態顯示下拉選項
        dispensingStatus_options: [], // 出款狀態顯示下拉選項
      },
      //  下方table
      thirdPay_list: {
        skip: '0', // 跳過幾筆
        limit: '20', // 一次幾筆
        order: 'ASC', // ID排序方式(DESC , ASC )
        orderType: 'id', // 餘額排序( 輸入... money )
        thirdPayList_table: [], // 銀行列表資料顯示
        filterTableData: [], // 篩選後儲存資料的地方
      },
    };
  },
  methods: {
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
      if (columnIndex === 8 && rowIndex === 0) {
        return 'text-second';
      }
      if (columnIndex === 7 && rowIndex === 1) {
        return 'image_size';
      }
      return 'header_title_light';
    },
    // 千分位
    stateFormat(row, column, cellValue) {
      let bellValue = cellValue;
      bellValue += '';
      if (!bellValue.includes('.')) bellValue += '.';
      return bellValue.replace(/(\d)(?=(\d{3})+\.)/g, ($0, $1) => `${$1},`).replace(/\.$/, '');
    },
    // 取得三方列表🍳
    getThirdPay_list() {
      const testapi = `${process.env.VUE_APP_TESTAPI}`;
      this.isLoading = true;
      this.$http.get(`${testapi}/backend/financ/thirdPlatform`).then((res) => {
        this.isLoading = false;
        if (res.data.code === 200) {
          console.log(res.data.data);
          this.thirdPay_list.thirdPayList_table = res.data.data.list;
          this.searchOption.thirdPlatform_options = res.data.data.list;
          this.searchOption.platformType_options = res.data.data.list;
          this.searchOption.payType_options = res.data.data.list;
          this.searchOption.currency_options = res.data.data.list;
          this.searchOption.status_options = res.data.data.list;

          // 篩選重複的銀行名
          this.searchOption.thirdPlatform_options = _.uniqBy(
            this.searchOption.thirdPlatform_options,
            (item) => item.platform,
          );
          // 篩選重複的銀行類型
          this.searchOption.platformType_options = _.uniqBy(
            this.searchOption.platformType_options,
            (item) => item.platform_type,
          );
          // 篩選轉出的銀行顯示
          this.searchOption.bankTransfer_options = _.uniqBy(
            this.searchOption.bankTransfer_options,
            (item) => item.bank_cn,
          );
          // 篩選轉出的幣別
          this.searchOption.currency_options = _.uniqBy(
            this.searchOption.currency_options,
            (item) => item.currency,
          );
          // 篩選收款狀態的銀行顯示
          this.searchOption.depositStatus_options = _.uniqBy(
            this.searchOption.depositStatus_options,
            (item) => item.status,
          );
          // 篩選出款狀態的銀行顯示
          this.searchOption.dispensingStatus_options = _.uniqBy(
            this.searchOption.dispensingStatus_options,
            (item) => item.dispensing_status,
          );
        }
      });
    },
    // 取得三方列表🍳(篩選過濾的列表)
    getThirdPay_list2() {
      const testapi = `${process.env.VUE_APP_TESTAPI}`;
      this.isLoading = true;
      this.$http
        .get(
          `${testapi}/backend/financ/thirdPlatformSearch?platform=${this.searchOption.platform}&platform_type=${this.searchOption.platform_type}&payType=${this.searchOption.pay_type}&currency=${this.searchOption.currency}&income_status=${this.searchOption.deposit_status}`,
        )
        .then((res) => {
          this.isLoading = false;
          if (res.data.code === 200) {
            console.log(res.data.data);
            this.thirdPay_list.filterTableData = res.data.data;
            // this.searchOption.depositStatus_options = res.data.data.list;
            // this.searchOption.dispensingStatus_options = res.data.data.list;
            // _.forEach(this.thirdPay_list.thirdPayList_table, (item, key) => {
            //   console.log(item, key);
            //   if (item.status === 'enable') {
            //     this.searchOption.depositStatus_options.push('啟動');
            //   } else if (item.status === 'disable') {
            //     this.searchOption.depositStatus_options.push('關閉');
            //   }
            //   if (item.dispensing_status === 'enable') {
            //     this.searchOption.dispensingStatus_options.push('啟動');
            //   } else if (item.dispensing_status === 'disable') {
            //     this.searchOption.dispensingStatus_options.push('關閉');
            //   }
            //   return true;
            // });
            // 🌭將收款狀態 enable改成啟動
            // _.forEach(this.searchOption.depositStatus_options, (item, key) => {
            //   console.log(item, key);
            //   if (item.status === 'enable') {
            //     return item.status === '啟動';
            //   }
            //   if (item.status === 'disable') {
            //     return item.status === '關閉';
            //   }
            //   return false;
            // });
            // console.log(this.withdrawList.withdrawTable);

            // 篩選重複的銀行名
            this.searchOption.bankName_options = _.uniqBy(
              this.searchOption.bankName_options,
              (item) => item.bank,
            );
            // 篩選重複的銀行類型
            this.searchOption.bankType_options = _.uniqBy(
              this.searchOption.bankType_options,
              (item) => item.bank_type,
            );
            // 篩選轉出的銀行顯示
            this.searchOption.bankTransfer_options = _.uniqBy(
              this.searchOption.bankTransfer_options,
              (item) => item.bank_cn,
            );
            // 篩選轉出的幣別
            this.searchOption.currency_options = _.uniqBy(
              this.searchOption.currency_options,
              (item) => item.currency,
            );
            // 篩選收款狀態的銀行顯示
            this.searchOption.depositStatus_options = _.uniqBy(
              this.searchOption.depositStatus_options,
              (item) => item.status,
            );
            // 篩選出款狀態的銀行顯示
            this.searchOption.dispensingStatus_options = _.uniqBy(
              this.searchOption.dispensingStatus_options,
              (item) => item.dispensing_status,
            );
          }
        });
    },
    // 搜尋
    imtScreen() {
      // 判断是否輸入搜尋欄位
      if (
        !this.searchOption.platform
        && !this.searchOption.platform_type
        && !this.searchOption.pay_type
        && !this.searchOption.currency
        && !this.searchOption.deposit_status
      ) {
        this.$message({
          type: 'warning',
          message: '請選擇搜尋範圍！',
        });
      } else {
        const testapi = `${process.env.VUE_APP_TESTAPI}`;
        this.isLoading = true;
        this.$http
          .get(
            `${testapi}/backend/financ/thirdPlatformSearch?platform=${this.searchOption.platform}&platform_type=${this.searchOption.platform_type}&payType=${this.searchOption.pay_type}&currency=${this.searchOption.currency}&income_status=${this.searchOption.deposit_status}`,
          )
          .then((res) => {
            this.isLoading = false;
            if (res.data.code === 200) {
              console.log(res.data.data);
              this.thirdPay_list.filterTableData = res.data.data;
              this.thirdPay_list.thirdPayList_table = this.thirdPay_list.filterTableData;
            }
          });
      }
    },
    // 重置搜尋表單
    resetForm() {
      // this.$refs.search_form.resetFields(); // el.form.item裡面的prop一定要不一樣
      // 重製預設表單為all狀態
      this.searchOption.platform = 'all';
      this.searchOption.platform_type = 'all';
      this.searchOption.pay_type = 'all';
      this.searchOption.currency = 'all';
      this.searchOption.deposit_status = 'all';
      this.getThirdPay_list();
    },
    // 過濾狀態
    formatgmtUsed(income_status) {
      if (income_status === 'enable') {
        return '啟動';
      }
      if (income_status === 'disable') {
        return '關閉';
      }
      if (income_status === '7') {
        return '7';
      }
      return '備用';
    },
    // 第三方平台修改
    chooseThird_platform(item) {
      console.log(item);
      this.searchOption.platform = item.platform;
      if (item === 'all') {
        this.searchOption.platform = 'all';
      }
    },
    // 第三方平台修改
    choosePlatform_type(item) {
      console.log(item);
      this.searchOption.platform_type = item.platform_type;
      if (item === 'all') {
        this.searchOption.platform_type = 'all';
      }
    },
    // 支付類型修改
    choosePay_type(item) {
      console.log(item);
      this.searchOption.pay_type = item.platform_type;
      if (item === 'all') {
        this.searchOption.pay_type = 'all';
      }
      if (item === 'memoryCard') {
        this.searchOption.pay_type = '記憶卡';
      }
      if (item === 'qrCode') {
        this.searchOption.pay_type = '網銀掃碼';
      }
      if (item === 'MoMo') {
        this.searchOption.pay_type = 'MoMo';
      }
      if (item === 'Zalo') {
        this.searchOption.pay_type = 'Zalo';
      }
      if (item === 'viettelPay') {
        this.searchOption.pay_type = 'Viettel Pay';
      }
      if (item === 'letto') {
        this.searchOption.pay_type = '刮刮卡';
      }
    },
    // 第三方平台修改
    choose_currency(item) {
      console.log(item);
      this.searchOption.currency = item.currency;
      if (item === 'all') {
        this.searchOption.currency = 'all';
      }
    },
    // 支付類型修改
    choose_status(item) {
      console.log(item);
      this.searchOption.deposit_status = item.deposit_status;
      if (item === 'all') {
        this.searchOption.deposit_status = 'all';
      }
      if (item === 'enable') {
        this.searchOption.deposit_status = 'enable';
      }
      if (item === 'disable') {
        this.searchOption.deposit_status = 'disable';
      }
    },
  },
  created() {
    this.getThirdPay_list();
  },
  computed: {},
};
</script>

<style lang="scss">
// 搜尋樣式
.editBtn {
  background: #0b5ed7;
  color: #fff;
  &:hover {
    transition: 0.5s;
    background: #236aa5;
    color: #fff;
  }
}
// 右上角按鈕樣式
.hotSort {
  background: #2f2f2f;
  color: #fff;
  &:hover {
    background: #0f0f0f !important;
    color: white;
  }
}
.thirdPay_style .el-input__inner {
  width: 100%;
  padding: 0 100px 0 10px;
  border: 1px solid #dcdfe6;
  &:focus {
    border-color: #409eff !important;
  }
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
.qrCode_size {
  width: 100%;
  height: 60px;
  object-fit: cover;
}
.zaloPay_size {
  width: 50px;
  height: 53px;
  // object-fit: cover;
}
.viettelPay_size {
  width: 100%;
  height: 65px;
  object-fit: cover;
}
</style>
