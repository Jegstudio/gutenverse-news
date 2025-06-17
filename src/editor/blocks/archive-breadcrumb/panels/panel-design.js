import { __ } from '@wordpress/i18n';
import { handleTypography } from 'gutenverse-core/styling';
import { TypographyControl } from 'gutenverse-core/controls';

export const designPanel = (props) => {
    const {
        elementId,
    } = props;

    return [
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