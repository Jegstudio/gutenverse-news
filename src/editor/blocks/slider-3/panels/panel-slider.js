import { __ } from '@wordpress/i18n';
import { CheckboxControl, RangeControl, SelectControl, IconSVGControl } from 'gutenverse-core/controls';
import { getDefaultImageLoad } from '../../../utils/helper';

export const sliderPanel = (props) => {
    const {
        autoplay,
        normalImage,
        imageLoad = '',
        fetchPriorityHigh = false,
    } = props;
    const defaultImageLoad = getDefaultImageLoad(imageLoad, normalImage);

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
            id: 'imageLoad',
            label: __('Image Load', 'gutenverse'),
            component: SelectControl,
            defaultValue: defaultImageLoad,
            options: [
                {
                    label: __('Normal Load', 'gutenverse'),
                    value: 'eager'
                },
                {
                    label: __('Lazy Load', 'gutenverse'),
                    value: 'lazy'
                },
            ],
        },
        {
            id: 'fetchPriorityHigh',
            show: (imageLoad === 'eager' || defaultImageLoad.value === 'eager'),
            label: __('Fetch Priority High', 'gutenverse-news'),
            description: __('Signals the browser to prioritize fetching this image. Use this only for the LCP (Largest Contentful Paint) element.', 'gutenverse-news'),
            component: CheckboxControl,
        },
        {
            id: 'fetchPriorityHighPosition',
            show: (imageLoad === 'eager' || defaultImageLoad.value === 'eager') && fetchPriorityHigh,
            label: __('Fetch Priority Post', 'gutenverse-news'),
            description: __('Choose which rendered post image should receive fetchpriority high. 1 is the first post image.', 'gutenverse-news'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
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
            id: 'nextButtonIcon',
            label: __('Icon Next', 'gutenverse-news'),
            component: IconSVGControl,
        },
        {
            id: 'prevButtonIcon',
            label: __('Icon Previous', 'gutenverse-news'),
            component: IconSVGControl,
        },
    ];
};