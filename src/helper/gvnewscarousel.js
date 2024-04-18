;(function () {
  'use strict'
  window.gvnews = window.gvnews || {}
  window.gvnews.carousel = window.gvnews.carousel || {}
  var gvnews_carousel = (function () {
    'use strict'
    var isGvnewsLibrary = 'object' === typeof gvnews && 'object' === typeof gvnews.library,
      isTnsActive = 'function' === typeof gvnews.tns
    if (isTnsActive && isGvnewsLibrary) {
      var gvnewsLibrary = gvnews.library,
        gvnews_carousel = function (options) {
          var wrapper = options.container
          if (!gvnewsLibrary.hasClass(wrapper, 'gvnews_tns_active')) {
            var container = wrapper.getElementsByClassName('gvnews_carousel_post')
            if (container.length) {
              options.container = container[0]
              var carouselType,
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
                      animateOut: 'tns-fadeOut',
                      autoHeight: true,
                      mouseDrag: true,
                      responsive: false,
                      edgePadding: 0,
                      lazyload: false,
                      lazyloadSelector: 'img',
                      mode: 'carousel',
                      speed: 300,
                      onInit: false,
                    }

                  jcarouselDefault.items = 'undefined' === typeof jcarouselDefault.container.dataset.items ? 3 : parseInt(jcarouselDefault.container.dataset.items)
                  jcarouselDefault.controls = 'undefined' === typeof jcarouselDefault.container.dataset.nav ? jcarouselDefault.controls : jcarouselDefault.container.dataset.nav
                  jcarouselDefault.autoplay = 'undefined' === typeof jcarouselDefault.container.dataset.autoplay ? jcarouselDefault.autoplay : jcarouselDefault.container.dataset.autoplay
                  jcarouselDefault.autoplayTimeout = 'undefined' === typeof jcarouselDefault.container.dataset.delay ? jcarouselDefault.autoplayTimeout : parseInt(jcarouselDefault.container.dataset.delay)
                  jcarouselDefault.gutter = 'undefined' === typeof jcarouselDefault.container.dataset.margin ? jcarouselDefault.gutter : parseInt(jcarouselDefault.container.dataset.margin)

                  // Bypass lazyload tinyslider.
                  jcarouselDefault.lazyload = 'undefined' === typeof jcarouselDefault.container.dataset.lazyload ? jcarouselDefault.lazyload : jcarouselDefault.container.dataset.lazyload
                  jcarouselDefault.lazyloadSelector = 'undefined' === typeof jcarouselDefault.container.dataset.lazyload ? jcarouselDefault.lazyloadSelector : 'imgs'

                  jcarouselDefault.textDirection ='ltr'

                  /*** Postblock Carousel 1 ***/
                  if (gvnewsLibrary.hasClass(wrapper, 'gvnews_postblock_carousel_1')) {
                    carouselType = 1
                    /* Fullwidth (column 12) */
                    if (gvnewsLibrary.hasClass(wrapper, 'gvnews_col_12')) {
                      jcarouselDefault.items = 'undefined' === typeof jcarouselDefault.container.dataset.items ? 5 : parseInt(jcarouselDefault.container.dataset.items)
                    }
                    jcarouselDefault.controlsPosition = 'bottom'
                    jcarouselDefault.responsive = {
                      0: { items: 1 },
                      321: { items: 2, gutter: jcarouselDefault.gutter > 15 ? 15 : jcarouselDefault.gutter },
                      568: { items: 3, gutter: jcarouselDefault.gutter > 15 ? 15 : jcarouselDefault.gutter },
                      1024: { items: jcarouselDefault.items },
                    }
                    return jcarouselDefault
                  }

                  /*** Postblock Carousel 2 ***/
                  if (gvnewsLibrary.hasClass(wrapper, 'gvnews_postblock_carousel_2')) {
                    carouselType = 2
                    jcarouselDefault.items = 'undefined' === typeof jcarouselDefault.container.dataset.items ? 3 : parseInt(jcarouselDefault.container.dataset.items)
                    jcarouselDefault.autoHeight = false
                    jcarouselDefault.responsive = {
                      0: { items: 1 },
                      568: { items: 2 },
                      768: { items: jcarouselDefault.items > 3 ? 3 : jcarouselDefault.items },
                      1024: { items: jcarouselDefault.items },
                    }
                    return jcarouselDefault
                  }

                  /*** Postblock Carousel 3 ***/
                  if (gvnewsLibrary.hasClass(wrapper, 'gvnews_postblock_carousel_3')) {
                    carouselType = 3
                    /* Fullwidth (column 12) */
                    if (gvnewsLibrary.hasClass(wrapper, 'gvnews_col_12')) {
                      jcarouselDefault.items = 'undefined' === typeof jcarouselDefault.container.dataset.items ? 3 : parseInt(jcarouselDefault.container.dataset.items)
                      jcarouselDefault.responsive = {
                        0: { items: 1 },
                        568: { items: 2 },
                        768: { items: jcarouselDefault.items > 3 ? 3 : jcarouselDefault.items },
                        1024: { items: jcarouselDefault.items },
                      }
                      /* Main content w/ sidebar (column 8) */
                    } else if (gvnewsLibrary.hasClass(wrapper, 'gvnews_col_6') || gvnewsLibrary.hasClass(wrapper, 'gvnews_col_7') || gvnewsLibrary.hasClass(wrapper, 'gvnews_col_8')) {
                      jcarouselDefault.items = 'undefined' === typeof jcarouselDefault.container.dataset.items ? 2 : parseInt(jcarouselDefault.container.dataset.items)
                      jcarouselDefault.responsive = {
                        0: { items: 1 },
                        568: { items: 2 },
                        1024: { items: jcarouselDefault.items > 2 ? 2 : jcarouselDefault.items },
                      }
                    } else {
                      jcarouselDefault.items = 1
                      jcarouselDefault.responsive = {
                        0: { items: 1 },
                        568: { items: 2 },
                        1024: { items: jcarouselDefault.items },
                      }
                    }
                    return jcarouselDefault
                  }

                  return jcarouselDefault
                })(options)
              options = gvnewsLibrary.extend(defaultOption, options || {})
              if (carouselType) {
                if (!gvnewsLibrary.hasClass(options.container, 'gvnews_tns_active')) {
                  var carouselSlider = gvnews.tns(options)
                  if ('undefined' !== typeof carouselSlider) {
                    carouselSlider.events.on('dragStart', function (info) {
                      info.event.preventDefault()
                      info.event.stopPropagation()
                    })
                    // Bypass lazyload tinyslider.
                    carouselSlider.events.on('indexChanged', function (info) {
                      if ( info.container ) {
                        gvnewsLibrary.forEach(info.container.querySelectorAll('.tns-slide-active .lazyloading'), function (ele, i) {
                          if ( lazySizes ) {
                            lazySizes.loader.unveil(ele);
                          }
                        })
                      }
                    })
                    gvnewsLibrary.addClass(options.container, 'gvnews_tns_active')
                    gvnewsLibrary.dataStorage.put(options.container, 'tiny-slider', carouselSlider)
                  }
                  return carouselSlider
                }
              }
            }
          }
        }
    } else {
      if (!isTnsActive) {
        console.warn('Tiny Slider could not be found')
      }
      if (!isGvnewsLibrary) {
        console.warn('GVNews Library could not be found')
      }
    }
    return gvnews_carousel
  })()
  window.gvnews.carousel = gvnews_carousel
})()
