import { __ } from '@wordpress/i18n';

import { DimensionControl, ColorControl, BoxShadowControl, BorderResponsiveControl } from 'gutenverse-core/controls';

export const mainContainerPanel = (props) => {
    return [
        {
            id: 'mainContainerBackground',
            label: __('Background Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'mainContainerPadding',
            label: __('Padding', 'gutenverse-news'),
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
            },
        },
        {
            id: 'mainContainerMargin',
            label: __('Margin', 'gutenverse-news'),
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
            },
        },
        {
            id: 'mainContainerBorder',
            label: __('Border', 'gutenverse-news'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
        },
        {
            id: 'mainContainerBoxShadow',
            label: __('Box Shadow', 'gutenverse-news'),
            component: BoxShadowControl,
        },
    ];
};
