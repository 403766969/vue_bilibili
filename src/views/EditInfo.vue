<template>
  <div id="edit-info">
    <!-- 顶部导航 -->
    <path-nav-bar :center="{ text: '编辑资料', isScrollable: false }" />
    <!-- 内容区 -->
    <div class="edit-info-content">
      <!-- 信息显示区 -->
      <van-cell-group>
        <van-cell title="头像" value="内容" center @click="$refs.uploader.chooseFile()">
          <template #default>
            <img class="avatar" v-if="userInfo.user_img" :src="userInfo.user_img" />
            <img class="avatar" v-else src="~assets/img/default_img.jpg" />
            <van-uploader v-show="false" :after-read="afterRead" ref="uploader" />
          </template>
        </van-cell>
        <van-cell title="账号" :value="userInfo.username" center @click="$toast.fail('账号不可修改')" />
        <van-cell title="昵称" :value="userInfo.name" center @click="isShowNameDialog = true" />
        <van-cell title="性别" :value="gender" center @click="isShowGenderSheet = true" />
        <van-cell title="简介" :value="userInfo.user_desc" center @click="isShowDescDialog = true" />
      </van-cell-group>
      <div class="save-info" @click="handleSave">保存</div>
    </div>
    <!-- 昵称编辑弹窗 -->
    <van-dialog
      title="昵称"
      v-model="isShowNameDialog"
      show-cancel-button
      @open="name = userInfo.name"
      @confirm="userInfo.name = name"
    >
      <van-field v-model="name" />
    </van-dialog>
    <!-- 简介编辑弹窗 -->
    <van-dialog
      title="简介"
      v-model="isShowDescDialog"
      show-cancel-button
      @open="desc = userInfo.user_desc"
      @confirm="userInfo.user_desc = desc"
    >
      <van-field v-model="desc" />
    </van-dialog>
    <!-- 性别选择面板 -->
    <van-action-sheet
      title="性别"
      cancel-text="取消"
      v-model="isShowGenderSheet"
      :actions="genders"
      close-on-click-action
      @select="handleSelect"
    />
  </div>
</template>

<script>
import PathNavBar from 'components/content/PathNavBar'

import { getUserInfo } from 'common/mixin'

import { uploadAvatar, updateUserInfoApi } from 'network/api'

export default {
  name: 'EditInfo',
  mixins: [getUserInfo],
  components: {
    PathNavBar
  },
  data() {
    return {
      name: '',
      desc: '',
      genders: [
        { name: '男', value: '1' },
        { name: '女', value: '0' }
      ],
      isShowNameDialog: false,
      isShowDescDialog: false,
      isShowGenderSheet: false
    }
  },
  computed: {
    gender() {
      return this.userInfo.gender === '1' ? '男' : '女'
    }
  },
  methods: {
    // 上传头像
    async afterRead(file) {
      const formData = new FormData()
      formData.append('file', file.file)
      const { data: res } = await uploadAvatar(formData)
      this.userInfo.user_img = res.url
    },
    // 选择头像
    handleSelect(item, index) {
      this.userInfo.gender = item.value
    },
    // 保存信息
    async handleSave() {
      const userId = window.localStorage.getItem('userId')
      const userToken = window.localStorage.getItem('userToken')
      if (!userId || !userToken) {
        this.$toast.fail('登录状态已失效，请重新登录')
        return this.$router.push('/login')
      }
      const { data: res } = await updateUserInfoApi(userId, this.userInfo)
      if (res.code !== 200) {
        return this.$toast.fail('编辑失败')
      }
      this.$toast.success('编辑成功')
    }
  },
  created() {
    // 获取登录用户的信息
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
#edit-info {
  padding-top: 44px;
}

.edit-info-content {
  padding: 10px 0;
}

.van-cell {
  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
}

.save-info {
  margin-top: 10px;
  width: 100%;
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 16px;
  color: #969799;
}
</style>
