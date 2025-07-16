import { __ } from '@wordpress/i18n';
import { SelectControl, SelectSearchControl } from 'gutenverse-core/controls';
import { applyFilters } from '@wordpress/hooks';

export const generalPanel = (props) => {

    const listSearch = [
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
    ];

    const searchMeta = input => new Promise(resolve => {
        return resolve(applyFilters(
            'gvnews.post-meta.panel.general.searchOption',
            listSearch
        ));
    });


    const controls = [
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
                    value: 'published'
                },
            ],
        },
    ];

    return applyFilters(
        'gvnews.post-meta.panel.general',
        controls,
        props
    );
};