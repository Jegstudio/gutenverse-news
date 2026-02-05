import { __ } from '@wordpress/i18n';
import { SelectControl, RangeControl, ColorControl, BackgroundControl } from 'gutenverse-core/controls';
import { handleColor, handleBackground } from 'gutenverse-core/styling';

export const designPanel = (props) => {
    const {
        listStyle,
        elementId
    } = props;

    return [
        {
            id: 'rowItemGap',
            label: __('Row Item Gap', 'gutenverse-news'),
            description: __('Row gap beteen your post lists', 'gutenverse-news'),
            component: RangeControl,
            unit: 'px',
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'rowItemGap',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_userlist ul`,
                    'properties': [
                        {
                            'name': 'row-gap',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                }
                            }
                        }
                    ],
                }
            ]
        },
        {
            id: 'columnItemGap',
            label: __('Column Item Gap', 'gutenverse-news'),
            description: __('Column gap beteen your post lists', 'gutenverse-news'),
            component: RangeControl,
            unit: 'px',
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'columnItemGap',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_userlist ul`,
                    'properties': [
                        {
                            'name': 'column-gap',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                }
                            }
                        }
                    ],
                }
            ]
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
        {
            id: 'nameColor',
            label: __('Name Color', 'gutenverse-news'),
            description: __('Change name color.', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist-name`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'descColor',
            label: __('Description Color', 'gutenverse-news'),
            show: (listStyle === 'style-1') || (listStyle === 'style-2') || (listStyle === 'style-3'),
            description: __('Change description color.', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.${listStyle} .gvnews_userlist-desc`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'borderColor',
            label: __('Border Color', 'gutenverse-news'),
            show: (listStyle === 'style-1') || (listStyle === 'style-2') || (listStyle === 'style-3'),
            description: __('Change border color.', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.${listStyle} .gvnews_userlist-wrap`,
                    render: value => handleColor(value, 'border-color')
                }
            ],
        },
        {
            id: 'accentColor',
            label: __('Accent Color & Link Hover', 'gutenverse-news'),
            description: __('Change accent color & link hover.', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist-name:hover`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'blockColor',
            show: (listStyle === 'style-1') || (listStyle === 'style-2') || (listStyle === 'style-5'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: [`.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-1 .gvnews_userlist-wrap`, `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-2 .gvnews_userlist-wrap`, `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-5 .gvnews_userlist-wrap`],
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ],
        },
        {
            id: 'subBtnBg',
            show: (listStyle === 'style-2') || (listStyle === 'style-3') || (listStyle === 'style-5'),
            label: __('Subscribe Button Background', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: [`.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-2 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a `, `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-3 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a `, `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-5 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a `],
                    render: value => handleColor(value, 'background-color')
                }
            ],
        },
        {
            id: 'subBtnCl',
            show: (listStyle === 'style-2') || (listStyle === 'style-3') || (listStyle === 'style-5'),
            label: __('Subscribe Button Color', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: [`.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-2 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a `, `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-3 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a `, `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-5 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a `],
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'subBtnBd',
            show: (listStyle === 'style-2') || (listStyle === 'style-3') || (listStyle === 'style-5'),
            label: __('Subscribe Button Border Color', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: [`.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-2 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a `, `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-3 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a `, `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-5 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a `],
                    render: value => handleColor(value, 'border-color')
                }
            ],
        },
        {
            id: 'subBtnBgHv',
            show: (listStyle === 'style-2') || (listStyle === 'style-3') || (listStyle === 'style-5'),
            label: __('Subscribe Button Background Hover', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: [`.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-2 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a:hover`, `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-3 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a:hover`, `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-5 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a:hover`],
                    render: value => handleColor(value, 'background-color')
                }
            ],
        },
        {
            id: 'subBtnClHv',
            show: (listStyle === 'style-2') || (listStyle === 'style-3') || (listStyle === 'style-5'),
            label: __('Subscribe Button Color Hover', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: [`.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-2 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a:hover`, `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-3 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a:hover`, `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-5 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a:hover`],
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'subBtnBdHv',
            show: (listStyle === 'style-2') || (listStyle === 'style-3') || (listStyle === 'style-5'),
            label: __('Subscribe Button Border Color Hover', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: [`.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-2 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a:hover`, `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-3 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a:hover`, `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-5 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a:hover`],
                    render: value => handleColor(value, 'border-color')
                }
            ],
        },
        {
            id: 'metaColor',
            label: __('Meta Color', 'gutenverse-news'),
            description: __('Change meta color.', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: [`.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_subscribe_count`, `.gvnews-block.gvnews-block-wrapper.${elementId} .follow-wrapper a`, `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist-socials a i`],
                    render: value => handleColor(value, 'color')
                }
            ],
        },
    ];
};