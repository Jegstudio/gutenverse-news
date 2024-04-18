import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import { RangeControl, SelectSearchControl } from 'gutenverse-core/controls';
import { addQueryArgs } from '@wordpress/url';

export const filterPanel = () => {

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

    const searchRole = input => new Promise(resolve => {
        apiFetch({
            path: addQueryArgs('/gvnews-client/v1/get-role', {
                search: input,
            }),
        }).then(data => {
            const userRole = JSON.parse(data).map(item => {
                return {
                    label: item.name,
                    value: item.role
                };
            });
            resolve(userRole);
        }).catch(() => {
            resolve([]);
        });
    });

    return [
        {
            id: 'numberUser',
            label: __('Number of user', 'gutenverse-news'),
            description: __('Show number of user on this module.', 'gutenverse-news'),
            component: RangeControl,
            min: 1,
            max: 30,
            step: 1
        },
        {
            id: 'showRole',
            label: 'Show Role',
            component: SelectSearchControl,
            isMulti: true,
            onSearch: searchRole,
        },
        {
            id: 'hideRole',
            label: __('Hide Role', 'gutenverse-news'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: searchRole,
        },
        {
            id: 'includeUser',
            label: __('Include User', 'gutenverse-news'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: searchAuthor
        },
        {
            id: 'excludeUser',
            label: __('Exclude User', 'gutenverse-news'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: searchAuthor
        },
    ];
};