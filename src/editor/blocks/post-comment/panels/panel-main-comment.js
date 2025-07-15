import { __ } from '@wordpress/i18n';
import { BorderResponsiveControl, ColorControl, DimensionControl, SwitchControl } from 'gutenverse-core/controls';

export const mainCommentPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: '__commentMainType',
            component: SwitchControl,
            options: [
                {
                    value: 'container',
                    label: 'Comment Container'
                },
                {
                    value: 'body',
                    label: 'Comment Body'
                }
            ],
            onChange: ({ __commentMainType }) => setSwitcher({ ...switcher, commentMainType: __commentMainType })
        },
        {
            id: 'mainContainerBgColor',
            label: __('Container Background Color', 'gutenverse'),
            show: !switcher.commentMainType || switcher.commentMainType === 'container',
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: {
                'type': 'color',
                'id': 'mainContainerBgColor',
                'responsive': true,
                'selector': `.${elementId} .commentlist .comment.depth-1`,
                'properties': [
                    {
                        'name': 'background-color',
                        'valueType': 'direct'
                    }
                ]
            }
        },
        {
            id: 'mainContainerMargin',
            label: __('Container Margin', 'gutenverse'),
            show: !switcher.commentMainType || switcher.commentMainType === 'container',
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
        },
        {
            id: 'mainContainerPadding',
            label: __('Container Padding', 'gutenverse'),
            show: !switcher.commentMainType || switcher.commentMainType === 'container',
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
        },
        {
            id: 'mainContainerBorder',
            label: __('Container Border', '--gctd--'),
            show: !switcher.commentMainType || switcher.commentMainType === 'container',
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: {
                'type': 'borderResponsive',
                'id': 'mainContainerBorder',
                'selector': `.${elementId} .commentlist .comment.depth-1`,
            }
        },
        // Body
        {
            id: 'mainBgColor',
            label: __('Comment Background Color', 'gutenverse'),
            show: switcher.commentMainType === 'body',
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: {
                'type': 'color',
                'id': 'mainBgColor',
                'responsive': true,
                'selector': `.${elementId} .commentlist .comment.depth-1 > .comment-body`,
                'properties': [
                    {
                        'name': 'background-color',
                        'valueType': 'direct'
                    }
                ]
            }
        },
        {
            id: 'mainMargin',
            label: __('Comment Margin', 'gutenverse'),
            show: switcher.commentMainType === 'body',
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
        },
        {
            id: 'mainPadding',
            label: __('Comment Padding', 'gutenverse'),
            show: switcher.commentMainType === 'body',
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
        },
        {
            id: 'mainBorder',
            label: __('Comment Border', '--gctd--'),
            show: switcher.commentMainType === 'body',
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: {
                'type': 'borderResponsive',
                'id': 'mainBorder',
                'selector': `.${elementId} .commentlist .comment.depth-1 > .comment-body`,
            }
        },
    ];
};

