import { __ } from '@wordpress/i18n';
import { RangeControl, SwitchControl } from 'gutenverse-core/controls';


const withGrid = ['8', '9', '11', '13', '14', '15', '16', '17', '19', '20', '21', '22', '23', '24', '27', '36', '37', '39'];
const withMasonry = ['32', '33', '34', '35'];
export const postItemPanel = (props) => {

    const { elementId, blockType = '3' } = props;

    if (withGrid.includes(blockType)) {
        return postItemGridPanel(props)
    }
    if (withMasonry.includes(blockType)) {
        return postItemMasonryPanel(props)
    }
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

const multiPostItemPanel = (props) => {
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
            description: __('Row gap between post lists', 'gutenverse-news'),
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
                },
                {
                    'type': 'plain',
                    'id': 'rowItemGap',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_postblock_1 .gvnews_block_container`,
                    'properties': [
                        {
                            'name': 'gap',
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



const postItemGridPanel = (props) => {

    const {
        elementId,
        blockType = '3'
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
            show: blockType === '14',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'mainItemGap',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_postbig > .gvnews_post`,
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


export const postItemMasonryPanel = (props) => {

    const {
        elementId,
    } = props;

    return [
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
        },
        {
            id: 'gutterWidth',
            label: __('Post Lists Column Gap', 'gutenverse-news'),
            description: __('The column gap between post lists', 'gutenverse-news'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            isParseFloat: false,
            allowDeviceControl: false,
        },
    ]
}


