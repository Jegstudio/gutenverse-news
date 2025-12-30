import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, SelectControl, SizeControl, SwitchControl } from 'gutenverse-core/controls';

export const separatorPanel = (props) => {
    const {
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: '__separatorType',
            component: SwitchControl,
            options: [
                {
                    value: 'form',
                    label: 'Form'
                },
                {
                    value: 'reply',
                    label: 'Reply'
                }
            ],
            onChange: ({ __separatorType }) => setSwitcher({ ...switcher, separatorType: __separatorType })
        },
        // FORM STYLE
        {
            id: 'separatorStyle',
            label: __('Style', 'gutenverse-news'),
            show: !switcher.separatorType || switcher.separatorType === 'form',
            component: SelectControl,
            options: [
                {
                    label: __('Default', '--gctd--'),
                    value: 'default'
                },
                {
                    label: __('None', '--gctd--'),
                    value: 'none'
                },
                {
                    label: __('Solid', '--gctd--'),
                    value: 'solid'
                },
                {
                    label: __('Double', '--gctd--'),
                    value: 'double'
                },
                {
                    label: __('Dotted', '--gctd--'),
                    value: 'dotted'
                },
                {
                    label: __('Dashed', '--gctd--'),
                    value: 'dashed'
                },
                {
                    label: __('Groove', '--gctd--'),
                    value: 'groove'
                },
            ]
        },
        {
            id: 'separatorColor',
            label: __('Color', 'gutenverse-news'),
            show: !switcher.separatorType || switcher.separatorType === 'form',
            component: ColorControl
        },
        {
            id: 'separatorWidth',
            label: __('Width', 'gutenverse-news'),
            show: !switcher.separatorType || switcher.separatorType === 'form',
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 500,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: '%',
                },
            },
        },
        {
            id: 'separatorHeight',
            label: __('Height', 'gutenverse-news'),
            show: !switcher.separatorType || switcher.separatorType === 'form',
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 500,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: '%',
                },
            },
        },
        {
            id: 'separatorMargin',
            label: __('Margin', 'gutenverse-news'),
            show: !switcher.separatorType || switcher.separatorType === 'form',
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
        },
        // REPLY STYLE
        {
            id: 'separatorReplyStyle',
            label: __('Style', 'gutenverse-news'),
            show: switcher.separatorType === 'reply',
            component: SelectControl,
            options: [
                {
                    label: __('Default', '--gctd--'),
                    value: 'default'
                },
                {
                    label: __('None', '--gctd--'),
                    value: 'none'
                },
                {
                    label: __('Solid', '--gctd--'),
                    value: 'solid'
                },
                {
                    label: __('Double', '--gctd--'),
                    value: 'double'
                },
                {
                    label: __('Dotted', '--gctd--'),
                    value: 'dotted'
                },
                {
                    label: __('Dashed', '--gctd--'),
                    value: 'dashed'
                },
                {
                    label: __('Groove', '--gctd--'),
                    value: 'groove'
                },
            ]
        },
        {
            id: 'separatorReplyColor',
            label: __('Color', 'gutenverse-news'),
            show: switcher.separatorType === 'reply',
            component: ColorControl
        },
        {
            id: 'separatorReplyWidth',
            label: __('Width', 'gutenverse-news'),
            show: switcher.separatorType === 'reply',
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 500,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: '%',
                },
            },
        },
        {
            id: 'separatorReplyHeight',
            label: __('Height', 'gutenverse-news'),
            show: switcher.separatorType === 'reply',
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 500,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: '%',
                },
            },
        },
    ];
};