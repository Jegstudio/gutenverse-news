import { __ } from '@wordpress/i18n';
import { CheckboxControl, SelectControl, SelectSearchControl, TextControl } from 'gutenverse-core/controls';
import { applyFilters } from '@wordpress/hooks';
import { isNotEmpty } from 'gutenverse-core/helper';

export const generalPanel = (props) => {
    const {
        metaLeft,
        metaRight,
    } = props;
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
        {
            id: 'authorPrefix',
            label: __('Author Prefix', 'gutenverse-news'),
            component: TextControl,
            show: (isNotEmpty(metaLeft) && metaLeft.some(item => item.value === 'author')) || (isNotEmpty(metaRight) && metaRight.some(item => item.value === 'author'))
        },
        {
            id: 'categoryPrefix',
            label: __('Category Prefix', 'gutenverse-news'),
            component: TextControl,
            show: (isNotEmpty(metaLeft) && metaLeft.some(item => item.value === 'category')) || (isNotEmpty(metaRight) && metaRight.some(item => item.value === 'category'))
        },
        {
            id: 'datePrefix',
            label: __('Date Prefix', 'gutenverse-news'),
            component: CheckboxControl,
            show: (isNotEmpty(metaLeft) && metaLeft.some(item => item.value === 'date')) || (isNotEmpty(metaRight) && metaRight.some(item => item.value === 'date'))
        },
    ];

    return applyFilters(
        'gvnews.post-meta.panel.general',
        controls,
        props
    );
};