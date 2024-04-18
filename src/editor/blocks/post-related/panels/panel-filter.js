import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import { NumberControl, RangeControl, SelectSearchControl, SelectControl, CheckboxControl } from 'gutenverse-core/controls';
import { addQueryArgs } from '@wordpress/url';

export const filterPanel = ({postType}) => {
    return [
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
                    value: 'most_comment',
                    label: __('Most Comment', 'gutenverse-news')
                },
            ]
        },
    ];
};