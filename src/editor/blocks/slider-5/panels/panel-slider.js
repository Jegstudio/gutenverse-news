import { __ } from '@wordpress/i18n';
import { SelectControl, CheckboxControl, RangeControl, GradientWithAngleControl, ColorControl, IconSVGControl } from 'gutenverse-core/controls';

export const sliderPanel = (props) => {
    const {
        autoplay,
        overlayOption,
        isOverrideOverlay,
        sliderType,
        hideNavigationButton,
        alwaysShowNavigationButton,
        hideImageNavigation,
        elementId
    } = props;
    return [
        {
            id: 'autoplay',
            label: __('Enable Autoplay', 'gutenverse-news'),
            component: CheckboxControl
        },
        {
            id: 'autoplayDelay',
            label: __('Autoplay Delay', 'gutenverse-news'),
            show: autoplay,
            component: RangeControl,
            min: 1000,
            max: 10000,
            step: 500,
        },
        {
            id: 'normalImage',
            label: __('Use Normal Image Load', 'gutenverse-news'),
            description: __('Force it to use normal load image and optimize Largest Contentful Paint (LCP) when using this element at the top of your site.', 'gutenverse-news'),
            component: CheckboxControl
        },
        {
            id: 'overlayOption',
            label: __('Overlay Option', 'gutenverse-news'),
            description: __('Choose which date format you want to use.', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    label: __('Gradient Overlay', 'gutenverse-news'),
                    value: 'gradient'
                },
                {
                    label: __('Normal Overlay', 'gutenverse-news'),
                    value: 'normal'
                },
                {
                    label: __('No Overlay', 'gutenverse-news'),
                    value: 'no'
                },
            ],
        },
        {
            id: 'isOverrideOverlay', // just for gradient type
            show: overlayOption === 'gradient',
            component: CheckboxControl,
            label: __('Override Overlay Color', 'gutenverse-news'),
        },
        {
            id: 'overrideOverlay',
            show: isOverrideOverlay && overlayOption === 'gradient',
            component: GradientWithAngleControl,
        },
        {
            id: 'normalOverlay',
            label: __('Normal Overlay Color', 'gutenverse-news'),
            show: overlayOption === 'normal',
            component: ColorControl,
        },
        {
            id: 'hideNavigationButton',
            show: !alwaysShowNavigationButton,
            label: __('Hide Button Navigation'),
            component: CheckboxControl,
        },
        {
            id: 'alwaysShowNavigationButton',
            show: !hideNavigationButton,
            label: __('Always Show Button Navigation'),
            component: CheckboxControl,
        },
        {
            id: 'transitionShow',
            show: !hideNavigationButton && !alwaysShowNavigationButton,
            label: __('Transition Show Duration', 'gutenverse-news'),
            component: RangeControl,
            min: 0,
            max: 10000,
            unit: 'ms',
            step: 100,
        },
        {
            id: 'nextButtonIcon',
            show: !hideNavigationButton,
            label: __('Icon Next', 'gutenverse-news'),
            component: IconSVGControl,
        },
        {
            id: 'prevButtonIcon',
            show: !hideNavigationButton,
            label: __('Icon Previous', 'gutenverse-news'),
            component: IconSVGControl
        },
    ];
};
