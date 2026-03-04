import { __ } from '@wordpress/i18n';
import { SelectControl, TypographyControl, ColorControl } from 'gutenverse-core/controls';

export const designPanel = (props) => {
    return [
        {
            id: 'columnWidth',
            label: __('Block Column Width', 'gutenverse-news'),
            description: __('Please choose width of column you want to use on this block. 1 Block represents 4 columns.', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    value: 'auto',
                    label: __('Auto', 'gutenverse-news')
                },
                {
                    value: '4',
                    label: __('4 Column Design ( 1 Block )', 'gutenverse-news')
                },
                {
                    value: '8',
                    label: __('8 Column Design ( 2 Block )', 'gutenverse-news')
                },
                {
                    value: '12',
                    label: __('12  Column Design ( 3 Block )', 'gutenverse-news')
                },
            ],
        },
        {
            id: 'typography',
            label: __('Title Typography', 'gutenverse-news'),
            description: __('This option will change your title typography.', 'gutenverse-news'),
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
    ];
};