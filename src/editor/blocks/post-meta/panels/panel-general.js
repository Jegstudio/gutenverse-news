import { __ } from '@wordpress/i18n';
import { TypographyControl, SelectControl, SelectSearchControl } from 'gutenverse-core/controls';
import { handleTypography } from 'gutenverse-core/styling';

export const generalPanel = (props) => {
    const {
        elementId,
    } = props;

    const searchMeta = input => new Promise(resolve => {
        return resolve([
            {
                label: __('Author', 'gutenverse-news'),
                value: 'author'
            },
            {
                label: __('Date', 'gutenverse-news'),
                value: 'date'
            },
            {
                label: __('Category', 'gutenverse-news'),
                value: 'category'
            },
            {
                label: __('Comment', 'gutenverse-news'),
                value: 'comment'
            },
        ])
    });

    return [
        {
            id: 'metaLeft',
            label: __('Left Meta Element', 'gutenverse'),
            component: SelectSearchControl,
            defaultOptions: true,
            isMulti: true,
            onSearch: searchMeta
        },
        {
            id: 'metaRight',
            label: __('Right Meta Element', 'gutenverse'),
            component: SelectSearchControl,
            defaultOptions: true,
            isMulti: true,
            onSearch: searchMeta
        },
        {
            id: 'postDate',
            label: __('Post Date', 'gutenverse-news'),
            description: __('Choose which post date type that you want to show.', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    label: __('Modified Date', 'gutenverse-news'),
                    value: 'modified'
                },
                {
                    label: __('Published Date', 'gutenverse-news'),
                    value: 'publish'
                },
            ],
        },
        {
            id: 'metaTypography',
            label: __('Typography', 'gutenverse-news'),
            component: TypographyControl,
            style: [
                {
                    selector: `.wp-block.${elementId} .gvnews_post_meta, .wp-block.${elementId} .gvnews_post_meta .fa, .wp-block.${elementId} .gvnews_postblock .gvnews_subcat_list > li > a:hover, .wp-block.${elementId} .gvnews_pl_md_card .gvnews_post_category a, .wp-block.${elementId} .gvnews_subcat_list > li > a.current, .wp-block.${elementId} .gvnews_pl_md_5 .gvnews_post_meta, .wp-block.${elementId} .gvnews_pl_md_5 .gvnews_post_meta .fa, .wp-block.${elementId} .gvnews_post_category a`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ]
        },
    ];
};