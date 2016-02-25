// Generated by CoffeeScript 1.10.0
(function() {
  var _black_list, base_url, black_list, blackbrowser, body_template, browser, check_version, e, error, head_template, html, i, is_exports, is_modern_browser, len, mobile, mobile_list, modern_browsers, rendering, root, version;

  is_exports = typeof exports !== "undefined" && exports !== null;

  root = is_exports ? exports : this;

  if (!root.sup) {
    root.sup = {};
  }

  version = "0.1.1";

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

  modern_browsers = {
    'chrome': 40,
    'opera': 30,
    'safari': 8,
    'firefox': 40,
    'msie': 10
  };

  black_list = {
    android: ['UCBrowser', 'Opera', 'SougouMobile', 'DolphineBrowser', 'MQQBrowser', 'Baidu'],
    ios: ['SougouMobile', 'OS 6_']
  };

  mobile = (function() {
    var i, len, m;
    for (i = 0, len = mobile_list.length; i < len; i++) {
      m = mobile_list[i];
      if (navigator.userAgent.match(m.pattern)) {
        return {
          name: m.name,
          alias: m.alias
        };
      }
    }
    if (navigator.userAgent.indexOf('Mobile') > -1) {
      return {
        name: '',
        alias: ''
      };
    }
    return null;
  })();

  browser = (function() {
    var M, _browser, name, tem, ua, ver;
    ua = navigator.userAgent;
    tem = void 0;
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i);
    if (!M) {
      M = [];
    }
    name = null;
    ver = null;
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      name = "MSIE";
      ver = tem[1] || "";
    }
    if (M[1] === "Chrome") {
      tem = ua.match(/\bOPR\/(\d+)/);
      if (tem != null) {
        name = "Opera";
      }
      if (tem != null) {
        ver = tem[1];
      }
    }
    if (!name && !ver) {
      if (M[2]) {
        M = [M[1], M[2]];
      } else {
        M = [navigator.appName, navigator.appVersion, "-?"];
      }
      if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
      }
      name = M[0];
      ver = M[1];
    }
    _browser = {
      alias: typeof name === 'string' ? name.toLowerCase() : null,
      name: name,
      ver: ver,
      mobile: mobile
    };
    return _browser;
  })();

  check_version = function(browser) {
    return modern_browsers[browser.alias] > parseInt(browser.ver);
  };

  is_modern_browser = true;

  if (check_version(browser)) {
    is_modern_browser = false;
  }

  if (browser.mobile) {
    is_modern_browser = true;
  }

  if (browser.mobile) {
    if (browser.alias === 'safari' && parseInt(browser.ver) < 7) {
      is_modern_browser = false;
    }
    _black_list = black_list[browser.mobile.alias] || [];
    for (i = 0, len = _black_list.length; i < len; i++) {
      blackbrowser = _black_list[i];
      if (navigator.userAgent.indexOf(blackbrowser) > -1) {
        is_modern_browser = false;
        break;
      }
    }
  }

  browser.is_modern_browser = is_modern_browser;

  root.sup.browser = browser;

  html = document.documentElement;

  if (!html) {
    return;
  }

  if (typeof html.hasAttribute !== 'function') {
    html.hasAttribute = function(attrName) {
      return typeof html[attrName] !== 'undefined';
    };
  }

  head_template = function(assets_path) {
    return '<title>Old Browser</title>' + '<link href="' + assets_path + '/browser-detector.css" rel="stylesheet">';
  };

  body_template = function(assets_path) {
    return '<div id="wrapper">' + ' <div id="logo">' + '   <img src="' + assets_path + '/browser_detector_logo.png" alt="Soopro"/>' + ' </div>' + ' <div class="content">' + '   <p>' + '     Your browser is too old.<br>' + '     We recommend you choose more reliable web browser following:' + '   </p>' + '   <p>您的浏览器老掉牙了，希望您能紧跟时代立刻升级。' + '   推荐您使用这些浏览器：</p>' + ' </div>' + ' <div class="browsers">' + '   <div class="browser">' + '     <a href="http://www.firefox.com" target="_blank">' + '       <img src="' + assets_path + '/browser_firefox.png" ' + '        alt="Firefox"/>' + '     </a>' + '   </div>' + '   <div class="browser">' + '     <a href="http://www.chrome.com" target="_blank">' + '       <img src="' + assets_path + '/browser_chrome.png" ' + '        alt="Chrome"/>' + '     </a>' + '   </div>' + '   <div class="browser">' + '     <a href="http://support.apple.com/downloads/#safari" target="_blank">' + '       <img src="' + assets_path + '/browser_safari.png" ' + '        alt="Safari"/>' + '     </a>' + '   </div>' + '   <div class="browser">' + '     <a href="http://www.opera.com/" target="_blank">' + '       <img src="' + assets_path + '/browser_opera.png" ' + '        alt="Opera"/>' + '     </a>' + '   </div>' + ' </div>' + ' <div class="copyright">' + '   <small>&copy; Soopro Co.,ltd.</small>' + ' </div>' + '</div>';
  };

  base_url = 'http://libs.soopro.com/browser-detector';

  rendering = function() {
    var assets_path, assets_src, attr, body, e, error, head, j, k, l, len1, len2, len3, mobile_name, modern, ref, ref1, ref2, ref3, remove_attr_list;
    if (html.hasAttribute('modern-browser-tester')) {
      ref = html.attributes;
      for (j = 0, len1 = ref.length; j < len1; j++) {
        attr = ref[j];
        html.removeAttribute(attr);
      }
      while (html.firstChild) {
        html.removeChild(html.firstChild);
      }
      head = document.createElement("HEAD");
      head.innerHTML = '<title>Browser Tester</title>';
      html.appendChild(head);
      body = document.createElement("BODY");
      modern = browser.is_modern_browser ? 'Modern' : 'Old';
      mobile_name = browser.mobile ? browser.mobile.name : '-';
      body.innerHTML = '' + '<h1>' + browser.name + ' ' + browser.ver + ' ' + mobile_name + ' ' + modern + '</h1>' + '<p>appName: ' + navigator.appName + '</p>' + '<p>appVersion: ' + navigator.appVersion + '</p>' + '<small>&lt; ' + navigator.userAgent + ' &gt;</small>';
      html.appendChild(body);
      return;
    }
    if (!html.hasAttribute('modern-browser')) {
      return;
    }
    if (!is_modern_browser) {
      assets_src = html.getAttribute('modern-browser');
      if (typeof assets_src === 'string' && ((ref1 = assets_src.toLowerCase()) === '0' || ref1 === 'false' || ref1 === 'null')) {
        return;
      } else if (assets_src === false || assets_src === 0 || assets_src === null || assets_src === (void 0)) {
        return;
      } else if (typeof assets_src !== 'string') {
        assets_src = '';
      }
      if (!assets_src || ((ref2 = assets_src.toLowerCase()) === 'true' || ref2 === '1')) {
        assets_src = base_url;
      }
      try {
        if (assets_src === '.' || assets_src === 'self') {
          assets_path = '';
        } else {
          assets_path = assets_src;
        }
        if (assets_path && assets_path.substr(-1) === '/') {
          assets_path = assets_path.substr(0, assets_path.length - 1);
        }
      } catch (error) {
        e = error;
        assets_path = '';
      }
      remove_attr_list = [];
      ref3 = html.attributes;
      for (k = 0, len2 = ref3.length; k < len2; k++) {
        attr = ref3[k];
        remove_attr_list.push(attr.name);
      }
      for (l = 0, len3 = remove_attr_list.length; l < len3; l++) {
        attr = remove_attr_list[l];
        html.removeAttribute(attr);
      }
      while (html.firstChild) {
        html.removeChild(html.firstChild);
      }
      head = document.createElement("HEAD");
      head.innerHTML = head_template(assets_path);
      html.appendChild(head);
      body = document.createElement("BODY");
      body.innerHTML = body_template(assets_path);
      return html.appendChild(body);
    }
  };

  try {
    rendering();
  } catch (error) {
    e = error;
    window.location.href = base_url + '/default.html';
  }

}).call(this);
