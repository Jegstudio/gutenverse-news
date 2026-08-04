import { __ } from '@wordpress/i18n';
import { DimensionControl, SwitchControl, ColorControl, TypographyControl, BorderControl, BoxShadowControl, CheckboxControl } from 'gutenverse-core/controls';
import { featureActive, newsEssentialsActive } from '../utils/helper';

const isEssentialsActive = newsEssentialsActive();
const isExtendCategoryActive = featureActive('extend_category_setting');

export const categoryStylePanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    return [
        {
            id: 'allowOverrideCategoryColor',
            label: __('Allow Override Color', 'gutenverse-news'),
            description: __('If enabled, the styles configured in "Posts > Categories > Edit Category > Override Category Color" will be applied.', 'gutenverse-news'),
            show: isEssentialsActive && isExtendCategoryActive,
            component: CheckboxControl,
        },
        {
            id: 'categoryButtonTypography',
            label: __('Typography', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'categoryButtonPadding',
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
            id: 'categoryButtonMargin',
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
            id: '__categoryHover',
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
            onChange: ({ __categoryHover }) => setSwitcher({ ...switcher, category: __categoryHover })
        },
        {
            id: 'categoryButtonBackground',
            label: __('Background Color', 'gutenverse-news'),
            show: !switcher.category || switcher.category === 'normal',
            component: ColorControl,
            liveStyle: [
                {
                    'id': 'categoryButtonBackground',
                    'type': 'color',
                    'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category span a`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct',
                        }
                    ],
                }
            ],
        },
        {
            id: 'categoryButtonBackgroundHover',
            label: __('Background Color', 'gutenverse-news'),
            show: switcher.category === 'hover',
            component: ColorControl,
            liveStyle: [
                {
                    'id': 'categoryButtonBackgroundHover',
                    'type': 'color',
                    'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category span a:hover`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct',
                        }
                    ],
                },
            ],
        },
        {
            id: 'categoryButtonColor',
            label: __('Text Color', 'gutenverse-news'),
            show: !switcher.category || switcher.category === 'normal',
            component: ColorControl,
            liveStyle: [
                {
                    'id': 'categoryButtonColor',
                    'type': 'color',
                    'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category span a`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ],
                }
            ],
        },
        {
            id: 'categoryButtonColorHover',
            label: __('Text Color', 'gutenverse-news'),
            show: switcher.category === 'hover',
            component: ColorControl,
            liveStyle: [
                {
                    'id': 'categoryButtonColorHover',
                    'type': 'color',
                    'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category span a:hover`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ],
                }
            ],
        },
        {
            id: 'categoryButtonBorder',
            label: __('Border', 'gutenverse-news'),
            show: !switcher.category || switcher.category === 'normal',
            component: BorderControl,
            liveStyle: [
                {
                    'id': 'categoryButtonBorder',
                    'type': 'border',
                    'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category span a`,
                }
            ],
        },
        {
            id: 'categoryButtonBorderHover',
            label: __('Border', 'gutenverse-news'),
            show: switcher.category === 'hover',
            component: BorderControl,
            liveStyle: [
                {
                    'id': 'categoryButtonBorderHover',
                    'type': 'border',
                    'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category span a:hover`,
                }
            ],
        },
        {
            id: 'categoryButtonBoxShadow',
            show: !switcher.category || switcher.category === 'normal',
            label: __('Box Shadow', 'gutenverse-news'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'id': 'categoryButtonBoxShadow',
                    'type': 'boxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category span a`,
                }
            ]
        },
        {
            id: 'categoryButtonBoxShadowHover',
            show: switcher.category === 'hover',
            label: __('Box Shadow', 'gutenverse-news'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'id': 'categoryButtonBoxShadowHover',
                    'type': 'boxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category span a:hover`,
                }
            ]
        },
    ];
};