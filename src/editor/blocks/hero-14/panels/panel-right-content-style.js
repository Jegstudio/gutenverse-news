import { __ } from '@wordpress/i18n';
import { ColorControl, TypographyControl } from 'gutenverse-core/controls';

export const rightContentStylePanel = () => {
    return [
        {
            id: 'titleTypographyRight',
            label: __('Title Typography', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'metaTypographyRight',
            label: __('Meta Typography', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'titleColorRight',
            label: __('Title Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'titleColorHoverRight',
            label: __('Title Color Hover', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'metaColorRight',
            label: __('Meta Color', 'gutenverse-news'),
            component: ColorControl,
        },
    ];
};