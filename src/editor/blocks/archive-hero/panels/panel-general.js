import { __ } from '@wordpress/i18n';
import { CheckboxControl, RangeControl } from 'gutenverse-core/controls';

export const generalPanel = (props) => {
    const {
        elementId,
        heroType,
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
            id: 'firstPage',
            component: CheckboxControl,
            label: __('Only First Page', 'gutenverse-news'),
            description: __('Enable this option if you want to show this hero only on the first page.', 'gutenverse-news'),
        },
        {
            id: 'normalImage',
            label: __('Load Image Immediately', 'gutenverse-news'),
            description: __('enable this option to load image on this block immediately and optimize Largest Contentful Paint (LCP) if this block is at the top of your site.', 'gutenverse-news'),
            component: CheckboxControl
        },
    ];
};
