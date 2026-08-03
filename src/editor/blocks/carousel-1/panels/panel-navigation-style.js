import { __ } from '@wordpress/i18n';
import { AlertControl, DimensionControl, IconRadioControl, SizeControl, CheckboxControl, SelectControl, ColorControl, HeadingControl, SwitchControl, BorderResponsiveControl, BoxShadowControl } from 'gutenverse-core/controls';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const navigationStylePanel = (props) => {
    const {
        elementId,
        showNav,
        navigationEnableSeparator = false,
        navigationWrapperAlign,
        switcher,
        setSwitcher,
    } = props;
    const device = getDeviceType();
    const controlsSelector = `.${elementId} .tns-outer .tns-controls`;
    const separatorSelector = `${controlsSelector}:before, ${controlsSelector}:after`;

    return [
        {
            id: 'enableNotice',
            component: AlertControl,
            show: !showNav,
            children: <>
                <span>{__('Show navigation to use these options.', 'gutenverse-news')}</span>
            </>
        },
        {
            id: 'navigationWrapperMargin',
            label: __('Margin', '--gctd--'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
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
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
            show: showNav,
            liveStyle: [
                {
                    type: 'dimension',
                    id: 'navigationWrapperMargin',
                    responsive: true,
                    properties: [
                        {
                            name: 'margin',
                            valueType: 'direct'
                        }
                    ],
                    selector: controlsSelector,
                }
            ]
        },
        {
            id: 'navigationWrapperAlign',
            label: __('Alignment', 'gutenverse-news'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse-news'),
                    value: 'start',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse-news'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse-news'),
                    value: 'end',
                    icon: <AlignRight />,
                },
                {
                    label: __('Edge', 'gutenverse-news'),
                    value: 'space-between',
                    icon: <AlignJustify />,
                },
            ],
            show: showNav,
            liveStyle: [
                {
                    type: 'plain',
                    id: 'navigationWrapperAlign',
                    responsive: true,
                    properties: [
                        {
                            name: 'justify-content',
                            valueType: 'direct'
                        }
                    ],
                    selector: controlsSelector,
                }
            ]
        },
        {
            id: 'navigationBtnGap',
            label: __('Gap', 'gutenverse-news'),
            component: SizeControl,
            show: showNav && navigationWrapperAlign?.[device] !== 'space-between',
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: 'px',
                },
            },
            allowDeviceControl: true,
            liveStyle: [
                {
                    type: 'unitPoint',
                    id: 'navigationBtnGap',
                    properties: [
                        {
                            name: 'gap',
                            valueType: 'direct'
                        }
                    ],
                    responsive: true,
                    selector: controlsSelector,
                }
            ]
        },
        {
            id: 'navigationEnableSeparator',
            label: __('Enable Separator', 'gutenverse-news'),
            component: CheckboxControl,
            show: showNav && navigationWrapperAlign?.[device] !== 'space-between',
        },
        {
            id: 'navigationSeparatorStyle',
            label: __('Separator Style', 'gutenverse-news'),
            component: SelectControl,
            show: showNav && navigationEnableSeparator && navigationWrapperAlign?.[device] !== 'space-between',
            options: [
                {
                    label: __('Default', 'gutenverse-news'),
                    value: '',
                },
                {
                    label: __('Solid', 'gutenverse-news'),
                    value: 'solid',
                },
                {
                    label: __('Double', 'gutenverse-news'),
                    value: 'double',
                },
                {
                    label: __('Dotted', 'gutenverse-news'),
                    value: 'dotted',
                },
                {
                    label: __('Dashed', 'gutenverse-news'),
                    value: 'dashed',
                },
            ]
        },
        {
            id: 'navigationSeparatorColor',
            component: ColorControl,
            show: showNav && navigationEnableSeparator && navigationWrapperAlign?.[device] !== 'space-between',
            label: __('Separator Color', 'gutenverse-news'),
            liveStyle: [
                {
                    type: 'color',
                    id: 'navigationSeparatorColor',
                    properties: [
                        {
                            name: 'border-bottom-color',
                            valueType: 'direct'
                        }
                    ],
                    selector: separatorSelector,
                }
            ]
        },
        {
            id: 'navigationSeparatorWidth',
            label: __('Separator Width', 'gutenverse-news'),
            component: SizeControl,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 50,
                    step: 1,
                    unit: 'px',
                },
            },
            show: showNav && navigationEnableSeparator && navigationWrapperAlign?.[device] !== 'space-between',
            liveStyle: [
                {
                    type: 'unitPoint',
                    id: 'navigationSeparatorWidth',
                    properties: [
                        {
                            name: 'border-bottom-width',
                            valueType: 'direct'
                        }
                    ],
                    selector: separatorSelector,
                }
            ]
        },
        {
            id: 'navigationBtnHeading',
            component: HeadingControl,
            first: false,
            label: __('Button Style'),
            show: showNav,
        },
        {
            id: 'navigationBtnIconSize',
            label: __('Icon Size', 'gutenverse-news'),
            allowDeviceControl: true,
            component: SizeControl,
            show: showNav,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: 'px',
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'navigationBtnIconSize',
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'direct'
                        }
                    ],
                    'responsive': true,
                    'selector': `${controlsSelector} button .gutenverse-icon-svg svg`,
                }
            ]
        },
        {
            id: 'navigationBtnWidth',
            label: __('Width', 'gutenverse-news'),
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: 30,
                    max: 100,
                    step: 1,
                    unit: '%',
                },
                vh: {
                    text: 'vh',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: 'vh',
                },
            },
            component: SizeControl,
            show: showNav,
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'navigationBtnWidth',
                    'selector': `${controlsSelector} button`,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'direct',
                        }
                    ],
                    'responsive': true,
                }
            ]
        },
        {
            id: 'navigationBtnHeight',
            label: __('Height', 'gutenverse-news'),
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: 'px',
                },
            },
            component: SizeControl,
            show: showNav,
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'navigationBtnHeight',
                    'selector': `${controlsSelector} button`,
                    'properties': [
                        {
                            'name': 'height',
                            'valueType': 'direct',
                        }
                    ],
                    'responsive': true,
                }
            ]
        },
        {
            id: '__navigationBtnHover',
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
            show: showNav,
            onChange: ({ __navigationBtnHover }) => setSwitcher({ ...switcher, state: __navigationBtnHover })
        },
        {
            id: 'navigationBtnColor',
            component: ColorControl,
            show: showNav && (!switcher.__navigationBtnHover || switcher.__navigationBtnHover === 'normal'),
            label: __('Color', 'gutenverse-news'),
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'navigationBtnColor',
                    'selector': `${controlsSelector} button`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ],
                }
            ]
        },
        {
            id: 'navigationBtnBgColor',
            component: ColorControl,
            show: showNav && (!switcher.__navigationBtnHover || switcher.__navigationBtnHover === 'normal'),
            label: __('Background Color', 'gutenverse-news'),
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'navigationBtnBgColor',
                    'selector': `${controlsSelector} button`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct',
                        }
                    ],
                }
            ]
        },
        {
            id: 'navigationBtnBorderResponsive',
            show: showNav && (!switcher.__navigationBtnHover || switcher.__navigationBtnHover === 'normal'),
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'id': 'navigationBtnBorderResponsive',
                    'type': 'borderResponsive',
                    'responsive': true,
                    'selector': `${controlsSelector} button`,
                }
            ]
        },
        {
            id: 'navigationBtnBoxShadow',
            label: __('Box Shadow', '--gctd--'),
            show: showNav && (!switcher.__navigationBtnHover || switcher.__navigationBtnHover === 'normal'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'id': 'navigationBtnBoxShadow',
                    'selector': `${controlsSelector} button`,
                }
            ]
        },
        {
            id: 'navigationBtnColorHover',
            component: ColorControl,
            show: showNav && (switcher.__navigationBtnHover === 'hover'),
            label: __('Color', 'gutenverse-news'),
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'navigationBtnColorHover',
                    'selector': `${controlsSelector} button:hover`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ],
                }
            ]
        },
        {
            id: 'navigationBtnBgColorHover',
            component: ColorControl,
            show: showNav && (switcher.__navigationBtnHover === 'hover'),
            label: __('Background Color', 'gutenverse-news'),
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'navigationBtnBgColorHover',
                    'selector': `${controlsSelector} button:hover`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct',
                        }
                    ],
                }
            ]
        },
        {
            id: 'navigationBtnBorderResponsiveHover',
            show: showNav && (switcher.__navigationBtnHover === 'hover'),
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'id': 'navigationBtnBorderResponsiveHover',
                    'type': 'borderResponsive',
                    'responsive': true,
                    'selector': `${controlsSelector} button:hover`,
                }
            ]
        },
        {
            id: 'navigationBtnBoxShadowHover',
            label: __('Box Shadow', '--gctd--'),
            show: showNav && (switcher.__navigationBtnHover === 'hover'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'id': 'navigationBtnBoxShadow',
                    'selector': `${controlsSelector} button:hover`,
                }
            ]
        },
    ];
};
