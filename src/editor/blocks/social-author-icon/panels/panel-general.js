import { __ } from '@wordpress/i18n';
import { SelectControl, TextControl, SelectSearchControl, CheckboxControl } from 'gutenverse-core/controls';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

export const generalPanel = (props) => {
    const {
        authorType,
        hideIfEmpty,
    } = props;

    const searchSocialMedia = input => new Promise(resolve => {
        apiFetch({
            path: addQueryArgs('gvnews-client/v1/get-author-social-media'),
            method: 'GET',
        }).then(data => {
            const promiseOptions = Object.keys(data).map(key => ({
                value: key,
                label: data[key],
            }));
            resolve(promiseOptions);
        }).catch((error) => {
            resolve([]);
        });
    });

    const searchAuthor = input => new Promise(resolve => {
        apiFetch({
            path: addQueryArgs('/gvnews-client/v1/get-author'),
            method: 'POST',
            data: {
                attr: {
                    search: input
                }
            }
        }).then(data => {
            const users = JSON.parse(data).users || [];
            const promiseOptions = users.map(user => ({
                value: user.ID,
                label: user.name,
            }));
            resolve(promiseOptions);
        }).catch((error) => {
            resolve([]);
        });
    });

    return [
        {
            id: 'authorType',
            label: __('Author Type', 'gutenverse-news'),
            component: SelectControl,
            options: [
                { label: 'Dynamic', value: 'dynamic' },
                { label: 'Static', value: 'static' },
            ],
        },
        {
            id: 'socialMedia',
            label: __('Social Media', 'gutenverse-news'),
            component: SelectSearchControl,
            onSearch: searchSocialMedia,
        },
        {
            id: 'hideIfEmpty',
            label: __('Hide if URL empty', 'gutenverse-news'),
            component: CheckboxControl,
        },
        {
            id: 'defaultUrl',
            label: __('Default URL', 'gutenverse-news'),
            component: TextControl,
            show: !hideIfEmpty,
        },
        {
            id: 'authorId',
            label: __('Select Author', 'gutenverse-news'),
            component: SelectSearchControl,
            onSearch: searchAuthor,
            show: authorType === 'static',
        }
    ];
};
