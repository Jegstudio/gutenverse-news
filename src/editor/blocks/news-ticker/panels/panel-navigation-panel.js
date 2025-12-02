import { __ } from '@wordpress/i18n';
import { ColorControl, RangeControl, SwitchControl } from 'gutenverse-core/controls';

export const navigationPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

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
            id: 'navLineColor',
            label: __('Line Color', 'gutenverse-news'),
            show: !switcher.navButton || switcher.navButton === 'normal',
            component: ColorControl,
        },

    ];
};