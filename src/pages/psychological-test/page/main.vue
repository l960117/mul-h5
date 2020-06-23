<template>
  <div class="content">
    <div class="content-header" v-if="questionData&&questionData.length !==0">
      <div></div>
      <div>答题中心({{testerName}})</div>
      <div></div>
    </div>
    <div class="question-content" v-if="questionData&&questionData.length !==0">
      <div class="question-content">
        <div class="question-header">
          <div class="question-index">
          <span class="question-index-left">{{total >= 10&&index < 10 ? '0' : ''}}{{index + 1}}</span>/<span class="question-index-right">{{total}}</span>
          </div>
          <div class="question-time">剩余时间:&nbsp;&nbsp;<span class="question-time-text">{{remainSecondsText}}</span></div>
        </div>
      </div>
      <div class="question-content-main">
        <div class="question-center">
          <div v-for="item in questionItem.content" :key="item.attribute" :class="currentSelection.selection === item.attribute ? 'question-select-item question-select-section' : 'question-select-item'" @click="selectAnswer(questionItem.questionId, item.attribute)">
            <div class="select-item-content">{{item.content}}</div>
          </div>
        </div>
      </div>
      <div class="question-bottom">
        <div class="login-btn" @click="next">{{this.index + 1 === this.total ? '完成' : '下一题'}}</div>
      </div>
    </div>
    <div class="none-item" v-else>
      <div class="img-box">
        <img
          class="div-img"
          :src="require('../../../assets/images/no_result.png')"
        />
      </div>
      <div class="none-text">
        <span>尚未获取到题目信息</span>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getQuestion,
  getLeftTimeApi,
  submitResultApi,
  autoSubmitResultApi
} from '../common/service.js'
import { hourFormat } from '../../../utils/dateUtils.js'
export default {
  data () {
    return {
      index: 0,
      total: 40,
      questionData: [],
      questionItem: {
        id: '',
        sequenceId: '',
        dominanceContent: '',
        influenceContent: '',
        steadinessContent: '',
        complianceContent: '',
      },
      submitText: '',
      currentSelection: {
        sequenceId: 0,
        selection: ''
      },
      currentSelectionList: {},
      remainSecondsText: '',
      timeRecorder: null,
      testerName: localStorage.getItem('testerName') || ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getLeftTime()
      this.getQuestionList()
    },
    getQuestionList () {
      const params = {
        testerId: localStorage.getItem('testerId'),
        token: localStorage.getItem('token')
      }
      if (params.testerId&&params.token) {
      } else {
        if (!params.token) {
          this.$router.replace({
            path: '/h5/psychological-test/result'
          })
          return
        }
        if (!params.testerId) {
          this.$router.replace({
            path: '/h5/psychological-test/login'
          })
          return
        }
      }
      this.$insLoading.show({
        fullScreen: true
      })
      getQuestion(params)
        .then((res) => {
          this.$insLoading.hide()
          if (res.resultCode === 200) {
            this.questionData = res.data.questionsList
            this.total = res.data.questionsCount
            this.questionItem = this.questionData[this.index]
          } else if (res.resultCode === 502 || res.resultCode === 505 || res.resultCode === 506) {
            this.$toast(res.errorMessage || '请登录', 1500)
            this.$router.replace({
              path: '/h5/psychological-test/login'
            })
          } else if (res.resultCode === 503 || res.resultCode === 504) {
            this.$router.replace({
              path: '/h5/psychological-test/result'
            })
          } else {}
        })
        .catch((res) => {
          this.$insLoading.hide()
        })
    },
    selectAnswer (sequenceId, type) {
      this.currentSelection.sequenceId = sequenceId
      this.currentSelection.selection = type
    },
    next () {
      if (this.currentSelection.selection === '') {
        this.$toast('您尚未选择答案!', 1500)
      } else {
        this.currentSelectionList[this.currentSelection.sequenceId] = this.currentSelection.selection.split('')[0] || ''
        this.currentSelection = {
          sequenceId: 0,
          selection: ''
        }
        if (this.index + 1 === this.total) {
          // 提交答案
          this.submitResult()
        } else {
          this.index ++
          this.questionItem = this.questionData[this.index]
        }
      }
    },
    submitResult () {
      this.$insLoading.show()
      const params = {
        token: localStorage.getItem('token'),
        testerId: localStorage.getItem('testerId'),
        questionsAnswers: this.currentSelectionList
      }
      submitResultApi(params)
        .then((res) => {
          this.$insLoading.hide()
          if (res.resultCode === 200) {
            this.$router.push({
              path: '/h5/psychological-test/result',
              query: {
                status: 'success'
              }
            })
          } else {
            this.$insDialog.show({
              content: res.errorMessage || '提交答案失败，请联系管理员'
            })
          }
        })
        .catch((res) => {
          this.$insLoading.hide()
          this.$insDialog.show({
            content: '网络异常，请重试'
          })
        })
    },
    getLeftTime () {
      const params = {
        testerId: localStorage.getItem('testerId')
      }
      getLeftTimeApi(params)
        .then((res) => {
          if (res.resultCode === 200) {
            if (res.data > 0) {
              this.timeCountDown(res.data, res.data)
            }
          }
        })
        .catch((res) => {

        })
    },
    timeCountDown (a, b) {
      let timeCount = a
      let remainSeconds = b
      let start_time = new Date().getTime()
      this.timeRecorder = setInterval(() => {
        let end_time = new Date().getTime()
        remainSeconds = timeCount - Math.floor((end_time - start_time) / 1000)
        setTimeout(() => {
          this.remainSecondsText = hourFormat(remainSeconds)
        })
        if (remainSeconds <= 0) {
          clearInterval(this.timeRecorder)
          autoSubmitQuestion()
        }
      }, 1000)
    },
    autoSubmitQuestion () {
      const params = {
        token: localStorage.getItem('token'),
        testerId: localStorage.getItem('tester'),
        questionsAnswers: this.currentSelectionList
      }
      autoSubmitResultApi(params)
        .then((res) => {
          if (res.resultCode === 200) {
            this.$insDialog.show({
              content: '考试时间到，已自动提交答案！'
            })
            .then(res => {
              this.$router.push({
                path: '/h5/psychological-test/result',
                query: {
                  status: 'success'
                }
              })
            })
            .catch((res) => {
              this.$router.push({
                path: '/h5/psychological-test/result',
                query: {
                  status: 'expiring'
                }
              })
            })
          }
        })
    }
  },
  destroyed(){
    if(this.timeRecorder) {
      clearInterval(this.timeRecorder)
      this.timeRecorder = null
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  background-image: url('../../../assets/images/test_bg.png');
  background-size: 100% 782px;
  background-repeat: no-repeat;
  .content-header {
    height: 88px;
    color: #ffffff;
    font-size: 36px;
    line-height: 88px;
  }
  .question-content {
    padding: 10px 30px 0 30px;
    height: 100%;
    box-sizing: border-box;
    .question-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      margin-bottom: 20px;
      .question-time {
        display: flex;
        align-items: center;
        color: #ffffff;
        font-size: 28px;
        font-family: PingFangSC-Regular;
        .question-time-text {
          color: #FFF13E;
          font-size: 32px;
          font-family: PingFangSC-Medium;
        }
      }
      .question-index {
        color: #ffffff;
        font-size: 28px;
        .question-index-left {
          font-size: 56px;
          font-family: PingFangSC-Medium;
        }
        .question-index-right {
          font-size: 34px;
          font-family: PingFangSC-Regular;
        }
      }
    }
    &-main {
      background: #ffffff;
      padding: 39px 32px 40px 32px;
      border-radius: 20px;
      box-shadow: 0px 15px 30px 0px #CEDFF4;
      margin-bottom: 20px;
      flex: 1;
      .question-title {
        text-align: left;
        line-height: 56px;
        .question-type {
          font-size: 28px;
          background: #E1EFFF;
          border-radius: 10px;
          padding: 5px 10px 5px 10px;
          color: #65ACFF;
          font-family: PingFangSC-Regular;
        }
        .question-title-content {
          word-break: break-all;
          color: 333333;
          font-size: 32px;
          font-family: PingFangSC-Regular;
        }
      }
      .question-center {
        margin-top: 40px;
        margin-bottom: 10px;
      }
      .question-select-item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: #F8F8F8;
        padding: 10px 60px;
        border-radius: 45px;
        line-height: 45px;
        min-height: 80px;
        margin-bottom: 25px;
        color: #666666;
        font-size: 30px;
        font-family: PingFangSC-Regular;
        .select-item-tag {
          width: 40px;
          margin-right: 20px;
        }
        .select-item-content {
          flex: 1;
          text-align: left;
          word-break: break-all;
        }
      }
      .question-select-section {
        color: #ffffff;
        background: #65ACFF;
      }
    }
  }
}
.none-item {
  padding-top: 200px;
  background: #F0F7FF;
  padding-bottom: 50px;
}
.none-text{
  margin-top: 83px;
  font-size:36px;
  font-family:PingFang-SC-Regular,PingFang-SC;
  font-weight:400;
  color:rgba(51,51,51,1);
  line-height:50px;
}
.img-box {
  text-align: center;
}
.div-img{
  display: inline-block;
  width:320px;
  height:320px;
  margin:auto 0;
}

.login-btn{
  position: relative;
  border-radius: 20px;
  height: 100px;
  margin-top:50px;
  margin-bottom: 50px;
  color: #ffffff;
  background: #4B9EFF;
  line-height: 100px;
  text-align: center;
  font-size:36px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
}
</style>
