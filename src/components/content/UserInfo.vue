<template>
  <div class="user-info">
    <div class="content-top">
      <div class="user-avatar">
        <img v-if="userInfo.user_img" :src="userInfo.user_img " />
        <img v-else src="~assets/img/default_img.jpg" />
      </div>
      <div class="user-follow">
        <div class="user-statistics">
          <p>
            <span>11</span>
            <span>粉丝</span>
          </p>
          <p>
            <span>45</span>
            <span>关注</span>
          </p>
          <p>
            <span>14</span>
            <span>获赞</span>
          </p>
        </div>
        <div class="user-edit" @click="$router.push('/editinfo')">编辑资料</div>
      </div>
    </div>
    <div class="content-bottom">
      <div class="user-base">
        <p class="user-nickname">
          <span>{{userInfo.name}}</span>
          <i v-if="userInfo.gender === '1'" class="iconfont icon-gender-male"></i>
          <i v-else-if="userInfo.gender === '0'" class="iconfont icon-genderfemale"></i>
          <i class="user-level">LV3</i>
        </p>
        <p class="user-introduction" v-if="userInfo.user_desc">
          <span>{{userInfo.user_desc}}</span>
        </p>
        <p class="user-introduction" v-else>
          <span>这个人很神秘，什么都没有写</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  props: {
    userInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user-info {
  padding: 8px 12px;
  width: 100%;
  background-color: #fff;
}

.content-top {
  display: flex;
  justify-content: center;
  align-items: center;
  .user-avatar {
    margin-right: 20px;
    img {
      width: 90px;
      height: 90px;
      border-radius: 50%;
    }
  }
  .user-follow {
    flex: 1;
    .user-statistics {
      display: flex;
      padding: 0 15px;
      p {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: 14px;
        span:nth-child(2) {
          font-size: 12px;
          color: #aaa;
        }
      }
      p:nth-child(2) {
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
      }
    }
    .user-edit {
      margin: 15px auto 0 auto;
      width: 90%;
      height: 32px;
      line-height: 32px;
      text-align: center;
      font-size: 16px;
      color: #ff9db5;
      border: 1px solid #ff9db5;
      border-radius: 4px;
    }
  }
}

.content-bottom {
  .user-base {
    .user-nickname {
      margin-top: 10px;
      height: 24px;
      line-height: 24px;
      span {
        font-size: 24px;
        font-weight: 400;
        vertical-align: middle;
      }
      .iconfont {
        margin-left: 5px;
        font-size: 20px;
        vertical-align: middle;
      }
      .user-level {
        display: inline-block;
        margin-left: 5px;
        padding: 0 2px;
        height: 14px;
        line-height: 14px;
        font-size: 12px;
        font-style: normal;
        color: #fff;
        vertical-align: text-top;
        background-color: #92d1e5;
        border-radius: 3px;
      }
    }
    .user-introduction {
      margin-top: 5px;
      line-height: 20px;
      span {
        font-size: 14px;
        color: #999;
      }
    }
  }
}
</style>
