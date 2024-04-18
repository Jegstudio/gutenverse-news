import { __ } from '@wordpress/i18n';
import { handleTypography } from 'gutenverse-core/styling';
import { SelectControl, TypographyControl } from 'gutenverse-core/controls';

export const designPanel = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'scheme',
            component: SelectControl,
            label: __('Element Color Scheme', 'gutenverse-news'),
            description: __('choose element color scheme for your element ', 'gutenverse-news'),
            options: [
                {
                    value: 'normal',
                    label: __('Normal', 'gutenverse-news')
                },
                {
                    value: 'alt',
                    label: __('Alternate - Opposite of global color scheme', 'gutenverse-news')
                }
            ]
        },
        {
            id: 'columnWidth',
            component: SelectControl,
            label: __('Block / Column Width', 'gutenverse-news'),
            description: __('Please choose width of column you want to use on this block. 1 Block represents 4 columns.', 'gutenverse-news'),
            options: [
                {
                    value: 'auto',
                    label: __('Auto', 'gutenverse-news')
                },
                {
                    value: 4,
                    label: __('4 Column Design ( 1 Block )', 'gutenverse-news')
                },
                {
                    value: 8,
                    label: __('8 Column Design ( 2 Block )', 'gutenverse-news')
                },
                {
                    value: 12,
                    label: __('12 Column Design ( 3 Block )', 'gutenverse-news')
                }
            ]
        },
        {
            id: 'breadcrumbTypography',
            label: __('Breadcrumb Typography', 'gutenverse-news'),
            description: __('This option will change your breadcrumb typography.', 'gutenverse-news'),
            component: TypographyControl,
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_breadcrumbs span a, .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_breadcrumbs i`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ]
        },
    ];
};