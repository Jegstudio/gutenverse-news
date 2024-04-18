var tns
;(function () {
  'use strict'
  window.gvnews = window.gvnews || {}
  window.gvnews.tns = window.gvnews.tns || {}
  if ('function' === typeof tns && 'function' !== typeof gvnews.tns) {
    window.gvnews.tns = tns
  }
  if ('function' !== typeof tns && 'function' === typeof gvnews.tns) {
    tns = gvnews.tns
  }
})()
