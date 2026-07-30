import { __ } from '@wordpress/i18n';
import { IconSVGControl, CheckboxControl, RangeControl, SelectControl, TextControl } from 'gutenverse-core/controls';
import { getDefaultImageLoad } from '../../../utils/helper';

export const contentPanel = props => {
    const {
        templateType,
        enableExcerpt = true,
        imageLoad = '',
        fetchPriorityHigh = false,
    } = props;

    const defaultImageLoad = getDefaultImageLoad(imageLoad, false);

    const withListIcon = ['template_1', 'template_16', 'template_24'].includes(templateType);
    return [
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
            id: 'excerptLength',
            show: enableExcerpt === true,
            label: __('Excerpt Length', 'gutenverse-news'),
            description: __('Set word length of excerpt on post block.', 'gutenverse-news'),
            component: RangeControl,
            min: 1,
            max: 200,
            step: 1
        },
        {
            id: 'excerptEllipsis',
            show: enableExcerpt === true,
            label: __('Excerpt Ellipsis', 'gutenverse-news'),
            description: __('Define excerpt ellipsis', 'gutenverse-news'),
            component: TextControl,
        },
        {
            id: 'listIcon',
            show: withListIcon,
            label: __('Item List Icon', 'gutenverse-news'),
            description: __('Choose icon for post list icon.', 'gutenverse-news'),
            component: IconSVGControl
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
    ];
};
