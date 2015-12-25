// Generated by CoffeeScript 1.10.0
(function() {
  var _lang, _redirects, current_url, default_lang, e, error, htmlLang, html_dom, i, lang, len, locale, redirect_dom, redirect_to, redirects, ref, safe_redirect_to, userLang;

  default_lang = 'en';

  html_dom = document.querySelector('html');

  redirect_dom = document.querySelector('[auto-lang-redirect]');

  if (html_dom) {
    htmlLang = html_dom.getAttribute('lang');
  }

  if (redirect_dom) {
    _redirects = redirect_dom.getAttribute('auto-lang-redirect');
    try {
      redirects = JSON.parse(_redirects.replace(/'/g, '"'));
    } catch (error) {
      e = error;
      console.log(e);
      redirects = null;
    }
  }

  if (!htmlLang || !redirects) {
    return;
  }

  userLang = navigator.language || navigator.userLanguage || default_lang;

  locale = userLang.replace('-', '_');

  lang = locale.split('_')[0];

  ref = [userLang, locale, lang];
  for (i = 0, len = ref.length; i < len; i++) {
    _lang = ref[i];
    if (_lang === htmlLang) {
      redirect_to = null;
      break;
    } else {
      redirect_to = redirects[_lang];
      if (redirect_to) {
        break;
      }
    }
  }

  if (!redirect_to) {
    return;
  }

  current_url = location.protocol + '//' + location.host + location.pathname;

  safe_redirect_to = redirect_to.split('?')[0].split('#')[0];

  if (safe_redirect_to !== current_url) {
    window.location.replace(redirect_to);
    return;
  }

}).call(this);
