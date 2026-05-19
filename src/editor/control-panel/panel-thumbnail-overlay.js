import { __ } from '@wordpress/i18n';
import { BackgroundControl, ColorControl, RangeControl, SwitchControl, AlertControl } from 'gutenverse-core/controls';
import { applyFilters } from '@wordpress/hooks';
import { gvnewsEssentialsActive } from '../utils/helper';

export const thumbnailOverlayPanel = (props) => {
    const {
        hasSecondImageSize = false,
        switcher,
        setSwitcher,
        elementId,
        mainThumbnailClass,
        secondThumbnailClass,
        thumb = true,
        showPostFormatIcon = false
    } = props;

    if (!thumb) {
        return [
            {
                id: '__itemShowedThumbnail',
                component: AlertControl,
                children: <>
                    <span>{__('You need to turn on "Enable Thumbnail" to use this feature.', 'gutenverse-news')}</span>
                </>
            },
        ];
    }

    return applyFilters('gvnews.panel.thumbnailOverlay', [
        {
            id: '__thumbnailType',
            show: hasSecondImageSize,
            component: SwitchControl,
            options: [
                {
                    value: 'main',
                    label: 'Main'
                },
                {
                    value: 'second',
                    label: 'Second'
                }
            ],
            onChange: ({ __thumbnailType }) => setSwitcher({ ...switcher, state: __thumbnailType })
        },
        // Main Thumbnail
        {
            id: 'overlayIconSizeMain',
            show: showPostFormatIcon && gvnewsEssentialsActive && (!switcher.state || switcher.state === 'main'),
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
                    'id': 'overlayIconSizeMain',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews-thumb-overlay-icon`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'overlayIconColorMain',
            show: showPostFormatIcon && gvnewsEssentialsActive && (!switcher.state || switcher.state === 'main'),
            label: __('Icon Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'overlayBackgroundMain',
            show: !switcher.state || switcher.state === 'main',
            label: __('Overlay Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: false,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'overlayBackgroundMain',
                    'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews-thumb-overlay`,
                }
            ]
        },
        {
            id: 'overlayOpacityMain',
            show: !switcher.state || switcher.state === 'main',
            label: __('Overlay Opacity', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 1,
            step: 0.01,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'overlayOpacityMain',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews-thumb-overlay`,
                    'properties': [
                        {
                            'name': 'opacity',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        // Second thumbnail
        {
            id: 'overlayIconSizeSecond',
            show: showPostFormatIcon && gvnewsEssentialsActive && switcher.state === 'second',
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
                    'id': 'overlayIconSizeSecond',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_postblock .${secondThumbnailClass} .gvnews-thumb-overlay-icon`,
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
            id: 'overlayIconColorSecond',
            show: showPostFormatIcon && gvnewsEssentialsActive && switcher.state === 'second',
            label: __('Icon Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'overlayBackgroundSecond',
            show: switcher.state === 'second',
            label: __('Overlay Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: false,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'overlayBackgroundSecond',
                    'selector': `.${elementId} .gvnews_postblock .${secondThumbnailClass} .gvnews-thumb-overlay`,
                }
            ]
        },
        {
            id: 'overlayOpacitySecond',
            show: switcher.state === 'second',
            label: __('Overlay Opacity', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 1,
            step: 0.01,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'overlayOpacitySecond',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_postblock .${secondThumbnailClass} .gvnews-thumb-overlay`,
                    'properties': [
                        {
                            'name': 'opacity',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
    ], props);
};



export const carouselThumbnailOverlayPanel = (props, withHover = false) => {

    const {
        switcher,
        setSwitcher,
        elementId,
    } = props;


    return applyFilters('gvnews.panel.thumbnailOverlay', [
        {
            id: '__thumbnaiOverlayHover',
            show: withHover,
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                }
            ],
            onChange: ({ __thumbnaiOverlayHover }) => setSwitcher({ ...switcher, overlayHover: __thumbnaiOverlayHover })
        },
        {
            id: 'overlayBackground',
            label: __('Overlay Background', 'gutenverse'),
            component: BackgroundControl,
            show: !switcher.overlayHover || switcher.overlayHover === 'normal',
            allowDeviceControl: false,
            options: ['default', 'gradient'],
        },
        {
            id: 'overlayOpacity',
            show: !switcher.overlayHover || switcher.overlayHover === 'normal',
            label: __('Overlay Opacity', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 1,
            step: 0.01,
        },
        {
            id: 'overlayBackgroundHover',
            show: withHover && switcher.overlayHover === 'hover',
            label: __('Overlay Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: false,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'overlayBackgroundHover',
                    'selector': `.${elementId} .gvnews_postblock_carousel_2 .tns-item:hover .gvnews_thumb:before`,
                }
            ]
        },
        {
            id: 'overlayOpacityHover',
            show: withHover && switcher.overlayHover === 'hover',
            label: __('Overlay Opacity', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 1,
            step: 0.01,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'overlayOpacityHover',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_postblock_carousel_2 .tns-item:hover .gvnews_thumb:before`,
                    'properties': [
                        {
                            'name': 'opacity',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
    ], props);
};

export const sliderThumbnailOverlayPanel = (props) => {
    const {
        elementId,
        showPostFormatIcon = false
    } = props;

    return applyFilters('gvnews.panel.thumbnailOverlay', [
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
                    'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slide_item .gvnews-thumb-overlay-icon, .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_thumb.with-overlay-icon .gvnews-thumb-overlay-icon`,
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
                    'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slide_item .gvnews-thumb-overlay-icon, .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_thumb.with-overlay-icon .gvnews-thumb-overlay-icon`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ],
        }
    ], props);
};