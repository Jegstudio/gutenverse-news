import { u } from 'gutenverse-core-frontend';

class GutenverseFeaturedGallery {
	constructor(element) {
		this.block = u(element);
		this.init();
	}

	init() {
		if (this.block.hasClass('gvnews_tns_active')) {
			return;
		}

		const tnsInit = window.tns;
		if (typeof tnsInit !== 'function') {
			return;
		}

		const settings = {
			container: this.block.first(),
			textDirection: document.dir === 'rtl' ? 'rtl' : 'ltr',
			controls: true,
			controlsText: ['', ''],
			nav: true,
			items: 1,
			mouseDrag: true,
			autoplay: false,
			autoplayTimeout: 3000,
			loop: false,
			onInit: (info) => {
				console.log({info});
				if (info.nextButton) {
					info.nextButton.setAttribute('aria-label', 'Next button');
					u(info.nextButton).addClass('tns-next');
					u(info.nextButton).html(`<i class="fas fa-chevron-right"></i>`);
				}
				if (info.prevButton) {
					info.prevButton.setAttribute('aria-label', 'Previous button');
					u(info.prevButton).addClass('tns-prev');
					u(info.prevButton).html(`<i class="fas fa-chevron-left"></i>`);
				}
			},
		};

		const slider = tnsInit(settings);

		if (slider && slider.events) {
			slider.events.on('dragStart', (info) => {
				if (info.event) {
					info.event.preventDefault();
					info.event.stopPropagation();
				}
			});

			this.block.addClass('gvnews_tns_active');
		}
	}
}

(() => {
	const selected = u('.featured_gallery');

	if (selected.length) {
		selected.map(element => {
			new GutenverseFeaturedGallery(element);
		});
	}

	window.gvnewsFeaturedGallery = (element) => {
		new GutenverseFeaturedGallery(element);
	};
})();

export default GutenverseFeaturedGallery;
