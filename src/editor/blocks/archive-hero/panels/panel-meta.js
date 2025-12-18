import { __ } from '@wordpress/i18n';
import { CheckboxControl, SelectControl, TextControl } from 'gutenverse-core/controls';
import { applyFilters } from '@wordpress/hooks';

export const metaPanel = (props) => {
    const {
        dateFormat = 'default',
        showMetaDate = true,
        heroType = '1'
    } = props;
    const withAuthor = ['1', '2', '3', '4', '5', '6', '13'].includes(heroType);



    let panelList = [
        {
            id: 'showMeta',
            label: __('Show Meta', 'gutenverse-news'),
            description: __('Enable this option to meta on this block.', 'gutenverse-news'),
            component: CheckboxControl
        },
        {
            id: 'showMetaAuthor',
            label: __('Show Meta Author', 'gutenverse-news'),
            description: __('Enable this option to show meta author on this block.', 'gutenverse-news'),
            show: withAuthor && props.showMeta,
            component: CheckboxControl
        },
        {
            id: 'showMetaDate',
            label: __('Show Meta Date', 'gutenverse-news'),
            description: __('Enable this option to show meta date on this block.', 'gutenverse-news'),
            show: props.showMeta,
            component: CheckboxControl
        },
        {
            id: 'dateFormat',
            show: props.showMeta && showMetaDate === true,
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
            id: 'dateFormatCustom',
            show: props.showMeta && showMetaDate === true && dateFormat === 'custom',
            label: __('Custom Format', 'gutenverse-news'),
            description: __('Please write custom date format for your module, for more detail about how to write date format.', 'gutenverse-news'),
            component: TextControl,
        },
    ];

    return applyFilters('gutenverse.news.penels.meta.setting', panelList, props);
};