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
          <h5 class="modal-title" id="exampleModalLabel">新增組</h5>
        </div>
        <div class="modal-body">
          <!-- 組設置  上半部分-->
          <el-row class="mb-4 mt-4">
            <el-col :span="24">
              <div class="group_set_content bg-purple-dark">
                <h5 class="text-start mb-4 ms-2 mustType text-dark">組設置</h5>
                <!-- 資料表單 -->
                <div>
                  <el-form
                    ref="ruleFormRef3"
                    :model="addRuleForm"
                    :rules="rules"
                    class="demo-ruleForm"
                  >
                    <el-row>
                      <!-- 左半邊 -->
                      <el-col :span="12">
                        <!-- 組名稱 & 自動配置層級 -->
                        <el-row :gutter="20">
                          <el-col :span="12" class="add_left_style_1">
                            <!-- 組名稱 🌭-->
                            <el-form-item label="組名稱" prop="group_name" class="ms-4">
                              <el-input
                                class="groupName_style"
                                v-model="addRuleForm.group_name"
                              ></el-input>
                            </el-form-item>
                            <!-- 自動配置層級 -->
                            <el-form-item class="ms-4" label="自動配置層級" prop="auto_rank">
                              <!-- $event 分別代表啟動前的值與關閉的值(1&2)⚡⚡ -->
                              <el-switch
                                v-model="addRuleForm.auto_rank"
                                @change="changeAutoRank($event)"
                                :loading="loading1"
                                active-color="#067c6b"
                                inactive-color="#bb0011"
                                active-value="open"
                                inactive-value="close"
                              ></el-switch>
                            </el-form-item>
                          </el-col>
                          <!-- 幣別💎 -->
                          <el-col :span="12" class="add_left_style_2">
                            <!-- 幣別 -->
                            <el-form-item label="幣別" prop="currency">
                              <el-select
                                class="groupName_style"
                                v-model="addRuleForm.currency"
                                placeholder="選擇幣別"
                              >
                                <el-option label="台幣" value="TWD"></el-option>
                                <el-option label="越南盾" value="VND"></el-option>
                                <el-option label="日幣" value="JPD"></el-option>
                                <el-option label="美金" value="USD"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <!-- 日期選擇區間(可複選)-->
                        <el-row>
                          <el-col :span="24">
                            <!-- 日期選擇(複選) -->
                            <el-form-item class="ms-4" prop="date_range">
                              <el-checkbox-group v-model="addRuleForm.date_range">
                                <el-checkbox label="每月1日"></el-checkbox>
                                <el-checkbox label="半月"></el-checkbox>
                                <el-checkbox label="每周一"></el-checkbox>
                                <el-checkbox label="每日"></el-checkbox>
                              </el-checkbox-group>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <!-- 前台顯示 & 保級條件起始層級 -->
                        <el-row>
                          <!-- 前台顯示 -->
                          <el-col :span="12" class="add_left_style_1">
                            <!-- 前台顯示 -->
                            <el-form-item class="ms-4" label="前台顯示" prop="show_status">
                              <el-switch
                                v-model="addRuleForm.show_status"
                                @change="changeShowStatus($event)"
                                :loading="loading2"
                                active-color="#067c6b"
                                inactive-color="#bb0011"
                                active-value="show"
                                inactive-value="hide"
                              ></el-switch>
                            </el-form-item>
                          </el-col>
                          <!-- 保級條件起始層級 -->
                          <el-col :span="12" class="add_left_style_2">
                            <el-form-item
                              label="保級條件起始層級"
                              prop="reserve_level"
                              class="ms-3"
                            >
                              <el-input
                                class="groupName_style"
                                v-model="addRuleForm.reserve_level"
                                placeholder="請輸入層級...(選填)"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-col>
                      <!-- 右半邊 -->
                      <el-col :span="12">
                        <!-- 狀態 & 描述 -->
                        <el-row>
                          <!-- 狀態 -->
                          <el-col :span="8" class="add_left_style_1">
                            <el-form-item class="ms-3" label="狀態" prop="status">
                              <el-radio-group
                                v-model="addRuleForm.status"
                                size="small"
                                @change="changeStatus($event)"
                              >
                                <el-radio label="啟用">啟用</el-radio>
                                <el-radio label="停用">停用</el-radio>
                              </el-radio-group>
                            </el-form-item>
                          </el-col>
                          <!-- 描述 -->
                          <el-col :span="16" class="add_left_style_2">
                            <el-form-item label="描述" prop="content" class="ms-4">
                              <el-input
                                class="content_style"
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 4 }"
                                placeholder="請輸入内容(選填)"
                                v-model="addRuleForm.content"
                              >
                              </el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <!-- 升級條件資格 & 保級條件資格 -->
                        <el-row>
                          <!-- 升級條件資格 -->
                          <el-col :span="12" class="add_left_style_2">
                            <el-form-item class="ms-3" label="升級條件資格" prop="upgrade_con">
                              <el-radio v-model="addRuleForm.upgrade_con" label="1"
                                >And(均須達成)</el-radio
                              >
                              <el-radio v-model="addRuleForm.upgrade_con" label="2"
                                >Or(任一即可)</el-radio
                              >
                            </el-form-item>
                          </el-col>
                          <!-- 保級條件資格 -->
                          <el-col :span="12" class="add_left_style_2">
                            <el-form-item class="ms-3" label="保級條件資格" prop="reserve_upgrade">
                              <el-radio v-model="addRuleForm.reserve_upgrade" label="1"
                                >And(均須達成)</el-radio
                              >
                              <el-radio v-model="addRuleForm.reserve_upgrade" label="2"
                                >Or(任一即可)</el-radio
                              >
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </el-form>
                </div>
              </div></el-col
            >
          </el-row>
          <!--層級設置 下半部分  -->
          <el-row class="mb-4 mt-4">
            <el-col :span="24">
              <div class="group_set_content bg-purple-dark">
                <h5 class="text-start mb-4 ms-2 mustType text-dark">層級設置</h5>
                <!-- 資料表單 -->
                <div>
                  <el-row>
                    <el-col :span="24">
                      <el-form ref="rankSetting" :model="rankSetting" :rules="rankSetting.botRules">
                        <el-table
                          ref="rankSetting"
                          :data="rankSetting.tableData"
                          style="width: 100%"
                          :header-cell-class-name="classNameFunc"
                          class="rank_table_style"
                        >
                          <!-- 層級 -->
                          <el-table-column label="層級" width="80" prop="group_id">
                            <template v-slot="scope">
                              <el-form-item
                                :prop="`tableData[${scope.$index}].group_id`"
                                :rules="rankSetting.botRules.group_id"
                              >
                                <el-input
                                  class="botSetStyle"
                                  v-model.number="scope.row.group_id"
                                  @click="testRow(scope)"
                                ></el-input>
                              </el-form-item>
                            </template>
                          </el-table-column>
                          <!-- 層級名稱 -->
                          <el-table-column label="層級名稱" width="120" prop="name">
                            <template v-slot="scope">
                              <el-form-item
                                :rules="rankSetting.botRules.name"
                                :prop="`tableData[${scope.$index}].name`"
                              >
                                <el-input
                                  class="botSetStyle"
                                  v-model="scope.row.name"
                                  placeholder="請輸入內容"
                                ></el-input>
                              </el-form-item>
                            </template>
                          </el-table-column>
                          <!-- 會員層級顯示-->
                          <el-table-column label="會員層級顯示" width="120" prop="name_show">
                            <template v-slot="scope">
                              <el-form-item
                                :prop="`tableData[${scope.$index}].name_show`"
                                :rules="rankSetting.botRules.name_show"
                                ><el-input
                                  class="botSetStyle"
                                  v-model="scope.row.name_show"
                                  placeholder="請輸入層級顯示"
                                ></el-input>
                              </el-form-item>
                            </template>
                          </el-table-column>
                          <!-- 升級條件 -->
                          <el-table-column label="升級條件(AND)" width="200">
                            <el-table-column label="存款總額" width="120" prop="upgrade_deposit">
                              <template v-slot="scope">
                                <el-form-item
                                  :prop="`tableData[${scope.$index}].upgrade_deposit`"
                                  :rules="rankSetting.botRules.upgrade_deposit"
                                  ><el-input
                                    class="botSetStyle"
                                    v-model="scope.row.upgrade_deposit"
                                    placeholder="請輸入存款總額"
                                  ></el-input>
                                </el-form-item>
                              </template>
                            </el-table-column>
                            <el-table-column label="有效投注額" width="120" prop="upgrade_bet">
                              <template v-slot="scope">
                                <el-form-item
                                  :prop="`tableData[${scope.$index}].upgrade_bet`"
                                  :rules="rankSetting.botRules.upgrade_bet"
                                  ><el-input
                                    class="botSetStyle"
                                    v-model="scope.row.upgrade_bet"
                                    placeholder="請輸入有效投注額"
                                  ></el-input>
                                </el-form-item>
                              </template>
                            </el-table-column>
                          </el-table-column>
                          <!-- 保級條件 -->
                          <el-table-column label="保級條件(AND)" width="200">
                            <el-table-column label="存款總額" width="120">
                              <template v-slot="scope">
                                <el-form-item
                                  :prop="`tableData[${scope.$index}].reserve_deposit`"
                                  :rules="rankSetting.botRules.reserve_deposit"
                                  ><el-input
                                    class="botSetStyle"
                                    v-model="scope.row.reserve_deposit"
                                    placeholder="請輸入總額"
                                  ></el-input>
                                </el-form-item> </template
                            ></el-table-column>
                            <el-table-column label="有效投注額" width="120">
                              <template v-slot="scope">
                                <el-form-item
                                  :prop="`tableData[${scope.$index}].reserve_bet`"
                                  :rules="rankSetting.botRules.reserve_bet"
                                  ><el-input
                                    class="botSetStyle"
                                    v-model="scope.row.reserve_bet"
                                    placeholder="請輸入有效投注額"
                                  ></el-input>
                                </el-form-item>
                              </template>
                            </el-table-column>
                          </el-table-column>
                          <!-- 單筆存款最低 -->
                          <el-table-column label="單筆存款最低" width="120" prop="deposit_min">
                            <template v-slot="scope">
                              <el-form-item
                                :rules="rankSetting.botRules.deposit_min"
                                :prop="`tableData[${scope.$index}].deposit_min`"
                              >
                                <el-input
                                  class="botSetStyle"
                                  v-model="scope.row.deposit_min"
                                  placeholder="請輸入最低額"
                                ></el-input>
                              </el-form-item>
                            </template>
                          </el-table-column>
                          <!-- 單筆存款最高 -->
                          <el-table-column label="單筆存款最高" width="120" prop="deposit_max">
                            <template v-slot="scope">
                              <el-form-item
                                :rules="rankSetting.botRules.deposit_max"
                                :prop="`tableData[${scope.$index}].deposit_max`"
                              >
                                <el-input
                                  class="botSetStyle"
                                  v-model="scope.row.deposit_max"
                                  placeholder="請輸入最高額"
                                ></el-input>
                              </el-form-item>
                            </template>
                          </el-table-column>
                          <!-- 單筆取款最低 -->
                          <el-table-column label="單筆取款最低" width="120" prop="withdraw_max">
                            <template v-slot="scope">
                              <el-form-item
                                :rules="rankSetting.botRules.withdraw_max"
                                :prop="`tableData[${scope.$index}].withdraw_max`"
                              >
                                <el-input
                                  class="botSetStyle"
                                  v-model="scope.row.withdraw_max"
                                  placeholder="請輸入最低取款額"
                                ></el-input>
                              </el-form-item>
                            </template>
                          </el-table-column>
                          <!-- 單筆取款最高 -->
                          <el-table-column label="單筆取款最高" width="120" prop="withdraw_min">
                            <template v-slot="scope">
                              <el-form-item
                                :rules="rankSetting.botRules.withdraw_min"
                                :prop="`tableData[${scope.$index}].withdraw_min`"
                              >
                                <el-input
                                  class="botSetStyle"
                                  v-model="scope.row.withdraw_min"
                                  placeholder="請輸入最高取款額"
                                ></el-input>
                              </el-form-item>
                            </template>
                          </el-table-column>
                          <!-- 單日最高提款總額 -->
                          <el-table-column
                            label="單日最高提款總額"
                            width="120"
                            prop="withdraw_max_day"
                          >
                            <template v-slot="scope">
                              <el-form-item
                                :rules="rankSetting.botRules.withdraw_max_day"
                                :prop="`tableData[${scope.$index}].withdraw_max_day`"
                              >
                                <el-input
                                  class="botSetStyle"
                                  v-model="scope.row.withdraw_max_day"
                                  placeholder="請輸入總額"
                                ></el-input>
                              </el-form-item>
                            </template>
                          </el-table-column>
                          <!-- 提款次數提醒 -->
                          <el-table-column label="提款次數提醒" width="120" prop="withdraw_remind">
                            <template v-slot="scope">
                              <el-form-item
                                :rules="rankSetting.botRules.withdraw_remind"
                                :prop="`tableData[${scope.$index}].withdraw_remind`"
                              >
                                <el-input
                                  class="botSetStyle"
                                  v-model="scope.row.withdraw_remind"
                                  placeholder="請輸入提醒次數"
                                  type="number"
                                  :min="0"
                                  :max="9"
                                ></el-input>
                              </el-form-item>
                            </template>
                          </el-table-column>
                          <!-- 單日最高提款次數 -->
                          <el-table-column
                            label="單日最高提款次數"
                            width="120"
                            prop="withdraw_remind_day"
                            type="number"
                          >
                            <template v-slot="scope">
                              <el-form-item
                                :rules="rankSetting.botRules.withdraw_remind_day"
                                :prop="`tableData[${scope.$index}].withdraw_remind_day`"
                              >
                                <el-input
                                  class="botSetStyle"
                                  v-model="scope.row.withdraw_remind_day"
                                  placeholder="請輸入單日提款次數"
                                  type="number"
                                  :min="0"
                                  :max="9"
                                ></el-input>
                              </el-form-item>
                            </template>
                          </el-table-column>
                          <!-- 操作 -->
                          <el-table-column label="操作" width="120">
                            <template #default="scope">
                              <div class="d-flex">
                                <el-button
                                  class="addStyle"
                                  type="primary"
                                  size="small"
                                  @click="addRankSet()"
                                  ><el-icon class="Plus"> <Plus></Plus></el-icon
                                ></el-button>
                                <el-button
                                  class="deleteStyle"
                                  size="small"
                                  type="danger"
                                  @click="deleteRow(scope.$index, rankSetting.tableData)"
                                  ><el-icon> <Delete></Delete></el-icon
                                ></el-button>
                              </div>
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-form>
                    </el-col>
                  </el-row>
                </div></div
            ></el-col>
          </el-row>
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
import _ from 'lodash';
import { Plus, Delete } from '@element-plus/icons';
import { ElMessage } from 'element-plus';
import Modal from 'bootstrap/js/dist/modal';
// import Color from 'element-plus/es/components/color-picker/src/color';

export default {
  name: 'GroupList_Add',
  data() {
    // 驗證下方表單的輸入值是否為數字
    const validateID = (rule, value, callback) => {
      if (!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)) {
        callback(new Error('請輸入正確ID數字'));
      } else {
        callback();
      }
    };
    // 驗證下方表單的輸入值是否為數字
    const validateNumber = (rule, value, callback) => {
      console.log(`value:${value}`);
      if (!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)) {
        callback(new Error('請輸入金額'));
      } else {
        callback();
      }
    };
    // 驗證下方表單的輸入值是否為數字(次數)
    const validateTimes = (rule, value, callback) => {
      console.log(`value:${value}`);
      if (!/^([0-9])$/.test(value)) {
        callback(new Error('至少填入0~9次'));
      } else {
        callback();
      }
    };

    return {
      // 打開Modal相關套件
      modal: {},
      // 上方組設置
      addRuleForm: {
        group_name: '',
        currency: '',
        status: '', // 狀態0停用1激活
        auto_rank: '', // close關閉 open啟用
        date_range: [], // 複選逗號區隔
        upgrade_con: '', // 升級條件資格 0 AMD(均需達成) 1 OR(任一即可)
        reserve_upgrade: '', // 保留條件資格 0 AMD(均需達成) 1 OR(任一即可))
        reserve_level: '', // 保級條件起始層級
        show_status: '', // 前台顯示:hide不顯示 show顯示
      },
      // 自動層級設置-讀取圖示
      loading1: false,
      // 前台顯示-讀取圖示
      loading2: false,
      // 下方層級設置
      rankSetting: {
        // group_id: '',
        // name: '',
        // name_show: '',
        // upgrade_deposit: '',
        // upgrade_bet: '',
        // reserve_deposit: '',
        // reserve_bet: '',
        // deposit_min: '',
        // deposit_max: '',
        // withdraw_min: '',
        // withdraw_max: '',
        // withdraw_max_day: '',
        // withdraw_remind: '',
        // withdraw_remind_day: '',

        // table
        tableData: [
          {
            group_id: '',
            name: '',
            name_show: '',
            upgrade_deposit: '',
            upgrade_bet: '',
            reserve_deposit: '',
            reserve_bet: '',
            deposit_min: '',
            deposit_max: '',
            withdraw_min: '',
            withdraw_max: '',
            withdraw_max_day: '',
            withdraw_remind: '',
            withdraw_remind_day: '',
          },
        ],
        // 下方層級規則
        botRules: {
          group_id: [
            // 驗證1
            {
              required: true,
              message: 'ID必須填寫',
              trigger: 'blur',
            },
            // 驗證2
            { trigger: 'blur', validator: validateID },
          ],
          name: [
            {
              required: true,
              message: '組名稱必須填寫',
              trigger: 'blur',
            },
          ],
          name_show: [
            {
              required: true,
              message: '請填入層級顯示',
              trigger: 'blur',
            },
          ],
          upgrade_deposit: [
            {
              required: true,
              trigger: 'blur',
              validator: validateNumber,
            },
          ],
          upgrade_bet: [
            {
              required: true,
              trigger: 'blur',
              validator: validateNumber,
            },
          ],
          reserve_deposit: [
            {
              required: true,
              trigger: 'blur',
              validator: validateNumber,
            },
          ],
          reserve_bet: [
            {
              required: true,
              trigger: 'blur',
              validator: validateNumber,
            },
          ],
          deposit_min: [
            {
              required: true,
              trigger: 'blur',
              validator: validateNumber,
            },
          ],
          deposit_max: [
            {
              required: true,
              trigger: 'blur',
              validator: validateNumber,
            },
          ],
          withdraw_min: [
            {
              required: true,
              trigger: 'blur',
              validator: validateNumber,
            },
          ],
          withdraw_max: [
            {
              required: true,
              trigger: 'blur',
              validator: validateNumber,
            },
          ],
          withdraw_max_day: [
            {
              required: true,
              trigger: 'blur',
              validator: validateNumber,
            },
          ],
          withdraw_remind: [
            { required: true, message: '請填入次數' },
            { trigger: 'blur', validator: validateTimes },
          ],
          withdraw_remind_day: [
            {
              required: true,
              trigger: 'blur',
              validator: validateTimes,
            },
          ],
        },
      },
      // 下方傳參Object
      setObject: {},
      // 上方層級規則
      rules: {
        group_name: [
          {
            required: true,
            message: '組名稱必須填寫',
            trigger: 'blur',
          },
        ],
        currency: [
          {
            required: true,
            message: '幣別必須填寫',
            trigger: 'change',
          },
        ],
        status: [
          {
            required: true,
            message: '請至少選擇一種',
            trigger: 'change',
          },
        ],
        upgrade_con: [
          {
            required: true,
            message: '請至少選擇一種',
            trigger: 'change',
          },
        ],
        reserve_upgrade: [
          {
            required: true,
            message: '請至少選擇一種',
            trigger: 'change',
          },
        ],
        delivery: [
          {
            required: true,
            message: '幣別必須填寫',
            trigger: 'blur',
          },
        ],
        date_range: [
          {
            type: 'array',
            required: true,
            message: '請至少選擇一種日期區間',
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
    // before自動配置層級
    // beforeChange() {
    //   this.loading1 = true;
    //   this.addRuleForm.auto_rank = true;
    //   return new Promise((resolve) => {
    //     setTimeout(() => {
    //       this.loading1 = false;
    //       ElMessage({ showClose: true, message: '層級已開啟!', type: 'success' });
    //       return resolve(true);
    //     }, 1000);
    //   });
    // },

    // 自動配置層級 ❗❗
    changeAutoRank(item) {
      this.loading1 = true;
      // let item = 2;
      if (item === 'open') {
        this.addRuleForm.auto_rank = 'open';
        ElMessage({ showClose: true, message: '層級已開啟!', type: 'success' });
        console.log(this.addRuleForm.auto_rank);
      } else if (item === 'close') {
        ElMessage({ showClose: true, message: '層級已關閉!', type: 'warning' });
        this.addRuleForm.auto_rank = 'close';
        console.log(this.addRuleForm.auto_rank);
      }
      // 點擊後延遲幾秒才切換 ⏱
      return new Promise((resolve) => {
        setTimeout(() => {
          this.loading1 = false;
          // ElMessage({ showClose: true, message: '層級已開啟!', type: 'success' });
          return resolve(true);
        }, 1000);
      });
    },
    // 前台顯示配置 ❗❗
    changeShowStatus(item) {
      this.loading2 = true;
      // let item = 2;
      console.log(item);
      if (item === 'show') {
        this.addRuleForm.show_status = 'show';
        ElMessage({ showClose: true, message: '前台已顯示!', type: 'success' });
      } else if (item === 'hide') {
        this.addRuleForm.show_status = 'hide';
        ElMessage({ showClose: true, message: '前台已隱藏!', type: 'warning' });
      }
      // // 點擊後延遲幾秒才切換 ⏱
      return new Promise((resolve) => {
        setTimeout(() => {
          this.loading2 = false;
          // ElMessage({ showClose: true, message: '層級已開啟!', type: 'success' });
          return resolve(true);
        }, 1000);
      });
    },
    // 狀態修改
    changeStatus(item) {
      console.log(item);
      if (item === '啟用') {
        this.addRuleForm.status = '啟用'; // 狀態開啟
      } else if (item === '停用') {
        this.addRuleForm.status = '停用'; // 狀態關閉
      }
    },
    // 新增下方層級
    addRankSet() {
      const testapi = `${process.env.VUE_APP_TESTAPI}`;

      _.forEach(this.rankSetting.tableData, (item, key) => {
        console.log(item, key);
        this.setObject = item;
      });
      // 執行校驗
      this.$refs.rankSetting.validate((valid) => {
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
          .post(`${testapi}/backend/members/groupDetail_add`, this.setObject)
          .then((response) => {
            if (response.data.code === 200) {
              this.$swal.fire('新增成功!', `'${response.data.msg}`, 'success');
              this.rankSetting.tableData.push({
                group_id: '',
                name: '',
                name_show: '',
                upgrade_deposit: '',
                upgrade_bet: '',
                reserve_deposit: '',
                reserve_bet: '',
                deposit_min: '',
                deposit_max: '',
                withdraw_min: '',
                withdraw_max: '',
                withdraw_max_day: '',
                withdraw_remind: '',
                withdraw_remind_day: '',
              });

              console.log(response.data);
            } else {
              this.$swal.fire('註冊失敗', `${response.data.msg}`, 'error');
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
    // 重置會員表單
    resetForm() {
      this.$refs.ruleFormRef3.resetFields();
      this.$refs.rankSetting.resetFields();
    },
    // 送出新增會員表單
    doRegister() {
      const testapi = `${process.env.VUE_APP_TESTAPI}`;
      // 執行校驗
      this.$refs.ruleFormRef3.validate((valid) => {
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
          .post(`${testapi}/backend/members/group_add`, this.addRuleForm)
          .then((response) => {
            if (response.data.code === 200) {
              this.$swal.fire('新增成功!', `'${response.data.msg}`, 'success');
              this.modal.hide();
              this.$router.push('grouplist');

              console.log(response.data);
            } else {
              this.$swal.fire('註冊失敗', `${response.data.msg}`, 'error');
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
    testRow(scope) {
      console.log(scope, scope.row, scope.$index, scope.row.group_id);
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
    // this.modal.show();
  },
  components: {
    Plus,
    Delete,
  },
};
</script>

<style lang="scss">
.group_set_content {
  padding: 10px 0 0;
  border-radius: 10px;
  flex-wrap: wrap;
  //   min-height: 36px;
}
.bg-purple-dark {
  background: #eff3f8;
}
.add_left_style_1 {
  & .el-form-item {
    display: inline-block; //el-form-item的標題顯示再輸入框上面
    margin-bottom: 15px;
  }
}
.add_left_style_2 {
  & .el-form-item {
    display: inline-block; //el-form-item的標題顯示再輸入框上面
    margin-bottom: 15px;
  }
}
.grid-content {
  padding: 10px 10px;
  border-radius: 10px;
  flex-wrap: wrap;
  //   min-height: 36px;
}
.bg-purple-dark {
  background: #eff3f8;
}
.botSetStyle .el-input__inner {
  border: 1px solid #dcdfe6;
  padding: 0 !important;
  text-align: center;
  &:focus {
    border-color: #409eff !important;
  }
}
.groupName_style .el-input__inner {
  width: 250px;
  padding: 10px;
  border: 1px solid #dcdfe6;
  &:focus {
    border-color: #409eff !important;
  }
}

.content_style .el-textarea__inner {
  width: 300px;
}
// 層級設置 欄位頭樣式
.rank_table_style {
  border-radius: 10px;
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
.addStyle {
  //新增樣式
  background: none;
  color: #409eff;
  &:hover {
    transition: 0.7s;
    background: #236aa5;
    color: #fff;
  }
}
.deleteStyle {
  //刪除樣式
  background: none;
  color: #bb0011;
  &:hover {
    transition: 0.7s;
    background: #bb0011;
    color: #fff;
  }
}
</style>
