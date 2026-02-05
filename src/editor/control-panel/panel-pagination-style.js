import { __ } from '@wordpress/i18n';
import { TypographyControl, HeadingControl, DimensionControl, IconRadioControl, SizeControl, SwitchControl, ColorControl, BackgroundControl, BorderControl, BoxShadowControl, AlertControl, CheckboxControl, SelectControl, RangeControl, BorderResponsiveControl } from 'gutenverse-core/controls';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const paginationStylePanel = (props) => {
    const {
        elementId,
        paginationMode,
        showNavText,
        paginationDisableSeparator,
        paginationWrapperAlign,
        switcher,
        setSwitcher,
    } = props;

    const device = getDeviceType();

    const btnSwitchOpts = [
        {
            value: 'normal',
            label: 'Normal'
        },
        {
            value: 'hover',
            label: 'Hover'
        }
    ];

    const nextPrevBtnSwitchOpts = [
        ...btnSwitchOpts,
        {
            value: 'disable',
            label: 'Disable'
        },
    ];

    let btnAlignOpts = [
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
    ];

    if (paginationMode === 'nextprev' || paginationMode === 'number') {
        btnAlignOpts = [
            ...btnAlignOpts,
            {
                label: __('Edge', 'gutenverse-news'),
                value: 'space-between',
                icon: <AlignJustify />,
            },
        ];
    }

    return [
        {
            id: 'enableNotice',
            component: AlertControl,
            show: paginationMode === 'disable' || paginationMode === '',
            children: <>
                <span>{__('Enable pagination to use these options.', 'gutenverse-news')}</span>
            </>
        },
        {
            id: 'paginationWrapperMargin',
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
            show: paginationMode !== 'disable' && paginationMode !== '',
        },
        {
            id: 'paginationWrapperAlign',
            label: __('Alignment', 'gutenverse-news'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: btnAlignOpts,
            show: paginationMode !== 'disable' && paginationMode !== '',
        },
        {
            id: 'paginationBtnGap',
            label: __('Gap', 'gutenverse-news'),
            component: SizeControl,
            show: (paginationMode !== 'disable' && paginationMode !== '') && (paginationWrapperAlign?.[device] !== 'space-between'),
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
                    'type': 'unitPoint',
                    'id': 'paginationBtnGap',
                    'properties': [
                        {
                            'name': 'gap',
                            'valueType': 'direct'
                        }
                    ],
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav, .${elementId} .gvnews_block_navigation .gvnews_block_loadmore`,
                }
            ]
        },
        {
            id: 'paginationDisableSeparator',
            label: __('Disable Separator', 'gutenverse-news'),
            component: CheckboxControl,
            show: (paginationMode !== 'disable' && paginationMode !== '') && (paginationWrapperAlign?.[device] !== 'space-between'),
        },
        {
            id: 'paginationSeparatorStyle',
            label: __('Separator Style', 'gutenverse-news'),
            component: SelectControl,
            show: (paginationMode !== 'disable' && paginationMode !== '') && !paginationDisableSeparator && (paginationWrapperAlign?.[device] !== 'space-between'),
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
            id: 'paginationSeparatorColor',
            component: ColorControl,
            show: (paginationMode !== 'disable' && paginationMode !== '') && !paginationDisableSeparator && (paginationWrapperAlign?.[device] !== 'space-between'),
            label: __('Separator Color', 'gutenverse-news'),
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'paginationSeparatorColor',
                    'properties': [
                        {
                            'name': 'border-bottom-color',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav:before, .${elementId} .gvnews_block_navigation .gvnews_block_nav:after, .${elementId} .gvnews_block_navigation .gvnews_block_loadmore:before, .${elementId} .gvnews_block_navigation .gvnews_block_loadmore:after`,
                }
            ]
        },
        {
            id: 'paginationSeparatorWidth',
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
            show: (paginationMode !== 'disable' && paginationMode !== '') && !paginationDisableSeparator && (paginationWrapperAlign?.[device] !== 'space-between'),
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'paginationSeparatorWidth',
                    'properties': [
                        {
                            'name': 'border-bottom-width',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav:before, .${elementId} .gvnews_block_navigation .gvnews_block_nav:after, .${elementId} .gvnews_block_navigation .gvnews_block_loadmore:before, .${elementId} .gvnews_block_navigation .gvnews_block_loadmore:after`,
                }
            ]
        },
        {
            id: 'nextPrevBtnHeading',
            component: HeadingControl,
            first: false,
            label: __('Button Style'),
            show: paginationMode !== 'disable' && paginationMode !== '',
        },
        {
            id: 'paginationBtnTypography',
            label: __('Typography', 'gutenverse-news'),
            component: TypographyControl,
            show: (paginationMode === 'loadmore' || paginationMode === 'scrollload') || ((paginationMode === 'nextprev' || paginationMode === 'number') && showNavText),
            liveStyle: [
                {
                    'type': 'typography',
                    'id': 'paginationBtnTypography',
                    'selector': `.${elementId}.gvnews-block.gvnews-block-wrapper .gvnews_block_navigation a`,
                }
            ]
        },
        {
            id: 'paginationBtnIconSize',
            label: __('Icon Size', 'gutenverse-news'),
            component: SizeControl,
            show: paginationMode === 'nextprev' || paginationMode === 'number',
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
                    'id': 'paginationBtnIconSize',
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'direct'
                        }
                    ],
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav i, .${elementId} .gvnews_block_navigation .gvnews_block_nav .gutenverse-icon-svg svg`,
                }
            ]
        },
        {
            id: 'paginationBtnIconSpacing',
            label: __('Icon Spacing', 'gutenverse-news'),
            component: SizeControl,
            allowDeviceControl: true,
            show: (paginationMode === 'nextprev' || paginationMode === 'number') && showNavText,
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
                    'id': 'paginationBtnIconSpacing',
                    'properties': [
                        {
                            'name': 'margin-left',
                            'valueType': 'direct'
                        }
                    ],
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav.showtext .next i, .${elementId} .gvnews_block_navigation .gvnews_block_nav.showtext .next svg`,
                },
                {
                    'type': 'unitPoint',
                    'id': 'paginationBtnIconSpacing',
                    'properties': [
                        {
                            'name': 'margin-right',
                            'valueType': 'direct'
                        }
                    ],
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav.showtext .prev i, .${elementId} .gvnews_block_navigation .gvnews_block_nav.showtext .prev svg`,
                },
            ]
        },
        {
            id: 'paginationBtnWidth',
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
            show: paginationMode !== 'disable' && paginationMode !== '',
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'paginationBtnWidth',
                    'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a, .${elementId} .gvnews_block_navigation .gvnews_block_nav a`,
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
            id: 'paginationBtnHeight',
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
            show: paginationMode !== 'disable' && paginationMode !== '',
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'paginationBtnHeight',
                    'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a, .${elementId} .gvnews_block_navigation .gvnews_block_nav a`,
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
            id: 'paginationNumberBtnWidth',
            label: __('Number Width', 'gutenverse-news'),
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
            show: paginationMode === 'number',
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'paginationNumberBtnWidth',
                    'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav.number a.btn-pagination`,
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
            id: 'paginationNumberBtnHeight',
            label: __('Number Height', 'gutenverse-news'),
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
            show: paginationMode === 'number',
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'paginationNumberBtnHeight',
                    'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav.number a`,
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
            id: '__paginationBtnHover',
            component: SwitchControl,
            options: (paginationMode === 'nextprev' || paginationMode === 'number') ? nextPrevBtnSwitchOpts : btnSwitchOpts,
            show: paginationMode !== 'disable' && paginationMode !== '',
            onChange: ({ __paginationBtnHover }) => setSwitcher({ ...switcher, state: __paginationBtnHover })
        },
        {
            id: 'paginationBtnColor',
            component: ColorControl,
            show: (!switcher.__paginationBtnHover || switcher.__paginationBtnHover === 'normal') && (paginationMode !== 'disable' && paginationMode !== ''),
            label: __('Color', 'gutenverse-news'),
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'paginationBtnColor',
                    'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a, .${elementId} .gvnews_block_navigation .gvnews_block_nav a:not(.disabled)`,
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
            id: 'paginationBtnBackground',
            component: BackgroundControl,
            show: (!switcher.__paginationBtnHover || switcher.__paginationBtnHover === 'normal') && (paginationMode !== 'disable' && paginationMode !== ''),
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'paginationBtnBackground',
                    'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a, .${elementId} .gvnews_block_navigation .gvnews_block_nav a:not(.disabled)`,
                }
            ]
        },
        {
            id: 'paginationBtnBorder',
            label: __('Border', '--gctd--'),
            show: (!switcher.__paginationBtnHover || switcher.__paginationBtnHover === 'normal') && device === 'Desktop' && (paginationMode !== 'disable' && paginationMode !== ''),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'paginationBtnBorder',
                    'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a, .${elementId} .gvnews_block_navigation .gvnews_block_nav a:not(.disabled)`,
                }
            ]
        },
        {
            id: 'paginationBtnBorderResponsive',
            show: (!switcher.__paginationBtnHover || switcher.__paginationBtnHover === 'normal') && device !== 'Desktop' && (paginationMode !== 'disable' && paginationMode !== ''),
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'id': 'paginationBtnBorderResponsive',
                    'type': 'borderResponsive',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a, .${elementId} .gvnews_block_navigation .gvnews_block_nav a:not(.disabled)`,
                }
            ]
        },
        {
            id: 'paginationBtnBoxShadow',
            label: __('Box Shadow', '--gctd--'),
            show: (!switcher.__paginationBtnHover || switcher.__paginationBtnHover === 'normal') && (paginationMode !== 'disable' && paginationMode !== ''),
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
                    'id': 'paginationBtnBoxShadow',
                    'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a, .${elementId} .gvnews_block_navigation .gvnews_block_nav a:not(.disabled)`,
                }
            ]
        },
        {
            id: 'paginationBtnHoverColor',
            component: ColorControl,
            show: switcher.__paginationBtnHover === 'hover' && (paginationMode !== 'disable' && paginationMode !== ''),
            label: __('Color', 'gutenverse-news'),
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'paginationBtnHoverColor',
                    'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a:hover, .${elementId} .gvnews_block_navigation .gvnews_block_nav a:not(.current):not(.disabled):hover, .${elementId} .gvnews_block_navigation .gvnews_block_nav.number a.btn-pagination.current`,
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
            id: 'paginationBtnHoverBackground',
            component: BackgroundControl,
            show: switcher.__paginationBtnHover === 'hover' && (paginationMode !== 'disable' && paginationMode !== ''),
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'paginationBtnHoverBackground',
                    'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a:hover, .${elementId} .gvnews_block_navigation .gvnews_block_nav a:not(.current):not(.disabled):hover, .${elementId} .gvnews_block_navigation .gvnews_block_nav.number a.btn-pagination.current`,
                }
            ]
        },
        {
            id: 'paginationBtnHoverBorder',
            label: __('Border', '--gctd--'),
            show: switcher.__paginationBtnHover === 'hover' && device === 'Desktop' && (paginationMode !== 'disable' && paginationMode !== ''),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'paginationBtnHoverBorder',
                    'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a:hover, .${elementId} .gvnews_block_navigation .gvnews_block_nav a:not(.current):not(.disabled):hover, .${elementId} .gvnews_block_navigation .gvnews_block_nav.number a.btn-pagination.current`,
                }
            ]
        },
        {
            id: 'paginationBtnHoverBorderResponsive',
            show: switcher.__paginationBtnHover === 'hover' && device !== 'Desktop' && (paginationMode !== 'disable' && paginationMode !== ''),
            label: __('Border', '--gctd--'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'id': 'paginationBtnHoverBorderResponsive',
                    'type': 'borderResponsive',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a:hover, .${elementId} .gvnews_block_navigation .gvnews_block_nav a:not(.current):not(.disabled):hover, .${elementId} .gvnews_block_navigation .gvnews_block_nav.number a.btn-pagination.current`,
                }
            ]
        },
        {
            id: 'paginationBtnHoverBoxShadow',
            label: __('Box Shadow', '--gctd--'),
            show: switcher.__paginationBtnHover === 'hover' && (paginationMode !== 'disable' && paginationMode !== ''),
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
                    'id': 'paginationBtnHoverBoxShadow',
                    'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a:hover, .${elementId} .gvnews_block_navigation .gvnews_block_nav a:not(.current):not(.disabled):hover, .${elementId} .gvnews_block_navigation .gvnews_block_nav.number a.btn-pagination.current`,
                }
            ]
        },
        {
            id: 'paginationBtnDisableColor',
            component: ColorControl,
            show: switcher.__paginationBtnHover === 'disable' && (paginationMode !== 'disable' && paginationMode !== ''),
            label: __('Color', 'gutenverse-news'),
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'paginationBtnDisableColor',
                    'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav a.disabled`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'paginationBtnDisableBackground',
            component: BackgroundControl,
            show: switcher.__paginationBtnHover === 'disable' && (paginationMode !== 'disable' && paginationMode !== ''),
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'paginationBtnDisableBackground',
                    'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav a.disabled`,
                }
            ]
        },
        {
            id: 'paginationBtnDisableBorder',
            label: __('Border', '--gctd--'),
            show: switcher.__paginationBtnHover === 'disable' && device === 'Desktop' && (paginationMode !== 'disable' && paginationMode !== ''),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'paginationBtnDisableBorder',
                    'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav a.disabled`,
                }
            ]
        },
        {
            id: 'paginationBtnDisableBorderResponsive',
            show: switcher.__paginationBtnHover === 'disable' && device !== 'Desktop' && (paginationMode !== 'disable' && paginationMode !== ''),
            label: __('Border', '--gctd--'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'id': 'paginationBtnDisableBorderResponsive',
                    'type': 'borderResponsive',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav a.disabled`,
                }
            ]
        },
        {
            id: 'paginationBtnDisableBoxShadow',
            label: __('Box Shadow', '--gctd--'),
            show: switcher.__paginationBtnHover === 'disable' && (paginationMode !== 'disable' && paginationMode !== ''),
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
                    'id': 'paginationBtnDisableBoxShadow',
                    'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav a.disabled`,
                }
            ]
        },
        {
            id: 'paginationBtnDisableOpacity',
            label: __('Opacity', '--gctd--'),
            show: switcher.__paginationBtnHover === 'disable' && (paginationMode !== 'disable' && paginationMode !== ''),
            component: RangeControl,
            min: 0,
            max: 1,
            step: 0.1,
            liveStyle: [
                {
                    'type': 'plain',
                    'properties': [
                        {
                            'name': 'opacity',
                            'valueType': 'direct'
                        }
                    ],
                    'id': 'paginationBtnDisableOpacity',
                    'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav a.disabled`,
                }
            ]
        },
    ];
};
