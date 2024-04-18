let gvnewsLibrary = window.gvnews;
gvnewsLibrary = gvnews.library;
var slider = document.querySelectorAll('.gvnews_slider_wrapper .gvnews_slider');
if (slider.length) {
    gvnewsLibrary.forEach(slider, function (ele, i) {
        gvnews.slider({
            container: ele,
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