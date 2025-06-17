import { __ } from '@wordpress/i18n';
import { TextControl, ColorControl, TypographyControl } from 'gutenverse-core/controls';

export const generalPanel = () => {

    return [
        {
            id: 'title',
            description: __('Add text that appears before the archive title.', 'gutenverse-news'),
            label: __('Text Before Title', 'gutenverse-news'),
            component: TextControl
        },
        {
            id: 'titleTypography',
            label: __('Title Typography', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'titleColor',
            label: __('Title Color', 'gutenverse-news'),
            component: ColorControl,
        },
    ];
};