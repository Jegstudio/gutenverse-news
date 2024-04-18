import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import { NumberControl, SelectSearchControl, SelectControl, CheckboxControl } from 'gutenverse-core/controls';
import { addQueryArgs } from '@wordpress/url';
import { searchPosts, searchPages, searchCategory, searchAuthor, searchTag } from '../utils/helper';

export const filterHero = ({postType}) => {

    return [
        {
            id: 'postType',
            label: __('Include Post Type', 'gutenverse-news'),
            description: __('Choose post type for this content.', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    label: __('Page'),
                    value: 'page'
                },
                {
                    label: __('Post'),
                    value: 'post'
                },
            ]
        },
        {
            id: 'contentType',
            label: __('Content Type', 'gutenverse-news'),
            description: __('Choose which content type you want to filter.', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    value: '',
                    label: __('All', 'gutenverse-news')
                },
                {
                    value: 'post',
                    label: __('Only Post', 'gutenverse-news')
                },
            ]
        },
        {
            id: 'postOffset',
            label: __('Post Offset', 'gutenverse-news'),
            description: __('Number of post offset (start of content).', 'gutenverse-news'),
            component: NumberControl,
        },
        {
            id: 'uniqueContent',
            label: __('Include into Unique Content Group', 'gutenverse-news'),
            description: __('Choose unique content option, and this module will be included into unique content group. It won\'t duplicate content across the group. Ajax loaded content won\'t affect this unique content feature.', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    value: 'disable',
                    label: __('Disable', 'gutenverse-news')
                },
                {
                    value: 'unique1',
                    label: __('Unique Content - Group 1', 'gutenverse-news')
                },
                {
                    value: 'unique2',
                    label: __('Unique Content - Group 2', 'gutenverse-news')
                },
                {
                    value: 'unique3',
                    label: __('Unique Content - Group 3', 'gutenverse-news')
                },
                {
                    value: 'unique4',
                    label: __('Unique Content - Group 4', 'gutenverse-news')
                },
                {
                    value: 'unique5',
                    label: __('Unique Content - Group 5', 'gutenverse-news')
                },
            ]
        },
        {
            id: 'includePost',
            label: __('Include Post', 'gutenverse-news'),
            description: __(`Tips :
            - You can search post id by inputing title, clicking search title, and you will have your post id.
            - You can also directly insert your post id, and click enter to add it on the list.`, 'gutenverse-news'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch:  'post' === postType ? searchPosts : searchPages
        },
        {
            id: 'includeOnly',
            label: __('Include Only', 'gutenverse-news'),
            description: __('Check this option to only display included post id.', 'gutenverse-news'),
            component: CheckboxControl
        },
        {
            id: 'excludePost',
            label: __('Exclude Post', 'gutenverse-news'),
            description: __(`Tips :
            - You can search post id by inputing title, clicking search title, and you will have your post id.
            - You can also directly insert your post id, and click enter to add it on the list.`, 'gutenverse-news'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch:  'post' === postType ? searchPosts : searchPages
        },
        {
            id: 'includeCategory',
            label: __('Include Category', 'gutenverse-news'),
            description: __('Choose which category you want to show on this module.', 'gutenverse-news'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: searchCategory
        },
        {
            id: 'excludeCategory',
            label: __('Exclude Category', 'gutenverse-news'),
            description: __('Choose excluded category for this modules.', 'gutenverse-news'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: searchCategory
        },
        {
            id: 'includeAuthor',
            label: __('Include Author', 'gutenverse-news'),
            description: __('Write to search post author.', 'gutenverse-news'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: searchAuthor
        },
        {
            id: 'includeTag',
            label: __('Include Tag', 'gutenverse-news'),
            description: __('Write to search post tag.', 'gutenverse-news'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: searchTag
        },
        {
            id: 'excludeTag',
            label: __('Exclude Tag', 'gutenverse-news'),
            description: __('Write to search post tag.', 'gutenverse-news'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: searchTag
        },
        {
            id: 'sortBy',
            label: __('Sort By', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    value: 'latest',
                    label: __('Latest', 'gutenverse-news')
                },
                {
                    value: 'oldest',
                    label: __('Oldest', 'gutenverse-news')
                },
                {
                    value: 'alphabet_asc',
                    label: __('Alphabet Asc', 'gutenverse-news')
                },
                {
                    value: 'alphabet_desc',
                    label: __('Alphabet Desc', 'gutenverse-news')
                },
                {
                    value: 'random',
                    label: __('Random', 'gutenverse-news')
                },
                {
                    value: 'random_week',
                    label: __('Random Week', 'gutenverse-news')
                },
                {
                    value: 'random_month',
                    label: __('Random Month', 'gutenverse-news')
                },
                {
                    value: 'most_comment',
                    label: __('Most Comment', 'gutenverse-news')
                },
            ]
        },
    ];
};