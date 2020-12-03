<!--
 * @Author: nigel
 * @Date: 2020-03-19 17:42:36
 * @LastEditTime: 2020-08-18 17:58:18
-->
<template>
  <el-row class="containerVue">
    <app-header />
    <el-col
      :span="24"
      class="main"
    >
      <app-sidebar />
      <section id="content_container" ref="content_container" class="content-container">
        <!-- <app-breadcrumb></app-breadcrumb> -->
        <el-col
          :span="24"
          class="content-wrapper"
        >
          <transition
            name="fade"
            mode="out-in"
          >
            <router-view />
          </transition>
        </el-col>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import AppHeader from "./layout/AppHeader";
import AppSidebar from "./layout/AppSidebar.vue";
// import AppBreadcrumb from "./layout/AppBreadcrumb";

export default {
  components: {
    AppHeader,
    AppSidebar
  },
  created() {}
};
</script>

<style scoped lang="scss">
@import "~scss_vars";
.containerVue {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    .content-container {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      padding-top: 0;
      .breadcrumb-container {
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>
