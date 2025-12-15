import { __ } from '@wordpress/i18n';
import { CheckboxControl, ColorControl, DimensionControl, IconControl, RangeControl, SwitchControl } from 'gutenverse-core/controls';

export const navigationButtonStylePanel = (props) => {
    const {
        switcher,
        setSwitcher,
        sliderType,
        hideNavigationButton,
        alwaysShowNavigationButton,
        elementId
    } = props;


    return [
        {
            id: 'hideNavigationButton',
            show: !alwaysShowNavigationButton && sliderType !== 'slider-7',
            label: __('Hide Button Navigation'),
            component: CheckboxControl,
        },
        {
            id: 'alwaysShowNavigationButton',
            show: !hideNavigationButton && ['slider-4', 'slider-5', 'slider-6', 'slider-8'].includes(sliderType),
            label: __('Always Show Button Navigation'),
            component: CheckboxControl,
        },
        {
            id: 'hideImageNavigation',
            show: sliderType === 'slider-1',
            label: __('Hide Image Navigation'),
            component: CheckboxControl,
        },
        {
            id: 'transitionShow',
            show: !hideNavigationButton && !alwaysShowNavigationButton && ['slider-4', 'slider-5', 'slider-6', 'slider-8'].includes(sliderType),
            label: __('Transition Show Duration', 'gutenverse-news'),
            component: RangeControl,
            min: 0,
            max: 10000,
            unit: 'ms',
            step: 100,
        },
        {
            id: 'gapButton',
            show: !hideNavigationButton && sliderType === 'slider-6',
            label: __('Gap Button', 'gutenverse-news'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 0,
            max: 1000,
            unit: 'px',
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'gapButton',
                    'responsive': true,
                    'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls`,
                    'properties': [
                        {
                            'name': 'gap',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'tootlipColor',
            description: __('Active slider marker in image navigation', 'gutenverse-news'),
            show: !props.hideImageNavigation && sliderType === 'slider-1',
            label: __('Tootlip Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: '__buttonType',
            component: SwitchControl,
            show: !props.hideNavigationButton,
            options: [
                {
                    value: 'next',
                    label: 'Next'
                },
                {
                    value: 'prev',
                    label: 'Previous'
                }
            ],
            onChange: ({ __buttonType }) => setSwitcher({ ...switcher, buttonType: __buttonType })
        },
        // Next
        {
            id: 'nextButtonIcon',
            show: (!switcher.buttonType || switcher.buttonType === 'next') && !props.hideNavigationButton,
            label: __('Icon', 'gutenverse-news'),
            component: IconControl,
        },
        {
            id: 'nextButtonColor',
            show: (!switcher.buttonType || switcher.buttonType === 'next') && !props.hideNavigationButton,
            label: __('Icon Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'nextButtonColorHover',
            show: (!switcher.buttonType || switcher.buttonType === 'next') && !props.hideNavigationButton,
            label: __('Icon Color Hover', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'nextButtonBgColor',
            show: (!switcher.buttonType || switcher.buttonType === 'next') && !props.hideNavigationButton,
            label: __('Background Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'nextTextColor',
            show: (!switcher.buttonType || switcher.buttonType === 'next') && !props.hideNavigationButton && ['slider-6', 'slider-7'].includes(sliderType),
            label: __('Text Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'nextTextColorHover',
            show: (!switcher.buttonType || switcher.buttonType === 'next') && !props.hideNavigationButton && ['slider-6', 'slider-7'].includes(sliderType),
            label: __('Text Color Hover', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'nextButtonBgColorHover',
            show: (!switcher.buttonType || switcher.buttonType === 'next') && !props.hideNavigationButton,
            label: __('Background Color Hover', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'nextButtonTransition',
            show: (!switcher.buttonType || switcher.buttonType === 'next') && !props.hideNavigationButton,
            label: __('Transition Hover Duration', 'gutenverse-news'),
            component: RangeControl,
            min: 0,
            max: 10000,
            unit: 'ms',
            step: 100,
        },
        {
            id: 'nextButtonSize',
            show: (!switcher.buttonType || switcher.buttonType === 'next') && !props.hideNavigationButton,
            label: __('Size', 'gutenverse-news'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 100,
            unit: 'px',
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'nextButtonSize',
                    'responsive': true,
                    'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-next`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'pattern',
                            'pattern': '{value}px; height: fit-content; width: fit-content;',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                }
                            }
                        },
                    ],
                }
            ]
        },
        {
            id: 'nextButtonGap',
            show: (!switcher.buttonType || switcher.buttonType === 'next') && !props.hideNavigationButton && ['slider-6', 'slider-7'].includes(sliderType),
            label: __('Text Gap', 'gutenverse-news'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 100,
            unit: 'px',
            step: 1,
        },
        {
            id: 'nextButtonPadding',
            show: (!switcher.buttonType || switcher.buttonType === 'next') && !props.hideNavigationButton,
            label: __('Padding', 'gutenverse-news'),
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
        },
        // Prev
        {
            id: 'prevButtonIcon',
            show: (switcher.buttonType === 'prev') && !props.hideNavigationButton,
            label: __('Icon', 'gutenverse-news'),
            component: IconControl
        },
        {
            id: 'prevButtonColor',
            show: (switcher.buttonType === 'prev') && !props.hideNavigationButton,
            label: __('Icon Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'prevButtonColorHover',
            show: (switcher.buttonType === 'prev') && !props.hideNavigationButton,
            label: __('Icon Color Hover', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'prevTextColor',
            show: (switcher.buttonType === 'prev') && !props.hideNavigationButton && ['slider-6', 'slider-7'].includes(sliderType),
            label: __('Text Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'prevTextColorHover',
            show: (switcher.buttonType === 'prev') && !props.hideNavigationButton && ['slider-6', 'slider-7'].includes(sliderType),
            label: __('Text Color Hover', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'prevButtonBgColor',
            show: (switcher.buttonType === 'prev') && !props.hideNavigationButton,
            label: __('Background Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'prevButtonBgColorHover',
            show: (switcher.buttonType === 'prev') && !props.hideNavigationButton,
            label: __('Background Color Hover', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'prevButtonTransition',
            show: (switcher.buttonType === 'prev') && !props.hideNavigationButton,
            label: __('Transition Hover Duration', 'gutenverse-news'),
            component: RangeControl,
            min: 0,
            max: 10000,
            unit: 'ms',
            step: 100,
        },
        {
            id: 'prevButtonSize',
            show: (switcher.buttonType === 'prev') && !props.hideNavigationButton,
            label: __('Size', 'gutenverse-news'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 100,
            unit: 'px',
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'prevButtonSize',
                    'responsive': true,
                    'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-prev`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'pattern',
                            'pattern': '{value}px; height: fit-content; width: fit-content;',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                }
                            }
                        },
                    ],
                }
            ]
        },
        {
            id: 'prevButtonGap',
            show: (switcher.buttonType === 'prev') && !props.hideNavigationButton && ['slider-6', 'slider-7'].includes(sliderType),
            label: __('Text Gap', 'gutenverse-news'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 100,
            unit: 'px',
            step: 1,
        },
        {
            id: 'prevButtonPadding',
            show: (switcher.buttonType === 'prev') && !props.hideNavigationButton,
            label: __('Padding', 'gutenverse-news'),
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
        },
    ];
};