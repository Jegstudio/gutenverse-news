import { __ } from '@wordpress/i18n';
import { CheckboxControl, SelectControl } from 'gutenverse-core/controls';
import { getDefaultImageLoad } from "../../../utils/helper";


export const settingHero = (props) => {
    const { normalImage, imageLoad = "" } = props;
    const defaultImageLoad = getDefaultImageLoad(imageLoad, normalImage);
    return [
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
    ];
};