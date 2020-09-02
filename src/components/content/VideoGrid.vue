<template>
  <div class="video-grid">
    <!-- 视频项 -->
    <video-item
      v-for="item in videoList"
      :key="item.id"
      :item="item"
      @click.native="$router.push(`/videodetail/${item.id}`)"
    />
  </div>
</template>

<script>
import VideoItem from 'components/content/VideoItem'

export default {
  name: 'VideoGrid',
  components: {
    VideoItem
  },
  props: {
    videoList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.video-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  margin-top: 5px;
  .video-item {
    padding: 5px 5px 5px 5px;
  }
}

@media screen and (max-width: 767px) {
  .video-item {
    width: 50%;
  }
  .video-item:nth-child(2n-1) {
    padding-left: 10px;
  }
  .video-item:nth-child(2n) {
    padding-right: 10px;
  }
}

@media screen and (min-width: 768px) and (max-width: 991px) {
  .video-item {
    width: 33.333%;
  }
  .video-item:nth-child(3n-2) {
    padding-left: 10px;
  }
  .video-item:nth-child(3n) {
    padding-right: 10px;
  }
}

@media screen and (min-width: 992px) and (max-width: 1199px) {
  .video-item {
    width: 25%;
    /deep/.item-title {
      height: 14px;
      line-height: 14px;
      font-size: 10px;
    }
    /deep/.item-heat {
      bottom: 14px;
      height: 14px;
      line-height: 14px;
      font-size: 10px;
    }
  }
  .video-item:nth-child(4n-3) {
    padding-left: 10px;
  }
  .video-item:nth-child(4n) {
    padding-right: 10px;
  }
}

@media screen and (min-width: 1200px) {
  .video-item {
    width: 20%;
    /deep/.item-title {
      height: 12px;
      line-height: 12px;
      font-size: 8px;
    }
    /deep/.item-heat {
      bottom: 12px;
      height: 10px;
      line-height: 10px;
      font-size: 8px;
    }
  }
  .video-item:nth-child(5n-4) {
    padding-left: 10px;
  }
  .video-item:nth-child(5n) {
    padding-right: 10px;
  }
}
</style>
