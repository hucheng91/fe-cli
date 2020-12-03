<!--
 * @Author: nigel
 * @Date: 2020-03-19 17:42:36
 * @LastEditTime: 2020-05-19 16:03:47
 -->
<i18n src="./locals/AppHeader.json"></i18n>
<template>
  <el-col :span="24" class="header">
    <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
      {{ collapsed?sysName:'' }}
      <img v-show="!collapsed" :src="logoSrc" />
    </el-col>
    <el-col :span="10">
      <div class="tools" @click.prevent="collapse">
        <i class="fa fa-align-justify" />
      </div>
    </el-col>

    <el-col :span="4" class="language-set">
      <el-dropdown class="userinfo" trigger="hover">
        <span class="el-dropdown-link userinfo-inner">
          {{ userName }}
          <i class="fa fa-user-o" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">{{ $t('logout') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown @command="handleSetLanguage">
        <span class="el-dropdown-link userinfo-inner">
          {{ $t(languageMap[locals]) }}
          <span class="iconfont icon-duoyuyan langati" />
          <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(value,key) in languageMap"
            :key="key"
            :command="key"
          >{{ $t(value) }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-col>
</template>

<script>
import { mapActions, mapState } from "vuex";
import logoSrc from "@/assets/logo.png";

export default {
  data() {
    return {
      sysName: "NRI",
      activeIndex: "1",
      activeIndex2: "1",
      userName: "",
      userAvatar: "",
      logoSrc: logoSrc,
      languageMap: {
        "zh-CH": "chinese",
        en: "english",
        ja: "japanese"
      }
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
    locals(val) {
      this.$i18n.locale = val;
    }
  },
  created() {
    // this.userName = "nigel";
  },
  mounted() {
    let userInfo = storeLocal.get("userInfo");
    // console.log(userInfo);
    if (userInfo) {
      this.userName = userInfo.username;
    }
  },
  methods: {
    ...mapActions(["collapse", "setLocals"]),
    handleSetLanguage(key) {
      // 语言设置到vuex中
      this.setLocals(key);
    },
    /**
     * @name: logout
     * @msg: 用户退出当前登录
     * @param {}
     * @return:
     */
    logout() {
      this.$confirm(this.$t("exit_confirm"), this.$t("Tips"), {
        confirmButtonText: this.$t("confirm"),
        cancelButtonText: this.$t("cancel"),
        type: "warning"
      }).then(() => {
        localStorage.clear();
        sessionStorage.clear();
        this.$router.replace({
          name: "login"
        });
      });
    },
  }
};
</script>
<style scoped lang="scss">
@import "~scss_vars";

.header {
  height: 60px;
  line-height: 50px;
  background: $color-primary;
  color: #fff;
  .langati {
    position: relative;
    top: 2px;
    font-size: 20px;
  }
  .userinfo {
    margin: 0 10px 0 0;
  }
  .language-set {
    text-align: right;
    padding-right: 15px;
    float: right;
    .userinfo-inner {
      cursor: pointer;
      color: #fff;
      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin: 10px 0px 10px 10px;
        float: right;
      }
    }
  }
  .logo {
    //width:$sidebar-width;
    height: 60px;
    font-size: 22px;
    // padding-left: 12px;
    // padding-right: 20px;
    border-color: rgba(238, 241, 146, 0.3);
    border-right-width: 1px;
    border-right-style: solid;
    text-align: center;
    img {
      float: left;
      width: 100%;
      height: 60px;
      // margin: 10px 0 0 0;
      padding: 0;
    }
    .txt {
      color: #fff;
    }
  }
  .logo-width {
    width: $sidebar-width;
  }
  .logo-collapse-width {
    width: $collapse-sidebar-width;
  }
  .tools {
    padding: 0px 23px;
    width: 14px;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
  }
}
</style>
