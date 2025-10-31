import { __ } from '@wordpress/i18n';
import { ColorControl, TypographyControl } from 'gutenverse-core/controls';

export const centerContentStylePanel = () => {
    return [
        {
            id: 'titleTypography',
            label: __('Title Typography', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'metaTypography',
            label: __('Meta Typography', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'titleColor',
            label: __('Title Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'titleColorHover',
            label: __('Title Color Hover', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'metaColor',
            label: __('Meta Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'excerptColor',
            label: __('Excerpt Color', 'gutenverse-news'),
            component: ColorControl,
        }
    ];
};