import { __ } from '@wordpress/i18n';
import { ColorControl, SelectControl, TypographyControl } from 'gutenverse-core/controls';

export const designPanel = (props) => {
    const {
        blockType = '3'
    } = props;
    return [
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
            id: 'secondTitleTypography',
            label: __('Second List Title Typography', 'gutenverse-news'),
            description: __('This option will override the post title typography setting on the second list.', 'gutenverse-news'),
            show: '14' === blockType,
            component: TypographyControl,
        },
        {
            id: 'contentTypography',
            label: __('Content Typography', 'gutenverse-news'),
            description: __('This option will change your post excerpt and read more button typography.', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'titleColor',
            label: __('Title Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'aHover',
            label: __('Accent Color & Link Hover', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'excerptColor',
            label: __('Excerpt Color', 'gutenverse-news'),
            component: ColorControl,
        },
    ];
};
