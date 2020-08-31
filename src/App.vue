<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="isRouterAlive && $route.meta.keepAlive" :key="$route.fullPath" />
    </keep-alive>
    <router-view v-if="isRouterAlive && !$route.meta.keepAlive" :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reloadRouter() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  },
  provide() {
    return {
      reloadRouter: this.reloadRouter
    }
  }
}
</script>

<style>
</style>
