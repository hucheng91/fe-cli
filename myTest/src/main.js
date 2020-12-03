/*
 * @Author: nigel
 * @Date: 2020-05-12 14:33:04
 * @LastEditTime: 2020-05-20 13:50:44
 */
/* eslint-disable */
import babelpolyfill from 'babel-polyfill';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App';
import ElementUI from 'element-ui';
import enLocale from 'element-ui/lib/locale/lang/en';
import jaLocale from 'element-ui/lib/locale/lang/ja';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import Exif from "exif-js";

// import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/theme-chalk/index.css';
// import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router';
import store from './vuex/store';
import Vuex from 'vuex';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import routes from './routes';
import './styles/main.scss';
import 'font-awesome/css/font-awesome.min.css';

// 启动模拟接口
// import Mock from './mock/index.js'
// Mock.bootstrap();
import utils from './common/js/util.js';
window.storeLocal = utils.storeLocal;
window.storeSession = utils.storeSession;
window.Exif = Exif;
Vue.use(VueI18n);
Vue.use(ElementUI);

Vue.use(VueRouter);
Vue.use(Vuex);

NProgress.configure({ showSpinner: false });
const router = new VueRouter({
  // mode: 'history',
  routes
});

const i18n = new VueI18n({
  locale: 'zh-CH', // set locale
  messages: {},
  // silentFallbackWarn: true,
  // silentTranslationWarn: true
});


router.beforeEach((to, from, next) => {
  NProgress.start();
  /*需要判断登录*/
  // let token = storeSession.get('token');
  // if (!token && to.name !== 'login') {
  //   next({
  //     path: '/login',
  //     query: { redirect: to.fullPath }
  //   });
  // } else {
  //   let locale = store.state.menuStore.locals;
  //   i18n.locale = locale;
  //   switch (locale) {
  //     case 'zh-CH': Vue.use(ElementUI, zhLocale); break;
  //     case 'en': Vue.use(ElementUI, enLocale); break;
  //     case 'ja': Vue.use(ElementUI, jaLocale); break;
  //   }
  //   if (to.path == '/login') {
  //     sessionStorage.removeItem('user');
  //   }
  //   next();
  // }

  /**不需要登录 */
  let locale = store.state.menuStore.locals;
  i18n.locale = locale;
  // let map = new Map([['zh-CH', 'zhLocale'], ['en', 'enLocale'], ['ja', 'jaLocale']]);
  switch (locale) {
    case 'zh-CH': Vue.use(ElementUI, zhLocale); break;
    case 'en': Vue.use(ElementUI, enLocale); break;
    case 'ja': Vue.use(ElementUI, jaLocale); break;
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

const rootVue = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');

export default rootVue;
