(async function () {
    const waitWindow = () => {
        return new Promise((resolver) => setTimeout(resolver, 100));
    };
    const determineLocation = () => {
        const { wp } = window;

        if (wp.editSite) {
            return 'editor';
        }

        if (wp.editPost) {
            return 'post';
        }

        if (wp.editWidgets) {
            return 'widget';
        }

        return undefined;
    };
    await waitWindow();

    if (['editor', 'post', 'widget'].includes(determineLocation())) { // This script only run on frontend
        return;
    }

    const sliders = document.querySelectorAll('.gvnews_slider_wrapper[data-navigation-icon]');
    sliders.forEach((slider) => {
        const navigations = slider.querySelector('.tns-outer .tns-controls');

        if (!navigations) {
            return;
        }
        const dataSet = JSON.parse(slider.getAttribute('data-navigation-icon'));
        const nextButton = navigations.querySelector('.tns-next');
        if (nextButton) {
            const classNext = dataSet.classNext? dataSet.classNext : 'fas fa-chevron-right';
            nextButton.innerHTML = `<i class="${classNext}"></i>`;
        }
        const prevButton = navigations.querySelector('.tns-prev');
        if (prevButton) {
            const setclassPrev = dataSet.setclassPrev? dataSet.setclassPrev : 'fas fa-chevron-left';
            prevButton.innerHTML = `<i class="${setclassPrev}"></i>`;
        }
    });
})();