import { __ } from '@wordpress/i18n';
import { SelectControl, CheckboxControl, ImageControl, TextControl, SelectSearchControl } from 'gutenverse-core/controls';
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';

export const videoHeaderPanel = (props) => {
    const {
        dataType,
        followButton,
    } = props;

    const searchAuthor = input => new Promise(resolve => {
        apiFetch({
            path: addQueryArgs('/wp/v2/users', {
                search: input,
            }),
        }).then(data => {
            const promiseOptions = data.map(item => {
                return {
                    label: item.name,
                    value: item.id
                };
            });

            resolve(promiseOptions);
        }).catch(() => {
            resolve([]);
        });
    });

    return [
        {
            id: 'dataType',
            label: __('Choose Data Type', 'gutenverse-news'),
            description: __('Choose data for this block.', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    value: 'user',
                    label: __('User data', 'gutenverse-news')
                },
                {
                    value: 'custom',
                    label: __('Custom data', 'gutenverse-news')
                },
            ]
        },
        {
            show: 'user' === dataType,
            id: 'userData',
            label: __('Choose The User', 'gutenverse-news'),
            description: __('Choose user that will be use as icon and title.', 'gutenverse-news'),
            component: SelectSearchControl,
            onSearch: searchAuthor
        },
        {
            show: 'custom' === dataType,
            id: 'headerIcon',
            label: __('Header Icon', 'gutenverse-news'),
            description: __('Choose an image for this block icon (recommend to use a square image).', 'gutenverse-news'),
            component: ImageControl,
        },
        {
            show: 'custom' === dataType,
            id: 'firstTitle',
            label: 'Title',
            description: __('Main title of Module Block.', 'gutenverse-news'),
            component: TextControl,
        },
        {
            id: 'section',
            label: 'Section',
            description: __('Main title of Module Block.', 'gutenverse-news'),
            component: TextControl,
        },
        {
            id: 'secondTitle',
            label: 'Subtitle',
            description: __('Subtitle of Module Block.', 'gutenverse-news'),
            component: TextControl,
        },
        {
            show: dataType === 'custom',
            id: 'url',
            label: 'Title URL',
            component: TextControl,
        },
        {
            id: 'sectionUrl',
            label: 'Section URL',
            description: __('Insert URL of heading section.', 'gutenverse-news'),
            component: TextControl,
        },
        {
            id: 'followButton',
            label: 'Enable Follow Button',
            description: __('Check this option to enable follow button.', 'gutenverse-news'),
            component: CheckboxControl,
        },
        {
            show: true === followButton,
            id: 'followUser',
            label: __('Choose The User to Follow', 'gutenverse-news'),
            description: __('Choose user that will be followed and make sure you already install BuddyPress Follow plugin.', 'gutenverse-news'),
            component: SelectSearchControl,
            onSearch: searchAuthor
        },
    ];
};