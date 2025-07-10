import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, SelectControl, SizeControl } from 'gutenverse-core/controls';

export const separatorPanel = () => {
    const domain = 'gutenverse-news';
    return [
        {
            id: 'separatorStyle',
            label: __('Style', domain),
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
            label: __('Color', domain),
            component: ColorControl
        },
        {
            id: 'separatorWidth',
            label: __('Width', domain),
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
            label: __('Height', domain),
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
            label: __('Margin', domain),
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
        }
    ];
};