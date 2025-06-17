import { __ } from '@wordpress/i18n';
import { TextControl, ColorControl, TypographyControl } from 'gutenverse-core/controls';

export const generalPanel = (props) => {

    return [
        {
            id: 'title',
            label: __('Title', 'gutenverse-news'),
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