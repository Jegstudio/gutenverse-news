import { __ } from '@wordpress/i18n';
import { SelectSearchControl, TextControl } from 'gutenverse-core/controls';
import { searchCategory, searchAuthor, searchTag } from '../utils/helper';

export const headerFilterPanel = (props) => {

    return [
        {
            id: 'headerCategory',
            label: __('Header Category', 'gutenverse-news'),
            description: __('Add category filter for heading module.', 'gutenverse-news'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: searchCategory
        },
        {
            id: 'headerAuthor',
            label: __('Header Author', 'gutenverse-news'),
            description: __('Add author filter for heading module.', 'gutenverse-news'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: searchAuthor
        },
        {
            id: 'headerTag',
            label: __('Header Tag', 'gutenverse-news'),
            description: __('Add tag filter for heading module.', 'gutenverse-news'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: searchTag
        },
        {
            id: 'headerDefault',
            label: __('Default Text', 'gutenverse-news'),
            description: __('First item text on heading filter.', 'gutenverse-news'),
            component: TextControl,
        },
    ];
};