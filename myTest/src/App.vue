<template>
  <div id="app">
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {}
};
</script>

<style lang="scss">
body,
textarea {
  margin: 0px;
  padding: 0px;
  font-family: Helvetica Neue For Number, -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, PingFang SC, Hiragino Sans GB, Microsoft YaHei,
    Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}

#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}

.el-submenu [class^="fa"] {
  vertical-align: baseline;
  margin-right: 10px;
  position: relative;
  top: 1px;
}

.el-menu-item [class^="fa"] {
  vertical-align: baseline;
  margin-right: 10px;
  position: relative;
  top: 1px;
}

.el-submenu [class^="iconfont"] {
  vertical-align: baseline;
  margin-right: 10px;
  position: relative;
  top: 1px;
}

.toolbar {
  background: #f2f2f2;
  padding: 10px;
  margin: 10px 0px;
  .el-form-item {
    margin-bottom: 10px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>