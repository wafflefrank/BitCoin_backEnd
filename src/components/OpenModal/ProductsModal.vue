<template>
  <!-- Button trigger modal -->

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
          <h5 class="modal-title" id="exampleModalLabel">新增會員</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- 必填欄位 -->
          <div class="text-start mb-2 mustType">必填欄位</div>
          <el-form
            ref="ruleFormRef1"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-row>
              <el-col :span="12">
                <!-- 會員帳號 -->
                <el-form-item label="會員帳號" prop="account">
                  <el-input v-model="ruleForm.account"></el-input>
                </el-form-item>
                <!-- 密碼 -->
                <el-form-item label="密碼" prop="pwd">
                  <el-input v-model="ruleForm.pwd" type="password"></el-input>
                </el-form-item>
                <!-- 幣別 -->
                <el-form-item label="幣別" prop="currency">
                  <el-col :span="11">
                    <el-select v-model="ruleForm.currency" placeholder="請選擇幣別">
                      <el-option label="US" value="US"></el-option>
                      <el-option label="TWD" value="TWD"></el-option>
                      <el-option label="VND" value="VND"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-col>
              <!-- 真實姓名 -->
              <el-col :span="12">
                <el-form-item label="真實姓名" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <!-- 確認密碼 -->
                <el-form-item label="確認密碼" prop="checkPass">
                  <el-input v-model="ruleForm.checkPass" type="password"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!-- 選填欄位 -->
          <div class="text-start mb-2 mustType">選填欄位</div>
          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-row>
              <!-- 左半邊 -->
              <el-col :span="12">
                <!-- 手機號碼 -->
                <el-form-item label="手機號碼" prop="phone">
                  <el-input v-model="ruleForm.phone" placeholder="Ex: 0912345678..."></el-input>
                </el-form-item>
                <!-- 國家 -->
                <el-form-item label="國家" prop="country">
                  <el-select v-model="ruleForm.country" placeholder="選擇國家">
                    <el-option label="台灣" value="Tw"></el-option>
                    <el-option label="越南" value="Vn"></el-option>
                    <el-option label="日本" value="Jp"></el-option>
                    <el-option label="美國" value="Us"></el-option>
                    <el-option label="英國" value="Uk"></el-option>
                    <el-option label="中國" value="Cn"></el-option>
                  </el-select>
                </el-form-item>
                <!-- 出生日期 -->
                <el-form-item label="出生日期" prop="birthday">
                  <el-date-picker
                    v-model="ruleForm.birthday"
                    type="date"
                    placeholder="選擇日期"
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
                <!-- IM1 -->
                <el-form-item label="IM1">
                  <el-input v-model="ruleForm.Im1"></el-input>
                </el-form-item>
                <!-- VIP群組 -->
                <el-form-item label="VIP群組" prop="vip_group">
                  <el-col :span="11">
                    <el-select v-model="ruleForm.vip_group" placeholder="請選擇群組">
                      <el-option label="VIP1" value="1"></el-option>
                      <el-option label="VIP2" value="2"></el-option>
                      <el-option label="VIP99" value="99"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-col>
              <!-- 右半邊 -->
              <el-col :span="12">
                <!-- 電子信箱 -->
                <el-form-item label="電子信箱" prop="email">
                  <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <!-- 城市 -->
                <el-form-item label="城市" prop="city">
                  <el-input v-model="ruleForm.city"></el-input>
                </el-form-item>
                <!-- 內部會員 -->
                <el-form-item label="內部會員" prop="delivery">
                  <el-switch v-model="ruleForm.delivery"></el-switch>
                </el-form-item>
                <!-- IM2 -->
                <el-form-item label="IM2">
                  <el-input v-model="ruleForm.Im2"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
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

export default {
  name: 'ProductsModal',
  data() {
    //   確認密碼規則
    const checkPwd2 = (rule, value, callback) => {
      if (value.trim().length === 0) {
        callback(new Error('確認密碼不能為空'));
      } else if (value !== this.ruleForm.pwd) {
        callback(new Error('請與輸入密碼一致'));
      } else {
        callback();
      }
    };

    return {
      modal: {},
      ruleForm: {
        name: '',
        pwd: '',
        checkPass: '',
        currency: '',
        delivery: false,
        type: [],
        phone: '',
        country: '',
        birthday: '',
        vip_group: '',
        email: '',
        city: '',
        Im1: '',
        Im2: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: '請輸入姓名',
            trigger: 'blur',
          },
          {
            min: 1,
            max: 10,
            message: '長度須至少1個位元',
            trigger: 'blur',
          },
        ],
        account: [
          {
            required: true,
            message: '帳號不能為空 87',
            trigger: 'blur',
          },
        ],
        pwd: [
          {
            required: true,
            message: '請輸入密碼',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 8,
            message: '至少需輸入3~8碼',
            trigger: 'blur',
          },
        ],
        checkPass: [{ validator: checkPwd2, trigger: 'blur' }],
        currency: [
          {
            required: true,
            message: '請選擇幣種',
            trigger: 'change',
          },
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change',
          },
        ],
      },
    };
  },
  methods: {
    //   新增會員視窗
    showModal() {
      this.modal.show();
    },
    // 隱藏會員視窗
    hideModal() {
      this.modal.hide();
    },
    // 重置會員表單
    resetForm() {
      this.$refs.ruleFormRef1.resetFields();
      this.$refs.ruleFormRef.resetFields();
    },
    // 送出新增會員表單
    doRegister() {
      const testapi = `${process.env.VUE_APP_TESTAPI}`;
      // 執行校驗
      this.$refs.ruleFormRef1.validate((valid) => {
        // 沒通過校驗
        if (!valid) {
          console.log('驗證失敗,表單格式不正缺');
          return false;
        }
        // 驗證通過為true，有一個不通過就是false
        console.log('可以註冊');
        // 通過校驗
        // 登入處理
        // ....
        // axios
        this.$http
          .post(`${testapi}/backend/members/members_add`, this.ruleForm)
          .then((response) => {
            if (response.data.code === 200) {
              this.$swal.fire('Welcome!', '註冊成功!', 'success');
              this.modal.hide();
              this.$router.push('/memberlist');

              console.log(response.data);
            } else {
              this.$swal.fire('註冊失敗', `${response.data.msg}`, 'error');
              console.log(response.data);
            }
          })
          .catch((error) => {
            console.log(error);
            console.log('註冊失敗，帳號已註冊過');
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
.mustType {
  color: gray;
}
</style>
