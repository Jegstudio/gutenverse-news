import { __ } from '@wordpress/i18n';
import { DimensionControl, RangeControl, SwitchControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const multiPostItemPanel = (props, third = false) => {
    const {
        switcher,
        setSwitcher,
        elementId,
        secondListSelector = '',
        thirdListSelector = ''
    } = props;

    return [
        {
            id: '__thumbnailType',
            component: SwitchControl,
            options: third ? [
                {
                    value: 'main',
                    label: 'Main'
                },
                {
                    value: 'second',
                    label: 'Second'
                },
                {
                    value: 'third',
                    label: 'Third'
                }
            ] : [
                {
                    value: 'main',
                    label: 'Main'
                },
                {
                    value: 'second',
                    label: 'Second'
                }
            ],
            onChange: ({ __thumbnailType }) => setSwitcher({ ...switcher, state: __thumbnailType })
        },
        {
            id: 'mainItemPadding',
            label: __('Main Item Padding', 'gutenverse-news'),
            description: __('Padding on the main post item', 'gutenverse-news'),
            show: (!switcher.state || switcher.state === 'main'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
        },

        {
            id: 'mainItemMargin',
            label: __('Main Item Margin', 'gutenverse-news'),
            description: __('Margin on the main post item', 'gutenverse-news'),
            show: (!switcher.state || switcher.state === 'main'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'secondItemPadding',
            label: __('Second lists Padding', 'gutenverse-news'),
            description: __('Padding on the second post lists', 'gutenverse-news'),
            show: switcher.state === 'second',
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'secondItemGap',
            label: __('Second Item Gap', 'gutenverse-news'),
            description: __('Gap between item on the second post lists', 'gutenverse-news'),
            component: RangeControl,
            unit: 'px',
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            show: switcher.state === 'second',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'secondItemGap',
                    'responsive': true,
                    'selector': `.${elementId} ${secondListSelector} .gvnews_post`,
                    'properties': [
                        {
                            'name': 'margin-bottom',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                }
                            }
                        }
                    ],
                }
            ]
        },
        {
            id: 'thirdItemPadding',
            label: __('Third Lists Padding', 'gutenverse-news'),
            description: __('Padding on the third post lists', 'gutenverse-news'),
            show: switcher.state === 'third' && third,
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'thirdItemGap',
            label: __('Third Item Gap', 'gutenverse-news'),
            description: __('Gap between item on the third post lists', 'gutenverse-news'),
            component: RangeControl,
            unit: 'px',
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            show: switcher.state === 'third',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'thirdItemGap',
                    'responsive': true,
                    'selector': `.${elementId} ${thirdListSelector} .gvnews_post`,
                    'properties': [
                        {
                            'name': 'margin-bottom',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                }
                            }
                        }
                    ],
                }
            ]
        },
    ];
};

export const postItemPanel = (props) => {

    const { elementId } = props;

    return [
        {
            id: 'mainItemGap',
            label: __('Post Item Gap', 'gutenverse-news'),
            description: __('Gap between item on the post lists', 'gutenverse-news'),
            component: RangeControl,
            unit: 'px',
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'mainItemGap',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_posts .gvnews_post`,
                    'properties': [
                        {
                            'name': 'margin-bottom',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                }
                            }
                        }
                    ],
                }
            ]
        },
    ]
}

export const rowItemPanel = (props) => {

    const { elementId } = props;

    return [
        {
            id: 'rowItemGap',
            label: __('Row Item Gap', 'gutenverse-news'),
            description: __('Bottom gap between row post lists', 'gutenverse-news'),
            component: RangeControl,
            unit: 'px',
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
        },
    ]
}