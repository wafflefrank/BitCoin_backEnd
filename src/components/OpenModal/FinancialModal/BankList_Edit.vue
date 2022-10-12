<template>
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
          <h5 class="modal-title" id="exampleModalLabel">更新銀行詳細資料</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- 個人訊息 -->
          <!-- 修改銀行資料彈窗 -->
          <el-dialog v-model="tagsNameVisible" title="新銀行名稱表單">
            <el-form :model="tagsNewNameForm">
              <el-form-item label="新銀行名稱 :">
                <el-input class="memberIdStyle" v-model="tagsNewNameForm.bank"></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="tagsNameVisible = false">取消</el-button>
                <el-button type="primary" @click="newTags_Name()">確認</el-button>
              </span>
            </template>
          </el-dialog>
          <!-- 新銀行類型彈窗 -->
          <el-dialog v-model="tagsContentVisible" title="新銀行類型">
            <el-form :model="tagsNewNameForm">
              <el-form-item label="新銀行類型 :">
                <el-input class="memberIdStyle" v-model="tagsNewNameForm.bank_type"></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="tagsContentVisible = false">取消</el-button>
                <el-button type="primary" @click="newTags_Content()">確認</el-button>
              </span>
            </template>
          </el-dialog>
          <!-- 新簡中名稱 -->
          <el-dialog v-model="tagsRemarkVisible" title="新簡中名稱">
            <el-form :model="tagsNewNameForm">
              <el-form-item label="新簡中名稱 :">
                <el-input class="memberIdStyle" v-model="tagsNewNameForm.bank_cn"></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="tagsRemarkVisible = false">取消</el-button>
                <el-button type="primary" @click="newTags_Remark()">確認</el-button>
              </span>
            </template>
          </el-dialog>
          <!-- 新預設語系名稱-->
          <el-dialog v-model="tagsDomainVisible" title="新預設語系名稱">
            <el-form :model="tagsNewNameForm">
              <el-form-item label="新預設語系名稱 :">
                <el-input class="memberIdStyle" v-model="tagsNewNameForm.bank_preset"></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="tagsDomainVisible = false">取消</el-button>
                <el-button type="primary" @click="newTags_Domain()">確認</el-button>
              </span>
            </template>
          </el-dialog>
          <!-- 新圖片彈窗 -->
          <el-dialog v-model="tagsDomainNameVisible" title="新圖片">
            <el-form :model="tagsNewNameForm">
              <el-form-item>
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
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="tagsDomainNameVisible = false">取消</el-button>
                <el-button type="primary" @click="img_edit()">確認</el-button>
              </span>
            </template>
          </el-dialog>
          <!-- 新網銀網址彈窗 -->
          <el-dialog v-model="bankUrlVisible" title="新網銀網址">
            <el-form :model="tagsNewNameForm">
              <el-form-item label="新網銀網址 :">
                <el-input class="memberIdStyle" v-model="tagsNewNameForm.url"></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="tagsDomainNameVisible = false">取消</el-button>
                <el-button type="primary" @click="newUrl_edit()">確認</el-button>
              </span>
            </template>
          </el-dialog>
          <el-row class="mb-4">
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <h5 class="text-start mb-4 ms-2 mustType text-dark">銀行資訊</h5>
                <!-- 資料表單 -->
                <div>
                  <el-row>
                    <el-col :span="12">
                      <el-input disabled v-model="tempProduct.id">
                        <template #prepend>銀行ID</template>
                      </el-input>
                      <el-input disabled v-model="tempProduct.bank">
                        <template #prepend>銀行名稱</template>
                        <template #suffix>
                          <el-button class="editBtn" size="small" @click="tagsNameVisible = true"
                            ><el-icon class="edit"> <Edit></Edit></el-icon>
                          </el-button>
                        </template>
                      </el-input>
                      <el-input disabled v-model="tempProduct.bank_type">
                        <template #prepend>銀行類型</template>
                        <template #suffix>
                          <el-button class="editBtn" size="small" @click="tagsContentVisible = true"
                            ><el-icon class="edit"> <Edit></Edit></el-icon>
                          </el-button>
                        </template>
                      </el-input>
                      <el-input disabled v-model="tempProduct.bank_cn">
                        <template #prepend>簡中名稱</template>
                        <template #suffix>
                          <el-button class="editBtn" size="small" @click="tagsRemarkVisible = true"
                            ><el-icon class="edit"> <Edit></Edit></el-icon>
                          </el-button>
                        </template>
                      </el-input>
                    </el-col>
                    <el-col :span="12">
                      <el-input disabled v-model="tempProduct.bank_preset">
                        <template #prepend>預設語系名稱</template>
                        <template #suffix>
                          <el-button class="editBtn" size="small" @click="tagsDomainVisible = true"
                            ><el-icon class="edit"> <Edit></Edit></el-icon>
                          </el-button>
                        </template>
                      </el-input>
                      <el-input disabled v-model="tempProduct.img">
                        <template #prepend>圖片</template>
                        <template #suffix>
                          <el-button
                            class="editBtn"
                            size="small"
                            @click="tagsDomainNameVisible = true"
                            ><el-icon class="edit"> <Edit></Edit></el-icon>
                          </el-button>
                        </template>
                      </el-input>
                      <el-input disabled v-model="tempProduct.url">
                        <template #prepend>網銀網址</template>
                        <template #suffix>
                          <el-button class="editBtn" size="small" @click="bankUrlVisible = true"
                            ><el-icon class="edit"> <Edit></Edit></el-icon>
                          </el-button>
                        </template>
                      </el-input>
                      <!-- <el-input v-model="tempProduct.city">
                        <template #prepend>城市</template>
                      </el-input>
                      <el-input v-model="tempProduct.pic2">
                        <template #prepend>PIC2</template>
                        <template #suffix>
                          <el-button class="editBtn" size="small"></el-button
                        ></template>
                      </el-input>  -->
                    </el-col>
                  </el-row>
                </div>
              </div></el-col
            >
          </el-row>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click.prevent="hideModal()">取消</button>
          <button type="button" class="btn btn-primary" @click="editConfirm()">送出</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
import { Edit } from '@element-plus/icons';
import { ElMessage } from 'element-plus';

const newImg = new FormData(); // 後台上傳data含有檔案類型 , 自己模擬一個空的數據

export default {
  name: 'BankList_Edit',
  inject: ['reload'],
  props: {
    // 外層傳進來的資料(每次點擊資料都會不同 要寫在watch裡面)
    bankList_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    bankList_data() {
      this.tempProduct = this.bankList_data; // 內層等於外層
      //   this.getWalletInfo();
    },
  },
  data() {
    return {
      isLoading: false,
      tempProduct: {},
      // 新銀行表單
      tagsNewNameForm: {
        id: '',
        bank_type: '',
        bank: '',
        bank_cn: '',
        bank_preset: '',
        img: '',
        url: '',
      },
      tagsNameVisible: false,
      tagsContentVisible: false,
      tagsRemarkVisible: false,
      tagsDomainVisible: false,
      tagsDomainNameVisible: false,
      bankUrlVisible: false,
      // 圖片上傳
      fileList1: [], // 存file的地方
      dialogImageUrl: '', // 圖片網址
      dialogVisible: false, // 圖片預覽
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
    // 重置會員表單
    resetForm() {
      this.$refs.tagsForm3.resetFields();
    },
    // 新標籤名稱
    newTags_Name() {
      this.tempProduct.bank = this.tagsNewNameForm.bank;
      this.tagsNameVisible = false;
    },
    // 新描述
    newTags_Content() {
      this.tempProduct.bank_type = this.tagsNewNameForm.bank_type;
      this.tagsContentVisible = false;
    },
    // 新備註
    newTags_Remark() {
      this.tempProduct.bank_cn = this.tagsNewNameForm.bank_cn;
      this.tagsRemarkVisible = false;
    },
    // 新域名綁定
    newTags_Domain() {
      this.tempProduct.bank_preset = this.tagsNewNameForm.bank_preset;
      this.tagsDomainVisible = false;
    },

    // 新圖片
    img_edit() {
      this.tempProduct.img = this.tagsNewNameForm.img;
      ElMessage({ showClose: true, message: '圖片已上傳成功!', type: 'success' });
      this.tagsDomainNameVisible = false;
    },
    // 新url
    newUrl_edit() {
      this.tempProduct.url = this.tagsNewNameForm.url;
      this.tagsDomainNameVisible = false;
    },
    // 編輯完成送出
    editConfirm() {
      this.isLoading = true;
      // this.tagsNewNameForm.id = this.tempProduct.id;
      // this.tagsNewNameForm.bank = this.tempProduct.bank;
      // this.tagsNewNameForm.bank_type = this.tempProduct.bank_type;
      // this.tagsNewNameForm.bank_cn = this.tempProduct.bank_cn;
      // this.tagsNewNameForm.bank_preset = this.tempProduct.bank_preset;
      // this.tagsNewNameForm.img = this.tempProduct.img;
      // this.tagsNewNameForm.url = this.tempProduct.url;
      newImg.append('id', this.tempProduct.id); // 傳給後台的銀行類型
      newImg.append('bank_type', this.tempProduct.bank_type); // 傳給後台的銀行類型
      newImg.append('bank', this.tempProduct.bank); // 傳給後台的銀行類型
      newImg.append('bank_cn', this.tempProduct.bank_cn); // 傳給後台的銀行類型
      newImg.append('bank_preset', this.tempProduct.bank_preset); // 傳給後台的銀行類型
      newImg.append('url', this.tempProduct.url); // 傳給後台的銀行類型
      const testapi = `${process.env.VUE_APP_TESTAPI}`;
      this.$http.post(`${testapi}/backend/financ/bankListUpdate`, newImg).then((res) => {
        this.isLoading = false;
        if (res.data.code === 200) {
          this.$swal.fire('銀行已修改!', `${res.data.msg}`, 'success');
          // this.reload();
          // this.tempProduct.teacher = this.selectValue.account;
          // this.hideModal();
        } else {
          this.$swal.fire('修改失敗!', `${res.data.msg}`, 'error');
          console.log(res.data);
        }
      });
      this.hideModal();
      this.reload();
      console.log(...newImg);
    },
    // 上傳圖片的方法
    UploadImage(file, filelist1) {
      console.log(file, filelist1);
      // this.fileList1.splice(0, 1);
      newImg.append('img', file.raw); // 傳給後台接收的名字 file
      this.tagsNewNameForm.img = file.raw.name;
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
  },
  components: {
    Edit,
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
};
</script>

<style lang="scss">
.edit {
  font-size: 20px;
}
.grid-content {
  padding: 10px 0 0;
  border-radius: 10px;
  flex-wrap: wrap;
  //   min-height: 36px;
}
.bg-purple-dark {
  background: #eff3f8;
}
.el-input-group__prepend {
  width: 200px;
  padding: 10px 0 10px 10px;
  border: none;
  border-bottom: 1px solid #dcdfe6;
  border-radius: 0;
}
.el-input__inner {
  border: none;
  border-bottom: 1px solid #dcdfe6;
  padding: 20px 0;
}
.el-input__suffix-inner .editBtn {
  background: none;
  color: #409eff;
  &:hover {
    transition: 0.5s;
    background: #236aa5;
    color: #fff;
  }
}
.el-input__suffix-inner {
  align-items: center;
}
.el-input.is-disabled .el-input__inner {
  background: none;
}
</style>
