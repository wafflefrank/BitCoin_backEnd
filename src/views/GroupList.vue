<template>
  <div class="text-end">
    <button
      class="btn btn-primary btn-sm me-2 mb-2"
      type="button"
      @click="$refs.historyGroupListModal.showModal"
    >
      層級調整紀錄
    </button>
    <button class="btn btn-primary btn-sm me-2 mb-2" type="button">重新配置層級</button>
    <button class="btn btn-primary btn-sm me-2 mb-2" type="button">調整層級</button>
    <button
      class="btn btn-primary btn-sm me-2 mb-2"
      type="button"
      @click="$refs.addGroupListModal.showModal"
    >
      新增組
    </button>
  </div>
  <!-- body顯示 -->
  <el-table :data="groupDetail" border stripe style="width: 100%">
    <el-table-column prop="group_name" label="組別名稱" align="center" />
    <el-table-column prop="currency" label="幣別" align="center"> </el-table-column>
    <el-table-column sortable prop="status" label="狀態" align="center">
      <template v-slot="{ row }">
        <el-tag
          :type="
            row.status === '啟動'
              ? 'success'
              : 'danger' && row.status === '啟用'
              ? 'warning'
              : 'danger' && row.status === '0'
              ? 'warning'
              : 'danger' && row.status === '1'
              ? 'warning'
              : 'danger' && row.status === '2'
              ? 'warning'
              : 'danger'
          "
        >
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="reserve_level" label="層級" align="center" />
    <el-table-column prop="currency" label="玩家數" align="center" />
    <el-table-column prop="currency" label="存款" align="center">
      <el-table-column prop="deposit_bank" label="存款帳戶" align="center" />
      <el-table-column prop="deposit_max" label="存款限額" align="center" />
    </el-table-column>
    <el-table-column prop="deposit_max" label="取款" align="center">
      <el-table-column prop="withdraw_max" label="取款限額" align="center" />
      <el-table-column prop="deposit_max" label="取款行政費(%)" align="center" />
      <el-table-column prop="deposit_max" label="手續費" align="center" />
    </el-table-column>
    <el-table-column prop="createtime" label="更新時間" align="center" />
    <el-table-column label="更新人員" align="center" />
    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button size="small" type="warning" @click="handleEdit(scope.$index, scope.row)"
          >Detail</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <!-- 分頁套件 -->
  <div class="titleStyle">
    <div class="block">
      <el-pagination
        :small="small"
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

    <!-- 篩選類別 -->
    <div class="selectStyle">
      <span class="">篩選 </span>
      <el-select size="small" v-model="value" placeholder="篩選方式..." @change="filterItem(value)">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item">
        </el-option>
      </el-select>
    </div>
  </div>
  <!-- 組列表 調整紀錄組 -->
  <GroupListHistory ref="historyGroupListModal"></GroupListHistory>
  <!-- 組列表 新增組-->
  <GroupListAdd ref="addGroupListModal"></GroupListAdd>
  <!-- 組列表 層級細節 -->
  <GroupListDetail ref="GroupListDetailModal"></GroupListDetail>
</template>

<script>
import _ from 'lodash';
import GroupListAdd from '../components/OpenModal/GroupList_Add.vue';
import GroupListHistory from '../components/OpenModal/GroupList_History.vue';
import GroupListDetail from '../components/OpenModal/GroupList_Detail.vue';

export default {
  name: 'GroupList',
  data() {
    return {
      groupDetail: [],
      small: true, // 分頁套件顯示"小"模組
      value: '', // 篩選選項
      options: [
        // 排序方式相關資料
        {
          value: 'Option1',
          label: '依遞增排序ID',
        },
        {
          value: 'Option2',
          label: '依遞減排序ID',
        },
        {
          value: 'Option3',
          label: '依餘額',
        },
      ],
      total: 60, // 總共多少頁數
      currentPage: 1, // 當前頁數
      pagesize: 10, // 當前頁顯示多少條
      pagesizes: [10, 20, 30, 50],
      search: '',

      orderType: 'DESC', // ID排序方式(DESC , ASC )
      orderBy: '', // 餘額排序( 輸入... money )
    };
  },
  components: {
    GroupListAdd,
    GroupListHistory,
    GroupListDetail,
  },
  methods: {
    getGroupDetail(limit = 20, skip = 0) {
      const testapi = `${process.env.VUE_APP_TESTAPI}`;
      this.isLoading = true;
      this.$http
        .get(
          `${testapi}/backend/members/group_list?skip=${skip}&limit=${limit}&order=${this.orderType}&orderType`,
        )
        .then((res) => {
          this.isLoading = false;
          console.log(res.data);
          if (res.data.code === 200) {
            //   console.log(res.data.message🍕);
            this.groupDetail = res.data.data.list;
            // forEach groupDetail每個item
            _.forEach(this.groupDetail, (item, key) => {
              console.log(item, key);
              if (item.status === 'disable') {
                // 0顯示關閉
                this.groupDetail[key].status = '關閉';
              } else if (item.status === 'enable') {
                // 1顯示啟動
                this.groupDetail[key].status = '啟動';
              }
            });

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
        this.getGroupDetail(this.pagesize);
      } else if (skip > 1) {
        // 若當前頁數等於2.3.4.5頁.....
        this.getGroupDetail(this.pagesize, this.pagesize * (skip - 1));
      }
    },
    // 變換每頁的項目數量
    sizechange(limit) {
      this.pagesize = limit;
      this.getGroupDetail(limit);
      this.currentPage = 1;
    },
    // 選擇當前篩選類別
    filterItem(value) {
      if (value.value === 'Option1') {
        this.orderType = 'ASC';
        this.getGroupDetail();
        console.log('選項1');
      } else if (value.value === 'Option2') {
        this.orderType = 'DESC';
        this.getGroupDetail();
        console.log('選項2');
      } else {
        // this.orderType = 'DESC';
        this.orderBy = 'id';
        this.getGroupDetail();
        console.log('選項3');
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
  },
  created() {
    this.getGroupDetail();

    // this.getAddValue()
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
// .el-table_1_column_6 .cell {
//   text-align: center;
//   color: rgb(212, 185, 28);
// }
// .el-table_1_column_9 .cell {
//   text-align: center;
//   color: rgb(212, 185, 28);
// }
</style>
