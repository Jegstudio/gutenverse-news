import { __ } from '@wordpress/i18n';
import { SwitchControl, CheckboxControl, ColorControl, TypographyControl, BorderControl, BoxShadowControl, DimensionControl } from 'gutenverse-core/controls';

export const readmoreStylePanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
        readmoreButtonDisabled = false
    } = props;
    if (readmoreButtonDisabled) {
        return [{
            id: 'readmoreButtonDisabled',
            label: __('Disable Read More Button', 'gutenverse-news'),
            description: __('Check this option to disable the read more button on this block.', 'gutenverse-news'),
            component: CheckboxControl
        }];
    }

    return [
        {
            id: 'readmoreButtonDisabled',
            label: __('Disable Read More Button', 'gutenverse-news'),
            description: __('Turn on this option to disable the read more button on this block.', 'gutenverse-news'),
            component: CheckboxControl
        },
        {
            id: 'readmoreButtonTypography',
            label: __('Typography', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: '__readmoreHover',
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
            onChange: ({ __readmoreHover }) => setSwitcher({ ...switcher, readmore: __readmoreHover })
        },
        {
            id: 'readmoreButtonBackground',
            label: __('Background Color', 'gutenverse-news'),
            show: !switcher.readmore || switcher.readmore === 'normal',
            component: ColorControl,
            liveStyle: [
                {
                    'id': 'readmoreButtonBackground',
                    'type': 'color',
                    'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct',
                        }
                    ],
                }
            ],
        },
        {
            id: 'readmoreButtonBackgroundHover',
            label: __('Background Color', 'gutenverse-news'),
            show: switcher.readmore === 'hover',
            component: ColorControl,
            liveStyle: [
                {
                    'id': 'readmoreButtonBackgroundHover',
                    'type': 'color',
                    'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore:hover`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct',
                        }
                    ],
                },
            ],
        },
        {
            id: 'readmoreButtonColor',
            label: __('Text Color', 'gutenverse-news'),
            show: !switcher.readmore || switcher.readmore === 'normal',
            component: ColorControl,
            liveStyle: [
                {
                    'id': 'readmoreButtonColor',
                    'type': 'color',
                    'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ],
                }
            ],
        },
        {
            id: 'readmoreButtonColorHover',
            label: __('Text Color', 'gutenverse-news'),
            show: switcher.readmore === 'hover',
            component: ColorControl,
            liveStyle: [
                {
                    'id': 'readmoreButtonColorHover',
                    'type': 'color',
                    'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore:hover`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ],
                }
            ],
        },
        {
            id: 'readmoreButtonBorder',
            label: __('Border', 'gutenverse-news'),
            show: !switcher.readmore || switcher.readmore === 'normal',
            component: BorderControl,
            liveStyle: [
                {
                    'id': 'readmoreButtonBorder',
                    'type': 'border',
                    'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore`,
                }
            ],
        },
        {
            id: 'readmoreButtonBorderHover',
            label: __('Border', 'gutenverse-news'),
            show: switcher.readmore === 'hover',
            component: BorderControl,
            liveStyle: [
                {
                    'id': 'readmoreButtonBorderHover',
                    'type': 'border',
                    'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore:hover`,
                }
            ],
        },
        {
            id: 'readmoreButtonBoxShadow',
            show: !switcher.readmore || switcher.readmore === 'normal',
            label: __('Box Shadow', 'gutenverse-news'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'id': 'readmoreButtonBoxShadow',
                    'type': 'boxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore`,
                }
            ]
        },
        {
            id: 'readmoreButtonBoxShadowHover',
            show: switcher.readmore === 'hover',
            label: __('Box Shadow', 'gutenverse-news'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'id': 'readmoreButtonBoxShadowHover',
                    'type': 'boxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore:hover`,
                }
            ]
        },
        {
            id: 'readmoreButtonPadding',
            label: __('Padding', 'gutenverse-news'),
            show: !switcher.readmore || switcher.readmore === 'normal',
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            liveStyle: [
                {
                    'id': 'readmoreButtonPadding',
                    'type': 'dimension',
                    'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore`,
                    'properties': [
                        {
                            'name': 'padding',
                            'valueType': 'direct',
                        }
                    ],
                }
            ],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'readmoreButtonMargin',
            label: __('Margin', 'gutenverse-news'),
            show: !switcher.readmore || switcher.readmore === 'normal',
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            liveStyle: [
                {
                    'id': 'readmoreButtonMargin',
                    'type': 'dimension',
                    'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore`,
                    'properties': [
                        {
                            'name': 'margin',
                            'valueType': 'direct',
                        }
                    ],
                }
            ],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
        },
    ];
};