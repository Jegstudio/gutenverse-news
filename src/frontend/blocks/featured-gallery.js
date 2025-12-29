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
					u(info.nextButton).html('<div class="gutenverse-icon-svg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path></svg></div>');
				}
				if (info.prevButton) {
					info.prevButton.setAttribute('aria-label', 'Previous button');
					u(info.prevButton).addClass('tns-prev');
					u(info.prevButton).html('<div class="gutenverse-icon-svg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path></svg></div>');
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
