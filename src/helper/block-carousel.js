;(function ($) {
  'use strict'
  window.gvnews = window.gvnews || {}
  window.gvnews.video = window.gvnews.video || {}
  window.gvnews.video.carousel = window.gvnews.video.carousel || {}
  var gvnews_video_block_carousel = (function () {
    'use strict'
    var isGvnewsLibrary = 'object' === typeof gvnews && 'object' === typeof gvnews.library,
      isTnsActive = 'function' === typeof gvnews.tns
    if (isTnsActive && isGvnewsLibrary) {
      var gvnewsLibrary = gvnews.library,
        setNavCenter = function (element, wrapper) {
          var slider_nav = wrapper.querySelectorAll('.tns-controls button')
          if (slider_nav.length) {
            var thumb = element.getElementsByClassName('thumbnail-container')
            if (thumb.length) {
              var thumb_height = thumb[0].getBoundingClientRect().height
              gvnewsLibrary.forEach(slider_nav, function (ele, i) {
                var nav_height = ele.getBoundingClientRect().height,
                  top = thumb_height * 0.5 - nav_height * 0.5

                ele.style.top = top + 'px'
              })
            }
          }
        },
        gvnews_video_block_carousel = function (options) {
          var wrapper = options.container
          if (!gvnewsLibrary.hasClass(wrapper, 'gvnews_tns_active')) {
            var container = wrapper.getElementsByClassName('gvnews_carousel_post')
            if (container.length) {
              options.container = container[0]
              var blockCarouselType,
                defaultOption = (function (options) {
                  var jcarouselDefault = {
                      textDirection: 'ltr',
                      container: options.container,
                      controls: false,
                      gutter: 20,
                      controlsText: ['', ''],
                      nav: false,
                      loop: true,
                      items: 3,
                      autoplay: false,
                      autoplayTimeout: 3000,
                      center: false,
                      animateOut: 'tns-fadeOut',
                      autoHeight: false,
                      mouseDrag: true,
                      responsive: false,
                      edgePadding: 0,
                      lazyload: false,
                      lazyloadSelector: 'img',
                      mode: 'carousel',
                      speed: 300,
                      onInit: false,
                      sliderStyle: 'slider_1',
                      prevVideo: false,
                    }

                  jcarouselDefault.controls = 'undefined' === typeof jcarouselDefault.container.dataset.nav ? jcarouselDefault.controls : jcarouselDefault.container.dataset.nav
                  jcarouselDefault.autoplay = 'undefined' === typeof jcarouselDefault.container.dataset.autoplay ? jcarouselDefault.autoplay : jcarouselDefault.container.dataset.autoplay
                  jcarouselDefault.autoplayTimeout = 'undefined' === typeof jcarouselDefault.container.dataset.delay ? jcarouselDefault.autoplayTimeout : parseInt(jcarouselDefault.container.dataset.delay)
                  jcarouselDefault.items = 'undefined' === typeof jcarouselDefault.container.dataset.items ? jcarouselDefault.items : parseInt(jcarouselDefault.container.dataset.items)
                  jcarouselDefault.gutter = 'undefined' === typeof jcarouselDefault.container.dataset.margin ? jcarouselDefault.gutter : parseInt(jcarouselDefault.container.dataset.margin)
                  jcarouselDefault.center = 'undefined' === typeof jcarouselDefault.container.dataset.center ? jcarouselDefault.center : jcarouselDefault.container.dataset.center
                  jcarouselDefault.edgePadding = 'undefined' === typeof jcarouselDefault.container.dataset.stagepadding ? jcarouselDefault.edgePadding : jcarouselDefault.container.dataset.stagepadding
                  jcarouselDefault.sliderStyle = 'undefined' === typeof jcarouselDefault.container.dataset.sliderstyle ? jcarouselDefault.sliderStyle : jcarouselDefault.container.dataset.sliderstyle
                  jcarouselDefault.prevVideo = 'undefined' === typeof jcarouselDefault.container.dataset.preview ? jcarouselDefault.prevVideo : jcarouselDefault.container.dataset.preview

                  if ('false' === jcarouselDefault.center) {
                    jcarouselDefault.center = false
                  }

                  if ('true' === jcarouselDefault.center) {
                    jcarouselDefault.center = true
                  }

                  jcarouselDefault.textDirection = 'ltr'

                  /* Fullwidth (column 12) */
                  if (gvnewsLibrary.hasClass(wrapper, 'gvnews_col_12')) {
                    jcarouselDefault.items = 'undefined' === typeof jcarouselDefault.container.dataset.items ? 5 : parseInt(jcarouselDefault.container.dataset.items)
                  }

                  jcarouselDefault.responsive = {
                    0: { items: 1, edgePadding: 0 },
                    321: {
                      items: 1,
                      gutter: jcarouselDefault.gutter > 15 ? 15 : jcarouselDefault.gutter,
                      edgePadding: jcarouselDefault.edgePadding > 0 ? 30 : 0,
                    },
                    568: {
                      items: 2,
                      gutter: jcarouselDefault.gutter > 15 ? 15 : jcarouselDefault.gutter,
                      edgePadding: jcarouselDefault.edgePadding > 0 ? 50 : 0,
                    },
                    1024: {
                      items: jcarouselDefault.items,
                      edgePadding: jcarouselDefault.edgePadding > 0 ? jcarouselDefault.edgePadding : 0,
                    },
                  }

                  jcarouselDefault.onInit = function () {
                    if (jcarouselDefault.sliderStyle == 'slider_4') {
                      setNavCenter(jcarouselDefault.container, wrapper)
                    }
                  }

                  return jcarouselDefault
                })(options)
              if ('undefined' !== typeof options.onInit) {
                var onInitDefault = defaultOption.onInit
                var onInit = options.onInit
                options.onInit = function (info) {
                  onInit(info)
                  onInitDefault(info)
                    if (options.prevVideo === 'yes')
                    $(options.container).data('video').injectEvent()
                }
              }
              options = gvnewsLibrary.extend(defaultOption, options || {})
              if (!gvnewsLibrary.hasClass(options.container, 'gvnews_tns_active')) {
                if (options.items > options.container.children.length) {
                  options.items = options.container.children.length - 1 > 1 ? options.container.children.length - 1 : 1
                }
                var blockCarouselSlider = gvnews.tns(options)
                if ('undefined' !== typeof blockCarouselSlider) {
                  blockCarouselSlider.events.on('dragStart', function (info) {
                    info.event.preventDefault()
                    info.event.stopPropagation()
                  })
                  gvnewsLibrary.addClass(options.container, 'gvnews_tns_active')
                  gvnewsLibrary.dataStorage.put(options.container, 'tiny-slider', blockCarouselSlider)
                }
                return blockCarouselSlider
              }
            }
          }
        }
      return gvnews_video_block_carousel
    } else {
      if (!isTnsActive) {
        console.warn('Tiny Slider could not be found')
      }
      if (!isGvnewsLibrary) {
        console.warn('GVNews Library could not be found')
      }
    }
  })()
  window.gvnews.video.carousel = gvnews_video_block_carousel
})(jQuery)
