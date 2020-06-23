<template>
  <div class="result">
    <div class="no-found-item" v-if="status === '404'">
      <img :src="require('../../../assets/images/404.jpg')" class="no-found-item-image" />
    </div>
    <div class="success-item" v-if="status === 'success'">
      <img :src="require('../../../assets/images/success.png')" class="success-item-image" />
      <div class="success-item-text">
        答题已完成，感谢您的参与~
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'result',
  data () {
    return {
      status: '404'
    }
  },
  mounted () {
    this.status = this.$route.query.status || '404'
  }
}
</script>
<style lang="scss">
.result {
  // position: relative;
  background: #ffffff;
  height: 100%;
  width: 100%;
  .no-found-item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &-image {
      width: 500px;
      height: 500px;
    }
  }
  .success-item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &-image {
      width: 600px;
      height: 450px;
    }
    &-text {
      color: #999999;
      font-size: 30px;
      line-height: 50px;
    }
  }
}
</style>
