<i18n src="./locals/index.json"></i18n>
<template>
  <div class="login-wrap">
    <el-form
      ref="authInfo"
      :model="authInfo"
      :rules="formRules"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <h3 class="title">NRI demo platform login</h3>
      <el-form-item prop="account">
        <el-input v-model="authInfo.account" type="text" auto-complete="off" placeholder="account" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="authInfo.password"
          type="password"
          auto-complete="off"
          placeholder="password"
        />
      </el-form-item>
      <el-form-item label prop="token">
        <!-- 点击式按钮建议宽度不低于200px,高度介于36px与46px  -->
        <!-- 嵌入式仅需设置宽度，高度根据宽度自适应，最小宽度为200px -->
        <!-- <div id="vaptcha_container">
          <div class="vaptcha-init-main">
            <div class="vaptcha-init-loading">
              <img src="/static/images/vaptcha-loading.gif" />
              <span class="vaptcha-text">Vaptcha starting...</span>
            </div>
          </div>
        </div>-->
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button
          type="primary"
          style="width:100%;"
          :loading="logining"
          @click.native.prevent="handleSubmit"
        >Login</el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>

    <!-- 登录界面动效 -->
    <!-- <div class="cloud cloud-b">
      <div class="line-a"></div>
      <div class="line-b"></div>
      <div class="line-c"></div>
      <div class="line-d"></div>
      <div class="line-e"></div>
    </div>-->
    <div class="boat">
      <div class="wrap">
        <div class="main">
          <div class="boat-top-layer">
            <div class="top">
              <div class="pole" />
              <div class="help">
                <span />
              </div>
            </div>
            <div class="bottom" />
          </div>
          <div class="boat-mid-layer">
            <div class="top" />
            <div class="bottom" />
          </div>
          <div class="boat-bot-layer">
            <div class="top" />
            <div class="bottom" />
          </div>
        </div>
      </div>
      <div class="water">
        <div class="drops clearfix drops-1">
          <span class="drop drop-a" />
          <span class="drop drop-b" />
          <span class="drop drop-c" />
          <span class="drop drop-d" />
          <span class="drop drop-e" />
          <span class="drop drop-f" />
          <span class="drop drop-g" />
          <span class="drop drop-h" />
        </div>
        <div class="drops clearfix drops-2">
          <span class="drop drop-a" />
          <span class="drop drop-b" />
          <span class="drop drop-c" />
          <span class="drop drop-d" />
          <span class="drop drop-e" />
          <span class="drop drop-f" />
          <span class="drop drop-g" />
          <span class="drop drop-h" />
        </div>
      </div>
    </div>

    <div class="footer">Copyright © 2020 All rights reserved. 深圳野村综合研究所技术支持</div>
  </div>
</template>

<script>
import api from "../../api";
export default {
  data() {
    return {
      captchaGetting: false,
      logining: false,
      authInfo: {
        // accountType: "RTX",
        account: "",
        password: ""
        // token: ""
      },
      formRules: {
        account: [
          {
            required: true,
            message: "Please enter your account",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "Please input password", trigger: "blur" }
        ]
        // token: [
        //   {
        //     required: true,
        //     message: "Vaptcha must be verified",
        //     trigger: "blur"
        //   }
        // ]
      },
      checked: true
    };
  },
  mounted() {
    this.query = this.$route.query;
    //初始化vaptcha
    // this.vaptchaObj = null;
    // let that = this;
    // vaptcha({
    //   vid: "5e5893276621d1144c91bbe7", // 验证单元id
    //   type: "embed", // 显示类型 嵌入式
    //   scene: 0, // 场景值 默认0
    //   container: "#vaptcha_container", // 容器，可为Element 或者 selector
    //   offline_server: "https://imageregdemo.nrihkerp.com", //离线模式服务端地址,本地联调填写127.0.0.1;上线要填写显示域名
    //   //可选参数
    //   lang: "en", // 语言 默认zh-CN,可选值zh-CN,en,zh-TW
    //   https: true // 使用https 默认 true
    // }).then(function(vpObj) {
    //   that.vaptchaObj = vpObj; //将VAPTCHA验证实例保存到局部变量中
    //   vpObj.render(); // 调用验证实例 vpObj 的 render 方法加载验证按钮
    //   //获取token的方式二：
    //   vpObj.listen("pass", function() {
    //     // 验证成功进行后续操作
    //     that.authInfo.token = vpObj.getToken();
    //     // vaptchaObj.reset(); //重置验证码
    //   });
    // });
  },
  methods: {
    // handleReset2() {
    //   this.$refs.authInfo.resetFields();
    // },
    // getCaptcha() {
    //   this.captchaGetting = true;
    //   api.auth.getCaptcha(this.authInfo).then(res => {
    //     this.captchaGetting = false;
    //     this.$message({
    //       message: "验证码已经下发，请注意查收",
    //       type: "info"
    //     });
    //   });
    // },
    handleSubmit() {
      this.$refs.authInfo.validate(valid => {
        if (valid) {
          this.logining = true;
          let loginParams = {
            username: this.authInfo.account,
            password: this.authInfo.password
            // token: this.authInfo.token
          };
          api.authApi
            .Login(loginParams)
            .then(res => {
              this.logining = false;
              let { status, data } = res;
              // console.log(data);
              if (status == 200) {
                if (data.errno === 0) {
                  // storeLocal.set("token", data.data.token);
                  storeSession.set("token", data.data.token);
                  storeLocal.set("userInfo", data.data.userInfo);
                  // console.log(JSON.stringify(this.query));
                  if (JSON.stringify(this.query) != "{}") {
                    this.$router.push({
                      path: this.query.redirect
                    });
                  } else {
                    this.$router.replace({
                      path: "/"
                    });
                  }
                } else {
                  this.$message.error(data.errmsg);
                }
              }
            })
            .catch(() => {
              this.logining = false;
              this.$notify({
                message:
                  "Interface request failed, please check whether the network is normal~",
                type: "error"
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./ship.scss";
.vaptcha-init-main {
  display: table;
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
}
.vaptcha-init-loading {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.vaptcha-init-loading > a {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: none;
}
.vaptcha-init-loading > a img {
  vertical-align: middle;
}
.vaptcha-init-loading .vaptcha-text {
  font-family: sans-serif;
  font-size: 12px;
  color: #cccccc;
  vertical-align: middle;
}
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  // margin: 180px auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
  overflow: hidden;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
.login-wrap {
  position: relative;
  overflow: hidden;
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    font-size: 12px;
    line-height: 30px;
    height: 30px;
    margin: 2px;
    text-align: center;
    color: #666666;
  }
}
</style>