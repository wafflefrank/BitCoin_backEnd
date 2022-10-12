<template>
  <!-- header顯示 -->
  <el-row :gutter="20">
    <el-col :span="8">
      <div class="grid-content bg-purple">
        <div class="new_member">新會員<br />(今日)</div>
        <div class="border_bottom">{{ this.newMember.newMember }}</div>
        <div style="margin: 20px 5px 0px">人</div>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple">
        <div class="new_member">新會員<br />(本週)</div>
        <div class="border_bottom">{{ this.newMember.newMember_week }}</div>
        <div style="margin: 20px 5px 0px">人</div>
      </div></el-col
    >
    <el-col :span="8">
      <div class="grid-content bg-purple">
        <div class="new_member">新會員<br />(上週)</div>

        <div class="border_bottom">
          {{ this.newMember.newMember_lastWeek }}
        </div>

        <div style="margin: 20px 5px 0px">人</div>
      </div></el-col
    >
  </el-row>
  <el-row :gutter="20">
    <el-col :span="8">
      <div class="grid-content bg-purple">
        <div class="new_member">新會員<br />存款(今日)</div>
        <div class="border_bottom">{{ this.newMember.newMember_deposit }}</div>

        <div style="margin: 20px 5px 0px">人</div>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple">
        <div class="new_member">新會員<br />存款(本週)</div>
        <div class="border_bottom">{{ this.newMember.newMember_deposit_Week }}</div>
        <div style="margin: 20px 5px 0px">人</div>
      </div></el-col
    >
    <el-col :span="8">
      <div class="grid-content bg-purple">
        <div class="new_member">新會員<br />存款(上週)</div>
        <div class="border_bottom">{{ this.newMember.newMember_deposit_lastWeek }}</div>
        <div style="margin: 20px 5px 0px">人</div>
      </div></el-col
    >
  </el-row>

  <!-- body顯示 -->
  <el-table :data="newMemberList" border stripe style="width: 100%">
    <el-table-column prop="newMember" label="代理(舊)" />
    <el-table-column label="代理團隊"> </el-table-column>
    <el-table-column label="老帶新" />
    <el-table-column label="會員帳號" />
    <el-table-column label="真實姓名" />
    <el-table-column sortable label="標籤名稱" />

    <el-table-column label="存款金額" />
    <el-table-column label="目前餘額" />
    <el-table-column label="註冊時間" />
    <el-table-column label="註冊IP位置" />
    <el-table-column label="操作"> </el-table-column>
  </el-table>

  <!-- 分頁套件 -->
  <div class="block">
    <el-pagination
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
</template>

<script>
import _ from 'lodash';

export default {
  name: 'NewPlayer',
  data() {
    return {
      newMember: [],
      newMemberList: [],

      total: 60, // 總共多少頁數
      currentPage: 1, // 當前頁數
      pagesize: 10, // 當前頁顯示多少條
      pagesizes: [10, 20, 30, 50],
      search: '',
    };
  },
  methods: {
    getMemberList() {
      const testapi = `${process.env.VUE_APP_TESTAPI}`;
      this.isLoading = true;
      this.$http.get(`${testapi}/backend/members/new_members`).then((res) => {
        this.isLoading = false;
        console.log(res.data);
        if (res.data.code === 200) {
          //   console.log(res.data.message);
          this.newMember = res.data.data;
          // console.log(this.newMember);
          this.newMemberList.push(this.newMember);
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
        this.getUserinfo(this.pagesize);
      } else if (skip > 1) {
        // 若當前頁數等於2.3.4.5頁.....
        this.getUserinfo(this.pagesize, this.pagesize * (skip - 1));
      }
    },
    // 變換每頁的項目數量
    sizechange(limit) {
      this.pagesize = limit;
      this.getMemberList(limit);
      this.currentPage = 1;
    },
  },
  created() {
    this.getMemberList();
    // this.getAddValue()
    // const years = _.range(1911, 2014);
    // console.log(years);
    const map = { TW: '台灣', JP: '日本', CN: '中國' };
    const isTWInMap = _.has(map, 'JP');
    if (isTWInMap === true) {
      console.log('日本有在裡面');
    }
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #ffffff;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  border-radius: 10px;
  flex-wrap: wrap;
  //   min-height: 36px;
}
.border_bottom {
  margin-left: 25px;
  margin-top: 10px;
  border-bottom: 1px solid;
  padding: 0 30px;
  display: flex;
}
.new_member {
  width: 100%;
  text-align: center;
}
.number-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.bg-purple {
  &:hover {
    transition: 0.7s;
    background-color: rgb(86, 137, 204) !important;
    color: rgb(255, 255, 255);
    font-weight: bold;

    & .border_bottom {
      color: rgb(238, 192, 132);
      border-color: rgb(255, 255, 255);
    }
  }
}
</style>
