import { u } from 'gutenverse-core-frontend';

const applyNavigationIcons = () => {
    const sliders = u('.gvnews_slider_wrapper[data-navigation-icon]');
    
    sliders.each((slider) => {
        const navigations = u(slider).find('.tns-outer .tns-controls');

        if (!navigations.length) {
            return;
        }
        
        const dataSet = JSON.parse(slider.getAttribute('data-navigation-icon'));
        const nextButton = u(navigations).find('.tns-next');
        
        if (nextButton.length) {
            const classNext = dataSet.classNext ? dataSet.classNext : 'fas fa-chevron-right';
            nextButton.nodes[0].innerHTML = `<i class="${classNext}"></i>`;
        }
        
        const prevButton = u(navigations).find('.tns-prev');
        
        if (prevButton.length) {
            const classPrev = dataSet.setclassPrev ? dataSet.setclassPrev : 'fas fa-chevron-left';
            prevButton.nodes[0].innerHTML = `<i class="${classPrev}"></i>`;
        }
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(applyNavigationIcons, 200);
    });
} else {
    setTimeout(applyNavigationIcons, 200);
}