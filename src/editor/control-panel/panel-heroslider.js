import { __ } from '@wordpress/i18n';
import { RangeControl, CheckboxControl } from 'gutenverse-core/controls';

export const sliderHero = (props) => {
    const {
        enableslider,
        autoplay,
    } = props;
    return [
        {
            id: 'enableslider',
            label: __('Hero Slider', 'gutenverse-news'),
            component: CheckboxControl
        },
        {
            id: 'autoplay',
            show: enableslider,
            label: __('Enable Autoplay', 'gutenverse-news'),
            component: CheckboxControl
        },
        {
            id: 'autoplayDelay',
            label: __('Autoplay Delay', 'gutenverse-news'),
            show: enableslider && autoplay,
            component: RangeControl,
            min: 1000,
            max: 10000,
            step: 500,
        },
        {
            id: 'sliderItem',
            show: enableslider,
            label: __('Slider Item', 'gutenverse-news'),
            component: RangeControl,
            min: 1,
            max: 10,
            step: 1,
        },
    ];
};