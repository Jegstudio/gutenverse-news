import { __ } from '@wordpress/i18n';
import { SelectControl, CheckboxControl, RangeControl, TextControl, IconSVGControl } from 'gutenverse-core/controls';

export const sliderPanel = (props) => {
    const {
        autoplay,
        columnWidth,
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
            id: 'columnWidth',
            label: __('Slider Style', 'gutenverse-news'),
            description: __('Please choose width of column you want to use on this block. 1 Block represents 4 columns.', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    value: '4',
                    label: __('Half', 'gutenverse-news')
                },
                {
                    value: '8',
                    label: __('Full', 'gutenverse-news')
                },
            ]
        },
        {
            id: 'fimagePosition',
            show: columnWidth == '4',
            label: __('Featured Image Position', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    value: 'left',
                    label: __('Left', 'gutenverse-news')
                },
                {
                    value: 'right',
                    label: __('Right', 'gutenverse-news')
                },
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
