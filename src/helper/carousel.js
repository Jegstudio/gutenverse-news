let gvnewsLibrary = window.gvnews;
gvnewsLibrary = gvnews.library;
var blockCarousel = document.getElementsByClassName('gvnews_postblock_carousel');
if (blockCarousel.length) {
    gvnewsLibrary.forEach(blockCarousel, function (ele, i) {
        gvnews.carousel({
            container: ele,
            textDirection: 'ltr',
            onInit: function (info) {
                if ('undefined' !== typeof info.nextButton) {
                    gvnewsLibrary.addClass(info.nextButton, 'tns-next');
                }
                if ('undefined' !== typeof info.prevButton) {
                    gvnewsLibrary.addClass(info.prevButton, 'tns-prev');
                }
            },
        });
    });
}