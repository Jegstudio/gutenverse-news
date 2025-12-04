import { __ } from '@wordpress/i18n';
import { ColorControl, RangeControl, TypographyControl, DimensionControl } from 'gutenverse-core/controls';

export const tickerTitlePanel = (props) => {
    const {
        elementId,
    } = props;

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
            id: 'titleBackgroundColor',
            label: __('Background Color', 'gutenverse-news'),
            component: ColorControl,
            options: ['default', 'gradient'],
        },
    ];
};