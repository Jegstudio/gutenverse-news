import { __ } from '@wordpress/i18n';
import { TypographyControl } from 'gutenverse-core/controls';
import { handleTypography } from 'gutenverse-core/styling';

export const generalPanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'titleTypography',
            label: __('Title Typography', 'gutenverse-news'),
            component: TypographyControl,
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .post-title`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ]
        },
        {
            id: 'navTypography',
            label: __('Nav Text Typography', 'gutenverse-news'),
            component: TypographyControl,
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_prevnext_post .caption`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ]
        },
    ];
};