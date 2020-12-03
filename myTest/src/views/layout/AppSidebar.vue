<i18n src="./locals/AppSidebar.json"></i18n>
<template>
  <aside class="sidebar_menu" :class="collapsed?'menu-collapsed':'menu-expanded'">
    <el-menu
      theme="dark"
      :default-active="$route.path"
      class="el-menu-vertical"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
      :collapse="collapsed"
      :default-openeds="openedIndex"
      @open="handleopen"
      @close="handleclose"
      @select="handleselect"
    >
      <template v-for="(item,index) in menus">
        <el-submenu v-if="!item.leaf && !item.hidden" :key="index+''" :index="index+''">
          <template slot="title">
            <i :class="item.iconCls" />
            <span slot="title">{{ $t(item.alias||item.name) }}</span>
          </template>
          <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
            <span v-if="!child.hidden">{{ $t(child.alias||child.name) }}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-if="item.leaf && !item.hidden" :key="item.path" :index="item.path">
          <i :class="item.iconCls" />
          <span slot="title">{{ $t(item.alias||item.name) }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </aside>
</template>
<script>
import { mapState } from "vuex";
import util from "../../common/js/util";
import { menudata } from "./sidebarMenu";
export default {
  data() {
    return {
      menus: null,
      openedIndex: []
    };
  },
  computed: {
    ...mapState({
      collapsed: state => state.menuStore.collapsed
    }),
    ...mapState({
      locals: state => state.menuStore.locals
    })
  },
  watch: {
    //解决menu收缩后在展开，子菜单不展开的问题
    collapsed: {
      handler(curVal) {
        //菜单收缩，不进行此操作,curVal=true表示收缩
        if (curVal) {
          return;
        }
        this.openMenu();
      }
    },
    locals(val) {
      this.$i18n.locale = val;
    }
  },
  created() {
    let tempMenus = [];
    const sidebarMenus = menudata;
    sidebarMenus.forEach(function(element) {
      //菜单映射
      let temp = {};
      temp.id = element.id;
      temp.path = element.permUrl;
      temp.alias = element.permName;
      temp.name = element.permName;
      temp.iconCls = element.iconClass;
      temp.hidden = element.hidden;
      temp.parentPermId = element.parentPermId;
      tempMenus.push(temp);
    }, this);

    let treeData = util.listToTree(tempMenus, { parentKey: "parentPermId" });

    treeData.forEach(element => {
      if (!element.children || element.children.length == 0) {
        element.leaf = true;
      }
    });
    this.menus = treeData;
    this.openMenu();
  },
  methods: {
    openMenu() {
      this.menus.forEach((element, index) => {
        if (element.children) {
          //找到要展开的标签
          element.children.forEach(ele => {
            if (ele.path == this.$route.path) {
              this.openedIndex.push(index + "");
            }
          });
        }
      });
    },
    onSubmit() {
      console.log("submit!");
    },
    handleopen() {},
    handleclose() {},
    handleselect() {}
  }
};
</script>

<style scoped lang="scss">
@import "~scss_vars";

aside {
  flex: 0 0 $sidebar-width;
  width: $sidebar-width;
  .el-menu {
    height: 100%;
    overflow-y: auto;
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 8px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.2);
    }
  }
}

.sidebar_menu{
  position: relative;
  z-index: 9999999;
}

.menu-collapsed {
  flex: 0 0 $collapse-sidebar-width;
  width: $collapse-sidebar-width;
  .el-menu-item {
    min-width: 0;
  }
}

.menu-expanded {
  flex: 0 0 $sidebar-width;
  width: $sidebar-width;
}

.el-menu {
  overflow: hidden;
}
.el-submenu .el-menu-item span {
  margin: 0 0 0 10px;
  display: inline-block;
}
</style>
