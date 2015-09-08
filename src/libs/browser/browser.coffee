# -------------------------------
# Browser Detector
# Version:  0.0.1
# -------------------------------
is_exports = typeof exports isnt "undefined" and exports isnt null
root = if is_exports then exports else this

unless root.sup
  root.sup = {}
  
mobile_list = [
  {pattern:/Android/i, name:'Android', alias:'android'}
  {pattern:/webOS/i, name:'webOS', alias:'webos'}
  {pattern:/iPhone/i, name:'iPhone', alias:'iphone'}
  {pattern:/iPad/i, name:'iPad', alias:'ipad'}
  {pattern:/iPod/i, name:'iPod', alias:'ipod'}
  {pattern:/BlackBerry/i, name:'BlackBerry', alias:'blackberry'}
  {pattern:/Windows Phone/i, name:'WindowsPhone', alias:'wp'}
]  

modern_browsers = ['chrome','opera','safari','firefox','msie']

black_list = 
  android: ['UCBrowser', 'Opera', 'SougouMobile', 'DolphineBrowser',
            'MQQBrowser', 'Baidu']
  ios: ['SougouMobile']

mobile = do ->
  for m in mobile_list
    if navigator.userAgent.match(m.pattern)
      return m
  return null
  
browser = do ->
  ua = navigator.userAgent
  tem = undefined
  M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)
  if not M
    M = []

  if /trident/i.test(M[1])
    tem = /\brv[ :]+(\d+)/g.exec(ua) or []
    return "IE " + (tem[1] or "")
  if M[1] is "Chrome"
    tem = ua.match(/\bOPR\/(\d+)/)
    return "Opera " + tem[1]  if tem?
  
  if M[2]
    M = [ M[1],M[2] ] 
  else 
    M = [ navigator.appName, navigator.appVersion, "-?" ]
  
  M.splice 1, 1, tem[1]  if (tem = ua.match(/version\/(\d+)/i))?
  M.join " "
  
  browser = 
    alias: if typeof(M[0]) is 'string' then M[0].toLowerCase() else null
    name: M[0]
    ver: M[1]
    mobile: mobile

  return browser

# test if modern browser
is_modern_browser = true

unless browser.alias in modern_browsers
  is_modern_browser = false

if browser.alias is 'msie' and parseInt(browser.ver) < 10
  is_modern_browser = false

if navigator.userAgent.indexOf('Mobile') > -1
  is_modern_browser = true

# except for some mobile browsers
if browser.mobile
  _black_list = black_list[browser.mobile.alias] or []
  for blackbrowser in _black_list
    if navigator.userAgent.indexOf(blackbrowser) > -1
      is_modern_browser = false
      break

browser.is_modern_browser = is_modern_browser

console.log 'Detect browser: ', browser

# make it global, pass to other frameworks.
root.sup.browser = browser

# process test
if document.querySelector('[modern-browser-tester]')
  body = document.body
  return if not body
  modern = if browser.is_modern_browser then 'Modern' else 'Old'
  mobile_name = if browser.mobile then browser.mobile.name else '-'
  body.innerHTML = '<h1>'+browser.name+' '+browser.ver+' '+
  mobile_name+' '+
  modern+' '+
  '</h1>'+
  '<p>appName: '+navigator.appName+'</p>'+
  '<p>appVersion: '+navigator.appVersion+'</p>'+
  '<small>&lt; '+navigator.userAgent+' &gt;</small>'
  return

# process html
if not document.querySelector('[modern-browser]')
  return

if not is_modern_browser
  html = document.documentElement
  return if not html
  
  for child in html.childNodes
    html.removeChild(child)
  
  console.log html
  
  head = document.createElement("HEAD")
  head_html = ''+
  '<title>Old Browser</title>'+
  '<link href="http://libs.soopro.com/browser/browser.css" '+
  'rel="stylesheet">'
  console.log head
  head.innerHTML = head_html
  console.log head
  console.log html.appendChild
  html.appendChild(head)

  body = document.createElement("BODY")
  
  body_html = ''+

  '<div id="wrapper">'+
  ' <div id="logo">'+
  '   <img src="http://libs.soopro.com/brand/logo.png" alt="Soopro"/>'+
  ' </div>'+
  ' <div class="content">'+
  '   <p>'+
  '     Your browser is too old. Hope you can change more'+
  '     reliable web browser.'+
  '   <br>We recommend you choose better browser following:</p>'+
  '   <p>您的浏览器老掉牙了，希望您能紧跟时代立刻升级。'+
  '   <br>推荐你选择使用以下浏览器：</p>'+
  ' </div>'+
  ' <div class="browsers">'+
  '   <div class="browser">'+
  '     <a href="http://www.firefox.com" target="_blank">'+
  '       <img src="http://libs.soopro.com/browser/browser_firefox.png" '+
  '        alt="Firefox"/>'+
  '     </a>'+
  '   </div>'+
  '   <div class="browser">'+
  '     <a href="http://www.chrome.com" target="_blank">'+
  '       <img src="http://libs.soopro.com/browser/browser_chrome.png" '+
  '        alt="Chrome"/>'+
  '     </a>'+
  '   </div>'+
  '   <div class="browser">'+
  '     <a href="http://support.apple.com/downloads/#safari" target="_blank">'+
  '       <img src="http://libs.soopro.com/browser/browser_safari.png" '+
  '        alt="Safari"/>'+
  '     </a>'+
  '   </div>'+
  '   <div class="browser">'+
  '     <a href="http://www.opera.com/" target="_blank">'+
  '       <img src="http://libs.soopro.com/browser/browser_opera.png" '+
  '        alt="Opera"/>'+
  '     </a>'+
  '   </div>'+
  ' </div>'+
  ' <div class="copyright">'+
  '   <small>&copy; Soopro Co.,ltd.</small>'+
  ' </div>'+
  '</div>'
  body.innerHTML = body_html
  html.appendChild(body)
  