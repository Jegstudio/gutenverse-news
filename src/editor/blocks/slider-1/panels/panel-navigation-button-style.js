import { __ } from '@wordpress/i18n';
import { CheckboxControl, ColorControl, DimensionControl, IconControl, RangeControl, SwitchControl } from 'gutenverse-core/controls';

export const navigationButtonStylePanel = (props) => {
    const {
        switcher,
        setSwitcher,
    } = props;

    return [
        {
            id: 'hideNavigationButton',
            label: __('Hide Button Navigation'),
            component: CheckboxControl,
        },
        {
            id: 'hideImageNavigation',
            label: __('Hide Image Navigation'),
            component: CheckboxControl,
        },
        {
            id: 'tootlipColor',
            show: !props.hideImageNavigation,
            label: __('Tootlip Background Color', 'gutenverse-news'),
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
            label: __('Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'nextButtonColorHover',
            show: (!switcher.buttonType || switcher.buttonType === 'next') && !props.hideNavigationButton,
            label: __('Color Hover', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'nextButtonBgColor',
            show: (!switcher.buttonType || switcher.buttonType === 'next') && !props.hideNavigationButton,
            label: __('Background Color', 'gutenverse-news'),
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
            label: __('Transition Duration', 'gutenverse-news'),
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
            label: __('Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'prevButtonColorHover',
            show: (switcher.buttonType === 'prev') && !props.hideNavigationButton,
            label: __('Color Hover', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'nextButtonBgColor',
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
            label: __('Transition Duration', 'gutenverse-news'),
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