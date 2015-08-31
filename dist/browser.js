// Generated by CoffeeScript 1.9.3
(function() {
  var browser, is_exports, is_modern_browser, mobile, mobile_list, modern_browsers, ref, root,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  is_exports = typeof exports !== "undefined" && exports !== null;

  root = is_exports ? exports : this;

  if (!root.sup) {
    root.sup = {};
  }

  mobile_list = [
    {
      pattern: /Android/i,
      name: 'Android',
      alias: 'android'
    }, {
      pattern: /webOS/i,
      name: 'webOS',
      alias: 'webos'
    }, {
      pattern: /iPhone/i,
      name: 'iPhone',
      alias: 'iphone'
    }, {
      pattern: /iPad/i,
      name: 'iPad',
      alias: 'ipad'
    }, {
      pattern: /iPod/i,
      name: 'iPod',
      alias: 'ipod'
    }, {
      pattern: /BlackBerry/i,
      name: 'BlackBerry',
      alias: 'blackberry'
    }, {
      pattern: /Windows Phone/i,
      name: 'WindowsPhone',
      alias: 'wp'
    }
  ];

  mobile = (function() {
    var i, len, m;
    for (i = 0, len = mobile_list.length; i < len; i++) {
      m = mobile_list[i];
      if (navigator.userAgent.match(m.pattern)) {
        return m;
      }
    }
    return null;
  })();

  browser = (function() {
    var M, tem, ua;
    ua = navigator.userAgent;
    tem = void 0;
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i);
    if (!M) {
      M = [];
    }
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return "IE " + (tem[1] || "");
    }
    if (M[1] === "Chrome") {
      tem = ua.match(/\bOPR\/(\d+)/);
      if (tem != null) {
        return "Opera " + tem[1];
      }
    }
    if (M[2]) {
      M = [M[1], M[2]];
    } else {
      M = [navigator.appName, navigator.appVersion, "-?"];
    }
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
      M.splice(1, 1, tem[1]);
    }
    M.join(" ");
    browser = {
      alias: M[0],
      ver: M[1],
      mobile: mobile
    };
    return browser;
  })();

  modern_browsers = ['Chrome', 'Opera', 'Safari', 'Firefox', 'MSIE'];

  is_modern_browser = true;

  if (ref = browser.alias, indexOf.call(modern_browsers, ref) < 0) {
    is_modern_browser = false;
  }

  if (browser.alias === 'MSIE' && parseInt(browser.ver) < 10) {
    is_modern_browser = false;
  }

  if (navigator.userAgent.indexOf('Mobile') > -1) {
    is_modern_browser = true;
  }

  if (!is_modern_browser) {
    window.location.href = sup.server.web + '/old_browser';
  }

  root.sup.browser = browser;

  console.log('Detect browser: ', root.sup.browser);

}).call(this);
