import { __ } from '@wordpress/i18n';
import { CheckboxControl, ColorControl, IconSVGControl, RangeControl, SelectControl } from 'gutenverse-core/controls';
import { getDefaultImageLoad } from "../utils/helper";

export const sliderPanel = (props) => {
    const {
        autoplay,
        sliderType,
        hideNavigationButton,
        alwaysShowNavigationButton,
        hideImageNavigation,
        elementId,
        normalImage,
        imageLoad = '',
    } = props;

    const defaultImageLoad = getDefaultImageLoad(imageLoad, normalImage);

    return [
        {
            id: 'autoplay',
            label: __('Enable Autoplay', 'gutenverse-news'),
            component: CheckboxControl
        },
        {
            id: 'hoverEffect',
            label: __('Enable Hover Effect', 'gutenverse-news'),
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
            id: 'imageLoad',
            label: __('Image Load', 'gutenverse'),
            component: SelectControl,
            defaultValue: defaultImageLoad,
            options: [
                {
                    label: __('Normal Load', 'gutenverse'),
                    value: 'eager'
                },
                {
                    label: __('Lazy Load', 'gutenverse'),
                    value: 'lazy'
                },
            ],
        },
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
            id: 'gapBetweenButton',
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
                    'id': 'gapBetweeButton',
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
            show: !hideImageNavigation && sliderType === 'slider-1',
            label: __('Tootlip Color', 'gutenverse-news'),
            component: ColorControl,
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
