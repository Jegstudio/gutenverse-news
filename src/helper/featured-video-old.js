(function ($) {
    /** Multimedia Embed **/
    $.youtube_parser = function (url) {
        var regExp = /^.*(?:(?:youtu.be\/)|(?:v\/)|(?:\/u\/\w\/)|(?:embed\/)|(?:watch\?))\??&?v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);

        if (match && match[1].length === 11) {
            return match[1];
        }
        /*jshint latedef: true */
        window.alert('Url Incorrect');
    };

    $.vimeo_parser = function (url) {
        var regExp = /(?:(http|https)\:\/\/)(?:(?:www|player)\.)?vimeo\.com(?:\/(?:video\/(\d+)(?:$|\/))|(?:\/(\d+)(?:$|\/)))/;
        var match = url.match(regExp);

        if (match) {
            match = match[2] || match[3];
            return match;
        }

        /* jshint latedef: true */
        window.alert('not a vimeo url');
    };

    $.dailymotion_parser = function (url) {
        var regExp = /(?:dailymotion\.com(?:\/video|\/hub)|dai\.ly)\/([0-9a-z]+)(?:[\-_0-9a-zA-Z]+#video=([a-z0-9]+))?/;
        var match = url.match(regExp);

        if (match) {
            return match[2] ? match[2] : match[1];
        }
        /*jshint latedef: true */
        window.alert('not a dailymotion url');
    };

    $.type_video_youtube = function (ele, autoplay, repeat) {
        var src = new URL($(ele).attr('data-src'));
        var youtube_id = $.youtube_parser(src.toString());
        var additionalstring = '';
        var iframe = '';
        additionalstring += (src.searchParams.get('start')) ? 'start=' + src.searchParams.get('start') + '&' : '';
        additionalstring += (src.searchParams.get('end')) ? 'end=' + src.searchParams.get('end') + '&' : '';
        if (repeat) {
            additionalstring += (autoplay === true) ? 'autoplay=1&' : '';
            additionalstring += (repeat === true) ? 'loop=1&playlist=' + youtube_id : '';
            iframe = '<iframe width="700" height="500" src="//www.youtube.com/v/' + youtube_id + '?version=3&' +
                additionalstring +
                'showinfo=0&theme=light&autohide=1&rel=0&wmode=opaque" frameborder="0" allowfullscreen></iframe>';
        } else {
            additionalstring += (autoplay === true) ? 'autoplay=1&' : '';
            iframe = '<iframe width="700" height="500" src="//www.youtube.com/embed/' + youtube_id + '?' + additionalstring +
                'showinfo=0&theme=light&autohide=1&rel=0&wmode=opaque" frameborder="0" allowfullscreen></iframe>';
        }

        $('.gvnews_video_container', ele).append(iframe);
    };

    $.type_video_vimeo = function (ele, autoplay, repeat) {
        var vimeo_id = $.vimeo_parser($(ele).attr('data-src'));
        var additionalstring = '';
        additionalstring += (autoplay === true) ? 'autoplay=1&' : '';
        additionalstring += (repeat === true) ? 'loop=1&' : '';
        var iframe = '<iframe src="//player.vimeo.com/video/' + vimeo_id + '?' + additionalstring +
            'title=0&byline=0&portrait=0" width="700" height="500" frameborder="0" mozallowfullscreen webkitallowfullscreen allowfullscreen></iframe>';
        $('.gvnews_video_container', ele).append(iframe);
    };

    $.type_video_dailymotion = function (ele, autoplay) {
        var dailymotion_id = $.dailymotion_parser($(ele).attr('data-src'));
        var additionalstring = '';
        additionalstring += (autoplay === true) ? 'autoplay=1&' : '';
        var iframe = '<iframe src="//www.dailymotion.com/embed/video/' + dailymotion_id + '?' + additionalstring +
            'ui-start-screen-info=0&ui-theme=light&queue-autoplay-next=0&queue-enable=0&sharing-enable=0&ui-logo=0" width="700" height="500" frameborder="0" mozallowfullscreen webkitallowfullscreen allowfullscreen></iframe>';
        $('.gvnews_video_container', ele).append(iframe);
    };

    $.type_soundcloud = function (ele) {
        var soundcloudurl = $(ele).attr('data-src');
        var iframe = '<iframe src="https://w.soundcloud.com/player/?url=' + encodeURIComponent(soundcloudurl) +
            '" width="700" height="500" frameborder="0"></iframe>';
        $('.gvnews_video_container', ele).append(iframe);
    };

    $.type_audio = function (ele) {
        var musicmp3 = '';
        var musicogg = '';

        if ($(ele).data('mp3') !== '') {
            musicmp3 = '<source type=\'audio/mpeg\' src=\'' + $(ele).data('mp3') + '\' />';
        }

        if ($(ele).data('ogg') !== '') {
            musicogg = '<source type=\'audio/ogg\' src=\'' + $(ele).data('ogg') + '\' />';
        }

        var audio =
            '<audio preload=\'none\' style=\'width: 100%; visibility: hidden;\' controls=\'controls\'>' +
            musicmp3 + musicogg +
            '</audio>';

        $(ele).append(audio);

        var settings = {};

        if (typeof _wpmejsSettings !== 'undefined') {
            settings = _wpmejsSettings;
        }

        settings.success = function (mejs) {
            var autoplay, loop;

            if ('flash' === mejs.pluginType) {
                autoplay = mejs.attributes.autoplay && 'false' !== mejs.attributes.autoplay;
                loop = mejs.attributes.loop && 'false' !== mejs.attributes.loop;

                autoplay && mejs.addEventListener('canplay', function () {
                    mejs.play();
                }, false);

                loop && mejs.addEventListener('ended', function () {
                    mejs.play();
                }, false);
            }
        };

        $(ele).find('audio').mediaelementplayer(settings);
    };

    $.type_video_html5 = function (ele, autoplay, options, container) {
        var cover = $(ele).data('cover');

        options.pauseOtherPlayers = false;

        var videomp4 = '';
        var videowebm = '';
        var videoogg = '';
        var themesurl = '';

        if ($(ele).data('mp4') !== '') {
            videomp4 = '<source type=\'video/mp4\' src=\'' + $(ele).data('mp4') + '\' />';
        }

        if ($(ele).data('webm') !== '') {
            videowebm = '<source type=\'video/webm\' src=\'' + $(ele).data('webm') + '\' />';
        }

        if ($(ele).data('ogg') !== '') {
            videoogg = '<source type=\'video/ogg\' src=\'' + $(ele).data('ogg') + '\' />';
        }

        var preload = autoplay ? 'preload=\'auto\'' : 'preload=\'none\'';
        var object = '<object width=\'100%\' height=\'100%\' type=\'application/x-shockwave-flash\' data=\'' + themesurl +
            '/public/mediaelementjs/flashmediaelement.swf\'>' +
            '<param name=\'movie\' value=\'' + themesurl + '/public/mediaelementjs/flashmediaelement.swf\' />' +
            '<param name=\'flashvars\' value=\'controls=true&file=' + $(ele).data('mp4') + '\' />' +
            '<img src=\'' + cover + '\' alt=\'No video playback capabilities\' title=\'No video playback capabilities\' />' +
            '</object>';
        var iframe = '<video id=\'player\' style=\'width:100%;height:100%;\' width=\'100%\' height=\'100%\' poster=\'' +
            cover +
            '\' controls=\'controls\' ' + preload + '>' +
            videomp4 + videowebm + videoogg + object +
            '</video>';

        $(container, ele).append(iframe);
        if (autoplay) {
            options.success = function (mediaElement) {
                if (mediaElement.pluginType === 'flash') {
                    mediaElement.addEventListener('canplay', function () {
                        mediaElement.play();
                    }, false);
                } else {
                    mediaElement.play();
                }
            };
        }

        $(ele).find('video').mediaelementplayer(options);
    };

    function not_elementor_bg_video(element) {
        return $(element).parents('.elementor-background-video-container');
    }

    $.do_media_render = function () {
        const container = $('body').find('.gvnews_featured.featured_video');
        // youtube
        if ($(container).find('[data-type=\'youtube\']').length) {
            $(container).find('[data-type=\'youtube\']').each(function () {
                var autoplay = $(this).data('autoplay');
                var repeat = $(this).data('repeat');
                $.type_video_youtube($(this), autoplay, repeat);
            });
        }

        // vimeo
        if ($(container).find('[data-type=\'vimeo\']').length) {
            $(container).find('[data-type=\'vimeo\']').each(function () {
                var autoplay = $(this).data('autoplay');
                var repeat = $(this).data('repeat');
                $.type_video_vimeo($(this), autoplay, repeat);
            });
        }

        // dailymotion
        if ($(container).find('[data-type=\'dailymotion\']').length) {
            $(container).find('[data-type=\'dailymotion\']').each(function () {
                var autoplay = $(this).data('autoplay');
                $.type_video_dailymotion($(this), autoplay);
            });
        }

        // sound cloud
        if ($(container).find('[data-type=\'soundcloud\']').length) {
            $(container).find('[data-type=\'soundcloud\']').each(function () {
                $.type_soundcloud($(this));
            });
        }

        // audio
        if ($(container).find('[data-type=\'audio\']').length) {
            $(container).find('[data-type=\'audio\']').each(function () {
                $.type_audio($(this));
            });
        }

        // html 5 video
        if ($(container).find('video').length) {
            $(container).find('video').each(function () {
                if (!not_elementor_bg_video(this)) {
                    $(this).mediaelementplayer();
                }
            });
        }
    };
    $.do_media_render($);
})(jQuery);
