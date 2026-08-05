import { __ } from '@wordpress/i18n';
import { ColorControl, TypographyControl, DimensionControl, RangeControl } from 'gutenverse-core/controls';
export const designPanel = (props) => {
    const {
        elementId
    } = props;
    return [
        {
            id: 'typography',
            label: __('Title Typography', 'gutenverse-news'),
            description: __('This option will change your title typography.', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'titleColor',
            label: __('Title Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'titleColorHover',
            label: __('Title Color Hover', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'slideBackgroundColor',
            label: __('Slide Background Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'gapItem',
            label: __('Gap Item', 'gutenverse-news'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 0,
            max: 30,
            step: 1,
            unit: 'px',
            liveStyle: [
                {
                    'id': 'gapItem',
                    'type': 'plain',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'padding-right',
                            'valueType': 'pattern',
                            'pattern': '{value}px !important',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                },
                            }
                        }
                    ],
                    'selector': `.gvnews-slider-3.${elementId} .tns-inner .gvnews_slider_type_3 .tns-item`,
                }
            ]
        },
        {
            id: 'sliderHeight',
            label: __('Slider Height', 'gutenverse-news'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 10,
            max: 670,
            unit: 'px',
            step: 10,
            liveStyle: [
                {
                    'type': 'pattern',
                    'id': 'sliderHeight',
                    'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_wrapper, .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_wrapper .gvnews_slide_item, .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_wrapper .gvnews_thumb div`,
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'height',
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
            id: 'containerPadding',
            label: __('Container Padding', 'gutenverse-news'),
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
    ];
};
