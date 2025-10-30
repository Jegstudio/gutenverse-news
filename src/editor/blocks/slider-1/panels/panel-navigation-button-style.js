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
            label: __('Hide Button'),
            component: CheckboxControl,
        },
        {
            id: '__buttonType',
            component: SwitchControl,
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
            show: !switcher.buttonType || switcher.buttonType === 'next',
            label: __('Icon', 'gutenverse-news'),
            component: IconControl,
        },
        {
            id: 'nextButtonColor',
            show: !switcher.buttonType || switcher.buttonType === 'next',
            label: __('Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'nextButtonColorHover',
            show: !switcher.buttonType || switcher.buttonType === 'next',
            label: __('Color Hover', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'nextButtonBgColor',
            show: !switcher.buttonType || switcher.buttonType === 'next',
            label: __('Background Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'nextButtonBgColorHover',
            show: !switcher.buttonType || switcher.buttonType === 'next',
            label: __('Background Color Hover', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'nextButtonSize',
            show: !switcher.buttonType || switcher.buttonType === 'next',
            label: __('Size', 'gutenverse-news'),
            component: RangeControl,
            min: 1,
            max: 100,
            unit: 'px',
            step: 1,
        },
        {
            id: 'nextButtonPadding',
            show: !switcher.buttonType || switcher.buttonType === 'next',
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
            show: switcher.buttonType === 'prev',
            label: __('Icon', 'gutenverse-news'),
            component: IconControl
        },
        {
            id: 'prevButtonColor',
            show: switcher.buttonType === 'prev',
            label: __('Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'prevButtonColorHover',
            show: switcher.buttonType === 'prev',
            label: __('Color Hover', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'nextButtonBgColor',
            show: switcher.buttonType === 'prev',
            label: __('Background Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'prevButtonBgColorHover',
            show: switcher.buttonType === 'prev',
            label: __('Background Color Hover', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'prevButtonSize',
            show: switcher.buttonType === 'prev',
            label: __('Size', 'gutenverse-news'),
            component: RangeControl,
            min: 1,
            max: 100,
            unit: 'px',
            step: 1,
        },
        {
            id: 'prevButtonPadding',
            show: switcher.buttonType === 'prev',
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