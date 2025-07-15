import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, TypographyControl, SwitchControl } from 'gutenverse-core/controls';

export const textTypographyPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: '__commentType',
            component: SwitchControl,
            options: [
                {
                    value: 'formComment',
                    label: 'Form Comment'
                },
                {
                    value: 'listComment',
                    label: 'List Comment'
                }
            ],
            onChange: ({ __commentType }) => setSwitcher({ ...switcher, commentType: __commentType })
        },
        //form comment
        {
            id: 'typographyText',
            label: __('Text Typography', 'gutenverse'),
            show: !switcher.commentType || switcher.commentType === 'formComment',
            component: TypographyControl,
        },
        {
            id: 'colorText',
            label: __('Text Color', 'gutenverse'),
            show: !switcher.commentType || switcher.commentType === 'formComment',
            component: ColorControl,
            liveStyle: {
                'type': 'color',
                'id': 'colorText',
                'selector': `.${elementId} .comment-form p`,
                'properties': [
                    {
                        'name': 'color',
                        'valueType': 'direct'
                    }
                ]
            }
        },
        {
            id: 'marginText',
            label: __('Margin', 'gutenverse'),
            show: !switcher.commentType || switcher.commentType === 'formComment',
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
        //list comment
        {
            id: 'typographyTextCommentList',
            label: __('Text Typography', 'gutenverse'),
            show: switcher.commentType === 'listComment',
            component: TypographyControl,
        },
        {
            id: 'colorTextCommentList',
            label: __('Text Color', 'gutenverse'),
            show: switcher.commentType === 'listComment',
            component: ColorControl,
            liveStyle: {
                'type': 'color',
                'id': 'colorTextCommentList',
                'selector': `.${elementId} .commentlist p`,
                'properties': [
                    {
                        'name': 'color',
                        'valueType': 'direct'
                    }
                ]
            }
        },
        {
            id: 'marginTextCommentList',
            label: __('Text Margin', 'gutenverse'),
            show: switcher.commentType === 'listComment',
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
    ];
};

