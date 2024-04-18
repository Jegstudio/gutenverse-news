import { __ } from '@wordpress/i18n';
import { TypographyControl } from 'gutenverse-core/controls';
import { handleTypography } from 'gutenverse-core/styling';

export const generalPanel = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'titleTypography',
            label: __('Typography', 'gutenverse-news'),
            description: __('This option will change your tags typography.', 'gutenverse-news'),
            component: TypographyControl,
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_tags`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ]
        },
    ];
};