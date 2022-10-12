<template>
  <!-- header顯示 -->
  <!-- 搜尋欄位  上半部分-->
  <div class="mb-4 withdraw_content bg-purple-dark">
    <!-- 資料表單 -->
    <el-form ref="searchForm" :model="searchOption" class="demo-ruleForm justify-content-between">
      <!-- 第一列 -->
      <el-row>
        <!-- 左半邊 -->
        <el-col :span="12" class="add_left_style_1">
          <!-- 日期 🥙-->
          <el-form-item label="申請時間" class="updateTime_style" prop="updateTime">
            <!-- <div class="block"> -->
            <!-- <span class="demonstration">Default</span> -->
            <el-date-picker
              v-model="searchOption.updateTime"
              type="datetimerange"
              range-separator="-"
              start-placeholder="起始時間"
              end-placeholder="結束時間"
            />
            <!-- </div> -->
          </el-form-item>
        </el-col>
        <!-- 右半邊 -->
        <el-col :span="12" class="add_left_style_1">
          <!-- 時區 🧀 -->
          <el-form-item label="時區" class="updateTime_style me-2" prop="tagName">
            <el-select
              v-model="searchOption.timeZone"
              placeholder="選擇時區..."
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
          <!-- 幣別 🧀 -->
          <el-form-item label="幣別" class="updateTime_style me-2" prop="tagName">
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
      <!-- 第二列 -->
      <el-row>
        <!-- 左半邊 -->
        <el-col :span="12" class="add_left_style_1">
          <!-- 搜尋 🥙-->
          <el-form-item label="搜尋" class="updateTime_style me-2" prop="search">
            <el-select
              v-model="searchOption.search"
              placeholder="選擇時區..."
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
          <!-- 精準搜尋 -->
          <el-form-item class="me-2 updateTime_style">
            <el-select
              v-model="searchOption.search"
              placeholder="精準搜尋"
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
          <el-form-item class="input_disable_style">
            <el-input disabled v-model="searchOption.tagName"></el-input>
          </el-form-item>
        </el-col>
        <!-- 右半邊 -->
        <el-col :span="12" class="add_left_style_1">
          <!-- 提款金額 🧀 -->
          <el-form-item label="提款金額" class="updateTime_style me-2" prop="tagName">
            <el-select
              v-model="searchOption.timeZone"
              placeholder="選擇時區..."
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
          <!-- 幣別 🧀 -->
          <el-form-item class="updateTime_style me-2" prop="tagName">
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
          <!-- 取款單號 -->
          <el-form-item label="取款單號" class="input_disable_style">
            <el-input disabled v-model="searchOption.tagName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 第三列 -->
      <el-row>
        <!-- 左半邊 -->
        <el-col :span="12" class="add_left_style_1">
          <!-- 狀態 🥙-->
          <el-form-item label="狀態" class="updateTime_style me-2" prop="search">
            <el-select
              v-model="searchOption.search"
              placeholder="全部..."
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
          <!-- 提款方式 -->
          <el-form-item label="提款方式" class="me-2 updateTime_style">
            <el-select
              v-model="searchOption.search"
              placeholder="精準搜尋"
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
          <!-- 是否有代理上線 -->
          <el-form-item label="是否有代理上線" class="me-2 updateTime_style">
            <el-select
              v-model="searchOption.search"
              placeholder="精準搜尋"
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
        <!-- 右半邊 -->
        <el-col :span="12" class="add_left_style_1">
          <!-- 玩家組別層級 🧀 -->
          <el-form-item label="玩家組別層級" class="updateTime_style me-2" prop="tagName">
            <el-select
              v-model="searchOption.timeZone"
              placeholder="選擇時區..."
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
          <!-- 幣別 🧀 -->
          <el-form-item class="updateTime_style me-2" prop="tagName">
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
      <div class="text-center justify-content-between mt-3">
        <button type="button" class="btn btn-secondary" @click.prevent="resetForm()">重置</button>
        <el-button class="editBtn ms-4" size="large" @click="imtScreen()">
          <el-icon class="Search fs-4"> <Search></Search></el-icon>
          搜尋
        </el-button>
      </div>
    </el-form>
  </div>

  <!-- 提款紀錄 下半部份 -->
  <h5 class="text-start mb-4 ms-2 mustType text-dark">提款紀錄</h5>
  <el-table
    ref="withdrawTable"
    :data="withdrawList.withdrawTable"
    style="width: 100%"
    :header-cell-class-name="classNameFunc"
    class="tags_table_style"
  >
    <el-table-column label="會員訊息">
      <el-table-column prop="id" label="#" align="center" width="50" />
      <el-table-column prop="Createtime" width="110" label="申請時間" sortable align="center">
      </el-table-column>
      <el-table-column prop="agency_team" label="代理(舊)" align="center" />
      <el-table-column prop="hierarchy" label="代理團隊" align="center">
        <template v-slot="{ row }">
          <el-tag :type="row.hierarchy === 'D_group' ? 'success' : 'danger'">
            {{ row.hierarchy }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="Createuser" width="90" label="玩家組別 玩家層級" align="center" />
      <el-table-column prop="account" width="90" label="會員帳號 真實姓名" align="center" />
      <el-table-column prop="tags" label="標籤名稱" align="center" />
      <el-table-column prop="bank" label="銀行資料" width="120" align="center"> </el-table-column>
    </el-table-column>
    <el-table-column label="提款訊息" align="center"
      ><el-table-column
        sortable
        width="110"
        prop="withdraw_amount"
        label="提款金額"
        align="center"
      />
      <el-table-column prop="status" label="稽核" align="center"> </el-table-column>
      <el-table-column prop="bonus_status" width="90" label="優惠稽核 常態稽核" align="center" />
      <el-table-column sortable width="110" prop="actual_amount" label="出款金額" align="center">
      </el-table-column>
      <el-table-column prop="actual_amount" label="帳戶餘額" align="center" />
      <el-table-column prop="actual_amount" label="提款方式 實際支付" width="90" align="center" />
    </el-table-column>
    <el-table-column label="操作" align="center"
      ><el-table-column prop="risk" label="風控審核" align="center">
        <template v-slot="{ row }">
          <el-tag :type="row.risk === 'V' ? 'success' : 'danger'">
            {{ row.risk }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="withdraw_way" label="財務操作" align="center"> </el-table-column>
      <el-table-column prop="ip" label="前台備註" align="center" />
      <el-table-column prop="actual_amount" label="提款操作紀錄" align="center">
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'WithDraw_History',
  data() {
    return {
      // 上方搜尋區間
      searchOption: {
        updateTime: '', // 日期
        timeZone: '', // 時區
        currency: '', // 幣別
        search: '', // 搜尋會員帳號
        withdrawMoney: '', // 提款金額
        withdrawOrder: '', // 取款單號
        withdrawMethods: '', // 取款方式
        angencyOnline: '', // 是否有代理上縣
        playerLevel: '', // 玩家組別層級
        player: '', // 角色
        withdrawTimes: '', // 取款次數
        status: '', // 狀態
        tagNameOptions: [], // 標籤名稱下拉選項
        updateTimeOptions: [], // 更新時間下拉選項
      },
      //  下方提款紀錄 table
      withdrawList: {
        skip: '0', // 跳過幾筆
        limit: '20', // 一次幾筆
        order: 'ASC', // ID排序方式(DESC , ASC )
        orderBy: 'id', // 餘額排序( 輸入... money )
        withdrawTable: [],
      },
    };
  },
  methods: {
    // 取得提款列表🍳
    getWithdrawList() {
      this.isLoading = true;
      this.$http
        .get(
          `/backend/financ/withdrawList?skip=${this.withdrawList.skip}&limit=${this.withdrawList.limit}&order${this.withdrawList.order}&orderType`,
        )
        .then((res) => {
          this.isLoading = false;
          if (res.data.code === 200) {
            console.log(res.data.data);
            this.withdrawList.withdrawTable = res.data.data;
            _.forEach(this.withdrawList.withdrawTable, (item, key) => {
              console.log(item, key);
              console.log(item.Createtime);
              this.withdrawList.withdrawTable[key].Createtime = this.$filters.dateTime4(
                item.Createtime,
              );
              // this.rankHistory.tableData[key].Createtime = '測試';
            });
            console.log(this.withdrawList.withdrawTable);
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
  },
  created() {
    this.getWithdrawList();
  },
};
</script>

<style lang="scss">
.withdraw_content {
  padding: 25px 15px 25px;
  border-radius: 10px;
  flex-wrap: wrap;
  // min-height: 36px;
}
.bg-purple-dark {
  background: #eff3f8;
}
.add_left_style_1 {
  & .el-form-item {
    display: inline-block; //el-form-item的標題顯示再輸入框上面
    margin-bottom: 10px;
    text-align: left;
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
.updateTime_style .el-input__inner {
  width: 100%;
  padding: 0 50px;
  border: 1px solid #dcdfe6;
  &:focus {
    border-color: #409eff !important;
  }
}
.input_disable_style .el-input.is-disabled .el-input__inner {
  width: 100%;
  padding: 0 50px;
  background: #f5f7fa;
  color: #c0c4cc;
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
</style>
