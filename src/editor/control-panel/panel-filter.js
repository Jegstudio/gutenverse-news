import { __ } from '@wordpress/i18n';
import { RangeControl, SelectSearchControl, SelectControl, CheckboxControl } from 'gutenverse-core/controls';
import { searchPosts, searchPages, searchCategory, searchAuthor, searchTag } from '../utils/helper';
import { applyFilters } from '@wordpress/hooks';


const advanceFilter = ['bookmark', 'liked', 'disliked', 'unlockedPost'];

export const filterPanel = (props, isModule = false) => {
    const { postType = 'post', contentType = '', context } = props;

    let isInAccountPage = context && context['gutenverse-pro/account-details/activeMenu'] !== undefined;

    const contentFilter = applyFilters('gvnews.panel.options.contentType', [
        {
            value: '',
            label: __('All', 'gutenverse-news')
        },
        {
            value: 'post',
            label: __('Only Post', 'gutenverse-news')
        },
        {
            value: '',
            label: __('Only Gallery', 'gutenverse-news'),
            pro: true
        },
        {
            value: '',
            label: __('Only Video', 'gutenverse-news'),
            pro: true
        },
        {
            value: '',
            label: __('Only Standard Post', 'gutenverse-news'),
            pro: true
        },
        {
            value: '',
            label: __('Only Review', 'gutenverse-news'),
            pro: true
        },
        ...(isInAccountPage && isModule ? [
            {
                value: '',
                label: __('Only Liked', 'gutenverse-news'),
                pro: true
            },
            {
                value: '',
                label: __('Only Disliked', 'gutenverse-news'),
                pro: true
            },
            {
                value: '',
                label: __('Only Unlocked', 'gutenverse-news'),
                pro: true
            },
            {
                value: '',
                label: __('Only Bookmarked', 'gutenverse-news'),
                pro: true
            }
        ] : [])
    ], postType, isModule, isInAccountPage);

    const isAdvanceFilter = isModule && postType === 'post' && advanceFilter.includes(contentType);

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
            show: postType === 'post',
            options: contentFilter
        },
        {
            id: 'numberPost',
            label: __('Number of Post initially showed', 'gutenverse-news'),
            description: __('Choose which content type you want to filter.', 'gutenverse-news'),
            component: RangeControl,
            min: 1,
            max: 10,
            step: 1,
            isParseFloat: false
        },
        {
            id: 'postOffset',
            label: __('Post Offset', 'gutenverse-news'),
            description: __('Number of post offset (start of content).', 'gutenverse-news'),
            component: RangeControl,
            min: 0,
            step: 1,
            isParseFloat: false,
            show: !isAdvanceFilter
        },
        {
            id: 'uniqueContent',
            label: __('Include into Unique Content Group', 'gutenverse-news'),
            description: __('Choose unique content option, and this module will be included into unique content group. It won\'t duplicate content across the group. Ajax loaded content won\'t affect this unique content feature.', 'gutenverse-news'),
            component: SelectControl,
            options: applyFilters('gutenverse.news.unique-content-group', [
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
                    label: __('Unique Content - Group 2', 'gutenverse-news'),
                    pro: true
                },
                {
                    value: 'unique3',
                    label: __('Unique Content - Group 3', 'gutenverse-news'),
                    pro: true
                },
                {
                    value: 'unique4',
                    label: __('Unique Content - Group 4', 'gutenverse-news'),
                    pro: true
                },
                {
                    value: 'unique5',
                    label: __('Unique Content - Group 5', 'gutenverse-news'),
                    pro: true
                }
            ]),
            show: !isAdvanceFilter
        },
        {
            id: 'includePost',
            label: __('Include Post', 'gutenverse-news'),
            description: __(`Tips :
            - You can search post id by inputing title, clicking search title, and you will have your post id.
            - You can also directly insert your post id, and click enter to add it on the list.`, 'gutenverse-news'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: 'post' === postType ? searchPosts : searchPages,
            show: !isAdvanceFilter
        },
        {
            id: 'includeOnly',
            label: __('Include Only', 'gutenverse-news'),
            description: __('Check this option to only display included post id.', 'gutenverse-news'),
            component: CheckboxControl,
            show: !isAdvanceFilter
        },
        {
            id: 'excludePost',
            label: __('Exclude Post', 'gutenverse-news'),
            description: __(`Tips :
            - You can search post id by inputing title, clicking search title, and you will have your post id.
            - You can also directly insert your post id, and click enter to add it on the list.`, 'gutenverse-news'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: 'post' === postType ? searchPosts : searchPages,
            show: !isAdvanceFilter
        },
        {
            id: 'includeCategory',
            label: __('Include Category', 'gutenverse-news'),
            description: __('Choose which category you want to show on this module.', 'gutenverse-news'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: searchCategory,
            show: !isAdvanceFilter
        },
        {
            id: 'excludeCategory',
            label: __('Exclude Category', 'gutenverse-news'),
            description: __('Choose excluded category for this modules.', 'gutenverse-news'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: searchCategory,
            show: !isAdvanceFilter
        },
        {
            id: 'includeAuthor',
            label: __('Include Author', 'gutenverse-news'),
            description: __('Write to search post author.', 'gutenverse-news'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: searchAuthor,
            show: !isAdvanceFilter
        },
        {
            id: 'includeTag',
            label: __('Include Tag', 'gutenverse-news'),
            description: __('Write to search post tag.', 'gutenverse-news'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: searchTag,
            show: !isAdvanceFilter
        },
        {
            id: 'excludeTag',
            label: __('Exclude Tag', 'gutenverse-news'),
            description: __('Write to search post tag.', 'gutenverse-news'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: searchTag,
            show: !isAdvanceFilter
        },
        {
            id: 'sortBy',
            label: __('Sort By', 'gutenverse-news'),
            component: SelectControl,
            options: applyFilters(
                'gvnews.panel.options.sortBy',
                [
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
                    {
                        value: '',
                        label: __('Most Comment (1 Day)', 'gutenverse-news'),
                        pro: true
                    },
                    {
                        value: '',
                        label: __('Most Comment (7 Days)', 'gutenverse-news'),
                        pro: true
                    },
                    {
                        value: '',
                        label: __('Most Comment (30 Days)', 'gutenverse-news'),
                        pro: true
                    },
                    {
                        value: '',
                        label: __('Popular Post (1 Day)', 'gutenverse-news'),
                        pro: true
                    },
                    {
                        value: '',
                        label: __('Popular Post (7 Days)', 'gutenverse-news'),
                        pro: true
                    },
                    {
                        value: '',
                        label: __('Popular Post (30 Days)', 'gutenverse-news'),
                        pro: true
                    },
                    {
                        value: '',
                        label: __('Popular Post (All Time)', 'gutenverse-news'),
                        pro: true
                    },
                    {
                        value: '',
                        label: __('Highest Rate - Review', 'gutenverse-news'),
                        pro: true
                    },
                    {
                        value: '',
                        label: __('Most Like (Thumb up)', 'gutenverse-news'),
                        pro: true
                    },
                    {
                        value: '',
                        label: __('Most Share', 'gutenverse-news'),
                        pro: true
                    }
                ],
                postType
            ),
            show: !isAdvanceFilter
        },
    ];
};