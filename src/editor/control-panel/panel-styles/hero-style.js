import { isNotEmpty } from 'gutenverse-core/helper';
import { positioningStyle } from './positioning-style';

const getHeroStyle = (elementId, attributes) => {
    let data = [];

    const {
        showMeta = true,
        showMetaAuthor = true,
        gvnewsModule,
        heroStyle
    } = attributes;
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
        },);
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

    if (isNotEmpty(attributes['heroItemOverlay'])) {
        let repeaterOption = getHeroStyleOptions(elementId, attributes['heroItemOverlay'], attributes['heroStyle']);
        data.push({
            'type': 'repeater',
            'id': 'heroItemOverlay',
            'repeaterOpt': repeaterOption
        });
    }

    // --- START TITLE & META STYLE PANEL ---

    isNotEmpty(attributes['titleTypography']) && data.push({
        'id': 'titleTypography',
        'type': 'typography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heroblock_wrapper .gvnews_post_title`,
    });
    isNotEmpty(attributes['metaTypography']) && data.push({
        'id': 'metaTypography',
        'type': 'typography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heroblock_wrapper .gvnews_post_meta`,
    });
    isNotEmpty(attributes['titleColor']) && data.push({
        'id': 'titleColor',
        'type': 'color',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heroblock_wrapper .gvnews_post_title a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });
    isNotEmpty(attributes['titleColorHover']) && data.push({
        'id': 'titleColorHover',
        'type': 'color',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heroblock_wrapper .gvnews_post_title:hover a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });
    isNotEmpty(attributes['metaColor']) && data.push({
        'id': 'metaColor',
        'type': 'color',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heroblock_wrapper .gvnews_post_meta a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    if (gvnewsModule === 'GUTENVERSE\\NEWS\\Block\\Hero\\Hero_13') {
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

    /**
     * Panel Setting
     */
    isNotEmpty(attributes['heroMargin']) && data.push(
        {
            'type': 'plain',
            'id': 'heroMargin',
            'properties': [
                {
                    'name': 'padding',
                    'valueType': 'pattern',
                    'pattern': '0 0 {value}px {value}px',
                    'patternValues': {
                        'value': {
                            'type': 'direct',
                        }
                    }
                }
            ],
            'selector': `.${elementId} article.gvnews_post`,
        },
        {
            'type': 'plain',
            'id': 'heroMargin',
            'properties': [
                {
                    'name': 'margin',
                    'valueType': 'pattern',
                    'pattern': '0 0 -{value}px -{value}px',
                    'patternValues': {
                        'value': {
                            'type': 'direct',
                        }
                    }
                }
            ],
            'selector': `.${elementId} .gvnews_heroblock_wrapper`,
        }
    );

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
     * Box shadow.
     */
    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_heroblock`,
    });

    isNotEmpty(attributes['boxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadowHover',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_heroblock:hover`,
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

    isNotEmpty(attributes['typography']) && data.push({
        'type': 'typography',
        'id': 'typography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heroblock .gvnews_post .gvnews_post_title`,
    });


    isNotEmpty(attributes['secondTitleTypography']) && data.push({
        'type': 'typography',
        'id': 'secondTitleTypography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} ${isNotEmpty(attributes['selectorSecond']) ?
            attributes['selectorSecond'] + ' .gvnews_post_title' :
            '.gvnews_heroblock .gvnews_post:not(.gvnews_hero_item_1) .gvnews_post_title'}`,
    });

    isNotEmpty(attributes['thridTitleTypography']) && data.push({
        'type': 'typography',
        'id': 'thridTitleTypography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} ${isNotEmpty(attributes['selectorThrid']) ?
            attributes['selectorThrid'] + ' .gvnews_post_title' :
            '.gvnews_heroblock .gvnews_post:not(.gvnews_hero_item_1, .gvnews_hero_item_2) .gvnews_post_title'}`,
    });

    // Border Responsive Item
    isNotEmpty(attributes['borderItem']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderItem',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heroblock .gvnews_post .gvnews_block_container`,
    });
    isNotEmpty(attributes['borderItemSecond']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderItemSecond',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} ${isNotEmpty(attributes['selectorSecond']) ?
            attributes['selectorSecond'] + ' .gvnews_block_container' :
            '.gvnews_heroblock .gvnews_post:not(.gvnews_hero_item_1) .gvnews_block_container'}`,
    });
    isNotEmpty(attributes['borderItemThird']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderItemThird',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} ${isNotEmpty(attributes['selectorThrid']) ?
            attributes['selectorThrid'] + ' .gvnews_block_container' :
            '.gvnews_heroblock .gvnews_post:not(.gvnews_hero_item_1, .gvnews_hero_item_2) .gvnews_block_container'}`,
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
        isNotEmpty(attributes['typographyMeta']) && data.push({
            'type': 'typography',
            'id': 'typographyMeta',
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
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_meta .far, .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_meta svg`,
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
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heroblock .gvnews_post_meta a:hover .far, .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heroblock .gvnews_post_meta a:hover svg`,
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


const getHeroStyleOptions = (elementId, attribute, heroStyle) => {
    let additional = (heroStyle === '5') ? 'after' : 'before';
    return attribute.map((el, index) => {
        let data = [];

        el.overlayEnable && isNotEmpty(el.OverlayGradient) && data.push({
            'type': 'background',
            'id': 'OverlayGradient',
            'selector': `.${elementId} .gvnews_heroblock .gvnews_hero_item_${index + 1} .gvnews_thumb a > div:${additional}`,
        });

        return data;
    });
};

const noContentStyle = (elementId, attributes, data) => {
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

export default getHeroStyle;