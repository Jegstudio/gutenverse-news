import { __ } from '@wordpress/i18n';
import { CheckboxControl, RangeControl, SelectControl } from 'gutenverse-core/controls';

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
        {
            id: 'postTitleHtmlTag',
            label: __('Post Title HTML Tag', 'gutenverse-news'),
            description: __('Choose HTML tag for the post title.', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    label: __('H1', 'gutenverse-news'),
                    value: 'h1'
                },
                {
                    label: __('H2', 'gutenverse-news'),
                    value: 'h2'
                },
                {
                    label: __('H3', 'gutenverse-news'),
                    value: 'h3'
                },
                {
                    label: __('H4', 'gutenverse-news'),
                    value: 'h4'
                },
                {
                    label: __('H5', 'gutenverse-news'),
                    value: 'h5'
                },
                {
                    label: __('H6', 'gutenverse-news'),
                    value: 'h6'
                },
            ],
        },
    ];
};
