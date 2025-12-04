import { __ } from '@wordpress/i18n';
import { BorderControl, BorderResponsiveControl, ColorControl, RangeControl, SwitchControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const navigationPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;
    const device = getDeviceType();

    return [
        {
            id: 'navIconSize',
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
                    'selector': `.${elementId} .gvnews_news_ticker_control i`,
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
            id: 'navButtonWidth',
            label: __('Button Width', 'gutenverse-news'),
            component: RangeControl,
            unit: 'px',
            min: 1,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'navButtonWidth',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_news_ticker_arrow`,
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
            id: 'navButtonHeight',
            label: __('Button Height', 'gutenverse-news'),
            component: RangeControl,
            unit: 'px',
            min: 1,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'navButtonHeight',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_news_ticker_arrow`,
                    'properties': [
                        {
                            'name': 'height',
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
            id: 'navSeparatorWidth',
            label: __('Separator Width', 'gutenverse'),
            min: 0,
            max: 50,
            step: 1,
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'navSeparatorWidth',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_news_ticker_control .nav-separator`,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: '__navButton',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'hover'
                }
            ],
            onChange: ({ __navButton }) => setSwitcher({ ...switcher, navButton: __navButton })
        },
        {
            id: 'navColor',
            show: !switcher.navButton || switcher.navButton === 'normal',
            label: __('Icon Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'navBackgroundColor',
            show: !switcher.navButton || switcher.navButton === 'normal',
            label: __('Background Color', 'gutenverse-news'),
            component: ColorControl,
            options: ['default', 'gradient'],
        },
        {
            id: 'navSeparatorColor',
            label: __('Separator Color', 'gutenverse-news'),
            show: !switcher.navButton || switcher.navButton === 'normal',
            component: ColorControl,
            options: ['default', 'gradient'],
        },
        {
            id: 'navHoverColor',
            show: switcher.navButton === 'hover',
            label: __('Icon Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'navHoverBackgroundColor',
            show: switcher.navButton === 'hover',
            label: __('Background Color', 'gutenverse-news'),
            component: ColorControl,
            options: ['default', 'gradient'],
        },
        {
            id: 'navButtonBorder',
            label: __('Border Button', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'navButtonBorder',
                    'selector': `.${elementId} .gvnews_news_ticker_control .gvnews_news_ticker_arrow`,
                }
            ]
        },

        {
            id: 'navButtonBorderResponsive',
            label: __('Border Button', 'gutenverse'),
            show: device !== 'Desktop',
            component: BorderResponsiveControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'navButtonBorderResponsive',
                    'selector': `.${elementId} .gvnews_news_ticker_control .gvnews_news_ticker_arrow`,
                }
            ]
        },
        {
            id: 'navButtonBorderHover',
            label: __('Border Button', 'gutenverse'),
            component: BorderControl,
            show: switcher.navButton === 'hover',

            liveStyle: [
                {
                    'type': 'border',
                    'id': 'navButtonBorderHover',
                    'selector': `.${elementId} .gvnews_news_ticker_control .gvnews_news_ticker_arrow:hover`,
                }
            ]
        },

        {
            id: 'navButtonBorderHoverResponsive',
            label: __('Border Button', 'gutenverse'),
            show: device !== 'Desktop',
            component: BorderResponsiveControl,
            show: switcher.navButton === 'hover',
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'navButtonBorderHoverResponsive',
                    'selector': `.${elementId} .gvnews_news_ticker_control .gvnews_news_ticker_arrow:hover`,
                }
            ]
        },

    ];
};