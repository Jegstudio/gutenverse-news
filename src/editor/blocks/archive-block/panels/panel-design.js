import { __ } from '@wordpress/i18n';
import { SelectControl, TypographyControl } from 'gutenverse-core/controls';

export const designPanel = () => {

    return [
        {
            id: 'scheme',
            component: SelectControl,
            label: __('Element Color Scheme', 'gutenverse-news'),
            description: __('choose element color scheme for your element ', 'gutenverse-news'),
            options: [
                {
                    value: 'normal',
                    label: __('Normal', 'gutenverse-news'),
                },
                {
                    value: 'alt',
                    label: __('Alternate - Opposite of global color scheme', 'gutenverse-news'),
                },
            ],
        },
        {
            id: 'columnWidth',
            component: SelectControl,
            label: __('Block / Column Width', 'gutenverse-news'),
            description: __('Please choose width of column you want to use on this block. 1 Block represents 4 columns.', 'gutenverse-news'),
            options: [
                {
                    value: 'auto',
                    label: __('Auto', 'gutenverse-news'),
                },
                {
                    value: '4',
                    label: __('4 Column Design ( 1 Block )', 'gutenverse-news'),
                },
                {
                    value: '8',
                    label: __('8 Column Design ( 2 Block )', 'gutenverse-news'),
                },
                {
                    value: '12',
                    label: __('12 Column Design ( 3 Block )', 'gutenverse-news'),
                },
            ],
        },
        {
            id: 'titleTypography',
            label: __('Title Typography', 'gutenverse-news'),
            description: __('This option will change your title typography.', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'metaTypography',
            label: __('Meta Typography', 'gutenverse-news'),
            description: __('This option will change your meta typography.', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'contentTypography',
            label: __('Post Content Typography', 'gutenverse-news'),
            description: __('This option will change your content typography.', 'gutenverse-news'),
            component: TypographyControl,
        },
    ];
};
