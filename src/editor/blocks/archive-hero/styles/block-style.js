import { backgroundStyle } from 'gutenverse-core/controls';
import { isNotEmpty } from 'gutenverse-core/helper';
import { positioningStyle } from '../../../control-panel/panel-styles/positioning-style';

const getPanelHeroStyle = (elementId, attributes) => {
    let data = [];

    for (let i = 1; i <= 7; i++) {
        isNotEmpty(attributes[`heroItem${i}Enable`]) && isNotEmpty(attributes[`heroItem${i}Background`]) && data.push({
            'type': 'background',
            'id': `heroItem${i}Background`,
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_hero_item_${i} .gvnews_thumb a > div:${i === 5 ? 'after' : 'before'}`,
        });
    }

    return data;
};

const getBlockStyle = (elementId, attributes) => {
    let data = [...getPanelHeroStyle(elementId, attributes)];

    const {
        showMeta = true,
        showMetaAuthor = true,
        heroType = '1',
        heroStyle
    } = attributes;

    const withSecondTypo = ['1', '2', '3', '4', '5', '6', '10', '11', '12', '14'].includes(heroType);
    const withThridTypo = ['1', '3', '12'].includes(heroType);

    data = overlayStyle(elementId, attributes, data, heroType, withSecondTypo, withThridTypo);

    /**
     * Panel Background.
     */
    data = backgroundStyle({
        data,
        attributes,
        elementId,
        backgroundSelector: `.${elementId} .gvnews_heroblock`,
        backgroundHoverSelector: `.${elementId} .gvnews_heroblock:hover`,
    });

    data = positioningStyle(elementId, attributes, data, `.gvnews-block.gvnews-block-wrapper.${elementId}`);


    if (isNotEmpty(attributes['heroMargin'])) {
        data.push({
            'type': 'plain',
            'id': 'heroMargin',
            'responsive': false,
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heroblock_wrapper`,
            'properties': [
                {
                    'name': 'margin',
                    'valueType': 'pattern',
                    'pattern': '0 0 -{value}px -{value}px;',
                    'patternValues': {
                        'value': {
                            'type': 'direct'
                        }
                    }
                }
            ],
        });

        data.push({
            'type': 'plain',
            'id': 'heroMargin',
            'responsive': false,
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} article.gvnews_post`,
            'properties': [
                {
                    'name': 'padding',
                    'valueType': 'pattern',
                    'pattern': '0 0 {value}px {value}px;',
                    'patternValues': {
                        'value': {
                            'type': 'direct'
                        }
                    }
                }
            ],
        });
    }

    /**
     * Panel Border
     */
    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `.${elementId} .gvnews_heroblock`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.${elementId} .gvnews_heroblock`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.${elementId} .gvnews_heroblock:hover`,
    });

    isNotEmpty(attributes['borderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderHoverResponsive',
        'selector': `.${elementId} .gvnews_heroblock:hover`,
    });

    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'selector': `.${elementId} .gvnews_heroblock`,
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['boxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadowHover',
        'selector': `.${elementId} .gvnews_heroblock:hover`,
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
    });

    /**
     * Panel Spacing
     */
    isNotEmpty(attributes['margin']) && data.push({
        'type': 'dimension',
        'id': 'margin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_heroblock`,
    });

    isNotEmpty(attributes['padding']) && data.push({
        'type': 'dimension',
        'id': 'padding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_heroblock`,
    });

    isNotEmpty(attributes['zIndex']) && data.push({
        'type': 'plain',
        'id': 'zIndex',
        'responsive': true,
        'properties': [
            {
                'name': 'z-index',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_heroblock`,
    });

    /**
    * Panel Category Style
    */

    isNotEmpty(attributes['categoryButtonTypography']) && data.push({
        'type': 'typography',
        'id': 'categoryButtonTypography',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category span a`,
    });


    isNotEmpty(attributes['categoryButtonPadding']) && data.push({
        'type': 'dimension',
        'id': 'categoryButtonPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category span a`,
    });
    isNotEmpty(attributes['categoryButtonMargin']) && data.push({
        'type': 'dimension',
        'id': 'categoryButtonMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category`,
    });

    isNotEmpty(attributes['categoryButtonBackground']) && data.push({
        'type': 'color',
        'id': 'categoryButtonBackground',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category span a`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['categoryButtonBackgroundHover']) && data.push({
        'type': 'color',
        'id': 'categoryButtonBackgroundHover',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category span a:hover`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['categoryButtonColor']) && data.push({
        'type': 'color',
        'id': 'categoryButtonColor',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category span a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['categoryButtonColorHover']) && data.push({
        'type': 'color',
        'id': 'categoryButtonColorHover',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category span a:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['categoryButtonBorder']) && data.push({
        'type': 'border',
        'id': 'categoryButtonBorder',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category span a`,
    });

    isNotEmpty(attributes['categoryButtonBorderHover']) && data.push({
        'type': 'border',
        'id': 'categoryButtonBorderHover',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category span a:hover`,
    });

    isNotEmpty(attributes['categoryButtonBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'categoryButtonBoxShadow',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category span a`,
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['categoryButtonBoxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'categoryButtonBoxShadowHover',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category span a:hover`,
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
    });


    /**
   * Panel Style
   */

    isNotEmpty(attributes['titleTypography']) && data.push({
        'type': 'typography',
        'id': 'titleTypography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heroblock .gvnews_post .gvnews_post_title`,
    });

    if (heroType === '13') {
        isNotEmpty(attributes['contentWidth']) && data.push({
            'type': 'plain',
            'id': 'contentWidth',
            'responsive': true,
            'selector': heroStyle === '4' ? `.${elementId}.gvnews-block .gvnews_heroblock_13.gvnews_col_3o3.gvnews_hero_style_4 .gvnews_post_info` : `.${elementId}.gvnews-block .gvnews_heroblock_13.gvnews_heroblock .gvnews_postblock_content`,
            'properties': [
                {
                    'name': 'width',
                    'valueType': 'pattern',
                    'pattern': '{value}%',
                    'patternValues': {
                        'value': {
                            'type': 'direct',
                        }
                    }
                }
            ],
        });

        isNotEmpty(attributes['contentPadding']) && '5' !== heroStyle && data.push({
            'type': 'dimension',
            'id': 'contentPadding',
            'responsive': true,
            'properties': [
                {
                    'name': 'padding',
                    'valueType': 'direct'
                }
            ],
            'selector': '7' === heroStyle ? `.${elementId}.gvnews-block .gvnews_heroblock_13.gvnews_hero_style_7 .gvnews_postblock_content_wrapper` : `.${elementId}.gvnews-block .gvnews_heroblock_13.gvnews_heroblock .gvnews_postblock_content`,
        });
    }


    isNotEmpty(attributes['secondTitleTypography']) && withSecondTypo && data.push({
        'type': 'typography',
        'id': 'secondTitleTypography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} ${getSecondTypographySelector(heroType)} .gvnews_post_title`,
    });

    isNotEmpty(attributes['thridTitleTypography']) && withThridTypo && data.push({
        'type': 'typography',
        'id': 'thridTitleTypography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} ${'12' === heroType ? '.gvnews_heroblock .gvnews_post:not(.gvnews_hero_item_1, .gvnews_hero_item_2 , .gvnews_hero_item_3) .gvnews_post_title a' : '.gvnews_heroblock .gvnews_post:not(.gvnews_hero_item_1, .gvnews_hero_item_2) .gvnews_post_title'}`,
    });

    // Border Item
    isNotEmpty(attributes['borderItem']) && data.push({
        'type': 'border',
        'id': 'borderItem',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heroblock .gvnews_post .gvnews_block_container`,
    });
    isNotEmpty(attributes['borderItemSecond']) && data.push({
        'type': 'border',
        'id': 'borderItemSecond',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} ${getSecondTypographySelector(heroType)} .gvnews_block_container`,
    });
    isNotEmpty(attributes['borderItemThird']) && data.push({
        'type': 'border',
        'id': 'borderItemThird',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} ${'12' === heroType ? '.gvnews_heroblock .gvnews_post:not(.gvnews_hero_item_1, .gvnews_hero_item_2 , .gvnews_hero_item_3) .gvnews_block_container' : '.gvnews_heroblock .gvnews_post:not(.gvnews_hero_item_1, .gvnews_hero_item_2) .gvnews_block_container'}`,
    });

    // Border Responsive Item
    isNotEmpty(attributes['borderResponsiveItem']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsiveItem',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heroblock .gvnews_post .gvnews_block_container`,
    });
    isNotEmpty(attributes['borderResponsiveItemSecond']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsiveItemSecond',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} ${getSecondTypographySelector(heroType)} .gvnews_block_container`,
    });
    isNotEmpty(attributes['borderResponsiveItemThird']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsiveItemThird',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} ${'12' === heroType ? '.gvnews_heroblock .gvnews_post:not(.gvnews_hero_item_1, .gvnews_hero_item_2 , .gvnews_hero_item_3) .gvnews_block_container' : '.gvnews_heroblock .gvnews_post:not(.gvnews_hero_item_1, .gvnews_hero_item_2) .gvnews_block_container'}`,
    });

    isNotEmpty(attributes['titleColor']) && data.push({
        'type': 'color',
        'id': 'titleColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heroblock .gvnews_post_title a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['titleColorHover']) && data.push({
        'type': 'color',
        'id': 'titleColorHover',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heroblock .gvnews_post_title a:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });


    /**
    * Panel Meta Style
    */
    if (showMeta) {
        isNotEmpty(attributes['metaTypography']) && data.push({
            'type': 'typography',
            'id': 'metaTypography',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heroblock .gvnews_post_meta>div ,.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_meta .gvnews_meta_author .by`,
        });

        isNotEmpty(attributes['metaColor']) && data.push({
            'type': 'color',
            'id': 'metaColor',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heroblock .gvnews_post_meta>div ,.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_meta .gvnews_meta_author .by , .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heroblock .gvnews_post_meta a`,
            'properties': [
                {
                    'name': 'color',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['metaColorHover']) && data.push({
            'type': 'color',
            'id': 'metaColorHover',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heroblock .gvnews_post_meta a:hover`,
            'properties': [
                {
                    'name': 'color',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['metaIconColor']) && data.push({
            'type': 'color',
            'id': 'metaIconColor',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_meta .far `,
            'properties': [
                {
                    'name': 'color',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['metaIconColorHover']) && data.push({
            'type': 'color',
            'id': 'metaIconColorHover',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heroblock .gvnews_post_meta a:hover .far`,
            'properties': [
                {
                    'name': 'color',
                    'valueType': 'direct'
                }
            ],
        });

        if (showMetaAuthor) {

            isNotEmpty(attributes['typographyMetaAuthor']) && data.push({
                'type': 'typography',
                'id': 'typographyMetaAuthor',
                'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heroblock .gvnews_meta_author a`,
            });
            isNotEmpty(attributes['metaAuthorColor']) && data.push({
                'type': 'color',
                'id': 'metaAuthorColor',
                'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heroblock .gvnews_meta_author a`,
                'properties': [
                    {
                        'name': 'color',
                        'valueType': 'direct'
                    }
                ],
            });
            isNotEmpty(attributes['metaAuthorColorHover']) && data.push({
                'type': 'color',
                'id': 'metaAuthorColorHover',
                'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heroblock .gvnews_meta_author a:hover`,
                'properties': [
                    {
                        'name': 'color',
                        'valueType': 'direct'
                    }
                ],
            });
        }
    }

    data = noContentStyle(elementId, attributes, data);

    return data;
};

const getSecondTypographySelector = (templateType) => {
    switch (templateType) {
        case '10':
            return '.gvnews_heroblock .gvnews_post:not(.gvnews_hero_item_1, .gvnews_hero_item_5)';
        case '11':
            return '.gvnews_heroblock .gvnews_post.gvnews_hero_item_1';
        case '12':
            return '.gvnews_heroblock .gvnews_post:not(.gvnews_hero_item_1, .gvnews_hero_item_4 , .gvnews_hero_item_5)';
    }
    return '.gvnews_heroblock .gvnews_post:not(.gvnews_hero_item_1)';
};

const noContentStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['noContentTextAlign']) && data.push({
        'type': 'plain',
        'id': 'noContentTextAlign',
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_empty_module`,
    });

    isNotEmpty(attributes['noContentTypography']) && data.push({
        'type': 'typography',
        'id': 'noContentTypography',
        'selector': `.${elementId} .gvnews_empty_module`,
    });

    isNotEmpty(attributes['noContentColor']) && data.push({
        'type': 'color',
        'id': 'noContentColor',
        'selector': `.${elementId} .gvnews_empty_module`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['noContentBackground']) && data.push({
        'type': 'background',
        'id': 'noContentBackground',
        'selector': `.${elementId} .gvnews_empty_module`,
    });

    isNotEmpty(attributes['noContentBorder']) && data.push({
        'type': 'borderResponsive',
        'id': 'noContentBorder',
        'selector': `.${elementId} .gvnews_empty_module`,
    });

    isNotEmpty(attributes['noContentPadding']) && data.push({
        'type': 'dimension',
        'id': 'noContentPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_empty_module`,
    });
    return data;

};

const overlayStyle = (elementId, attributes, data, heroType, withSecondTypo, withThridTypo) => {

    isNotEmpty(attributes['overlayIconColor']) && data.push({
        'type': 'color',
        'id': 'overlayIconColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heroblock .gvnews_post .gvnews-thumb-overlay-icon`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['overlayIconSizeMain']) && data.push({
        'type': 'plain',
        'id': 'overlayIconSizeMain',
        'responsive': true,
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heroblock .gvnews_post .gvnews-thumb-overlay-icon`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ],
    });

    isNotEmpty(attributes['overlayIconSizeSecond']) && withSecondTypo && data.push({
        'type': 'plain',
        'id': 'overlayIconSizeSecond',
        'responsive': true,
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} ${getSecondTypographySelector(heroType)} .gvnews-thumb-overlay-icon`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ],
    });

    isNotEmpty(attributes['overlayIconSizeThrid']) && withThridTypo && data.push({
        'type': 'plain',
        'id': 'overlayIconSizeThrid',
        'responsive': true,
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} ${'12' === heroType ? '.gvnews_heroblock .gvnews_post:not(.gvnews_hero_item_1, .gvnews_hero_item_2 , .gvnews_hero_item_3) .gvnews-thumb-overlay-icon' : '.gvnews_heroblock .gvnews_post:not(.gvnews_hero_item_1, .gvnews_hero_item_2) .gvnews-thumb-overlay-icon'}`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ],
    });

    return data;
}

export default getBlockStyle;