import { __ } from '@wordpress/i18n';
import { RangeControl } from 'gutenverse-core/controls';

export const postItemGridPanel = (props) => {

    const {
        elementId
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
        {
            id: 'mainAdditionalGap',
            label: __('Additional Main Item Gap', 'gutenverse-news'),
            description: __('Additional gap between the main post lists and other post lists', 'gutenverse-news'),
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
                    'selector': `.${elementId} .gvnews_posts .gvnews_pl_md_box`,
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