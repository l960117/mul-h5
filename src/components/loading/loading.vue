<template>
  <div id="loading" class="ins-loading__wrapper ins-fill" v-if="visiable" :style="fullScreen ? {background: '#F0F7FF'} : null">
    <div class="ins-loading-full-text" v-if="fullScreen">
    </div>
    <div class="ins-loading-content" v-else>
      <div class="ins-loading-text">
      </div>
    </div>
  </div>
</template>
<script>
import {
  Vue,
  Component
} from "vue-property-decorator"
@Component({
  name: 'ins-loading'
})
export default class Loading extends Vue{
  // data
  visiable = false
  fullScreen = false
  show () {
    this.visiable = true
    this.callback && this.callback('show')
  }
  hide () {
    this.visiable = false
    this.callback && this.callback('hide')
  }
}
</script>
<style lang="scss">
.ins-loading__wrapper {
  text-align: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity.2s;
  opacity: 1;
  -webkit-transition: opacity.2s;
  -moz-transition: opacity.2s;
  -ms-transition: opacity.2s;
  -o-transition: opacity.2s;
}
.ins-fill {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.ins-loading-full-text {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  margin-left: -30px;
  margin-top: -30px;
  color: rgba(0, 0, 0, 0);
  border: 4px solid;
  border-radius: 50%;
  border-top-color: #5cacee;
  border-left-color: #5cacee;
  border-bottom-color: #5cacee;
  -webkit-animation: ins-loading .8s infinite linear;
  animation: ins-loading .8s infinite linear;
}
.ins-loading-content {
  display: flex;
  align-items:center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  margin-left: -50px;
  margin-top: -50px;
  border-radius: 8px;
  background: #000000;
  opacity: 0.8;
}
.ins-loading-text {
  width: 40px;
  height: 40px;
  color: rgba(0, 0, 0, 0);
  border: 4px solid;
  border-radius: 50%;
  border-top-color: #ffffff;
  border-left-color: #ffffff;
  border-bottom-color: #ffffff;
  -webkit-animation: ins-loading .8s infinite linear;
  animation: ins-loading .8s infinite linear;
}
@-webkit-keyframes ins-loading {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes ins-loading {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
</style>