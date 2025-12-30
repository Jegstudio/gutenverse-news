import { __ } from '@wordpress/i18n';
import { SelectControl, CheckboxControl, RangeControl, TextControl, GradientWithAngleControl, BackgroundControl, ColorControl } from 'gutenverse-core/controls';

export const sliderPanel = (props) => {
    const {
        autoplay,
        metaDateFormat,
        overlayOption,
        isOverrideOverlay,
    } = props;
    return [
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
        {
            id: 'overlayOption',
            label: __('Overlay Option', 'gutenverse-news'),
            description: __('Choose which date format you want to use.', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    label: __('Gradient Overlay', 'gutenverse-news'),
                    value: 'gradient'
                },
                {
                    label: __('Normal Overlay', 'gutenverse-news'),
                    value: 'normal'
                },
                {
                    label: __('No Overlay', 'gutenverse-news'),
                    value: 'no'
                },
            ],
        },
        {
            id: 'isOverrideOverlay', // just for gradient type
            show: overlayOption === 'gradient',
            component: CheckboxControl,
            label: __('Override Overlay Color', 'gutenverse-news'),
        },
        {
            id: 'overrideOverlay',
            show: isOverrideOverlay && overlayOption === 'gradient',
            component: GradientWithAngleControl,
        },
        {
            id: 'normalOverlay',
            label: __('Normal Overlay Color', 'gutenverse-news'),
            show: overlayOption === 'normal',
            component: ColorControl,
        },
    ];
};