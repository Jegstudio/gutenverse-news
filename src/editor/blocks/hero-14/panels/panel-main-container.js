import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderControl, BorderResponsiveControl, BoxShadowControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const mainContainerPanel = ({
    elementId,
}) => {
    const device = getDeviceType();

    return [
        {
            id: 'mainContainerBackground',
            label: __('Background', 'gutenverse'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
        },
        {
            id: 'mainContainerBorder',
            show: device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'mainContainerBorder',
                    'selector': `.${elementId} .gvnews_pl_lg_7 `,
                }
            ]
        },
        {
            id: 'mainContainerBorderResponsive',
            show: device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'mainContainerBorderResponsive',
                    'selector': `.${elementId} .gvnews_pl_lg_7 `,
                }
            ]
        },
        {
            id: 'mainContainerShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'mainContainerShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .gvnews_pl_lg_7 `,
                }
            ]
        },
    ];
};