import { __ } from '@wordpress/i18n';
import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { BackgroundControl, BorderControl, BorderResponsiveControl, BoxShadowControl, DimensionControl, IconRadioControl, SelectControl, SwitchControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { isNotEmpty } from 'gutenverse-core/helper';

export const contentContainerPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
        hasSecondImageSize = false,
        mainThumbnailClass,
        secondThumbnailClass,
        contentAlignVertical = {
            main: false,
            second: false
        },
    } = props;
    const device = getDeviceType();

    return [
        {
            id: '__contentContainerType',
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
            onChange: ({ __contentContainerType }) => setSwitcher({ ...switcher, state: __contentContainerType })
        },
        // Main Content Container
        {
            id: 'contentAlign',
            show: !switcher.state || switcher.state === 'main',
            label: __('Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'left',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'right',
                    icon: <AlignRight />,
                },
            ],
        },
        {
            id: 'contentAlignVertical',
            show: (!switcher.state || switcher.state === 'main') && isNotEmpty(contentAlignVertical.main),
            label: __('Vertical Alignment', 'gutenverse'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Top', 'gutenverse'),
                    value: 'start',
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                },
                {
                    label: __('Align Bottom', 'gutenverse'),
                    value: 'end',
                },
            ],
        },
        {
            id: 'contentContainerBackground',
            show: !switcher.state || switcher.state === 'main',
            label: __('Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'contentContainerBackground',
                    'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews_postblock_content`,
                }
            ]
        },
        {
            id: 'contentMargin',
            show: !switcher.state || switcher.state === 'main',
            label: __('Margin', 'gutenverse'),
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
        {
            id: 'contentPadding',
            show: !switcher.state || switcher.state === 'main',
            label: __('Padding', 'gutenverse'),
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
        {
            id: 'contentBorder',
            show: (!switcher.state || switcher.state === 'main') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'contentBorder',
                    'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews_postblock_content`,
                }
            ]
        },
        {
            id: 'contentBorderResponsive',
            show: (!switcher.state || switcher.state === 'main') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'contentBorderResponsive',
                    'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews_postblock_content`,
                }
            ]
        },
        {
            id: 'contentContainerShadow',
            show: !switcher.state || switcher.state === 'main',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'contentContainerShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews_postblock_content`,
                }
            ]
        },

        // Second Content Container
        {
            id: 'contentAlignSecond',
            show: switcher.state === 'second',
            label: __('Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'left',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'right',
                    icon: <AlignRight />,
                },
            ],
        },
        {
            id: 'contentAlignVerticalSecond',
            show: (!switcher.state || switcher.state === 'second') && isNotEmpty(contentAlignVertical.second),
            label: __('Vertical Alignment', 'gutenverse'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Top', 'gutenverse'),
                    value: 'start',
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                },
                {
                    label: __('Align Bottom', 'gutenverse'),
                    value: 'end',
                },
            ],
        },
        {
            id: 'contentContainerBackgroundSecond',
            show: switcher.state === 'second',
            label: __('Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'contentContainerBackgroundSecond',
                    'selector': `.${elementId} .gvnews_postblock .${secondThumbnailClass} .gvnews_postblock_content`,
                }
            ]
        },
        {
            id: 'contentMarginSecond',
            show: switcher.state === 'second',
            label: __('Margin', 'gutenverse'),
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
        {
            id: 'contentPaddingSecond',
            show: switcher.state === 'second',
            label: __('Padding', 'gutenverse'),
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
        {
            id: 'contentBorderSecond',
            show: switcher.state === 'second' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'contentBorderSecond',
                    'selector': `.${elementId} .gvnews_postblock .${secondThumbnailClass} .gvnews_postblock_content`,
                }
            ]
        },
        {
            id: 'contentBorderResponsiveSecond',
            show: switcher.state === 'second' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'contentBorderResponsiveSecond',
                    'selector': `.${elementId} .gvnews_postblock .${secondThumbnailClass} .gvnews_postblock_content`,
                }
            ]
        },
        {
            id: 'contentContainerShadowSecond',
            show: switcher.state === 'second',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'contentContainerShadowSecond',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .gvnews_postblock .${secondThumbnailClass} .gvnews_postblock_content`,
                }
            ]
        },
    ];
};