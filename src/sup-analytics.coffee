###
Sup Analytics

Author : Redy Ru
Email : redy.ru@gmail.com
License : 2014 MIT
Version 1.0.0

---- Usage ----
	load on front page.
###

supAnalytics = ->
  'use strict'
  if !window['sa']
    return
  sa = undefined
  xmlhttp = undefined
  sa = window['sa']
  if !sa.id or !sa.api
    return
  api = sa.api + '/app/' + sa.id + '/visit'
  if window.XMLHttpRequest
    # code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest
  else
    # code for IE6, IE5
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
  xmlhttp.open 'GET', api, true
  xmlhttp.send()
  return