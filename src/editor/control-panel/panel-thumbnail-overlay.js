import { __ } from '@wordpress/i18n';
import { BackgroundControl, RangeControl, SwitchControl } from 'gutenverse-core/controls';

export const thumbnailOverlayPanel = (props) => {
    const {
        hasSecondImageSize = false,
        switcher,
        setSwitcher,
        elementId,
        mainThumbnailClass,
        secondThumbnailClass
    } = props;

    return [
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
            id: 'overlayBackgroundMain',
            show: !switcher.state || switcher.state === 'main',
            label: __('Overlay Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
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
            allowDeviceControl: true,
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
            id: 'overlayBackgroundSecond',
            show: switcher.state === 'second',
            label: __('Overlay Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
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
            allowDeviceControl: true,
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
    ];
};