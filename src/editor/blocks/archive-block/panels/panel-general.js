import { __ } from '@wordpress/i18n';
import { TextControl, CheckboxControl, RangeControl, SelectControl } from 'gutenverse-core/controls';
import { getDefaultImageLoad } from '../../../utils/helper';

export const generalPanel = (props) => {
    const {
        boxed,
        imageLoad = '',
    } = props;
    const defaultImageLoad = getDefaultImageLoad(imageLoad, false);

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
            id: 'numberPost',
            component: RangeControl,
            label: __('Number of post', 'gutenverse-news'),
            min: 1,
            max: 100,
            step: 1,
            description: __('Set number of post for this block.', 'gutenverse-news'),
        },
        {
            id: 'boxed',
            component: CheckboxControl,
            label: __('Enable Boxed', 'gutenverse-news'),
            description: __('', 'gutenverse-news'),
        },
        {
            id: 'boxedShadow',
            show: boxed,
            component: CheckboxControl,
            label: __('Enable Shadow', 'gutenverse-news'),
            description: __('Enable excerpt ellipsis', 'gutenverse-news'),
        },
        {
            id: 'excerptLength',
            component: RangeControl,
            label: __('Excerpt Length', 'gutenverse-news'),
            min: 0,
            max: 200,
            step: 1,
            description: __('Set word length of excerpt on post block.', 'gutenverse-news'),
        },
        {
            id: 'excerptEllipsis',
            component: TextControl,
            label: __('Excerpt Ellipsis', 'gutenverse-news'),
            description: __('Define excerpt ellipsis', 'gutenverse-news'),
        },
        {
            id: 'firstPage',
            component: CheckboxControl,
            label: __('Only First Page', 'gutenverse-news'),
            description: __('Enable this option if you want to show this block only on the first page.', 'gutenverse-news'),
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
    ];
};
