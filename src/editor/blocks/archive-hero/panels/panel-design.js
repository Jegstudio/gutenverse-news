import { __ } from '@wordpress/i18n';
import { handleTypography } from 'gutenverse-core/styling';
import { TypographyControl } from 'gutenverse-core/controls';

export const designPanel = (props) => {
    const { elementId } = props;

    return [
        {
            id: 'titleTypography',
            label: __('Title Typography', 'gutenverse-news'),
            description: __('This option will change your title typography.', 'gutenverse-news'),
            component: TypographyControl,
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_title > a`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id),
                },
            ],
        },
        {
            id: 'metaTypography',
            label: __('Meta Typography', 'gutenverse-news'),
            description: __('This option will change your meta typography.', 'gutenverse-news'),
            component: TypographyControl,
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_meta, .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_meta .fa, .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_subcat_list > li > a:hover, .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pl_md_card .gvnews_post_category a, .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_subcat_list > li > a.current, .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pl_md_5 .gvnews_post_meta, .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pl_md_5 .gvnews_post_meta .fa, .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category a`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id),
                },
            ],
        },
    ];
};
