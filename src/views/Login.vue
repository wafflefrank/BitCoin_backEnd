<template>
  <div class="container mt-5">
   <!-- 表單資料 🥞-->
   <el-form ref="addBank_Form" :model="addForm_Data" :rules="rules" class="demo-ruleForm d-flex flex-column align-items-center justify-content-center">
    <img src="../assets/img/rocket-glyph-black-icon-png_291995.jpg" alt="#" style="width: 200px; height: 200px ; border-radius: 50%;"/>
    <p class="mt-5 text-white fs-2">歡迎回來 !</p>
                    <!-- 帳號 -->
                    <el-form-item label="帳號" prop="currency" class="addInput_style">
                      <el-input class="contentName_style" v-model.number="addForm_Data.account" placeholder="請輸入"></el-input>
                    </el-form-item>
                   <!-- 密碼 -->
                   <el-form-item label="密碼" prop="amount" class="addInput_style">
                      <el-input class="contentName_style" v-model.number="addForm_Data.pwd" placeholder="請輸入" type="password"></el-input>
                      <!-- <i class="fa-regular fa-copy text-yellow" @click="copy()" @keydown="copy()"></i> -->
                    </el-form-item>
                    <a href="#" class="px-5" @click.prevent="login()">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      登入
    </a>
                  </el-form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      //   充值表單資料
      addForm_Data: {
        account: '',
        pwd: '',
      },
      // 充值表單規則
      rules: {
        // 幣種選項
        account: [
          //   {
          //     type: 'number',
          //     validator: checkBet_value, // 驗證質押金額範圍
          //     trigger: 'blur',
          //     // message: '委託金額需大於0,不可超過可用餘額',
          //   },
          {
            required: true,
            message: '請選擇一項幣種',
            trigger: 'change',
          },
        ],
        // 轉帳網路
        pwd: [
          {
            required: true,
            message: '跳出網路標籤',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$http.post('/backend/login', this.addForm_Data).then((res) => {
        if (res.data.code === 200) {
          this.$swal.fire('登入成功!', '登入成功', 'success');
          this.$router.push('/');
        } else {
          this.$swal.fire('登入失敗!', `${res.data.data}`, 'error');
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .demo-ruleForm{
    background: linear-gradient(#141e30, #243b55);
    padding: 100px 0;
    margin: 0 200px;
    border-radius: 50px;
    & a {
      position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 4px
    }
    & a:hover{
      background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4,
              0 0 25px #03e9f4,
              0 0 50px #03e9f4,
              0 0 100px #03e9f4;
    }
    & a span {
      position: absolute;
      display: block;
    }
    & a span:nth-child(1) {
      top: 0;
      left: -100%;
     width: 100%;
     height: 2px;
     background: linear-gradient(90deg, transparent, #03e9f4);
     animation: btn-anim1 1s linear infinite;
    }
    & a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: .25s
}
& a span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: .5s
}
& a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: .75s
}
    @keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,100% {
    left: 100%;
  }
}
    @keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,100% {
    top: 100%;
  }
}
    @keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,100% {
    right: 100%;
  }
}
    @keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,100% {
    bottom: 100%;
  }
}
  }
.addInput_style {
  display: block; //el-form-item的標題顯示再輸入框上面
  // & .el-select {
  //   & {
  //     :deep(.el-input__wrapper.is-focus) {
  //       box-shadow: 0 0 0 1px #faa30d inset !important;
  //     }
  //   }
  // }
  & :deep(.el-input__inner) {
    background: #f9fafb;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 400px;
  }
  // 輸入框選取樣式
  & :deep(.el-input__inner:focus){
    border: #faa30d 1px solid !important;
    transition: 0.6s;
    box-shadow: 5px 5px 28px -2px rgba(250,163,13,0.78);
-webkit-box-shadow: 5px 5px 28px -2px rgba(250,163,13,0.78);
-moz-box-shadow: 5px 5px 28px -2px rgba(250,163,13,0.78);
  }
  // 輸入框border樣式
  & :deep(.el-form-item__label) {
    color: rgb(255, 255, 255);
  }
}
</style>
