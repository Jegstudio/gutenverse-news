import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, BorderResponsiveControl, RangeControl, BorderControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const navigationWrapperPanel = (props) => {
    const {
        elementId,
    } = props;
    const device = getDeviceType();

    return [
        {
            id: 'navWrapperBackgroundColor',
            label: __('Background Color', 'gutenverse-news'),
            component: ColorControl,
            options: ['default', 'gradient'],
        },
        {
            id: 'navWrapperBorder',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'navWrapperBorder',
                    'selector': `.${elementId} .gvnews_news_ticker_control`,
                }
            ]
        },

        {
            id: 'navWrapperBorderResponsive',
            label: __('Border', 'gutenverse'),
            show: device !== 'Desktop',
            component: BorderResponsiveControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'navWrapperBorder',
                    'selector': `.${elementId} .gvnews_news_ticker_control`,
                }
            ]
        },

        {
            id: 'navWrapperPadding',
            label: __('Wrapper Padding', 'gutenverse'),
            component: DimensionControl,
            position: ['right', 'left'],
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

    ];
};