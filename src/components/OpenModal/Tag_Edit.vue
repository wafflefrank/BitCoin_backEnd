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
          <h5 class="modal-title" id="exampleModalLabel">標籤編輯</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- 個人訊息 -->
          <!-- 新標籤名稱彈窗 -->
          <el-dialog v-model="tagsNameVisible" title="新標籤名稱表單">
            <el-form :model="tagsNewNameForm">
              <el-form-item label="新標籤名稱 :">
                <el-input class="memberIdStyle" v-model="tagsNewNameForm.title"></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="tagsNameVisible = false">取消</el-button>
                <el-button type="primary" @click="newTags_Name()">確認</el-button>
              </span>
            </template>
          </el-dialog>
          <!-- 新描述彈窗 -->
          <el-dialog v-model="tagsContentVisible" title="新描述表單">
            <el-form :model="tagsNewNameForm">
              <el-form-item label="新描述 :">
                <el-input class="memberIdStyle" v-model="tagsNewNameForm.content"></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="tagsContentVisible = false">取消</el-button>
                <el-button type="primary" @click="newTags_Content()">確認</el-button>
              </span>
            </template>
          </el-dialog>
          <!-- 新備註彈窗 -->
          <el-dialog v-model="tagsRemarkVisible" title="新備註表單">
            <el-form :model="tagsNewNameForm">
              <el-form-item label="新備註 :">
                <el-input class="memberIdStyle" v-model="tagsNewNameForm.remark"></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="tagsRemarkVisible = false">取消</el-button>
                <el-button type="primary" @click="newTags_Remark()">確認</el-button>
              </span>
            </template>
          </el-dialog>
          <!-- 新網域開關彈窗 -->
          <el-dialog v-model="tagsDomainVisible" title="新域名開關表單">
            <el-form :model="tagsNewNameForm">
              <el-form-item label="新域名綁定 :">
                <el-radio-group
                  v-model="tagsNewNameForm.domain"
                  size="small"
                  class="radio-group"
                  @change="changeStatus($event)"
                >
                  <el-radio label="否" class="radio-no">否</el-radio>
                  <el-radio label="是">是</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="tagsDomainVisible = false">取消</el-button>
                <el-button type="primary" @click="newTags_Domain()">確認</el-button>
              </span>
            </template>
          </el-dialog>
          <!-- 新網域名稱彈窗 -->
          <el-dialog v-model="tagsDomainNameVisible" title="新域名稱表單">
            <el-form :model="tagsNewNameForm">
              <el-form-item label="新域名 :">
                <el-input class="memberIdStyle" v-model="tagsNewNameForm.domain_name"></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="tagsDomainNameVisible = false">取消</el-button>
                <el-button type="primary" @click="newTags_Domain_Name()">確認</el-button>
              </span>
            </template>
          </el-dialog>
          <el-row class="mb-4">
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <h5 class="text-start mb-4 ms-2 mustType text-dark">標籤資訊</h5>
                <!-- 資料表單 -->
                <div>
                  <el-row>
                    <el-col :span="12">
                      <el-input disabled v-model="tempProduct.title">
                        <template #prepend>標籤名稱</template>
                        <template #suffix>
                          <el-button class="editBtn" size="small" @click="tagsNameVisible = true"
                            ><el-icon class="edit"> <Edit></Edit></el-icon>
                          </el-button>
                        </template>
                      </el-input>
                      <el-input disabled v-model="tempProduct.content">
                        <template #prepend>描述</template>
                        <template #suffix>
                          <el-button class="editBtn" size="small" @click="tagsContentVisible = true"
                            ><el-icon class="edit"> <Edit></Edit></el-icon>
                          </el-button>
                        </template>
                      </el-input>
                      <el-input disabled v-model="tempProduct.remark">
                        <template #prepend>備註</template>
                        <template #suffix>
                          <el-button class="editBtn" size="small" @click="tagsRemarkVisible = true"
                            ><el-icon class="edit"> <Edit></Edit></el-icon>
                          </el-button>
                        </template>
                      </el-input>
                    </el-col>
                    <el-col :span="12">
                      <el-input disabled v-model="tempProduct.domain">
                        <template #prepend>域名榜定</template>
                        <template #suffix>
                          <el-button class="editBtn" size="small" @click="tagsDomainVisible = true"
                            ><el-icon class="edit"> <Edit></Edit></el-icon>
                          </el-button>
                        </template>
                      </el-input>
                      <el-input disabled v-model="tempProduct.domain_name">
                        <template #prepend>複數域名依逗號區隔</template>
                        <template #suffix>
                          <el-button
                            class="editBtn"
                            size="small"
                            @click="tagsDomainNameVisible = true"
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

export default {
  name: 'Tag_Edit',
  props: {
    // 外層傳進來的資料(每次點擊資料都會不同 要寫在watch裡面)
    tagsData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    tagsData() {
      this.tempProduct = this.tagsData; // 內層等於外層
      //   this.getBankCard();
      //   this.getWalletInfo();
    },
  },
  data() {
    return {
      tempProduct: {},
      // 老帶新視窗專用
      tagsNewNameForm: {
        title: '',
        content: '',
        remark: '',
        domain: '',
        domain_name: '',
        id: '',
      },
      tagsNameVisible: false,
      tagsContentVisible: false,
      tagsRemarkVisible: false,
      tagsDomainVisible: false,
      tagsDomainNameVisible: false,
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
      this.tempProduct.title = this.tagsNewNameForm.title;
      this.tagsNameVisible = false;
    },
    // 新描述
    newTags_Content() {
      this.tempProduct.content = this.tagsNewNameForm.content;
      this.tagsContentVisible = false;
    },
    // 新備註
    newTags_Remark() {
      this.tempProduct.remark = this.tagsNewNameForm.remark;
      this.tagsRemarkVisible = false;
    },
    // 新域名綁定
    newTags_Domain() {
      this.tempProduct.domain = this.tagsNewNameForm.domain;
      this.tagsDomainVisible = false;
    },
    // 域名綁定更改
    changeStatus(item) {
      console.log(item);
      if (item === '是') {
        this.tagsNewNameForm.domain = '是'; // 狀態開啟
        // this.tagsNewNameForm.domain = this.tempProduct.domain;
      } else if (item === '否') {
        this.tagsNewNameForm.domain = '否'; // 狀態關閉
        // this.tagsNewNameForm.domain = this.tempProduct.domain;
      }
    },
    // 新域名稱
    newTags_Domain_Name() {
      this.tempProduct.domain_name = this.tagsNewNameForm.domain_name;
      this.tagsDomainNameVisible = false;
    },
    // 編輯完成送出
    editConfirm() {
      this.isLoading = true;
      // this.tagsNewNameForm.id = this.tempProduct.id;
      this.tagsNewNameForm.id = this.tempProduct.id;
      this.tagsNewNameForm.title = this.tempProduct.title;
      this.tagsNewNameForm.content = this.tempProduct.content;
      this.tagsNewNameForm.remark = this.tempProduct.remark;
      this.tagsNewNameForm.domain = this.tempProduct.domain;
      this.tagsNewNameForm.domain_name = this.tempProduct.domain_name;
      const testapi = `${process.env.VUE_APP_TESTAPI}`;
      this.$http
        .post(`${testapi}/backend/members/tags_update`, this.tagsNewNameForm)
        .then((res) => {
          this.isLoading = false;
          if (res.data.code === 200) {
            this.$swal.fire('標籤已修改!', `${res.data.msg}`, 'success');
            // this.tempProduct.teacher = this.selectValue.account;
            // this.hideModal();
            // console.log(this.tempProduct.id);
          } else {
            console.log(res.data);
          }
        });
      this.hideModal();
    },
  },
  components: {
    Edit,
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
    // this.modal.show();
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
