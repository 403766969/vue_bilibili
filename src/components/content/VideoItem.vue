<template>
  <div class="video-item">
    <div class="item-content">
      <img class="item-cover" :src="item.img" />
      <div class="item-title van-ellipsis">{{item.name}}</div>
      <div class="item-heat">
        <p>
          <van-icon name="video-o" />
          <span>2233</span>
        </p>
        <p>
          <van-icon name="comment-o" />
          <span>{{item.commentlen ? item.commentlen : 666}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoItem',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.item-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  .item-cover {
    width: 100%;
  }
  .item-title {
    width: 100%;
    height: 18px;
    line-height: 18px;
    font-size: 14px;
  }
  .item-heat {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 18px;
    left: 0;
    padding: 0 2px;
    width: 100%;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    color: #fff;
    background-image: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.85));
    p {
      .van-icon {
        margin-right: 3px;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
      }
    }
  }
}
</style>
