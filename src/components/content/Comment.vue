<template>
  <div class="comment" v-if="commentList.length > 0">
    <!-- 评论项 -->
    <comment-item
      class="border-top-px-to-vw-ignore"
      v-for="item in commentList"
      :key="item.comment_id"
      :item="item"
      @replyComment="replyComment"
    />
  </div>
  <div class="comment" v-else>
    <van-empty description="暂无评论" />
  </div>
</template>

<script>
import CommentItem from 'components/content/CommentItem'

export default {
  name: 'Comment',
  components: {
    CommentItem
  },
  props: {
    commentList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    // 子组件点击回复
    replyComment(item) {
      this.$emit('replyComment', item)
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  padding: 10px;
  & > .border-top-px-to-vw-ignore {
    padding: 10px 0px;
    border-top: 1px solid #ccc;
  }
  & > .border-top-px-to-vw-ignore:first-child {
    border-top: none;
  }
}
</style>
