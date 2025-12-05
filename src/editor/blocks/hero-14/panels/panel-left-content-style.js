import { __ } from '@wordpress/i18n';
import { ColorControl, TypographyControl } from 'gutenverse-core/controls';

export const leftContentStylePanel = () => {
    return [
        {
            id: 'titleTypographyLeft',
            label: __('Title Typography', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'metaTypographyLeft',
            label: __('Meta Typography', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'titleColorLeft',
            label: __('Title Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'titleColorHoverLeft',
            label: __('Title Color Hover', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'metaColorLeft',
            label: __('Meta Color', 'gutenverse-news'),
            component: ColorControl,
        },
    ];
};