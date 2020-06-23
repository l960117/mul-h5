<template>
  <div>
    <div class="igola-modal alert-pop-panel"
         :class="{'validation-pop':validationPop, 'show': validationPop}">
      <div class="igola-modal-content animated iGola-slideInUp">
        <div class="igola-modal-title">
          <span class="s-title">提示</span>
          <a href="javascript:;"
             class="close-btn global-pop-close-btn global-pop-close-btn-white"
             v-on:click="hideValidationPop();">{{'price_alert_close'|translate}}</a>
        </div>
        <div class="alert-content">
          <div class="img-box">
            <i class="iconset-membership-member-oops"></i>
          </div>
          <div class="msg-box">
            <p class="msg-p">没有检查到您的航班信息，请检查值机信息是否输入有误，或距离起飞时间是否大于36小时</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
