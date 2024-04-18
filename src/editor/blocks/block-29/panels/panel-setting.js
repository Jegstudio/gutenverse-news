import { __ } from '@wordpress/i18n';
import { SelectControl, TextControl, CheckboxControl } from 'gutenverse-core/controls';
import { designPanel } from '../../../control-panel/panel-design';

export const settingPanel = (props) => {
    const {
        metaDateFormat,
        showDate,
    } = props;
    return [
        {
            id: 'showDate',
            label: __('Tick to show date', 'gutenverse-news'),
            description: __('Enable this option to show date.', 'gutenverse-news'),
            component: CheckboxControl
        },
        {
            id: 'metaDateFormat',
            show: showDate === true,
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
    ];
};