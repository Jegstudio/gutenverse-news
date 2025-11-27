import { __ } from '@wordpress/i18n';
import { CheckboxControl, RangeControl } from 'gutenverse-core/controls';

export const sliderPanel = (props) => {
    const {
        autoplay,
    } = props;
    return [
        {
            id: 'ncolumn',
            label: __('Number of Column', 'gutenverse-news'),
            component: RangeControl,
            min: 1,
            max: 5,
            step: 1,
        },
        {
            id: 'autoplay',
            label: __('Enable Autoplay', 'gutenverse-news'),
            component: CheckboxControl
        },
        {
            id: 'autoplayDelay',
            label: __('Autoplay Delay', 'gutenverse-news'),
            show: autoplay,
            component: RangeControl,
            min: 1000,
            max: 10000,
            step: 500,
        },
        {
            id: 'normalImage',
            label: __('Use Normal Image Load', 'gutenverse-news'),
            description: __('Force it to use normal load image and optimize Largest Contentful Paint (LCP) when using this element at the top of your site.', 'gutenverse-news'),
            component: CheckboxControl
        },
    ];
};