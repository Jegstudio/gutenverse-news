import { __ } from '@wordpress/i18n';
import { ColorControl, RangeControl, TypographyControl } from 'gutenverse-core/controls';
import { BorderControl, BorderResponsiveControl, DimensionControl, SwitchControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const designPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;
    const device = getDeviceType();

    return [
        {
            id: 'postTitleTypography',
            label: __('Post Tile Typography', 'gutenverse-news'),
            description: __('This option will change your post tile typography.', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'metaTypography',
            label: __('Meta Typography', 'gutenverse-news'),
            description: __('This option will change your meta typography.', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'contentHeight',
            label: __('Content Height', 'gutenverse-news'),
            component: RangeControl,
            unit: 'px',
            min: 1,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'contentHeight',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_news_ticker`,
                    'properties': [
                        {
                            'name': '.gvnews_news_ticker',
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
            id: '__contentCondition',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                }
            ],
            onChange: ({ __contentCondition }) => setSwitcher({ ...switcher, contentCondition: __contentCondition })
        },
        {
            id: 'postTitleColor',
            label: __('Post Title Color', 'gutenverse-news'),
            show: (!switcher.contentCondition || switcher.contentCondition === 'normal'),
            component: ColorControl,
        },
        {
            id: 'postTitleHoverColor',
            label: __('Post Title Hover Color', 'gutenverse-news'),
            show: switcher.contentCondition === 'hover',
            component: ColorControl,
        },
        {
            id: 'metaColor',
            label: __('Meta Color', 'gutenverse-news'),
            show: (!switcher.contentCondition || switcher.contentCondition === 'normal'),
            component: ColorControl,
        },
        {
            id: 'contentBackground',
            label: __('Content Background', 'gutenverse-news'),
            show: (!switcher.contentCondition || switcher.contentCondition === 'normal'),
            component: ColorControl,
        },
        {
            id: 'contentBorder',
            show: (!switcher.contentCondition || switcher.contentCondition === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'contentBorder',
                    'selector': `.${elementId} .gvnews_news_ticker`,
                }
            ]
        },
        {
            id: 'contentBorderResponsive',
            show: (!switcher.contentCondition || switcher.contentCondition === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'contentBorderResponsive',
                    'selector': `.${elementId} .gvnews_news_ticker`,
                }
            ]
        },
        {
            id: 'contentPadding',
            label: __('Content Padding', 'gutenverse'),
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