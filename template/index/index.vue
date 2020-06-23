<template>
  <div>
    <app-title head-title="find_flighs"></app-title>
    <section class="container container-message">
      <form class="container-message-form">
        <div class="form-panel has-tab-header">
          <p class="form-new-tip tip-20">{{ $t('travel-service') }}</p>
          <div class="form-group airline-selection">
            <router-link :to='{path: "/travel-service/airlist"}' class="address_container">
              <label class="form-group-label">
                <input
                  type="text"
                  v-model="airlineListDefaultVal"
                  class="form-control"
                  readonly="true"
                />
                <i class="ifont i-arrowdown-whitegrey-16 fs-select-arrow"></i>
              </label>
            </router-link>
          </div>
          <div class="form-group pNumber-type">
            <label class="form-group-label pnumber-label">
              <div>
                <input id="pNumber-type-selected" type="text" class="pNumber-type-select form-control" v-model="pNumberListDefaultVal" readonly="true">
                <i class="ifont i-arrowdown-whitegrey-16 fs-select-arrow" @click="showNumberType();"></i>
              </div>
              <ul id="pNumber-type-list" class="pNumber-type-list" v-show="showpNumberList">
                <li v-for="pNumberType in pNumberList" @click="setpNumberVal(pNumberType);">{{pNumberType}}</li>
              </ul>
              <input
                type="text"
                id="cNumberType"
                v-model="onlineCheckOut.passengersNum"
                class="form-control pNumber-type-val"
                :placeholder="pNumberPlaceHolder"
                :class="{'error-input': pTypeFocus}"
              />
            </label>
          </div>
          <div class="form-group common-group-style">
            <label class="form-group-label common-passenger-label">
              <span id="common-text-passenger" class="common-text-style">乘机人：</span>
              <input
                type="text"
                class="form-control"
                id="passengerName"
                v-model="passengerValidateName"
                placeholder="请填写乘机人姓名"
              />
            </label>
          </div>
          <div class="form-group common-group-style">
            <label class="form-group-label common-phone">
              <span class="common-text-style" id="common-text-phone">手机号：</span>
              <input
                type="text"
                class="form-control"
                id="phoneNum"
                v-model="phoneValidateNum"
                placeholder="请填写11位手机号"
              />
            </label>
          </div>
          <a href="javascript:;" @click="showCheckInModal();" class="sign-in-forgot-password-tips-btn pull-right checkIn-but">值机选座问答</a>
          <button id="userLogin" style="margin-top:20px;" class="btn btn-lg btn-primary btn-block btn-login-in" type="submit" @click="searchPassengerMsg();">
            <span>办理值机</span>
            <i class="sign-loading" ng-show="loading"></i>
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>

// 公共模块
import appTitle from '../../../components/app-title/appTitle'

// 业务公共组件
import common from '../common/common'

// 独立业务模块
import children from './children'


export default {
  components: {
    appTitle,

    common,
  },
  data() {
    return {
      msg: ''
    };
  },
  methods: {
    showAirList() {
    }
  }
};
</script>

<style lang="scss" scoped>

  @import '../../../styles/mixin';

</style>