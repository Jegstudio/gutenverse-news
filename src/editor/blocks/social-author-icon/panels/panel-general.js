import { __ } from '@wordpress/i18n';
import { SelectControl, TextControl, SelectSearchControl, CheckboxControl, IconControl, RangeControl } from 'gutenverse-core/controls';
import { searchAuthor } from '../../../utils/helper';

export const generalPanel = (props) => {
    const {
        authorType,
        hideIfEmpty,
    } = props;

    const searchSocials = input => new Promise(resolve => {
        const list = [
            { label: __('Author Website', 'gutenverse-news'), value: 'user_url' },
            { label: __('Facebook', 'gutenverse-news'), value: 'facebook' },
            { label: __('Tiktok', 'gutenverse-news'), value: 'tiktok' },
            { label: __('Twitter', 'gutenverse-news'), value: 'twitter' },
            { label: __('Linkedin', 'gutenverse-news'), value: 'linkedin' },
            { label: __('Pinterest', 'gutenverse-news'), value: 'pinterest' },
            { label: __('Behance', 'gutenverse-news'), value: 'behance' },
            { label: __('Github', 'gutenverse-news'), value: 'github' },
            { label: __('Flickr', 'gutenverse-news'), value: 'flickr' },
            { label: __('Tumblr', 'gutenverse-news'), value: 'tumblr' },
            { label: __('Dribbble', 'gutenverse-news'), value: 'dribbble' },
            { label: __('Soundcloud', 'gutenverse-news'), value: 'soundcloud' },
            { label: __('Instagram', 'gutenverse-news'), value: 'instagram' },
            { label: __('Vimeo', 'gutenverse-news'), value: 'vimeo' },
            { label: __('Youtube', 'gutenverse-news'), value: 'youtube' },
            { label: __('Reddit', 'gutenverse-news'), value: 'reddit' },
            { label: __('Vk', 'gutenverse-news'), value: 'vk' },
            { label: __('Weibo', 'gutenverse-news'), value: 'weibo' },
            { label: __('Twitch', 'gutenverse-news'), value: 'twitch' },
            { label: __('Rss', 'gutenverse-news'), value: 'rss' },
            { label: __('Threads', 'gutenverse-news'), value: 'threads' },
            { label: __('Xing', 'gutenverse-news'), value: 'xing' },
        ];

        return resolve(list.filter(item =>
            item.label.toLowerCase().includes(input.toLowerCase())
        ));
    });


    return [
        {
            id: 'icon',
            label: __('Custom Icon', 'gutenverse-news'),
            component: IconControl,
        },
        {
            id: 'iconSize',
            label: __('Icon Size', 'gutenverse-news'),
            component: RangeControl,
            min: 10,
            max: 100,
            unit: 'px',
            allowDeviceControl: true,
        },
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
            onSearch: searchSocials,
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
