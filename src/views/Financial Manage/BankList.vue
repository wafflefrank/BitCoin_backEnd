<template>
  <!-- 載入讀取 -->
  <Loading :active="isLoading"></Loading>
  <!-- 新增銀行彈窗 -->
  <el-dialog v-model="addBank_visible" title="新增銀行資訊">
    <el-form ref="addBankRules" :model="addBankDetail" :rules="BankRules" label-width="120px">
      <el-row>
        <el-col :span="12">
          <!-- 銀行類型 -->
          <el-form-item label="銀行類型" prop="bank_type" class="bankDetail_style">
            <el-input v-model="addBankDetail.bank_type"></el-input>
          </el-form-item>
          <!-- 銀行名稱 -->
          <el-form-item label="銀行名稱" prop="bank" class="bankDetail_style">
            <el-input v-model="addBankDetail.bank"></el-input>
          </el-form-item>
          <!-- 簡中名稱 -->
          <el-form-item label="簡中名稱" prop="bank_cn" class="bankDetail_style">
            <el-col :span="11">
              <el-input v-model="addBankDetail.bank_cn"></el-input>
            </el-col>
          </el-form-item>
          <!-- 預設語系名稱 -->
          <el-form-item label="預設語系名稱" prop="bank_preset" class="bankDetail_style">
            <el-input v-model="addBankDetail.bank_preset"></el-input>
          </el-form-item>
        </el-col>
        <!-- 右半邊 -->
        <el-col :span="12">
          <!-- 圖片 -->
          <el-form-item label="圖片" prop="img" class="bankDetail_style">
            <!-- <el-input disabled v-model="addBankDetail.img"></el-input> -->
            <el-upload
              class="upload-demo ms-5"
              action="#"
              ref="upload"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-change="UploadImage"
              :on-exceed="handleExceed"
              :on-progress="uploadProcess"
              :file-list="fileList1"
              list-type="picture-card"
              :auto-upload="false"
              :limit="1"
            >
              <el-icon class="Plus fs-4"> <Plus></Plus></el-icon>
              <template #tip>
                <div class="el-upload__tip">
                  <span style="color: #ff77bb">*</span> 單次僅限上傳一張圖片
                </div>
              </template>
            </el-upload>
          </el-form-item>
          <!-- 圖片預覽談窗 -->
          <el-dialog v-model="dialogVisible">
            <img style="width: 100%; height: 100%" :src="dialogImageUrl" alt="" />
          </el-dialog>

          <!-- 網銀網址 -->
          <el-form-item label="網銀網址" prop="url" class="bankDetail_style">
            <el-input v-model="addBankDetail.url"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click.prevent="resetAddBank_form()"> 重置 </el-button>
        <el-button @click="addBank_visible = false">取消</el-button>
        <el-button type="primary" @click="doAddBank()">確認</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 組設置  上半部分-->
  <el-row>
    <el-col :span="24">
      <div class="mb-4 bg-purple-dark withdraw_content">
        <!-- 資料表單 -->
        <div>
          <el-form ref="bankList_form" :model="searchOption" class="demo-ruleForm">
            <el-row>
              <!-- 左半邊 -->
              <el-col :span="12" class="add_left_style_1">
                <!-- 銀行名稱 & 銀行類型 🍖-->
                <el-form-item label="銀行名稱" class="bankName_style me-2" prop="bankName">
                  <el-select
                    v-model="searchOption.bankName"
                    placeholder="選擇銀行"
                    @change="chooseBank_name(searchOption.bankName)"
                  >
                    <el-option
                      v-for="item in searchOption.bankName_options"
                      :key="item.id"
                      :label="item.bank"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="銀行類型" class="bankList_style me-2" prop="bankType">
                  <el-select
                    v-model="searchOption.bankType"
                    placeholder="選擇銀行類型"
                    @change="chooseBank_type(searchOption.bankType)"
                  >
                    <el-option
                      v-for="item in searchOption.bankType_options"
                      :key="item.id"
                      :label="item.bank_type"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- 右半邊 -->
              <!-- 轉出銀行顯示 & 選擇轉出銀行 🍖 -->
              <el-col :span="12" class="add_left_style_1">
                <el-form-item label="轉出銀行顯示" class="bankList_style me-2" prop="bank_transfer">
                  <el-select
                    v-model="searchOption.bank_transfer"
                    placeholder="選擇轉出銀行"
                    @change="chooseBank_transfer(searchOption.bank_transfer)"
                  >
                    <el-option
                      v-for="item in searchOption.bankTransfer_options"
                      :key="item.id"
                      :label="item.bank_cn"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="綁定銀行卡顯示" class="bankList_style me-2" prop="bank_link">
                  <el-select
                    v-model="searchOption.bank_link"
                    placeholder="選擇綁定銀行卡"
                    @change="chooseBank_link(searchOption.bank_link)"
                  >
                    <el-option
                      v-for="item in searchOption.bankLink_options"
                      :key="item.id"
                      :label="item.bank_preset"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
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
  <!-- 提款紀錄 下半部份 -->
  <div class="d-flex justify-content-between">
    <h5 class="text-start mb-4 ms-2 mustType text-dark">銀行列表</h5>
    <div class="me-3">
      <button type="button" class="btn hotSort btn-sm me-3">熱門排序</button>
      <button type="button" class="btn addBank_btn btn-sm" @click="addBank_visible = true">
        新增銀行
      </button>
    </div>
  </div>
  <el-table
    ref="bankList_table"
    :data="bankList.bankList_table"
    style="width: 100%"
    :header-cell-class-name="classNameFunc"
    class="tags_table_style"
  >
    <el-table-column prop="id" label="#" align="center" width="50" />
    <el-table-column prop="bank" width="110" label="銀行名稱" sortable align="center">
    </el-table-column>
    <el-table-column prop="bank" label="熱門" align="center">
      <template v-slot="{ row }">
        <el-tag :type="row.bank === 'CTBC' ? 'danger' : 'success'">
          {{ 'V' }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="bank_cn" label="顯示名稱" align="center"> </el-table-column>
    <el-table-column prop="bank_type" width="90" label="銀行類型" align="center" />
    <el-table-column prop="" width="90" label="幣別" align="center" />
    <el-table-column prop="url" label="網銀網址" align="center" />
    <el-table-column prop="img" label="圖片" width="200" align="center" class="image_size">
      <!--插入圖片-->
      <template v-slot="scope" class="image_size">
        <img class="image_size" :src="imageUrl + scope.row.img" alt="" />
      </template>
    </el-table-column>

    <el-table-column width="110" prop="" label="操作" align="center">
      <template #default="scope">
        <el-button class="editBtn2" size="small" @click="openModal(scope.row)"
          ><el-icon class="edit"> <Edit></Edit></el-icon>
        </el-button>
      </template>
    </el-table-column>
    <el-table-column sortable width="110" prop="withdraw_amount" label="轉出銀行" align="center" />
    <el-table-column width="110" prop="withdraw_amount" label="綁定銀行卡" align="center" />
  </el-table>

  <!-- 編輯談窗 -->
  <BankEdit ref="BankEditModal" :bankList_data="tempProduct"></BankEdit>
</template>

<script>
import _ from 'lodash';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import BankEdit from '../../components/OpenModal/FinancialModal/BankList_Edit.vue';

const fd = new FormData(); // 後台上傳data含有檔案類型 , 自己模擬一個空的數據

export default {
  name: 'BankList',
  inject: ['reload'],
  components: {
    BankEdit,
  },
  data() {
    return {
      isLoading: false,
      imageUrl: 'http://167.179.74.47:4000/bankImages/', // 本地圖片路徑
      tempProduct: [],

      // 上方搜尋區間
      searchOption: {
        bankName: '',
        bankType: '',
        bank_transfer: '', // 銀行轉出顯示
        bank_link: '', // 銀行綁定
        bankName_options: [], // 銀行類型下拉選項
        bankType_options: [], // 銀行類型下拉選項
        bankTransfer_options: [], // 銀行轉出顯示下拉選項
        bankLink_options: [], // 綁定銀行卡顯示下拉選項
      },
      //  下方提款紀錄 table
      bankList: {
        skip: '0', // 跳過幾筆
        limit: '20', // 一次幾筆
        order: 'ASC', // ID排序方式(DESC , ASC )
        orderType: 'id', // 餘額排序( 輸入... money )
        bankList_table: [], // 銀行列表資料顯示
        filterTableData: [], // 篩選後儲存資料的地方
      },
      // 新增銀行
      addBank_visible: false, // 展開彈窗
      // 銀行彈窗詳細資料
      addBankDetail: {
        bank_type: '',
        bank: '',
        bank_cn: '',
        bank_preset: '',
        img: '',
        url: '',
      },
      // 圖片上傳
      fileList1: [], // 存file的地方
      dialogImageUrl: '', // 圖片網址
      dialogVisible: false, // 圖片預覽
      persent: ref(0), // 圖片上傳時的轉圈
      // 新增銀行卡規則
      BankRules: {
        bank_type: [
          {
            required: true,
            message: '請輸入銀行類型',
            trigger: 'blur',
          },
        ],
        bank: [
          {
            required: true,
            message: '請輸入銀行名稱',
            trigger: 'blur',
          },
        ],
        bank_cn: [
          {
            required: true,
            message: '請輸入銀行簡中名稱',
            trigger: 'blur',
          },
        ],
        bank_preset: [
          {
            required: true,
            message: '請輸入預設語系',
            trigger: 'blur',
          },
        ],
        url: [
          {
            required: true,
            message: '請輸入網銀網址',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    // 取得提款列表🍳
    getBank_list() {
      const testapi = `${process.env.VUE_APP_TESTAPI}`;
      this.isLoading = true;
      this.$http
        .get(
          `${testapi}/backend/financ/bankList?skip=${this.bankList.skip}&limit=${this.bankList.limit}&order=${this.bankList.order}&orderType`,
        )
        .then((res) => {
          this.isLoading = false;
          if (res.data.code === 200) {
            console.log(res.data.data);
            this.bankList.bankList_table = res.data.data.list;
            this.searchOption.bankName_options = res.data.data.list;
            this.searchOption.bankType_options = res.data.data.list;
            this.searchOption.bankTransfer_options = res.data.data.list;
            this.searchOption.bankLink_options = res.data.data.list;
            _.forEach(this.bankList.bankList_table, (item, key) => {
              console.log(item, key);
            });
            // console.log(this.withdrawList.withdrawTable);

            // 篩選重複的銀行名
            this.searchOption.bankName_options = _.uniqBy(
              this.searchOption.bankName_options,
              (item) => item.bank_cn,
            );
            // 篩選重複的銀行類型
            this.searchOption.bankType_options = _.uniqBy(
              this.searchOption.bankType_options,
              (item) => item.bank_type,
            );
            // 篩選轉出的銀行顯示
            this.searchOption.bankTransfer_options = _.uniqBy(
              this.searchOption.bankTransfer_options,
              (item) => item.bank,
            );
            // 篩選綁定的銀行顯示
            this.searchOption.bankLink_options = _.uniqBy(
              this.searchOption.bankLink_options,
              (item) => item.bank,
            );
          }
        });
    },
    // 取得篩選資料的空值
    getBank_list2() {
      const testapi = `${process.env.VUE_APP_TESTAPI}`;
      this.isLoading = true;
      this.$http
        .get(
          `${testapi}/backend/financ/bankList?skip=${this.bankList.skip}&limit=${this.bankList.limit}&order=${this.bankList.order}&orderType`,
        )
        .then((res) => {
          this.isLoading = false;
          if (res.data.code === 200) {
            console.log(res.data.data);
            this.bankList.filterTableData = res.data.data.list;
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
      if (columnIndex === 7 && rowIndex === 1) {
        return 'image_size';
      }
      return 'header_title_light';
    },
    // 列的更改
    // setCellStyle({ row, rowIndex, columnIndex }) {
    //   // const columns = [1]; // 想要改变列的索引
    //   console.log(rowIndex, columnIndex);
    //   if (row.rowIndex >= 0) {
    //     return 'image_size';
    //   }
    //   return 'header_title_dark';
    // },

    chooseBank_name(item) {
      console.log(item.bank);
      this.searchOption.bankName = item.bank;
    },
    // 切換選擇銀行類型
    chooseBank_type(item) {
      console.log(item.bank_type);
      this.searchOption.bankType = item.bank_type;
    },
    // 切換選擇轉出銀行顯示
    chooseBank_transfer(item) {
      console.log(item.bank_cn);
      this.searchOption.bank_transfer = item.bank_cn;
    },
    // 切換選擇綁定銀行顯示
    chooseBank_link(item) {
      console.log(item.bank_preset);
      this.searchOption.bank_link = item.bank_preset;
    },
    // 重置搜尋表單
    resetForm() {
      this.$refs.bankList_form.resetFields(); // el.form.item裡面的prop一定要不一樣
      this.getBank_list();
    },
    // 重置新增銀行表單
    resetAddBank_form() {
      this.$refs.addBankRules.resetFields(); // el.form.item裡面的prop一定要不一樣
      // this.getBank_list();
    },
    // 搜尋
    imtScreen() {
      // 判断是否輸入搜尋欄位
      if (
        !this.searchOption.bankName
        && !this.searchOption.bankType
        && !this.searchOption.bank_transfer
        && !this.searchOption.bank_link
      ) {
        this.$message({
          type: 'warning',
          message: '請選擇搜尋範圍！',
        });
        // 依什麼什麼搜尋
      } else if (this.searchOption.bankName !== '') {
        console.log('抓到銀行名稱囉');
        this.bankList.bankList_table = this.bankList.filterTableData.filter((item1) => {
          console.log(item1.bank);
          return item1.bank === this.searchOption.bankName;
        });
        // 原表格數據  = 篩選後的表格內容
      } else if (this.searchOption.bankType !== '') {
        console.log('抓到銀行類型囉');
        this.bankList.bankList_table = this.bankList.filterTableData.filter((item1) => {
          console.log(item1.bank_type);
          return item1.bank_type === this.searchOption.bankType;
        });
      } else if (this.searchOption.bank_transfer !== '') {
        console.log('抓到銀行顯示囉');
        this.bankList.bankList_table = this.bankList.filterTableData.filter((item1) => {
          console.log(item1.bank_cn);
          return item1.bank_cn === this.searchOption.bank_transfer;
        });
      } else if (this.searchOption.bank_link !== '') {
        console.log('抓到綁定銀行囉');
        this.bankList.bankList_table = this.bankList.filterTableData.filter((item1) => {
          console.log(item1.bank_preset);
          return item1.bank_preset === this.searchOption.bank_link;
        });
      } else {
        console.log('啥都沒跑');
      }
    },
    // 上傳圖片的方法
    UploadImage(file, filelist1) {
      console.log(file, filelist1);

      fd.append('img', file.raw); // 傳給後台接收的名字 file
      ElMessage({ showClose: true, message: '圖片已上傳成功!', type: 'success' });
      // fd.append('bank_type', this.addBankDetail.bank_type); // 傳給後台的銀行類型
      // fd.append('bank', this.addBankDetail.bank); // 傳給後台的銀行類型
      // fd.append('bank_cn', this.addBankDetail.bank_cn); // 傳給後台的銀行類型
      // fd.append('bank_preset', this.addBankDetail.bank_preset); // 傳給後台的銀行類型
      // fd.append('url', this.addBankDetail.url); // 傳給後台的銀行類型
      // this.$http
      //   .post('http://167.179.74.47:4000/backend/financ/bankListAdd', fd)
      //   .then((response) => {
      //     // 上传成功后返回的数据,
      //     console.log(`上传图片到:${response.data.data}`);
      //     // 将图片地址给到表单.
      //     // this.addBankDetail.img = response.data;
      //   });
    },
    // 刪除圖片功能
    handleRemove(file, fileList1) {
      console.log(file, fileList1);
    },
    // 預覽圖片
    handlePictureCardPreview(file) {
      console.log(file.url);
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },
    // 覆蓋前個圖片
    handleExceed(files) {
      this.$refs.upload.clearFiles();
      this.$refs.upload.handleStart(files[0]);
    },
    uploadProcess(event, file, fileList) {
      console.log(event.percent, file, fileList);
      this.percent.value = Math.floor(event.percent);
    },
    // 送出新增銀行表單
    doAddBank() {
      fd.append('bank_type', this.addBankDetail.bank_type); // 傳給後台的銀行類型
      fd.append('bank', this.addBankDetail.bank); // 傳給後台的銀行類型
      fd.append('bank_cn', this.addBankDetail.bank_cn); // 傳給後台的銀行類型
      fd.append('bank_preset', this.addBankDetail.bank_preset); // 傳給後台的銀行類型
      fd.append('url', this.addBankDetail.url); // 傳給後台的銀行類型
      const testapi = `${process.env.VUE_APP_TESTAPI}`;
      // 執行校驗
      this.$refs.addBankRules.validate((valid) => {
        // 沒通過校驗
        if (!valid) {
          console.log('驗證失敗,表單格式不正缺');
          return false;
        }
        // 驗證通過為true，有一個不通過就是false
        console.log('可以新增');
        // 通過校驗
        // 登入處理
        // ....
        // axios
        this.$http
          .post(`${testapi}/backend/financ/bankListAdd`, fd)
          .then((response) => {
            this.$swal.fire('新增完成', '銀行新增成功!', 'success');
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
            console.log('新增失敗，銀行名稱已新增過');
          });
        this.addBank_visible = false;
        this.getBank_list();
        return true;
      });
      //   resetForm(); // 把表單重置成預設值
    },
    // 打開會員訊息Modal
    openModal(item) {
      console.log(item);

      this.tempProduct = item;

      const EditComponent = this.$refs.BankEditModal;
      EditComponent.showModal();
    },
  },
  created() {
    this.getBank_list();
    this.getBank_list2();
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
.editBtn {
  background: #0b5ed7;
  color: #fff;
  &:hover {
    transition: 0.5s;
    background: #236aa5;
    color: #fff;
  }
}
.bankName_style .el-input__inner {
  width: 100%;
  padding: 0 160px 0 10px;
  border: 1px solid #dcdfe6;
  &:focus {
    border-color: #409eff !important;
  }
}
.bankList_style .el-input__inner {
  width: 100%;
  padding: 0 160px 0 10px;
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
.tags_table_style {
  border-radius: 10px;
}
// 新增銀行按鈕樣式
.addBank_btn,
.hotSort {
  background: #2f2f2f;
  color: #fff;
  &:hover {
    background: #0f0f0f !important;
    color: white;
  }
}
.bankDetail_style .el-input__inner {
  border: none;
  border-bottom: 1px solid #dcdfe6;
  padding: 20px 0;
}
.image_size {
  width: 100%;
  height: 50px;
  object-fit: cover;
}
</style>
