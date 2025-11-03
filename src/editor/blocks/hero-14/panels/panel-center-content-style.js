import { __ } from '@wordpress/i18n';
import { ColorControl, TypographyControl } from 'gutenverse-core/controls';

export const centerContentStylePanel = () => {
    return [
        {
            id: 'titleTypographyCenter',
            label: __('Title Typography', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'metaTypographyCenter',
            label: __('Meta Typography', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'titleColorCenter',
            label: __('Title Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'titleColorHoverCenter',
            label: __('Title Color Hover', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'metaColorCenter',
            label: __('Meta Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'excerptColorCenter',
            label: __('Excerpt Color', 'gutenverse-news'),
            component: ColorControl,
        }
    ];
};