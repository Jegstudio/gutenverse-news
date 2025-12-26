import { __ } from '@wordpress/i18n';
import { SelectControl, CheckboxControl, RangeControl, TextControl, GradientWithAngleControl, BackgroundControl, ColorControl, IconSVGControl } from 'gutenverse-core/controls';

export const sliderPanel = (props) => {
    const {
        autoplay,
        metaDateFormat,
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
            id: 'excerptLength',
            label: __('Excerpt Length', 'gutenverse-news'),
            description: __('Set word length of excerpt on post block.', 'gutenverse-news'),
            component: RangeControl,
            min: 1,
            max: 200,
            step: 1
        },
        {
            id: 'excerptEllipsis',
            label: __('Excerpt Ellipsis', 'gutenverse-news'),
            description: __('Define excerpt ellipsis', 'gutenverse-news'),
            component: TextControl,
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
            id: 'gapBetweenButton',
            show: !hideNavigationButton,
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
                    'id': 'gapBetweenButton',
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
