<template>
  <div class="collapse-panle">
    <!-- 折叠面板显示按钮 -->
    <van-icon
      class="collapse-button"
      name="arrow-down"
      :class="{ 'collapse-active': collapseActive }"
      @click="collapseActive = !collapseActive"
    />
    <!-- 遮罩层 -->
    <div
      class="coverlay"
      :class="{ 'collapse-active': collapseActive }"
      @click="collapseActive = !collapseActive"
    >
      <!-- 折叠面板内容区 -->
      <div class="collapse-content" :class="{ 'collapse-active': collapseActive }">
        <!-- 内容选项 -->
        <span
          class="option"
          v-for="(item,index) in optionList"
          :key="index"
          :class="{ 'option-active': activeIndex === index }"
          @click="handleClick(index)"
        >{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollapsePanle',
  props: {
    optionList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      collapseActive: false,
      activeIndex: 0
    }
  },
  methods: {
    // 点击选项
    handleClick(index) {
      this.activeIndex = index
      this.$emit('select', index)
    }
  }
}
</script>

<style lang="less" scoped>
.collapse-panle {
  position: relative;
  pointer-events: none;
  .collapse-button {
    position: absolute;
    top: -32px;
    right: 10px;
    z-index: 999;
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 18px;
    text-align: center;
    vertical-align: middle;
    transition: all 0.5s;
    pointer-events: auto;
    &.collapse-active {
      transform: rotate(180deg);
    }
  }
  .coverlay {
    height: 100%;
    overflow: hidden;
    visibility: hidden;
    pointer-events: auto;
    &.collapse-active {
      visibility: visible;
      background-color: rgba(0, 0, 0, 0.2);
    }
    .collapse-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-content: center;
      padding: 10px;
      background-color: #fff;
      visibility: hidden;
      transition: all 0.5s;
      transform-origin: top;
      transform: translateY(-100%);
      pointer-events: auto;
      &.collapse-active {
        visibility: visible;
        transform: translateY(0);
      }
      .option {
        padding: 12px;
        font-size: 14px;
        color: 666;
        pointer-events: auto;
        &.option-active {
          color: #ee0a24;
        }
      }
    }
  }
}
</style>
