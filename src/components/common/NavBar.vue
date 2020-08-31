<template>
  <div class="nav-bar">
    <div class="nar-bar-left">
      <slot name="nar-bar-left"></slot>
    </div>
    <div class="nar-bar-center">
      <slot name="nar-bar-center"></slot>
    </div>
    <div class="nar-bar-right">
      <slot name="nar-bar-right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style lang="less" scoped>
.nav-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 999;
  width: 100%;
  height: 44px;
  line-height: 44px;
  font-size: 16px;
  text-align: center;
  background-color: #fff;
  .nar-bar-left,
  .nar-bar-right,
  .nar-bar-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .nar-bar-left,
  .nar-bar-right {
    width: 60px;
    font-size: 14px;
  }
  .nar-bar-center {
    flex: 1;
  }
}
</style>
