import { __ } from '@wordpress/i18n';
import { SelectControl, CheckboxControl, ColorControl, BackgroundControl } from 'gutenverse-core/controls';
import { handleColor, handleBackground } from 'gutenverse-core/styling';

export const generalPanel = (props) => {
    const {
        listStyle,
        elementId
    } = props;

    return [
        {
            id: 'listStyle',
            label: __('User List Style', 'gutenverse-news'),
            description: __('Choose which style that fit your site.', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    value: 'style-1',
                    label: __('Style 1', 'gutenverse-news')
                },
                {
                    value: 'style-2',
                    label: __('Style 2', 'gutenverse-news')
                },
                {
                    value: 'style-3',
                    label: __('Style 3', 'gutenverse-news')
                },
                {
                    value: 'style-4',
                    label: __('Style 4', 'gutenverse-news')
                },
                {
                    value: 'style-5',
                    label: __('Style 5', 'gutenverse-news')
                },
            ]
        },
        {
            id: 'blockWidth',
            show: (listStyle === 'style-1') || (listStyle === 'style-5'),
            label: __('User Blocks Width', 'gutenverse-news'),
            description: __('Please choose the width of author block that fit your column layout.', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    value: 'gvnews_1_block',
                    label: __('1 Block - (100%)', 'gutenverse-news')
                },
                {
                    value: 'gvnews_2_block',
                    label: __('2 Block - (50%)', 'gutenverse-news')
                },
                {
                    value: 'gvnews_3_block',
                    label: __('3 Block - (33%)', 'gutenverse-news')
                },
                {
                    value: 'gvnews_4_block',
                    label: __('4 Block - (25%)', 'gutenverse-news')
                },
                {
                    value: 'gvnews_5_block',
                    label: __('5 Block - (20%)', 'gutenverse-news')
                },
            ]
        },
        {
            id: 'blockWidth2',
            show: listStyle === 'style-2',
            label: __('User Blocks Width', 'gutenverse-news'),
            description: __('Please choose the width of author block that fit your column layout.', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    value: 'gvnews_1_block',
                    label: __('1 Block - (100%)', 'gutenverse-news')
                },
                {
                    value: 'gvnews_2_block',
                    label: __('2 Block - (50%)', 'gutenverse-news')
                },
                {
                    value: 'gvnews_3_block',
                    label: __('3 Block - (33%)', 'gutenverse-news')
                },
            ]
        },
        {
            id: 'blockWidth3',
            show: listStyle === 'style-3',
            label: __('User Blocks Width', 'gutenverse-news'),
            description: __('Please choose the width of author block that fit your column layout.', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    value: 'gvnews_1_block',
                    label: __('1 Block - (100%)', 'gutenverse-news')
                },
                {
                    value: 'gvnews_2_block',
                    label: __('2 Block - (50%)', 'gutenverse-news')
                },
                {
                    value: 'gvnews_3_block',
                    label: __('3 Block - (33%)', 'gutenverse-news')
                },
                {
                    value: 'gvnews_4_block',
                    label: __('4 Block - (25%)', 'gutenverse-news')
                },
                {
                    value: 'gvnews_5_block',
                    label: __('5 Block - (20%)', 'gutenverse-news')
                },
                {
                    value: 'gvnews_6_block',
                    label: __('6 Block - (17%)', 'gutenverse-news')
                },
            ]
        },
        {
            id: 'hideDescription',
            show: (listStyle === 'style-1') || (listStyle === 'style-2') || (listStyle === 'style-3'),
            label: __('Hide Description', 'gutenverse-news'),
            component: CheckboxControl
        },
        // {
        //     id: 'showFollow',
        //     show: (listStyle === 'style-1') || (listStyle === 'style-2') || (listStyle === 'style-3'),
        //     label: __('Show Follow Button', 'gutenverse-news'),
        //     component: CheckboxControl
        // },
        {
            id: 'showSubscribe',
            show: (listStyle === 'style-2') || (listStyle === 'style-3') || (listStyle === 'style-5'),
            label: __('Show User Subscriber', 'gutenverse-news'),
            component: CheckboxControl
        },
        {
            id: 'truncateDescription',
            show: (listStyle === 'style-1') || (listStyle === 'style-2') || (listStyle === 'style-3'),
            label: __('Truncate Description', 'gutenverse-news'),
            component: CheckboxControl
        },
        {
            id: 'hideSocial',
            show: (listStyle === 'style-1') || (listStyle === 'style-2') || (listStyle === 'style-3'),
            label: __('Hide Socials', 'gutenverse-news'),
            component: CheckboxControl
        },
        {
            id: 'userAlign',
            show: (listStyle !== 'style-4'),
            label: __('User List Align', 'gutenverse-news'),
            description: __('Please choose the user list alignment.', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    value: 'gvnews_user_align_center',
                    label: __('Center', 'gutenverse-news')
                },
                {
                    value: 'gvnews_user_align_left',
                    label: __('Left', 'gutenverse-news')
                },
                {
                    value: 'gvnews_user_align_right',
                    label: __('Right', 'gutenverse-news')
                },
            ]
        },
    ];
};