import { __ } from '@wordpress/i18n';
import { TextControl, CheckboxControl, RangeControl, SelectControl } from 'gutenverse-core/controls';

export const generalPanel = (props) => {
    const {
        boxed
    } = props;
    return [
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
            id: 'dateFormat',
            component: SelectControl,
            label: __('Content Date Format', 'gutenverse-news'),
            description: __('Choose which date format you want to use.', 'gutenverse-news'),
            options: [
                {
                    value: 'ago',
                    label: __('Relative Date/Time Format (ago)', 'gutenverse-news'),
                },
                {
                    value: 'default',
                    label: __('WordPress Default Format', 'gutenverse-news'),
                },
                {
                    value: 'custom',
                    label: __('Custom Format', 'gutenverse-news'),
                },
            ],
        },
        {
            id: 'dateFormatCustom',
            component: TextControl,
            label: __('Custom Date Format', 'gutenverse-news'),
            description: __(
                'Please write custom date format for your module, for more detail about how to write date format, you can refer to this <a href="https://codex.wordpress.org/Formatting_Date_and_Time" target="_blank">link</a>.',
                'gutenverse-news'
            ),
        },
        {
            id: 'firstPage',
            component: CheckboxControl,
            label: __('Only First Page', 'gutenverse-news'),
            description: __('Enable this option if you want to show this block only on the first page.', 'gutenverse-news'),
        },
    ];
};
