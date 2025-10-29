import { __ } from '@wordpress/i18n';
import { ColorControl, TypographyControl } from 'gutenverse-core/controls';

export const titleStylePanel = () => {
    return [
        {
            id: 'titleTypography',
            label: __('Typography', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'titleColor',
            label: __('Color', 'gutenvser-news'),
            component: ColorControl,
        },
        {
            id: 'titleColorHover',
            label: __('Color Hover', 'gutenverse-news'),
            component: ColorControl,
        }
    ];
};