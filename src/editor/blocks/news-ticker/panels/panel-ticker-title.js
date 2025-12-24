import { __ } from '@wordpress/i18n';
import { BorderControl, BorderResponsiveControl, ColorControl, RangeControl, TypographyControl, DimensionControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const tickerTitlePanel = (props) => {
    const {
        elementId,
    } = props;
    const device = getDeviceType();
    return [
        {
            id: 'titleTextTypography',
            label: __('Title Typography', 'gutenverse-news'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .gvnews_breakingnews_title`,
                }
            ]
        },
        {
            id: 'titleTextColor',
            label: __('Text Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'iconTextColor',
            label: __('Icon Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'titleBackgroundColor',
            label: __('Background Color', 'gutenverse-news'),
            component: ColorControl,
            options: ['default', 'gradient'],
        },
        {
            id: 'iconTextSize',
            label: __('Icon Size', 'gutenverse-news'),
            component: RangeControl,
            unit: 'px',
            min: 1,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'navIconSize',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_breakingnews_title i`,

                    'properties': [
                        {
                            'name': 'font-size',
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
            id: 'titleTextPadding',
            label: __('Heading Padding', 'gutenverse'),
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
        {
            id: 'titleTextGap',
            label: __('Gap', 'gutenverse-news'),
            component: RangeControl,
            unit: 'px',
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    'type': 'plain',
                    'id': 'titleTextGap',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_breakingnews_title`,
                    'properties': [
                        {
                            'name': 'gap',
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
            id: 'titleBorder',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'titleBorder',
                    'selector': `.${elementId} .gvnews_breakingnews_title`,

                }
            ]
        },

        {
            id: 'titleBorderResponsive',
            label: __('Border', 'gutenverse'),
            show: device !== 'Desktop',
            component: BorderResponsiveControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'titleBorder',
                    'selector': `.${elementId} .gvnews_breakingnews_title`,
                }
            ]
        },
    ];
};