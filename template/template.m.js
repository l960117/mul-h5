/*
 *  (runtime-only or standalone) has been set in webpack.base.conf with an alias.
 * The Vue build version to load with the `import` command
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import vuexI18n from 'vuex-i18n'
import FastClick from 'fastclick'
import store from './../../store/index'
import routes from './router'
import locales from './../../plugins/i18n'
import '../../styles/iconfont.less'

// import App from './App.vue'

// sync(store, routes)

Vue.use(VueRouter);
Vue.use(vuexI18n.plugin, store);


Vue.i18n.add('zh', locales.zh);
Vue.i18n.add('zh-CN', locales.zh);
Vue.i18n.add('en', locales.en);


Vue.config.lang = window.navigator.language.split('-')[0];

if (/zh/.test(Vue.config.lang)) {
  Vue.i18n.set('zh-CN')
} else {
  Vue.i18n.set('en')
}

// 添加FastClick移除移动端点击延迟
FastClick.attach(document.body);

const router = new VueRouter({
  mode: 'history',
  // base: __dirname,
  routes: routes
})

const app = new Vue({
  store,
  router
})

app.$mount('#app')
