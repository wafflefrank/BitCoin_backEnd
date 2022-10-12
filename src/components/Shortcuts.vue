<template>
  <el-row :gutter="20" style="padding-bottom: 10px">
    <el-col :span="12">
      <div class="ve-card ve_card1">
        <el-icon>
          <football />
        </el-icon>
        <div>
          <p>本日新增會員</p>
          <span>{{shortcutsInfo.todayAddMembers}}</span>
        </div>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="ve-card ve_card2">
        <el-icon>
          <user />
        </el-icon>
        <div>
          <p>本日質押</p>
          <span>{{shortcutsInfo.todayPledge}}</span>
        </div>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="20" style="padding-top: 10px">
    <el-col :span="12">
      <div class="ve-card ve_card3">
        <el-icon>
          <cherry />
        </el-icon>
        <div>
          <p>本日存款</p>
          <span>{{shortcutsInfo.todayDeposit}}</span>
        </div>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="ve-card ve_card4">
        <el-icon>
          <document />
        </el-icon>
        <div>
          <p>本日出款</p>
          <span>{{shortcutsInfo.todayWithdraw}}</span>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {
  Football, User, Cherry, Document,
} from '@element-plus/icons';

export default {
  name: 'Shortcuts',
  props: ['shortcutsInfo'],
  data() {
    return {};
  },
  methods: {},
  created() {},
  components: {
    Football,
    User,
    Cherry,
    Document,
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  height: 50%;

  padding-right: 10px;
}
.ve-card {
  border-radius: 10px;
  height: 100%;
  display: flex;
  align-items: center;
  transition: all 500ms;
  color: #fff;
  &:hover {
    box-shadow: 3px 3px 6px 1px rgba(0, 0, 0, 0.2);
    background: #fff;
  }
  i {
    font-size: 100px;
    margin: 0 20px;
  }
  div {
    flex: 1;
    padding-right: 12px;
    p {
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    span {
      font-size: 25px;
      font-weight: bold;
    }
  }
}
.ve_card1 {
  background: #409eff;
  &:hover {
    color: #409eff;
  }
}
.ve_card2 {
  background: #67c23a;
  &:hover {
    color: #67c23a;
  }
}
.ve_card3 {
  background: #e6a23c;
  &:hover {
    color: #e6a23c;
  }
}
.ve_card4 {
  background: #f56c6c;
  &:hover {
    color: #f56c6c;
  }
}
</style>
