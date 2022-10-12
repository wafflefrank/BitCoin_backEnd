/* eslint-disable no-restricted-syntax */
<template>
  <!-- header顯示 -->
  <!-- 組設置  上半部分-->

  <div class="mb-4 group_set_content bg-purple-dark">
    <!-- 資料表單 -->

    <el-form ref="searchForm" :model="searchOption" class="demo-ruleForm justify-content-between">
      <el-row justify="space-between">
        <!-- 左半邊 -->
        <el-col :span="9" class="add_left_style_1 grid-content ms-3">
          <!-- 日期 🥙-->

          <el-form-item label="日期" class="updateTime_style" prop="updateTime"
            ><el-date-picker
              v-model="searchOption.updateTime"
              type="daterange"
              range-separator="-"
              start-placeholder="起始日期"
              end-placeholder="結束日期"
            />
          </el-form-item>
        </el-col>
        <!-- 右半邊 -->
        <el-col :span="9" class="add_left_style_1 grid-content">
          <!-- 幣別 🧀 -->
          <el-form-item label="幣別" class="keyName_style" prop="tagName">
            <el-select
              v-model="searchOption.tagName"
              placeholder="幣別"
              @change="chooseTagsName(searchOption.tagName)"
            >
              <el-option
                v-for="item in searchOption.tagNameOptions"
                :key="item.id"
                :label="item.title"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="flex ms-3 mb-3">
        <el-button color="#626aef" plain>昨日</el-button>
        <el-button color="#626aef" plain>今日</el-button>
        <el-button color="#626aef" plain>本週</el-button>
        <el-button color="#626aef" plain>上週</el-button>
        <el-button color="#626aef" plain>本月</el-button>
        <el-button color="#626aef" plain>上月</el-button>
        <el-button color="#626aef" plain>近7天</el-button>
        <el-button color="#626aef" plain>近30天</el-button>
      </div>
      <div class="text-center justify-content-between pb-3">
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

  <!-- body顯示 -->

  <table class="table table-light table-striped table-hover">
    <thead class="table-dark">
      <tr class="text-center">
        <th scope="col">收入</th>
        <th scope="col">收入金額(筆數/人數)</th>
        <th scope="col">支出</th>
        <th scope="col">支出金額(筆數/人數)</th>
      </tr>
    </thead>
    <tbody>
      <tr class="text-center">
        <th scope="row">公司入款</th>
        <td v-for="(item, index) in transationList.transationTable" :key="index">
          {{ item.income_Deposit }}
        </td>
        <td>會員出款</td>
        <td v-for="(item, index) in transationList.transationTable" :key="index">
          {{ item.expenditure_dispensing }}
        </td>
      </tr>
      <tr class="text-center">
        <th scope="row">第三方線上支付</th>
        <td v-for="(item, index) in transationList.transationTable" :key="index">
          {{ item.income_third }}
        </td>
        <td>優惠派發</td>
        <td v-for="(item, index) in transationList.transationTable" :key="index">
          {{ item.expenditure_bunos }}
        </td>
      </tr>
      <tr class="text-center">
        <th scope="row">手動調整加錢</th>
        <td v-for="(item, index) in transationList.transationTable" :key="index">
          {{ item.income__manual }}
        </td>
        <td>手動調整扣錢</td>
        <td v-for="(item, index) in transationList.transationTable" :key="index">
          {{ item.expenditure_manual }}
        </td>
      </tr>
      <tr class="text-center">
        <th scope="row">提款沒收</th>
        <td v-for="(item, index) in transationList.transationTable" :key="index">
          {{ item.income__withdrawal }}
        </td>
        <td>返水金額</td>
        <td v-for="(item, index) in transationList.transationTable" :key="index">
          {{ item.expenditure_rebate }}
        </td>
      </tr>
      <tr class="text-center">
        <th scope="row"></th>
        <td></td>
        <td>老帶新推薦獎金</td>
        <td v-for="(item, index) in transationList.transationTable" :key="index">
          {{ item.expenditure_layer }}
        </td>
      </tr>
      <tr class="text-center">
        <th scope="row"></th>
        <td></td>
        <td>推廣傭金</td>
        <td v-for="(item, index) in transationList.transationTable" :key="index">
          {{ item.expenditure_commission }}
        </td>
      </tr>
      <tr class="text-center">
        <th scope="row">+</th>
        <td>{{ transationList.incomeTotal }}</td>
        <td>-</td>
        <td>{{ transationList.payTotal }}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr class="text-center">
        <th scope="row">總額</th>
        <td
          :class="
            transationList.incomeTotal < transationList.payTotal ? 'text-custom' : 'text-primary'
          "
        >
          {{ transationList.incomeTotal - transationList.payTotal }}
        </td>
        <td>會員總餘額</td>
        <td></td>
      </tr>
    </tfoot>
  </table>
  <!-- <el-table
    ref="transation1"
    :data="transationList.transferData"
    style="width: 100%"
    :header-cell-class-name="classNameFunc"
    class="tags_table_style"
  >
    <el-table-column
      v-for="(item, index) in transationList.transationTitle"
      :label="item"
      :key="index"
      align="center"
    >
      <template v-slot="scope">
        {{ scope.row[index] }}
      </template>
    </el-table-column>
  </el-table> -->
</template>

<script>
import _ from 'lodash';
import moment from 'moment';
import { Search } from '@element-plus/icons';

export default {
  name: 'TransactionRecord',
  components: {
    Search,
  },
  data() {
    return {
      tempProduct: [],
      // 上方搜尋區間
      searchOption: {
        tagName: '',
        updateTime: '',
        tagNameOptions: [], // 標籤名稱下拉選項
        updateTimeOptions: [], // 更新時間下拉選項
      },
      // 下方table表單
      transationList: {
        skip: '0', // 跳過幾筆
        limit: '20', // 一次幾筆
        orderType: 'ASC', // ID排序方式(DESC , ASC )
        orderBy: 'id', // 餘額排序( 輸入... money )
        transationTitle: ['收入', '收入金額(筆數/人數)', '支出', '支出金額(筆數/人數)'],
        transationTable: [], // 總交易資料顯示
        transferData: [], // 篩選後儲存資料的地方
        incomeTotal: 0, // 收入總額
        payTotal: 0, // 支出總額
        allTotal: 0, // 總額
        membetTotal: 0, // 會員總餘額
      },
    };
  },
  methods: {
    // 取得總帳列表🍳
    getTransationList() {
      const testapi = `${process.env.VUE_APP_TESTAPI}`;
      this.isLoading = true;
      this.$http.get(`${testapi}/backend/financ/transactionsLog`).then((res) => {
        this.isLoading = false;
        if (res.data.code === 200) {
          console.log(res.data.data);
          this.transationList.transationTable.push(res.data.data);
          console.log(this.transationList.transationTable);
          this.moneyTotal();
        }
      });
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
    // 切換選擇的幣種
    chooseTagsName(item) {
      console.log(item.title);
      this.searchOption.tagName = item.title;
    },
    // 切換選擇的帳號
    chooseTime(item) {
      console.log(item.Createtime);
      this.searchOption.updateTime = item.Createtime;
    },
    // 搜尋
    imtScreen() {
      // 判断是否輸入搜尋欄位
      if (
        (!this.searchOption.updateTime[0] || !this.searchOption.updateTime[1])
        && !this.searchOption.tagName
      ) {
        this.$message({
          type: 'warning',
          message: '請選擇搜尋範圍！',
        });
      } else if (
        this.searchOption.updateTime[0] !== undefined
        && this.searchOption.updateTime[1] !== undefined
      ) {
        // 获取全部表格数据
        // this.getRankHistory();
        console.log('抓到時間範圍囉');
        console.log('start ', this.searchOption.updateTime[0], this.searchOption.updateTime[1]);
        const stime = this.searchOption.updateTime[0].getTime(); // 起始時間
        const etime = this.searchOption.updateTime[1].getTime(); // 結束時間
        console.log('end ', stime, etime);
        // 原表格數據  = 篩選後的表格內容
        console.log(this.tagsList.tagsTable);
        this.tagsList.tagsTable = this.tagsList.filterTableData.filter((item1) => {
          // 把時間格式轉換成秒數
          const test = moment(item1.Createtime).valueOf();
          console.log(item1.Createtime, test);
          return test >= stime && test <= etime;
        });
        // 依tags名稱搜尋
      } else if (this.searchOption.tagName !== '') {
        this.tagsList.tagsTable = this.tagsList.filterTableData.filter((item1) => {
          console.log(item1.title);
          return item1.title === this.searchOption.tagName;
        });
      } else {
        console.log('啥都沒跑');
      }
    },
    // 重置搜尋表單
    resetForm() {
      this.$refs.searchForm.resetFields();
      // this.$refs.rankSetting.resetFields();
      this.getTransationList();
    },
    // 打開會員訊息Modal
    openModal(item) {
      console.log(item);

      this.tempProduct = item;

      const EditComponent = this.$refs.TagsEditModal;
      EditComponent.showModal();
    },
    // 收入&支出總金額total
    moneyTotal() {
      _.forEach(this.transationList.transationTable, (item) => {
        console.log(item);
        // 收入總金額
        this.transationList.incomeTotal = Number(item.income_third)
          + Number(item.income_Deposit)
          + Number(item.income__manual)
          + Number(item.income__withdrawal);
        console.log(this.transationList.incomeTotal);
        // 支出總金額
        this.transationList.payTotal = Number(item.expenditure_dispensing)
          + Number(item.expenditure_bunos)
          + Number(item.expenditure_manual)
          + Number(item.expenditure_rebate)
          + Number(item.expenditure_layer)
          + Number(item.expenditure_commission);
        console.log(this.transationList.payTotal);
      });
    },
  },
  mounted() {
    // this.getTransationList();
    // this.getTagsList2();
  },
  created() {
    this.getTransationList();
    // const matrixData = this.transationList.transationTable.map((row, i) => {
    //   const arr = [];
    //   Object.keys(row).forEach((key) => {
    //     arr.push(row[key]);
    //     console.log(arr);
    //   });
    //   console.log(matrixData, i);
    //   return arr;
    // });
    // 加入標題的最後資料
    // this.transationList.transferData = matrixData[0].map((col, i) => [
    //   this.transationList.transationTable[i],
    //   ...matrixData.map((row) => row[i]),
    // ]);
  },
};
</script>

<style lang="scss">
.group_set_content {
  padding: 10px 0 0;
  border-radius: 10px;
  // min-height: 36px;
}
.bg-purple-dark {
  background: #eff3f8;
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
.keyName_style .el-input__inner {
  width: 300px;
  padding: 10px;
  border: 1px solid #dcdfe6;
  &:focus {
    border-color: #409eff !important;
  }
}
.updateTime_style .el-input__inner {
  width: 100%;
  padding: 0 50px;
  border: 1px solid #dcdfe6;
  &:focus {
    border-color: #409eff !important;
  }
}
.add_left_style_1 {
  & .el-form-item {
    display: inline-block; //el-form-item的標題顯示再輸入框上面
    margin-bottom: 15px;
    text-align: left;
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
// 層級設置 欄位頭樣式
.tags_table_style {
  border-radius: 10px;
}
// 編輯Icon 樣式
.editBtn2 {
  background: none;
  color: #409eff;
  &:hover {
    transition: 0.5s;
    background: #236aa5;
    color: #fff;
  }
  & .edit {
    font-size: 20px;
  }
}
.keyName_disable_style .el-input.is-disabled .el-input__inner {
  width: 300px;
  padding: 10px;
  background: #f5f7fa;
  color: #c0c4cc;
  border: 1px solid #dcdfe6;
  &:focus {
    border-color: #409eff !important;
  }
}
// 判斷字顏色 & 粗體
.text-custom {
  color: red;
  font-weight: bold;
}
</style>
