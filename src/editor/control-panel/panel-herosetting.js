import { __ } from '@wordpress/i18n';
import { RangeControl, CheckboxControl, ImageRadioControl } from 'gutenverse-core/controls';

export const settingHero = (props) => {
    const {
        elementId,
    } = props;

    const {
        imgDir
    } = window['GVNewsConfig'];

    return [
        {
            id: 'heroMargin',
            label: __('Hero Margin', 'gutenverse-news'),
            description: __('Margin of each hero element.', 'gutenverse-news'),
            component: RangeControl,
            allowDeviceControl: false,
            unit: 'px',
            min: 0,
            max: 30,
            step: 1,
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heroblock_wrapper`,
                    render: value => `margin: 0 0 -${value}px -${value}px;`
                },
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} article.gvnews_post`,
                    render: value => `padding: 0 0 ${value}px ${value}px;`
                }
            ],
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
            id: 'heroStyle',
            label: __('Hero Style', 'gutenverse-news'),
            description: __('Choose which hero style that fit your content design.', 'gutenverse-news'),
            component: ImageRadioControl,
            options: [
                {
                    image: <img src={`${imgDir}/hero-1.png`} />,
                    value: '1'
                },
                {
                    image: <img src={`${imgDir}/hero-2.png`} />,
                    value: '2'
                },
                {
                    image: <img src={`${imgDir}/hero-3.png`} />,
                    value: '3'
                },
                {
                    image: <img src={`${imgDir}/hero-4.png`} />,
                    value: '4'
                },
                {
                    image: <img src={`${imgDir}/hero-5.png`} />,
                    value: '5'
                },
                {
                    image: <img src={`${imgDir}/hero-6.png`} />,
                    value: '6'
                },
                {
                    image: <img src={`${imgDir}/hero-7.png`} />,
                    value: '7'
                },
            ],
        },
        {
            id: 'normalImage',
            label: __('Load Image Immediately', 'gutenverse-news'),
            description: __('enable this option to load image on this block immediately and optimize Largest Contentful Paint (LCP) if this block is at the top of your site.', 'gutenverse-news'),
            component: CheckboxControl
        },
    ];
};