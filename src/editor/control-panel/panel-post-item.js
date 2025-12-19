import { __ } from '@wordpress/i18n';
import { RangeControl, SwitchControl } from 'gutenverse-core/controls';

export const multiPostItemPanel = (props) => {
    const {
        switcher,
        setSwitcher,
        elementId,
        secondListSelector = '',
        thirdListSelector = '',
        columnWidth,
    } = props;

    return [

        {
            id: 'columnItemGap',
            label: __('Post Lists Column Gap', 'gutenverse-news'),
            description: __('Gap between post lists', 'gutenverse-news'),
            component: RangeControl,
            unit: 'px',
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'columnItemGap',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_posts`,
                    'properties': [
                        {
                            'name': 'column-gap',
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
            id: 'rowItemGap',
            label: __('Post Lists Row Gap', 'gutenverse-news'),
            description: __('Row gap between post list and the margin bottom on all post lists', 'gutenverse-news'),
            component: RangeControl,
            unit: 'px',
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'rowItemGap',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_posts`,
                    'properties': [
                        {
                            'name': 'column-gap',
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
            id: '__postItem',
            component: SwitchControl,
            options: (columnWidth === 'auto' || columnWidth === '12') ? [
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
                    value: 'second',
                    label: 'Second'
                }
            ],
            onChange: ({ __postItem }) => setSwitcher({ ...switcher, state: __postItem })
        },
        {
            id: 'columnItemGapSecond',
            label: __('Second Item Gap', 'gutenverse-news'),
            description: __('Gap between item on the second post lists', 'gutenverse-news'),
            component: RangeControl,
            unit: 'px',
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            show: !switcher.state || switcher.state === 'second',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'columnItemGapSecond',
                    'responsive': true,
                    'selector': `.${elementId} ${secondListSelector}`,
                    'properties': [
                        {
                            'name': 'column-gap',
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
            id: 'columnItemGapThird',
            label: __('Third Item Gap', 'gutenverse-news'),
            description: __('Gap between item on the third post lists', 'gutenverse-news'),
            component: RangeControl,
            unit: 'px',
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            show: switcher.state === 'third' && (columnWidth === 'auto' || columnWidth === '12'),
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'columnItemGapThird',
                    'responsive': true,
                    'selector': `.${elementId} ${thirdListSelector}`,
                    'properties': [
                        {
                            'name': 'column-gap',
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
            id: 'rowItemGap',
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
                    'id': 'rowItemGap',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_posts .gvnews_post:not(:last-of-type)`,
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




export const postItemGridPanel = (props) => {

    const {
        elementId,
        mainContent = ''
    } = props;

    return [
        {
            id: 'mainItemGap',
            label: __('Main Item gap', 'gutenverse-news'),
            description: __('Gap between the main post and the lists of posts', 'gutenverse-news'),
            component: RangeControl,
            unit: 'px',
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            show: mainContent.length > 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'mainItemGap',
                    'responsive': true,
                    'selector': `.${elementId} ${mainContent}`,
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
            id: 'rowItemGap',
            label: __('Row Item Gap', 'gutenverse-news'),
            description: __('Row gap beteen your post lists', 'gutenverse-news'),
            component: RangeControl,
            unit: 'px',
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'rowItemGap',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_posts`,
                    'properties': [
                        {
                            'name': 'row-gap',
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
            id: 'columnItemGap',
            label: __('Column Item Gap', 'gutenverse-news'),
            description: __('Column gap beteen your post lists', 'gutenverse-news'),
            component: RangeControl,
            unit: 'px',
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'columnItemGap',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_posts`,
                    'properties': [
                        {
                            'name': 'column-gap',
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


