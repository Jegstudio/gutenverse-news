import { __ } from '@wordpress/i18n';
import { BorderControl, BorderResponsiveControl, BackgroundControl, ColorControl, DimensionControl, RangeControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const designPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
        paginationMode,
        paginationPageinfo,
        paginationAlign,
        paginationNavtext
    } = props;
    const device = getDeviceType();

    return [
        {
            id: 'paginationTypography',
            label: __('Pagination Typography', 'gutenverse-news'),
            description: __('This option will change your pagination typography.', 'gutenverse-news'),
            component: TypographyControl,
        },

        {
            id: 'pagintaionInfoTypography',
            label: __('Info Typography', 'gutenverse-news'),
            show: paginationPageinfo,
            description: __('This option will change your pagination info typography.', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'paginationButtonTypography',
            label: __('Button Text Typography', 'gutenverse-news'),
            show: paginationMode === 'nav_3',
            description: __('This option will change your pagination next and prev button typography.', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'numberHeight',
            label: __('Pagination Number Height', 'gutenverse'),
            show: 'nav_3' !== paginationMode,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            component: RangeControl,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'numberHeight',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_pagination .nav-wrapper .nav-item:not(.page_nav)`,
                    'properties': [
                        {
                            'name': 'height',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'numberWidth',
            label: __('Pagination Number Width', 'gutenverse'),
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            component: RangeControl,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'width',
                    'id': 'numberWidth',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_pagination .nav-wrapper .nav-item:not(.page_nav)`,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'nextPrevHeight',
            label: __('Next/Prev Button Height', 'gutenverse'),
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            component: RangeControl,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'nextPrevHeight',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_pagination .page_nav`,
                    'properties': [
                        {
                            'name': 'height',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'nextPrevWidth',
            label: __('Next/Prev Button Width', 'gutenverse'),
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            component: RangeControl,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'width',
                    'id': 'nextPrevWidth',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_pagination .page_nav`,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'numberGap',
            label: __('Pagination Gap', 'gutenverse'),
            min: 0,
            max: 50,
            step: 1,
            allowDeviceControl: true,
            component: RangeControl,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'numberGap',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_pagination .nav-wrapper`,
                    'properties': [
                        {
                            'name': 'gap',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'nextPrevGap',
            label: __('Next Prev Gap', 'gutenverse'),
            min: 0,
            max: 50,
            step: 1,
            allowDeviceControl: true,
            show: paginationMode === 'nav_3' && paginationAlign === 'left',
            component: RangeControl,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'nextPrevGap',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_pagination .next-prev-button`,
                    'properties': [
                        {
                            'name': 'gap',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'lineThick',
            label: __('Line Thick', 'gutenverse'),
            min: 0,
            max: 50,
            step: 1,
            allowDeviceControl: true,
            component: RangeControl,
            unit: 'px',
            show: paginationMode === 'nav_3',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'lineThick',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_pagenav_3 ,.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pagenav_3 .page_number`,
                    'properties': [
                        {
                            'name': 'border-top-width',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ]
                }
            ]
        },

        {
            id: 'lineGap',
            label: __('Line Gap', 'gutenverse'),
            min: 0,
            max: 50,
            step: 1,
            allowDeviceControl: true,
            component: RangeControl,
            unit: 'px',
            show: paginationMode === 'nav_3',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'lineGap',
                    'responsive': true,
                    'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pagenav_3 .nav-wrapper .nav-item`,
                    'properties': [
                        {
                            'name': 'padding-top',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'infoGap',
            label: __('Info Gap', 'gutenverse'),
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            component: RangeControl,
            unit: 'px',
            show: paginationPageinfo && paginationAlign === 'center',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'infoGap',
                    'responsive': true,
                    'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} ${paginationMode === 'nav_3' ? '.gvnews_pagenav_3.gvnews_aligncenter' : '.gvnews_pagination .page_info'}`,
                    'properties': [
                        {
                            'name': `${paginationMode === 'nav_3' ? 'padding-bottom' : 'margin-bottom'}`,
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'paginationPadding',
            label: __('Padding Button', 'gutenverse'),
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
            id: '__paginationHover',
            component: SwitchControl,
            options: [
                { value: 'normal', label: 'Normal' },
                { value: 'hover', label: 'Hover' },
                { value: 'current', label: 'Active' }
            ],
            onChange: ({ __paginationHover }) => setSwitcher({ ...switcher, paginationHover: __paginationHover })
        },
        {
            id: 'paginationColor',
            show: !switcher.paginationHover || switcher.paginationHover === 'normal',
            label: __('Pagination color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'paginationInfoColor',
            show: paginationPageinfo && (!switcher.paginationHover || switcher.paginationHover === 'normal'),
            label: __('Pagination Info Color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'nextPrevColor',
            show: paginationMode === 'nav_3' && !switcher.paginationHover || switcher.paginationHover === 'normal',
            label: __('Next/Prev color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'paginationCurrentColor',
            show: switcher.paginationHover === 'current',
            label: __('Pagination color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'paginationHoverColor',
            show: switcher.paginationHover === 'hover',
            label: __('Pagination color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'nextPrevHoverColor',
            show: paginationMode === 'nav_3' && switcher.paginationHover === 'hover',
            label: __('Next/Prev color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'paginationBackground',
            show: paginationMode !== 'nav_3' && (!switcher.paginationHover || switcher.paginationHover === 'normal'),
            label: __('Pagination Background', 'gutenverse'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
        },
        {
            id: 'nextPrevBackground',
            show: paginationMode === 'nav_3' && (!switcher.paginationHover || switcher.paginationHover === 'normal'),
            label: __('Next/Prev Background', 'gutenverse'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
        },
        {
            id: 'paginationCurrentBackground',
            show: paginationMode !== 'nav_3' && switcher.paginationHover === 'current',
            label: __('Pagination Background', 'gutenverse'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
        },
        {
            id: 'paginationHoverBackground',
            show: paginationMode !== 'nav_3' && switcher.paginationHover === 'hover',
            label: __('Pagination Background', 'gutenverse'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
        },
        {
            id: 'nextPrevHoverBackground',
            show: paginationMode === 'nav_3' && switcher.paginationHover === 'hover',
            label: __('Next/Prev Background', 'gutenverse'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
        },
        {
            id: 'paginationBorder',
            show: (!switcher.paginationHover || switcher.paginationHover === 'normal') && device === 'Desktop',
            label: __('Button Border', 'gutenverse'),
            component: BorderControl,
        },
        {
            id: 'paginationBorderResponsive',
            show: (!switcher.paginationHover || switcher.paginationHover === 'normal') && device !== 'Desktop',
            label: __('Button Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
        },
        {
            id: 'paginationHoverBorder',
            show: switcher.paginationHover === 'hover' && device === 'Desktop',
            label: __('Button Border', 'gutenverse'),
            component: BorderControl,
        },
        {
            id: 'paginationHoverBorderResponsive',
            show: switcher.paginationHover === 'hover' && device !== 'Desktop',
            label: __('Button Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
        },
        {
            id: 'paginationActiveBorder',
            show: paginationMode !== 'nav_3' && switcher.paginationHover === 'current' && device === 'Desktop',
            label: __('Button Border', 'gutenverse'),
            component: BorderControl,
        },
        {
            id: 'paginationActiveBorderResponsive',
            show: paginationMode !== 'nav_3' && switcher.paginationHover === 'current' && device !== 'Desktop',
            label: __('Button Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
        },
    ];
};