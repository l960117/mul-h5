<template>
  <div>
    <div class="login-top">
      <img :src="require('../../../assets/images/login_bg.png')" class="login-top-image"/>
    </div>
    <div class="lg-form">
      <div class="lg-formc">
        <div class="lg-formc-item">
          <input type="text" v-model="loginForm.phone"  placeholder="请输入您的手机号码">
        </div>
        <div class="lg-formc-item">
          <input v-model="loginForm.password" type="password"  placeholder="请输入您的密码">
        </div>
      </div>
    </div>
    <div class="login-btn" @click="login">{{submitText}}</div>
    </div>
  </div>
</template>
<script>
import {
  loginIn
} from '../common/service.js'
export default {
  data () {
    return {
      loginForm: {
        phone: '',
        password: ''
      },
      isSubmiting: false
    }
  },
  computed: {
    submitText () {
      if (this.isSubmiting) {
        // Indicator.open()
        return '登录中...'
      } else {
        // Indicator.close()
        return '登录'
      }
    }
  },
  methods: {
    login () {
      if (this.loginForm.phone === '') {
        this.$insDialogs.show({
          content: '请输入手机号'
        })
        return
      }
      if (this.loginForm.password === '') {
        this.$insDialogs.show({
          content: '请输入密码'
        })
        return
      }
      var params = {
        phone: this.loginForm.phone,
        password: this.loginForm.password,
        token: localStorage.getItem('token')
      }
      this.isSubmiting = true
      this.$insLoading.show()
      loginIn(params)
        .then((res) => {
          this.isSubmiting = false
          this.$insLoading.hide()
          if (res.resultCode === 200) {
            localStorage.setItem('testerId', res.data.testerId)
            localStorage.setItem('testerName', res.data.testerName)
            this.$router.replace({
              path: '/h5/psychological-test/main'
            })
          } else {
            this.$insDialogs.show({
              content: res.errorMessage || '登录失败'
            })
          }
        })
        .catch((res) => {
          this.$insLoading.hide()
          this.isSubmiting = false
          this.$insDialogs.show({
            content: '网络出错，请重试'
          })
        })
    }
  }
}
</script>
<style scoped lang="scss">
@import "../../../assets/scss/_function.scss";
$imgBaseurl:"../../../assets/images/";
.login-btn {
  margin-top: 30px;
  margin-left:130px;
  margin-right: 130px;
}
.lg-form {
  position: relative;
  height: 200px;
}
.lg-formc {
  position: relative;
  top: -160px;
  background: #fff;
  margin-left: 30px;
  margin-right: 30px;
  height: 400px;
  box-shadow:0px 0px 10px 0px rgba(206,223,244,1);
  border-radius:20px;
  padding-top: 20px;
}
.lg-frtit {
  width:100%;
  font-size: 50px;
  color:#fff;
  padding-top: 220px;
}
.lg-formc-item {
  margin-right: 65px;
  margin-left: 65px;
  border: 1px solid #f0f0f0;
  height:90px;
  line-height: 90px;
  margin-top: 50px;
  border-radius: 8px;
  input {
    width: 470px;
    margin-top: 10px;
    margin-bottom: 10px;
    height: 70px;
    line-height: 70px;
    border: none;
    font-size: 30px;
  }
}
.forgetpaw{
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin-top: 50px;
  div {
    display: inline-block;
    font-size: 30px;
    color: #409EFF;
    text-align: center;
    line-height: 40px;
  }
  div:nth-child(1) {
    margin-right: 150px;
  }
  div:nth-child(2) {
    margin-left: 150px;
  }
}
.login-btn{
  position: relative;
  border-radius: 20px;
  margin-left: 80px;
  margin-right: 80px;
  height: 85px;
  margin-top:30px;
  color: #ffffff;
  background: #4B9EFF;
  line-height: 85px;
  text-align: center;
  font-size:30px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
}
.login-top {
  width: 100%;
  &-image {
    width: 100%;
    height: auto;
  }
}
.lg-third {
  margin-top: 50px;
}
.lg-third-title {
  font-size: 30px;
  color: #888888;
}
</style>