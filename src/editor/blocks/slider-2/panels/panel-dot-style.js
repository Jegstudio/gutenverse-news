import { __ } from '@wordpress/i18n';
import { RangeControl, ColorControl, SwitchControl, CheckboxControl } from 'gutenverse-core/controls';

export const dotStylePanel = (props) => {
    const {
        elementId,
        setSwitcher,
        switcher,
    } = props;

    const dotTypeNormal = !switcher.dotType || switcher.dotType === 'normal';
    const dotTypeHover = switcher.dotType === 'hover';
    const dotTypeActive = switcher.dotType === 'active';
    return [
        {
            id: 'alwaysShowDot',
            label: __('Always Show Dot', 'gutenverse-news'),
            component: CheckboxControl,
        },
        {
            id: 'dotGap',
            label: __('Dot Gap', 'gutenverse-news'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            unit: 'px',
            liveStyle: [
                {
                    'id': 'dotGap',
                    'type': 'plain',
                    'properties': [
                        {
                            'name': 'gap',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                },
                            }
                        }
                    ],
                    'selector': `.${elementId} .gvnews_slider_type_2_wrapper .tns-nav`,
                }
            ]
        },
        {
            id: '__dotType',
            label: __('Dot Type', 'gutenverse-news'),
            component: SwitchControl,
            options: [
                {
                    label: __('Normal', 'gutenverse-news'),
                    value: 'normal'
                },
                {
                    label: __('Hover', 'gutenverse-news'),
                    value: 'hover'
                },
                {
                    label: __('Active', 'gutenverse-news'),
                    value: 'active'
                }
            ],
            onChange: ({ __dotType }) => setSwitcher({ ...switcher, dotType: __dotType })
        },
        // Normal
        {
            id: 'dotNormalColor',
            show: dotTypeNormal,
            label: __('Dot Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'dotBorderNormalColor',
            show: dotTypeNormal,
            label: __('Dot Border Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'dotNormalSize',
            show: dotTypeNormal,
            label: __('Dot Size', 'gutenverse-news'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 0,
            max: 100,
            step: 1,
            unit: 'px',
            liveStyle: [
                {
                    'id': 'dotNormalSize',
                    'type': 'plain',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                },
                            }
                        },
                        {
                            'name': 'height',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                },
                            }
                        },
                        {
                            'name': 'border-radius',
                            'valueType': 'pattern',
                            'pattern': '100%',
                        }
                    ],
                    'selector': `.${elementId} .gvnews_slider_type_2_wrapper .tns-nav button`,
                }
            ]
        },
        // Hover
        {
            id: 'dotHoverColor',
            show: dotTypeHover,
            label: __('Dot Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'dotBorderHoverColor',
            show: dotTypeHover,
            label: __('Dot Border Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'dotHoverSize',
            show: dotTypeHover,
            allowDeviceControl: true,
            label: __('Dot Size', 'gutenverse-news'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            unit: 'px',
            liveStyle: [
                {
                    'id': 'dotHoverSize',
                    'type': 'plain',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                },
                            }
                        },
                        {
                            'name': 'height',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                },
                            }
                        },
                        {
                            'name': 'border-radius',
                            'valueType': 'pattern',
                            'pattern': '100%',
                        }
                    ],
                    'selector': `.${elementId} .gvnews_slider_type_2_wrapper .tns-nav button:hover`,
                }
            ]
        },
        // Active
        {
            id: 'dotActiveColor',
            show: dotTypeActive,
            label: __('Dot Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'dotBorderActiveColor',
            show: dotTypeActive,
            label: __('Dot Border Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'dotActiveSize',
            show: dotTypeActive,
            label: __('Dot Size', 'gutenverse-news'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 0,
            max: 100,
            step: 1,
            unit: 'px',
        }
    ];
};