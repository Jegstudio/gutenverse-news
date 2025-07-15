import { __ } from '@wordpress/i18n';
import { ColorControl, RangeControl, TypographyControl } from 'gutenverse-core/controls';

export const stylingPanel = () => {

    return [
        {
            id: 'typography',
            label: __('Breadcrumb Typography', 'gutenverse-news'),
            description: __('This option will change your breadcrumb typography.', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'gap',
            label: __('Gap', 'gutenverse-news'),
            description: __('Value between arrow and text', 'gutenverse-news'),
            component: RangeControl,
            min: 1,
            max: 100,
            unit: 'px',
            step: 1,
        },
        {
            id: 'textColor',
            component: ColorControl,
            label: __('Text Color', 'gutenverse-news'),
            description: __('Set text color.', 'gutenverse-news'),
        },
        {
            id: 'textColorHover',
            component: ColorControl,
            label: __('Hover Text Color', 'gutenverse-news'),
            description: __('Set hover text color.', 'gutenverse-news'),
        },
        {
            id: 'arrowColor',
            component: ColorControl,
            label: __('Arrow Color', 'gutenverse-news'),
            description: __('Set arrow icon color.', 'gutenverse-news'),
        },
    ];
};