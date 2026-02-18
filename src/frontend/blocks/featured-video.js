import { u } from 'gutenverse-core-frontend';

class GutenverseFeaturedVideo {
    constructor(element) {
        this.block = u(element);
        this.init();
    }

    init() {
        const type = this.block.data('type');
        const src = this.block.data('src');
        const autoplay = this.block.data('autoplay') === true || this.block.data('autoplay') === 'true';
        const repeat = this.block.data('repeat') === true || this.block.data('repeat') === 'true';

        // Handle close button if present
        const closeButton = this.block.find('.floating_close');
        if (closeButton.length) {
            closeButton.on('click', (e) => {
                e.preventDefault();
                this.closeVideo();
            });
        }

        if (src) {
            switch (type) {
                case 'youtube':
                    this.renderYoutube(src, autoplay, repeat);
                    break;
                case 'vimeo':
                    this.renderVimeo(src, autoplay, repeat);
                    break;
                case 'dailymotion':
                    this.renderDailymotion(src, autoplay);
                    break;
                case 'soundcloud':
                    this.renderSoundcloud(src);
                    break;
            }
        }
    }

    closeVideo() {
        this.block.find('.gvnews_video_container').html('');
    }

    parseYoutube(url) {
        const regExp = /^.*(?:(?:youtu.be\/)|(?:v\/)|(?:\/u\/\w\/)|(?:embed\/)|(?:watch\?))\??&?v?=?([^#\&\?]*).*/;
        const match = url.match(regExp);

        if (match && match[1].length === 11) {
            return match[1];
        }
        return false;
    }

    parseVimeo(url) {
        const regExp = /(?:(http|https)\:\/\/)(?:(?:www|player)\.)?vimeo\.com(?:\/(?:video\/(\d+)(?:$|\/))|(?:\/(\d+)(?:$|\/)))/;
        let match = url.match(regExp);

        if (match) {
            return match[2] || match[3];
        }
        return false;
    }

    parseDailymotion(url) {
        const regExp = /(?:dailymotion\.com(?:\/video|\/hub)|dai\.ly)\/([0-9a-z]+)(?:[\-_0-9a-zA-Z]+#video=([a-z0-9]+))?/;
        const match = url.match(regExp);

        if (match) {
            return match[2] ? match[2] : match[1];
        }
        return false;
    }

    renderYoutube(url, autoplay, repeat) {
        const videoId = this.parseYoutube(url);
        if (!videoId) return;

        let srcUrl;
        try {
            srcUrl = new URL(url);
        } catch (e) {
            return; // Invalid URL
        }

        let additionalString = '';
        let iframe = '';

        const start = srcUrl.searchParams.get('start');
        const end = srcUrl.searchParams.get('end');

        if (start) additionalString += `start=${start}&`;
        if (end) additionalString += `end=${end}&`;

        if (repeat) {
            additionalString += (autoplay) ? 'autoplay=1&' : '';
            additionalString += `loop=1&playlist=${videoId}`;
            iframe = `<iframe width="700" height="500" src="//www.youtube.com/v/${videoId}?version=3&${additionalString}showinfo=0&theme=light&autohide=1&rel=0&wmode=opaque" frameborder="0" allowfullscreen></iframe>`;
        } else {
            additionalString += (autoplay) ? 'autoplay=1&' : '';
            iframe = `<iframe width="700" height="500" src="//www.youtube.com/embed/${videoId}?${additionalString}showinfo=0&theme=light&autohide=1&rel=0&wmode=opaque" frameborder="0" allowfullscreen></iframe>`;
        }

        this.block.find('.gvnews_video_container').append(iframe);
    }

    renderVimeo(url, autoplay, repeat) {
        const videoId = this.parseVimeo(url);
        if (!videoId) return;

        let additionalString = '';
        additionalString += (autoplay) ? 'autoplay=1&' : '';
        additionalString += (repeat) ? 'loop=1&' : '';

        const iframe = `<iframe src="//player.vimeo.com/video/${videoId}?${additionalString}title=0&byline=0&portrait=0" width="700" height="500" frameborder="0" mozallowfullscreen webkitallowfullscreen allowfullscreen></iframe>`;
        this.block.find('.gvnews_video_container').append(iframe);
    }

    renderDailymotion(url, autoplay) {
        const videoId = this.parseDailymotion(url);
        if (!videoId) return;

        let additionalString = '';
        additionalString += (autoplay) ? 'autoplay=1&' : '';

        const iframe = `<iframe src="//www.dailymotion.com/embed/video/${videoId}?${additionalString}ui-start-screen-info=0&ui-theme=light&queue-autoplay-next=0&queue-enable=0&sharing-enable=0&ui-logo=0" width="700" height="500" frameborder="0" mozallowfullscreen webkitallowfullscreen allowfullscreen></iframe>`;
        this.block.find('.gvnews_video_container').append(iframe);
    }

    renderSoundcloud(url) {
        const iframe = `<iframe src="https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}" width="700" height="500" frameborder="0"></iframe>`;
        this.block.find('.gvnews_video_container').append(iframe);
    }
}

(() => {
    const selected = u('.gvnews_featured.featured_video [data-type]');

    if (selected.length) {
        selected.map(element => {
            new GutenverseFeaturedVideo(element);
        });
    }

    window.gvnewsFeaturedVideo = (element) => {
        new GutenverseFeaturedVideo(element);
    };
})();

export default GutenverseFeaturedVideo;

