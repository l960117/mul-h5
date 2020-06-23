<template>
  <div id="app" :class="platform === 'pc' ? 'pc-class' : ''">
    <router-view />
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  data () {
    return {
      platform: 'm'
    }
  },
  created () {
    const token = this.getUrlParam('token')
    if (token) {
      if (localStorage.getItem('token') && localStorage.getItem('token') !== token) {
        localStorage.removeItem('testerId')
        localStorage.removeItem('testerName')
      }
      localStorage.setItem('token', token)
    }
    this.platform = this.getPlatForm()
  },
  methods: {
    getUrlParam(name){
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var result = window.location.search.substr(1).match(reg)
      return result ? decodeURIComponent(result[2]) : null
    },
    getPlatForm () {
      if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        return 'm'
      } else {
        return 'pc'
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/mixin.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  margin: 0 auto;
  background: #F0F7FF;
}
.pc-class {
  max-width: 750px;
}
</style>
