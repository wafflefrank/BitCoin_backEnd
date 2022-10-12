<template>
  <!-- header顯示 -->
  <!-- 密碼重置 -->
  <div class="text-end">
    <button class="btn btn-primary btn-sm me-2" type="button" @click="$refs.tagsAddModal.showModal">
      新增標籤
    </button>
    <!-- 新增標籤談窗 -->
    <TagsAdd ref="tagsAddModal"></TagsAdd>
  </div>
  <!-- 組設置  上半部分-->
  <el-row class="mb-4 mt-2">
    <el-col :span="24">
      <div class="bg-purple-dark group_set_content">
        <!-- 資料表單 -->
        <div>
          <el-form ref="searchForm" :model="searchOption" class="demo-ruleForm">
            <el-row>
              <!-- 左半邊 -->
              <el-col :span="12">
                <!-- 搜尋關鍵字 -->
                <el-row>
                  <el-col :span="24" class="add_left_style_1">
                    <!-- 搜尋關鍵字 🌭-->
                    <el-form-item label="搜尋關鍵字" class="ms-3 keyName_style" prop="tagName">
                      <el-select
                        v-model="searchOption.tagName"
                        placeholder="標籤名稱"
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
                    <el-form-item class="ms-2 keyName_disable_style">
                      <el-input disabled v-model="searchOption.tagName"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <!-- 右半邊 -->
              <el-col :span="12">
                <!-- 更新時間 -->
                <el-row>
                  <el-col :span="24" class="add_left_style_1">
                    <el-form-item
                      label="更新時間"
                      style="margin-left: 150px"
                      class="updateTime_style"
                      prop="updateTime"
                      ><el-date-picker
                        v-model="searchOption.updateTime"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="起始日期"
                        end-placeholder="結束日期"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
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
      </div></el-col
    >
  </el-row>

  <!-- body顯示 -->
  <el-table
    ref="tagsTable"
    :data="tagsList.tagsTable"
    style="width: 100%"
    :header-cell-class-name="classNameFunc"
    class="tags_table_style"
  >
    <el-table-column prop="title" label="標籤名稱" align="center" />
    <el-table-column prop="content" label="描述" align="center"> </el-table-column>
    <el-table-column prop="total" label="會員總數" align="center" />
    <el-table-column sortable prop="domain" label="域名" align="center">
      <template v-slot="{ row }">
        <el-tag :type="row.domain === '是' ? 'success' : 'danger'">
          {{ row.domain }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="Createuser" label="更新人員" align="center" />
    <el-table-column prop="Createtime" width="200" label="更新時間" align="center" />
    <el-table-column prop="remark" label="備註" align="center" />
    <el-table-column label="操作" width="120" align="center">
      <template #default="scope">
        <el-button class="editBtn2" size="small" @click="openModal(scope.row)"
          ><el-icon class="edit"> <Edit></Edit></el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 編輯談窗 -->
  <TagsEdit ref="TagsEditModal" :tagsData="tempProduct"></TagsEdit>
</template>

<script>
import _ from 'lodash';
import moment from 'moment';
import { Search, Edit } from '@element-plus/icons';
import TagsAdd from '../components/OpenModal/Tags_Add.vue';
import TagsEdit from '../components/OpenModal/Tag_Edit.vue';

export default {
  name: 'Tags',
  components: {
    Search,
    TagsAdd,
    TagsEdit,
    Edit,
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
      // 下方層級設置
      tagsList: {
        skip: '0', // 跳過幾筆
        limit: '20', // 一次幾筆
        orderType: 'ASC', // ID排序方式(DESC , ASC )
        orderBy: 'id', // 餘額排序( 輸入... money )
        tagsTable: [], // 標籤列表資料顯示
        filterTableData: [], // 篩選後儲存資料的地方
      },
    };
  },
  methods: {
    // 取得標籤列表🍳
    getTagsList() {
      const testapi = `${process.env.VUE_APP_TESTAPI}`;
      this.isLoading = true;
      this.$http
        .get(
          `${testapi}/backend/members/tags?skip=${this.tagsList.skip}&limit=${this.tagsList.limit}&order=${this.tagsList.orderType}&orderBy=${this.tagsList.orderBy}`,
        )
        .then((res) => {
          this.isLoading = false;
          if (res.data.code === 200) {
            console.log(res.data.data.list);
            this.tagsList.tagsTable = res.data.data.list;
            this.searchOption.tagNameOptions = res.data.data.list;
            this.searchOption.updateTimeOptions = res.data.data.list;
            // 篩選重複的標籤名
            this.searchOption.tagNameOptions = _.uniqBy(
              this.searchOption.tagNameOptions,
              (item) => item.title,
            );
            // 篩選重複的日期
            this.searchOption.updateTimeOptions = _.uniqBy(
              this.searchOption.updateTimeOptions,
              (item) => item.Createtime,
            );
            // this.rankHistory.filterTableData = res.data.data.list;
            console.log(this.tagsList.filterTableData);
            _.forEach(this.tagsList.tagsTable, (item, key) => {
              console.log(item, key);
              console.log(item.Createtime);
              this.tagsList.tagsTable[key].Createtime = this.$filters.dateTime4(item.Createtime);
              // this.rankHistory.tableData[key].Createtime = '測試';
            });
            console.log(this.tagsList.filterTableData);
          }
        });
    },
    // 取得日期篩選的data🍳
    getTagsList2() {
      const testapi = `${process.env.VUE_APP_TESTAPI}`;
      this.isLoading = true;
      this.$http
        .get(
          `${testapi}/backend/members/tags?skip=${this.tagsList.skip}&limit=${this.tagsList.limit}&order=${this.tagsList.orderType}&orderBy=${this.tagsList.orderBy}`,
        )
        .then((res) => {
          this.isLoading = false;
          if (res.data.code === 200) {
            console.log(res.data.data.list);
            this.tagsList.filterTableData = res.data.data.list;
            console.log(this.tagsList.filterTableData);
            _.forEach(this.tagsList.filterTableData, (item, key) => {
              console.log(item, key);
              console.log(item.Createtime);
              this.tagsList.filterTableData[key].Createtime = this.$filters.dateTime4(
                item.Createtime,
              );
              // this.rankHistory.tableData[key].Createtime = '測試';
            });
            console.log(this.tagsList.filterTableData);
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
      this.getTagsList();
    },
    // 打開會員訊息Modal
    openModal(item) {
      console.log(item);

      this.tempProduct = item;

      const EditComponent = this.$refs.TagsEditModal;
      EditComponent.showModal();
    },
  },
  mounted() {
    this.getTagsList();
    this.getTagsList2();
  },
};
</script>

<style lang="scss">
.group_set_content {
  padding: 10px 0 0;
  border-radius: 10px;
  flex-wrap: wrap;
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
</style>
