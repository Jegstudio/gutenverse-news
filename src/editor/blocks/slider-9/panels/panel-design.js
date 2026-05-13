import { __ } from '@wordpress/i18n';
import { gvnewsEssentialsActive } from '../../../utils/helper';
import { ColorControl, DimensionControl, RangeControl, TypographyControl, CheckboxControl, IconSVGControl } from 'gutenverse-core/controls';
export const designPanel = (props) => {
    const { elementId, showPostFormatIcon = false } = props;

    return [
        {
            id: 'showPostFormatIcon',
            label: __('Show Post Format Icon', 'gutenverse'),
            show: gvnewsEssentialsActive,
            component: CheckboxControl,
        },
        {
            id: 'galleryFormatIcon',
            show: showPostFormatIcon && gvnewsEssentialsActive,
            label: __('Gallery Icon', 'gutenverse-news'),
            description: __('Choose icon for gallery post format overlay icon.', 'gutenverse-news'),
            component: IconSVGControl,
        },
        {
            id: 'videoFormatIcon',
            show: showPostFormatIcon && gvnewsEssentialsActive,
            label: __('Video Icon', 'gutenverse-news'),
            description: __('Choose icon for video post format overlay icon.', 'gutenverse-news'),
            component: IconSVGControl,
        },
        {
            id: 'overlayIconSize',
            show: showPostFormatIcon && gvnewsEssentialsActive,
            label: __('Icon Size', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 5,
            max: 100,
            step: 1,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'overlayIconSize',
                    'responsive': true,
                    'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slide_item .gvnews-thumb-overlay-icon`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                }
            ]
        },
        {
            id: 'overlayIconColor',
            show: showPostFormatIcon && gvnewsEssentialsActive,
            label: __('Icon Color', 'gutenverse-news'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'overlayIconColor',
                    'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slide_item .gvnews-thumb-overlay-icon`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ],
        },
        {
            id: 'typography',
            label: __('Title Typography', 'gutenverse-news'),
            description: __('This option will change your title typography.', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'secondTitleTypography',
            label: __('Second List Title Typography', 'gutenverse-news'),
            description: __('This option will override the post title typography setting on the second list.', 'gutenverse-news'),
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
            id: 'secondTitleColor',
            label: __('Second Title Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'sliderHeight',
            label: __('Slider Height', 'gutenverse-news'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 10,
            max: 540,
            unit: 'px',
            step: 10,
            liveStyle: [
                {
                    'type': 'pattern',
                    'id': 'sliderHeight',
                    'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_wrapper, .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_wrapper .gvnews_slide_item, .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_wrapper .gvnews_slide_wrapper, .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_wrapper .gvnews_slider_type_9_thumb`,
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
            id: 'containerWidth',
            label: __('Container Width', 'gutenverse-news'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 100,
            unit: '%',
            step: 1,
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
