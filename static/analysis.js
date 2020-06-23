/**
 * Copyright (c) 2015 iGola Travel Consultant and Services Company Ltd.
 * www.igola.com
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of
 * iGola Travel Consultant and Services Company Ltd. ("Confidential Information").
 * You shall not disclose such Confidential Information and shall use
 * it only in accordance with the terms of the license agreement you
 * entered into with iGola Travel Consultant and Services Company Ltd.
 */

function isProduction() {
  return ((window.location.host.indexOf('igola.com')!=-1)  && window.location.protocol === "https:");
}

function isChinapexTest() {
  return  (window.location.href.indexOf('chinapexTest=true') > -1 || !!sessionStorage.getItem('chinapexTest'));
}


if(isProduction() || isChinapexTest()) {

  function getDeferPath() {
    if ( isChinapexTest() ) {
      return 'http://192.168.0.84:8080/WEB/files/defer.js';

    } else {

      var protocol = ('https:' == document.location.protocol ?
        'https://' : 'http://');
      return protocol + "content.igola.com/static/WEB/files/defer.js";
    }
  }

  (function() {
    function downloadJSAtOnload() {
      var element = document.createElement("script");
      element.src = getDeferPath();
      document.body.appendChild(element);
    }
    if (window.addEventListener)
      window.addEventListener("load", downloadJSAtOnload, false);
    else if (window.attachEvent)
      window.attachEvent("onload", downloadJSAtOnload);
    else window.onload = downloadJSAtOnload;
  })();

};
