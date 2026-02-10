import { __ } from '@wordpress/i18n';
import { RangeControl } from 'gutenverse-core/controls';

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