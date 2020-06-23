<template>
  <transition name="ins-dialogs-ani">
    <div
      class="ins-dialogs-container"
      v-if="visiable">
      <div
        class="ins-dialogs-mask"
        @click="maskClick">
      </div>
      <div class="ins-center ins-dialogs">
        <div class="ins-dialogs-title">
          {{ title }}
        </div>
        <div class="ins-dialogs-content">
          {{ content }}
        </div>
        <div class="ins-dialogs-bottom">
          <div
            v-if="!hideCancel"
            class="ins-dialogs-button"
            @click="onclick('cancel')">
            {{ cancel }}
          </div>
          <div
            class="ins-dialogs-button"
            @click="onclick('confirm')">
            {{ confirm }}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import {
  Vue,
  Component
} from "vue-property-decorator"
@Component({
  name: 'ins-dialogs'
})
export default class Dialogs extends Vue{
  // data
  loading = true
  visiable = false
  title = '提示'
  content ='内容文字'
  confirm ='確定'
  cancel ='取消'
  maskClickToHide = false
  callback = null
  hideCancel = true
  // methods
  maskClick () {
    this.maskClickToHide && this.close()
  }
  show () {
    this.visiable = true
    this.callback && this.callback('show')
  }
  close () {
    this.visiable = false
    this.callback && this.callback('close')
  }
  onclick (action) {
    this.callback && this.callback(action)
  }
}
</script>
<style lang="scss">
$z5: 500;
$aniDuration: .2s;
.ins{
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -moz-tap-highlight-color: rgba(255, 255, 255, 0);
  -ms-tap-highlight-color: rgba(255, 255, 255, 0);
  tap-highlight-color: rgba(255, 255, 255, 0);
  user-select: none;
  &-center {
    position: absolute;
    left: 50%;
    top: 50%;
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  &-hidden {
    display: none
  }
}
.ins-dialogs-container, .ins-dialogs-mask {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.ins-dialogs-container {
  z-index: $z5 + 1;
}
.ins-dialogs-mask {
  background-color: rgba(0, 0, 0, .5);
  transition: opacity $aniDuration;
  opacity: 1;
}
.ins-dialogs {
  position: absolute;
  min-width: 256px * 2;
  max-width: 80%;
  background-color: #fff;
  display: inline-block;
  border-radius: 4px * 2;
  transition: transform $aniDuration ease-in-out;
  transform-origin: left top;
  box-shadow:
    0 3px * 2 7px * 2 1px * 2 rgba(0, 0, 0, 0.19),
    0 10px * 2 10px * 2 0 rgba(0, 0, 0, 0.19),
    0 6px * 2 3px * 2 0 rgba(0, 0, 0, 0.23);
  &-title {
    padding: 24px * 2 24px * 2 0px * 2 24px * 2;
    margin-bottom: 20px * 2;
    font-size: 20px * 2;
    font-weight: 500;
    text-align: left;
    letter-spacing: 0.005em;
  }
  &-content {
    padding: 0 24px * 2 20px * 2 24px * 2;
    font-size: 13px * 2;
    color: rgba(0, 0, 0, 0.71);
  }
  &-bottom {
    padding: 8px * 2 8px * 2 8px * 2 24px * 2;
    text-align: right;
    font-size: 0;
  }
  &-button {
    height: 36px * 2;
    line-height: 36px * 2;
    vertical-align: middle;
    border-radius: 2px * 2;
    min-width: 64px * 2;
    padding: 0 8px * 2;
    margin-left: 8px * 2;
    font-size: 14px * 2;
    color: #2196f3;
  }
}
.ins-dialogs-ani {
  &-enter, &-leave-to {
    opacity: 0;
    transition: $aniDuration;
  }
  &-enter-to, &-leave {
    opacity: 1;
    transition: $aniDuration;
  }
  &-enter .ins-dialogs, &-leave-to .ins-dialogs{
    transform: scale(.8) translate(-50%, -50%);
  }
  &-enter-to .ins-dialogs, &-leave .ins-dialogs{
    transform: scale(1) translate(-50%, -50%);
  }
}
</style>
