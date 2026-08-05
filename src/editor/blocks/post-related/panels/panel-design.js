import { __ } from '@wordpress/i18n';
import { ColorControl, SelectControl, TypographyControl, RangeControl } from 'gutenverse-core/controls';


export const designPanel = (props) => {
    const {
        templateType,
        columnWidth
    } = props;

    const withListIcon = ['template_1', 'template_16', 'template_24'].includes(templateType);

    const withSecond = ['template_1', 'template_2', 'template_13', 'template_14', 'template_16', 'template_17', 'template_20', 'template_24'].includes(templateType);
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
            id: 'typography',
            label: __('Title Typography', 'gutenverse-news'),
            description: __('This option will change your title typography.', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'secondTitleTypography',
            label: __('Second List Title Typography', 'gutenverse-news'),
            description: __('This option will override the post title typography setting on the second list.', 'gutenverse-news'),
            show: withSecond,
            component: TypographyControl,
        },
        {
            id: 'thridTitleTypography',
            label: __('Thrid List Title Typography', 'gutenverse-news'),
            description: __('This option will override the post title typography setting on the thrid list.', 'gutenverse-news'),
            show: 'template_1' === templateType && (columnWidth === 'auto' || columnWidth === '12'),
            component: TypographyControl,
        },
        {
            id: 'typographyContent',
            label: __('Content Typography', 'gutenverse-news'),
            description: __('This option will change your post excerpt typography.', 'gutenverse-news'),
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
        {
            id: 'listIconColor',
            label: __('List Icon Color', 'gutenverse-news'),
            description: __('This option will change the list icon color.', 'gutenverse-news'),
            show: withListIcon,
            component: ColorControl,
        },
        {
            id: 'listIconSize',
            label: __('List Icon Size', 'gutenverse-news'),
            description: __('This option will change the list icon size.', 'gutenverse-news'),
            show: withListIcon,
            component: RangeControl,
            min: 1,
            max: 50,
            unit: 'px',
        },
        {
            id: 'listIconSpacing',
            label: __('List Icon Spacing', 'gutenverse-news'),
            description: __('This option will change the list icon spacing.', 'gutenverse-news'),
            show: withListIcon,
            component: RangeControl,
            min: 1,
            max: 100,
            unit: 'px',
        },
        {
            id: 'listIconAlign',
            label: __('List Icon Align', 'gutenverse-news'),
            description: __('This option will change the list icon vertical align.', 'gutenverse-news'),
            show: withListIcon,
            component: SelectControl,
            options: [
                {
                    value: 'top',
                    label: __('Top', 'gutenverse-news')
                },
                {
                    value: 'center',
                    label: __('Center', 'gutenverse-news')
                },
                {
                    value: 'bottom',
                    label: __('Bottom', 'gutenverse-news')
                },
            ],
        },
    ];
};
