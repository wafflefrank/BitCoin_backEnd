<template>
  <Loading :active="isLoading"></Loading>
  <el-row class="mb-2">
    <el-col :span="19" :offset="0"></el-col>
    <el-col :span="5" :offset="0" class="text-end">
      <el-button size="small" type="success" @click="createNews()">新增</el-button>
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
    <el-table-column label="消息資訊">
      <el-table-column prop="title" sortable label="標題"/>
      <el-table-column prop="content" sortable label="內容"/>
      <el-table-column prop="createTime" sortable label="創建時間" :formatter="timeFormat"/>
      <el-table-column prop="updateTime" sortable label="修改時間" :formatter="timeFormat"/>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" type="primary" @click="editNews(scope.row)">修改</el-button>
        <el-button size="small" type="warning" @click="deleteNews(scope.row)">刪除</el-button>
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
        <el-form-item label="標題">
          <el-input
            v-model="modalInfo.title"
            placeholder="請輸入標題"
          />
        </el-form-item>
        <el-form-item label="內容">
          <el-input
            v-model="modalInfo.content"
            placeholder="請輸入內容"
          />
        </el-form-item>
      </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="modalShow = false">取消</el-button>
        <el-button type="primary" @click="updateNews()">確認</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import moment from 'moment';

export default {
  name: 'News',
  data() {
    return {
      rootApi: process.env.VUE_APP_TESTAPI,
      modalShow: false,
      modalType: 'create',
      modalTitle: '新增消息',
      modalId: 0,
      small: true, // 分頁樣式大小
      total: 0, // 總共多少頁數
      currentPage: 1, // 當前頁數
      pageSize: 10, // 當前頁顯示多少條
      pageSizeInfo: [10, 20, 30, 50],
      tableData: [],
      modalInfo: {
        title: '',
        content: '',
      },
    };
  },
  components: {},
  methods: {
    getNewsInfo(limit = 10, skip = 0) {
      this.isLoading = true;
      this.$http
        .get(
          `${this.rootApi}/backend/page/newsList?skip=${skip}&limit=${limit}`,
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
        this.getNewsInfo(this.pageSize);
      } else if (skip > 1) {
        // 若當前頁數等於2.3.4.5頁.....
        this.getNewsInfo(this.pageSize, this.pageSize * (skip - 1));
      }
    },
    // 變換每頁的項目數量
    sizeChange(limit) {
      this.pageSize = limit;
      this.getNewsInfo(limit);
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
    createNews() {
      this.modalShow = true;
      this.modalType = 'create';
      this.modalTitle = '新增消息';
      this.modalInfo = {
        title: '',
        content: '',
      };
    },
    editNews(data) {
      this.modalShow = true;
      this.modalType = 'edit';
      this.modalId = data.id;
      this.modalTitle = '編輯消息';
      this.modalInfo = {
        title: data.title,
        content: data.content,
      };
    },
    updateNews() {
      this.isLoading = true;

      if (this.modalType === 'create') {
        this.$http
          .post(
            `${this.rootApi}/backend/page/newsAdd`, this.modalInfo,
          )
          .then((res) => {
            this.modalShow = false;
            this.isLoading = false;
            if (res.data.code === 200) {
              this.getNewsInfo();
            }
          });
      } else {
        const formatData = {
          id: this.modalId,
          ...this.modalInfo,
        };

        this.$http
          .post(
            `${this.rootApi}/backend/page/newsUpdate`, formatData,
          )
          .then((res) => {
            this.modalShow = false;
            this.isLoading = false;
            if (res.data.code === 200) {
              this.getNewsInfo();
            }
          });
      }
    },
    deleteNews(data) {
      this.$confirm('是否確定刪除此消息', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const formatData = {
          id: data.id,
        };
        this.isLoading = true;
        this.$http
          .post(
            `${this.rootApi}/backend/page/newsDel`, formatData,
          )
          .then((res) => {
            this.isLoading = false;
            if (res.data.code === 200) {
              this.getNewsInfo();
            }
          });
      }).catch(() => {
        console.log('取消刪除');
      });
    },
  },
  created() {
    this.getNewsInfo();
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
