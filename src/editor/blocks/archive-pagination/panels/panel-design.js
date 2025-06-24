import { __ } from '@wordpress/i18n';
import { handleTypography } from 'gutenverse-core/styling';
import { SelectControl, TypographyControl } from 'gutenverse-core/controls';

export const designPanel = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'paginationTypography',
            label: __('Pagination Typography', 'gutenverse-news'),
            description: __('This option will change your pagination typography.', 'gutenverse-news'),
            component: TypographyControl,
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pagination *`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ]
        },
    ];
};