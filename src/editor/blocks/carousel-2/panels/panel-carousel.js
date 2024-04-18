import { __ } from '@wordpress/i18n';
import { SelectControl, CheckboxControl, RangeControl, TextControl, BackgroundControl } from 'gutenverse-core/controls';

export const carouselPanel = (props) => {
    const {
        elementId,
        autoplay,
        metaDateFormat,
    } = props;
    return [
        {
            id: 'showNav',
            label: __('Show Navigation', 'gutenverse-news'),
            component: CheckboxControl,
        },
        {
            id: 'ncolumn',
            label: __('Number of Column', 'gutenverse-news'),
            component: RangeControl,
            min: 1,
            max: 6,
            step: 1,
        },
        {
            id: 'iMargin',
            label: __('Item Margin', 'gutenverse-news'),
            component: RangeControl,
            min: 0,
            max: 100,
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
            id: 'metaDateFormat',
            label: __('Date Format', 'gutenverse-news'),
            description: __('Choose which date format you want to use.', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    label: __('Relative Date/Time Format (ago)', 'gutenverse-news'),
                    value: 'ago'
                },
                {
                    label: __('Wordpress Default Format', 'gutenverse-news'),
                    value: 'default'
                },
                {
                    label: __('Custom Format', 'gutenverse-news'),
                    value: 'custom'
                },
            ],
        },
        {
            id: 'metaDateFormatCustom',
            show: metaDateFormat === 'custom',
            label: __('Custom Format', 'gutenverse-news'),
            description: __('Please write custom date format for your module, for more detail about how to write date format.', 'gutenverse-news'),
            component: TextControl,
        },
        {
            id: 'normalImage',
            label: __('Use Normal Image Load', 'gutenverse-news'),
            description: __('Force it to use normal load image and optimize Largest Contentful Paint (LCP) when using this element at the top of your site.', 'gutenverse-news'),
            component: CheckboxControl
        },
    ];
};