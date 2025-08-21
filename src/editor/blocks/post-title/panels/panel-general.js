import { __ } from '@wordpress/i18n';
import { ColorControl, TypographyControl } from 'gutenverse-core/controls';

export const generalPanel = () => {
    return [
        {
            id: 'titleTypography',
            label: __('Typography', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'titleColor',
            label: __('Color', 'gutenverse-news'),
            component: ColorControl,
        },
    ];
};