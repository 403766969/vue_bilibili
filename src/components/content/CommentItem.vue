<template>
  <div class="comment-item border-top-px-to-vw-ignore">
    <!-- 用户头像 -->
    <img class="avatar border-px-to-vw-ignore" v-if="item.userinfo" :src="item.userinfo.user_img" />
    <img class="avatar border-px-to-vw-ignore" v-else src="~assets/img/default_img.jpg" />
    <!-- 评论内容 -->
    <div class="content">
      <!-- 用户姓名 -->
      <p class="name" v-if="item.userinfo">{{item.userinfo.name}}</p>
      <p class="name" v-else>匿名</p>
      <!-- 日期 -->
      <p class="date">{{item.comment_date}}</p>
      <!-- 评论 -->
      <p class="text" v-if="item.parent_user_info && item.user_id !== item.parent_user_info.id">
        回复
        <span>@{{item.parent_user_info.name}}</span>
        ：{{item.comment_content}}
        <!-- 回复按钮 -->
        <span class="reply right" @click="handleClick">回复</span>
      </p>
      <p class="text" v-else>
        {{item.comment_content}}
        <!-- 回复按钮 -->
        <span class="reply right" @click="handleClick">回复</span>
      </p>
      <!-- 若评论存在回复，则递归调用组件渲染回复 -->
      <template v-if="item.child  && item.child.length > 0">
        <!-- 评论项 -->
        <comment-item
          v-for="temp in showChild"
          :key="temp.comment_id"
          :item="temp"
          @replyComment="replyComment"
        />
        <!-- 查看全部回复按钮 -->
        <div class="show-all" v-if="item.child.length > count" @click="handleShowAll">
          <span>{{message}}</span>
          <van-icon v-show="isShowAll" name="arrow-up" />
          <van-icon v-show="!isShowAll" name="arrow-down" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentItem',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      isShowAll: false,
      message: '查看全部回复',
      count: 3
    }
  },
  computed: {
    // 显示的回复列表
    showChild() {
      if (this.item.child) {
        if (this.isShowAll) {
          return this.item.child
        }
        return this.item.child.slice(0, this.count)
      }
      return []
    }
  },
  methods: {
    // 查看全部回复
    handleShowAll() {
      this.isShowAll = !this.isShowAll
      this.message = this.isShowAll ? '收起' : '查看全部回复'
    },
    // 点击回复
    handleClick() {
      this.$emit('replyComment', this.item)
    },
    // 子组件点击回复
    replyComment(item) {
      this.$emit('replyComment', item)
    }
  }
}
</script>

<style lang="less" scoped>
.comment-item {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  .avatar {
    margin-right: 5px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .content {
    flex: 1;
    width: 0;
    .name {
      height: 22px;
      line-height: 22px;
      font-size: 14px;
      color: #888;
      overflow-wrap: break-word;
    }
    .date {
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: #999;
    }
    .text {
      height: 22px;
      line-height: 22px;
      font-size: 14px;
      color: #666;
      overflow-wrap: break-word;
      span {
        color: #0a9ed3;
      }
    }
    .reply {
      font-size: 12px;
    }
    .show-all {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
      font-size: 14px;
      span {
        vertical-align: middle;
        margin-right: 5px;
      }
      .van-icon {
        vertical-align: middle;
      }
    }
  }
}

.comment-item {
  &.border-top-px-to-vw-ignore {
    margin-top: 5px;
    padding-top: 5px;
    border-top: 1px solid #ddd;
  }
  &.border-top-px-to-vw-ignore:first-child {
    border-top: none;
  }
}

.border-px-to-vw-ignore {
  border: 1px solid #f4f4f4;
}
</style>
