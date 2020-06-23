// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import Toast from 'vue-toast-component'
import dialogsCompoent from '../../components/modal'
import loadingCompoent from '../../components/loading'

Vue.use(dialogsCompoent)
Vue.use(loadingCompoent)

Vue.use(Toast)

// 添加FastClick移除移动端点击延迟
FastClick.attach(document.body);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
