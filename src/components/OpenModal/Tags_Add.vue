<template>
  <!-- Modal -->
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
          <h5 class="modal-title" id="exampleModalLabel">新增標籤</h5>
        </div>
        <div class="modal-body">
          <!-- 新增標籤Form 🍳 -->
          <div>
            <el-form ref="tagsForm3" :model="addTagsForm" :rules="rules" class="demo-ruleForm">
              <!-- 標籤名稱 -->
              <el-form-item label="標籤名稱" prop="title" class="ms-2 el-form-style">
                <el-input class="tagName_style" v-model="addTagsForm.title"></el-input>
              </el-form-item>
              <!-- 描述 -->
              <el-form-item label="描述" prop="content" class="ms-2 el-form-style">
                <el-input class="contentName_style" v-model="addTagsForm.content"></el-input>
              </el-form-item>
              <!-- 備註 -->
              <el-form-item label="備註" prop="remark" class="ms-2 el-form-style">
                <el-input class="contentName_style" v-model="addTagsForm.remark"></el-input>
              </el-form-item>
              <!-- 域名綁定 -->
              <el-form-item class="ms-3 el-form-style" label="域名綁定" prop="domain">
                <el-radio-group
                  v-model="addTagsForm.domain"
                  size="small"
                  class="radio-group"
                  @change="changeStatus($event)"
                >
                  <el-radio label="否" class="radio-no">否</el-radio>
                  <el-radio label="是">是</el-radio>
                </el-radio-group>
              </el-form-item>
              <!-- 域名綁定-是下拉選單 -->
              <el-form-item
                v-if="addTagsForm.domain === '是'"
                label="https://"
                class="ms-3"
                prop="domain_yes"
              >
                <div class="d-flex w-75">
                  <el-input
                    placeholder="www.google.com"
                    class="domain_style me-3"
                    v-model="addTagsForm.domain_name"
                  ></el-input>
                  <el-button
                    type="primary"
                    :disabled="addTagsForm.domain_name === ''"
                    color="#626aef"
                    @click="confirmDomain()"
                    >綁定</el-button
                  >
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click.prevent="resetForm()">重置</button>
          <button type="button" class="btn btn-primary" @click="doRegister()">送出</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
import { ElMessage } from 'element-plus';
// import isDark from '~/';

export default {
  name: 'Tags_Add',
  data() {
    return {
      // 上方標籤表單
      addTagsForm: {
        title: '', // 標籤名稱
        content: '', // 描述
        remark: '', // 備註(選填)
        domain: '', // 域名榜定(是or否)
        domain_yes: '', // 域名榜定(是or否)
        domain_name: '', // 複數域名依逗號區隔
      },
      // 上方表單規則
      rules: {
        title: [
          {
            required: true,
            message: '標籤名稱必須填寫',
            trigger: 'blur',
          },
        ],
        content: [
          {
            required: true,
            message: '描述必須填寫',
            trigger: 'blur',
          },
        ],
        remark: [
          {
            required: false,
            message: '選填',
            trigger: 'change',
          },
        ],
        domain: [
          {
            required: true,
            message: '請至少選擇一種',
            trigger: 'change',
          },
        ],
      },
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
    // 狀態修改
    changeStatus(item) {
      console.log(item);
      if (item === '是') {
        this.addTagsForm.domain = '是'; // 狀態開啟
      } else if (item === '否') {
        this.addTagsForm.domain = '否'; // 狀態關閉
      }
    },
    // 綁定域名
    confirmDomain() {
      ElMessage({ showClose: true, message: '已綁定!', type: 'success' });
    },
    // 送出新增標籤表單
    doRegister() {
      const testapi = `${process.env.VUE_APP_TESTAPI}`;
      // 執行校驗
      this.$refs.tagsForm3.validate((valid) => {
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
          .post(`${testapi}/backend/members/tags_add`, this.addTagsForm)
          .then((response) => {
            if (response.data.code === 200) {
              this.$swal.fire('新增成功!', `'${response.data.msg}`, 'success');
              this.modal.hide();
              this.$router.push('tags');

              console.log(response.data);
            } else {
              this.$swal.fire('新增失敗', `${response.data.msg}`, 'error');
              console.log(response.data);
            }
          })
          .catch((error) => {
            console.log(error);
            console.log('新增失敗');
          });

        return true;
      });
      //   resetForm(); // 把表單重置成預設值
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
    // this.modal.show();
  },
};
</script>

<style lang="scss">
.tagName_style .el-input__inner {
  width: 100%;
  padding: 10px;
  border: 1px solid #dcdfe6;
  background: #c1c1c124;
  &:focus {
    border-color: #409eff !important;
  }
}
.contentName_style .el-input__inner {
  width: 100%;
  padding: 30px 10px;
  border: 1px solid #dcdfe6;
  background: #c1c1c124;
  &:focus {
    border-color: #409eff !important;
  }
}
.domain_style .el-input__inner {
  width: 100%;
  padding: 10px;
  border: 1px solid #dcdfe6;
  background: #c1c1c124;
  &:focus {
    border-color: #409eff !important;
  }
}
.el-form-style {
  display: block; //el-form-item的標題顯示再輸入框上面
  margin-bottom: 15px;
  text-align: start;
}
.radio-group .radio-no {
  margin-right: 10px;
}
</style>
