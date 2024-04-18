import { __ } from '@wordpress/i18n';
import { CheckboxControl, IconControl, SelectControl, TextControl, RangeControl } from 'gutenverse-core/controls';

export const generalPanel = (props) => {
    const {
        metaDateFormat,
        autoplay,
    } = props;

    return [
        {
            id: 'title',
            label: __('News Ticker Title', 'gutenverse-news'),
            component: TextControl,
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
            id: 'animationDirection',
            label: __('Animation Direction', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    value: 'horizontal',
                    label: __('Horizontal', 'gutenverse-news')
                },
                {
                    value: 'vertical',
                    label: __('Vertical', 'gutenverse-news')
                },
            ]
        },
        {
            id: 'icon',
            label: __('Icon', 'gutenverse-news'),
            component: IconControl
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
            component: TextControl,
        },
    ];
};