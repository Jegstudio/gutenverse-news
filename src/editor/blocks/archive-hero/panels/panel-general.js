import { __ } from '@wordpress/i18n';
import { TextControl, CheckboxControl, RangeControl, SelectControl } from 'gutenverse-core/controls';

export const generalPanel = (props) => {
    const {
        elementId,
        heroType,
        dateFormat
    } = props;

    return [
        {
            id: 'heroMargin',
            component: RangeControl,
            label: __('Hero Margin', 'gutenverse-news'),
            min: 0,
            max: 30,
            step: 1,
            unit: 'px',
            description: __('Margin of each hero element.', 'gutenverse-news'),
            show: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'skew'].includes(heroType),
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'heroMargin',
                    'responsive': false,
                    'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heroblock_wrapper`,
                    'properties': [
                        {
                            'name': 'margin',
                            'valueType': 'pattern',
                            'pattern': '0 0 -{value}px -{value}px;',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                },
                {
                    'type': 'plain',
                    'id': 'heroMargin',
                    'responsive': false,
                    'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} article.gvnews_post`,
                    'properties': [
                        {
                            'name': 'padding',
                            'valueType': 'pattern',
                            'pattern': '0 0 {value}px {value}px;',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                },
            ],
        },
        {
            id: 'dateFormat',
            component: SelectControl,
            label: __('Choose Date Format', 'gutenverse-news'),
            description: 'Choose which date format you want to use.',
            show: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'skew'].includes(heroType),
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
                'Please write custom date format for your module, for more detail about how to write date format, you can refer to this <a href="https://codex.wordpress.org/Formatting_Date_and_Time" target="_blank">link</a>.'
            ),
            show: 'custom' === dateFormat,
        },
        {
            id: 'firstPage',
            component: CheckboxControl,
            label: __('Only First Page', 'gutenverse-news'),
            description: __('Enable this option if you want to show this hero only on the first page.', 'gutenverse-news'),
        },
    ];
};
