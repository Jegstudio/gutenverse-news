import { __ } from '@wordpress/i18n';
import { AlertControl, BorderControl, BorderResponsiveControl, BoxShadowControl, ColorControl, CheckboxControl, RangeControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { isNotEmpty } from 'gutenverse-core/helper';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const styleAuthorPanel = (props) => {

    const {
        metaLeft,
        metaRight,
        switcher,
        setSwitcher,
        elementId,
        authorPrefix,
        showAvatar
    } = props;

    const device = getDeviceType();

    if ((isNotEmpty(metaLeft) && metaLeft.some(item => item.value === 'author')) || (isNotEmpty(metaRight) && metaRight.some(item => item.value === 'author'))) {
        return [
            {
                id: 'authorTypography',
                label: __('Author Typography', 'gutenverse-news'),
                component: TypographyControl
            },
            {
                id: 'authorPrefixTypography',
                label: __('Author Prefix Typography', 'gutenverse-news'),
                component: TypographyControl,
                show: authorPrefix.length > 0
            },
            {
                id: 'authorPrefixGap',
                label: __('Author Prefix Gap', 'gutenverse-news'),
                component: RangeControl,
                allowDeviceControl: true,
                unit: 'px',
                min: 1,
                max: 30,
                step: 1,
                show: authorPrefix.length > 0,
                liveStyle: [
                    {
                        'type': 'plain',
                        'id': 'authorPrefixGap',
                        'responsive': true,
                        'properties': [
                            {
                                'name': 'margin-right',
                                'valueType': 'pattern',
                                'pattern': '{value}px',
                                'patternValues': {
                                    'value': {
                                        'type': 'direct'
                                    }
                                }
                            }
                        ],
                        'selector': `.${elementId}.gvnews-post-meta>div .gvnews-meta-author .meta_text`,
                    }
                ],
            },
            {
                id: 'showAvatar',
                label: __('Show Avatar', 'gutenverse-news'),
                component: CheckboxControl,
            },
            {
                id: 'avatarSize',
                label: __('Avatar Size', 'gutenverse-news'),
                component: RangeControl,
                show: showAvatar,
                unit: 'px',
                min: 1,
                max: 400,
                step: 1,
                allowDeviceControl: true,
                liveStyle: [
                    {
                        'type': 'plain',
                        'id': 'avatarSize',
                        'responsive': true,
                        'selector': `.${elementId}.gvnews-post-meta>div .gvnews-meta-author img`,
                        'properties': [
                            {
                                'name': 'width',
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
                id: 'avatarGap',
                label: __('Avatar Gap', 'gutenverse'),
                component: RangeControl,
                allowDeviceControl: true,
                show: showAvatar,
                unit: 'px',
                min: 1,
                max: 100,
                step: 1,
                liveStyle: [
                    {
                        'type': 'plain',
                        'id': 'avatarGap',
                        'responsive': true,
                        'properties': [
                            {
                                'name': 'margin-right',
                                'valueType': 'pattern',
                                'pattern': '{value}px',
                                'patternValues': {
                                    'value': {
                                        'type': 'direct'
                                    }
                                }
                            }
                        ],
                        'selector': `.${elementId}.gvnews-post-meta>div .gvnews-meta-author img`,
                    }
                ],
            },
            {
                id: 'avatarOpacity',
                label: __('Avatar Opacity', 'gutenverse'),
                component: RangeControl,
                show: showAvatar,
                min: 1,
                max: 100,
                step: 1,
                liveStyle: [
                    {
                        'type': 'plain',
                        'id': 'avatarOpacity',
                        'properties': [
                            {
                                'name': 'opacity',
                                'valueType': 'pattern',
                                'pattern': 'calc({value}/100)',
                                'patternValues': {
                                    'value': {
                                        'type': 'direct'
                                    }
                                }
                            }
                        ],
                        'selector': `.${elementId}.gvnews-post-meta>div .gvnews-meta-author img`,
                    }
                ],
            },
            {
                id: 'avatarBorder',
                show: device === 'Desktop' && showAvatar,
                label: __('Avatar Border', 'gutenverse'),
                component: BorderControl,
                liveStyle: [
                    {
                        'type': 'border',
                        'id': 'avatarBorder',
                        'selector': `.${elementId}.gvnews-post-meta>div .gvnews-meta-author img`,
                    }
                ],
            },
            {
                id: 'avatarBorderResponsive',
                show: device !== 'Desktop' && showAvatar,
                label: __('Avatar Border', 'gutenverse'),
                component: BorderResponsiveControl,
                allowDeviceControl: true,
                liveStyle: [
                    {
                        'type': 'borderResponsive',
                        'id': 'avatarBorderResponsive',
                        'selector': `.${elementId}.gvnews-post-meta>div .gvnews-meta-author img`,
                    }
                ],
            },
            {
                id: 'avatarBoxShadow',
                label: __('Avatar Box Shadow', 'gutenverse'),
                component: BoxShadowControl,
                show: showAvatar,
                liveStyle: [
                    {
                        'type': 'boxShadow',
                        'id': 'avatarBoxShadow',
                        'properties': [
                            {
                                'name': 'box-shadow',
                                'valueType': 'direct'
                            }
                        ],
                        'selector': `.${elementId}.gvnews-post-meta>div .gvnews-meta-author img`,
                    }
                ],
            },
            {
                id: '__colorHover',
                component: SwitchControl,
                options: [
                    {
                        value: 'normal',
                        label: 'Normal'
                    },
                    {
                        value: 'hover',
                        label: 'Hover'
                    }
                ],
                onChange: ({ __colorHover }) => setSwitcher({ ...switcher, color: __colorHover })
            },
            {
                id: 'authorColor',
                label: __('Author Color', 'gutenverse-news'),
                show: (!switcher.color || switcher.color === 'normal'),
                component: ColorControl,
            },
            {
                id: 'authorPrefixColor',
                label: __('Author Prefix Color', 'gutenverse-news'),
                show: (!switcher.color || switcher.color === 'normal') && authorPrefix.length > 0,
                component: ColorControl,
            },
            {
                id: 'authorColorHover',
                label: __('Author Color', 'gutenverse-news'),
                show: switcher.color === 'hover',
                component: ColorControl,
            }
        ];
    }

    return [{
        id: '__itemShowedAuthor',
        component: AlertControl,
        children: <>
            <span>{__('Please select at least one Author element.', 'gutenverse-news')}</span>
        </>
    }];


};