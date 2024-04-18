;(function () {
  'use strict'
  window.gvnews = window.gvnews || {}
  window.gvnews.hero = window.gvnews.hero || {}
  var isgvnewsLibrary = 'object' === typeof gvnews && 'object' === typeof gvnews.library,
    isTnsActive = 'function' === typeof gvnews.tns,
    debounceResize = false

  window.gvnews.hero = {
    action: function () {
      var base = this

      if (debounceResize) {
        base.gvnewsLibrary.cancelAnimationFrame.call(base.gvnewsLibrary.win, debounceResize)
      }
      debounceResize = base.gvnewsLibrary.requestAnimationFrame.call(base.gvnewsLibrary.win, function () {
        base.dispatch()
        base.heroSlider(base.container)
      })
    },
    init: function ($container) {
      var base = this
      base.gvnewsLibrary = isgvnewsLibrary ? gvnews.library : false
      if (base.gvnewsLibrary) {
        if ($container === undefined) {
          base.container = base.gvnewsLibrary.globalBody
        } else {
          base.container = $container
        }
        var events = {
          resize: base.action.bind(this),
        }
        base.gvnewsLibrary.winLoad(base.action.bind(this))
        base.gvnewsLibrary.docReady(base.action.bind(this))
        base.gvnewsLibrary.addEvents(base.gvnewsLibrary.win, events)
      }
    },
    dispatch: function () {
      var base = this
      base.gvnewsLibrary.forEach(base.container.getElementsByClassName('gvnews_heroblock'), function (ele, i) {
        var block = ele,
          wrapper = block.getElementsByClassName('gvnews_heroblock_wrapper'),
          scroller = block.getElementsByClassName('gvnews_heroblock_scroller'),
          items = block.getElementsByClassName('gvnews_post'),
          margin = block.dataset.margin

        if (base.gvnewsLibrary.windowWidth() > 667) {
          if (wrapper.length > 0) {
            base.gvnewsLibrary.forEach(wrapper, function (ele, i) {
              ele.style.marginLeft = '-' + margin + 'px'
              ele.style.marginBottom = '-' + margin + 'px'
              ele.style.marginRight = 0
              ele.style.marginTop = 0
            })
          }
          if (items.length > 0) {
            base.gvnewsLibrary.forEach(items, function (ele, i) {
              ele.style.padding = '0 0 ' + margin + 'px ' + margin + 'px '
            })
          }
        } else if (scroller.length > 0) {
          if (margin > 5) margin = 5 // reset all margin

          if (!base.gvnewsLibrary.hasClass(block, 'tiny-slider')) {
            base.gvnewsLibrary.forEach(scroller, function (ele, i) {
              ele.style.marginLeft = '-' + margin + 'px'
            })
          }

          if (wrapper.length > 0) {
            base.gvnewsLibrary.forEach(wrapper, function (ele, i) {
              ele.style.marginLeft = 0
              ele.style.marginBottom = 0
              ele.style.marginRight = 0
            })
          }

          if (items.length > 0) {
            base.gvnewsLibrary.forEach(items, function (ele, i) {
              if (base.gvnewsLibrary.getParents(ele, '.gvnews_heroblock_scroller').length > 0) {
                // Hero Slider
                if (base.gvnewsLibrary.hasClass(block, 'tiny-slider')) {
                  if (
                    (base.gvnewsLibrary.hasClass(block, 'gvnews_heroblock_1') && base.gvnewsLibrary.hasClass(ele, 'gvnews_hero_item_4')) ||
                    (base.gvnewsLibrary.hasClass(block, 'gvnews_heroblock_2') && (base.gvnewsLibrary.hasClass(ele, 'gvnews_hero_item_3') || base.gvnewsLibrary.hasClass(ele, 'gvnews_hero_item_5'))) ||
                    (base.gvnewsLibrary.hasClass(block, 'gvnews_heroblock_3') && (base.gvnewsLibrary.hasClass(ele, 'gvnews_hero_item_3') || base.gvnewsLibrary.hasClass(ele, 'gvnews_hero_item_4'))) ||
                    (base.gvnewsLibrary.hasClass(block, 'gvnews_heroblock_4') && base.gvnewsLibrary.hasClass(ele, 'gvnews_hero_item_3'))
                  ) {
                    ele.style.paddingLeft = margin + 'px'
                    ele.style.paddingBottom = margin + 'px'
                  } else {
                    ele.style.paddingLeft = 0
                    ele.style.paddingBottom = margin + 'px'
                  }
                } else {
                  ele.style.paddingLeft = margin + 'px'
                  ele.style.paddingBottom = 0
                }
              } else {
                ele.style.paddingLeft = 0
                ele.style.paddingBottom = margin + 'px'
              }
            })
          }
        }
      })
    },
    heroSlider: function (element) {
      if (isTnsActive) {
        var base = this,
          block_hero = element.querySelectorAll('.gvnews_heroblock.tiny-slider')
        if (block_hero.length > 0) {
          base.gvnewsLibrary.forEach(block_hero, function (ele, i) {
            var block = ele,
              autoplay = block.dataset.autoplay,
              delay = block.dataset.delay

            block = block.querySelectorAll('.gvnews_hero_wrapper:not(.gvnews_tns_active)')
            base.gvnewsLibrary.forEach(block, function (ele, i) {
              if (!base.gvnewsLibrary.hasClass(ele, 'gvnews_tns_active')) {
                var heroSlider = gvnews.tns({
                  container: ele,
                  textDirection: 'ltr',
                  items: 1,
                  controlsText: ['', ''],
                  controls: true,
                  nav: false,
                  loop: true,
                  autoplay: autoplay,
                  autoplayTimeout: delay,
                  mouseDrag: true,
                  onInit: function (info) {
                    if ('undefined' !== typeof info.nextButton) {
                      base.gvnewsLibrary.addClass(info.nextButton, 'tns-next')
                    }
                    if ('undefined' !== typeof info.prevButton) {
                      base.gvnewsLibrary.addClass(info.prevButton, 'tns-prev')
                    }
                  },
                })
                if ('undefined' !== typeof heroSlider) {
                  heroSlider.events.on('dragStart', function (info) {
                    info.event.preventDefault()
                    info.event.stopPropagation()
                  })
                  base.gvnewsLibrary.addClass(ele, 'gvnews_tns_active')
                  base.gvnewsLibrary.dataStorage.put(ele, 'tiny-slider', heroSlider)
                }
              }
            })
          })
        }
      }
    },
  }
})()
