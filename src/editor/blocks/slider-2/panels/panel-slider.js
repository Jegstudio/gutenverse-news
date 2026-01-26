import { __ } from '@wordpress/i18n';
import { SelectControl, CheckboxControl, RangeControl, GradientWithAngleControl, BackgroundControl, ColorControl } from 'gutenverse-core/controls';

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
            label: __('Load Image Immediately', 'gutenverse-news'),
            description: __('enable this option to load image on this block immediately and optimize Largest Contentful Paint (LCP) if this block is at the top of your site.', 'gutenverse-news'),
            component: CheckboxControl
        },
        {
            id: 'postTitleHtmlTag',
            label: __('Post Title HTML Tag', 'gutenverse-news'),
            description: __('Choose HTML tag for the post title.', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    label: __('H1', 'gutenverse-news'),
                    value: 'h1'
                },
                {
                    label: __('H2', 'gutenverse-news'),
                    value: 'h2'
                },
                {
                    label: __('H3', 'gutenverse-news'),
                    value: 'h3'
                },
                {
                    label: __('H4', 'gutenverse-news'),
                    value: 'h4'
                },
                {
                    label: __('H5', 'gutenverse-news'),
                    value: 'h5'
                },
                {
                    label: __('H6', 'gutenverse-news'),
                    value: 'h6'
                },
            ],
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