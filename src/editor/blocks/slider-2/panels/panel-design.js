import { __ } from '@wordpress/i18n';
import { gvnewsEssentialsActive } from '../../../utils/helper';
import { ColorControl, DimensionControl , RangeControl, TypographyControl, CheckboxControl, IconSVGControl } from 'gutenverse-core/controls';
export const designPanel = (props) => {
    const { showPostFormatIcon = false, elementId } = props;

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
            position: ['right', 'left'],
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