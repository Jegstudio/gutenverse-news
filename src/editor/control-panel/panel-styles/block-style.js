import { isNotEmpty } from 'gutenverse-core/helper';

const getBlockStyle = (
    elementId,
    attributes,
    mainThumbnailClass = null,
    secondThumbnailClass = null
) => {
    let data = [];

    const {
        showMeta = true,
        showMetaAuthor = true,
        headerType,
        gvnewsModule
    } = attributes;

    const withSecondText = ['heading_5', 'heading_6', 'heading_7', 'heading_8'].includes(headerType);

    const getSelector = (selector, def) => {
        const base = `.gvnews-block.gvnews-block-wrapper.${elementId}`;
        const raw = attributes[selector] ? attributes[selector] : def;
        // split by comma, trim each part, prefix with base, then join back with comma
        return raw.split(',').map(part => `${base} ${part.trim()}`).join(', ');
    };

    /**
     * Panel Header
     */
    isNotEmpty(attributes['headerBackgroundColor']) && data.push({
        'type': 'color',
        'id': 'headerBackgroundColor',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_1 .gvnews_block_title span`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_2 .gvnews_block_title span`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_4 .gvnews_block_title span`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_5 .gvnews_block_title span`
        ],
        'properties': [
            {
                'name': 'background',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['headerTextTypography']) && data.push({
        'type': 'typography',
        'id': 'headerTextTypography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_title span , .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_title`,
    });

    isNotEmpty(attributes['headerSecondTextTypography']) && withSecondText && data.push({
        'type': 'typography',
        'id': 'headerSecondTextTypography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_title span strong`,
    });
    isNotEmpty(attributes['headerFilterTypography']) && data.push({
        'type': 'typography',
        'id': 'headerFilterTypography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_subcat_list>li>a`,
    });

    isNotEmpty(attributes['headerBackgroundColor2']) && data.push({
        'type': 'color',
        'id': 'headerBackgroundColor2',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_3`,
        'properties': [
            {
                'name': 'background',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['headerTextColor']) && data.push({
        'type': 'color',
        'id': 'headerTextColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_title span`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['headerSecondTextColor']) && withSecondText && data.push({
        'type': 'color',
        'id': 'headerSecondTextColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_title span strong`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['headerSecondColor']) && data.push({
        'type': 'color',
        'id': 'headerSecondColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_2`,
        'properties': [
            {
                'name': 'background',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['headerLineColor']) && data.push({
        'type': 'color',
        'id': 'headerLineColor',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_1`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_6`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_9`
        ],
        'properties': [
            {
                'name': 'border-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['headerLineColor2']) && data.push({
        'type': 'color',
        'id': 'headerLineColor2',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_5:before`,
        'properties': [
            {
                'name': 'border-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['headerAccentColor']) && data.push({
        'type': 'color',
        'id': 'headerAccentColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_6:after`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['headerAccentColor2']) && data.push({
        'type': 'color',
        'id': 'headerAccentColor2',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_7 .gvnews_block_title span`,
        'properties': [
            {
                'name': 'border-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['headerFilterColor']) && data.push({
        'type': 'color',
        'id': 'headerFilterColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_subcat_list>li>a:not(.current)`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['headerFilterColorActive']) && data.push({
        'type': 'color',
        'id': 'headerFilterColorActive',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_subcat_list>li>a.current`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });
    isNotEmpty(attributes['headerFilterColorHover']) && data.push({
        'type': 'color',
        'id': 'headerFilterColorHover',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_subcat_list>li>a:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    /**
     * Panel Design
     */
    isNotEmpty(attributes['typography']) && data.push({
        'type': 'typography',
        'id': 'typography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post .gvnews_post_title`,
    });

    isNotEmpty(attributes['secondTitleTypography']) && data.push({
        'type': 'typography',
        'id': 'secondTitleTypography',
        'selector': getSelector('selectorSecondTitleTypography', '.gvnews_pl_sm .gvnews_post_title'),
    });

    isNotEmpty(attributes['thridTitleTypography']) && data.push({
        'type': 'typography',
        'id': 'thridTitleTypography',
        'selector': getSelector('selectorThridTitleTypography', '.gvnews_pl_xs_2 .gvnews_post_title'),
    });

    isNotEmpty(attributes['typographyContent']) && data.push({
        'type': 'typography',
        'id': 'typographyContent',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_excerpt p`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_excerpt .gvnews_readmore`
        ],
    });

    isNotEmpty(attributes['titleColor']) && data.push({
        'type': 'color',
        'id': 'titleColor',
        'selector': getSelector('selectorTitleColor', '.gvnews_postblock .gvnews_post_title a'),
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['aHover']) && data.push({
        'type': 'color',
        'id': 'aHover',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_meta_author a`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} ${isNotEmpty(attributes['selectorTitleColor']) ? attributes['selectorTitleColor'] : '.gvnews_postblock .gvnews_post_title a'}:hover`
        ],
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });


    isNotEmpty(attributes['excerptColor']) && data.push({
        'type': 'color',
        'id': 'excerptColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_excerpt`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['listIconColor']) && data.push({
        'type': 'color',
        'id': 'listIconColor',
        'selector': getSelector('selectorIconList', '.gvnews_pl_xs_2>i, .gvnews_pl_xs_2>.gutenverse-icon-svg svg'),
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });



    switch (headerType) {
        case 'heading_1':
            isNotEmpty(attributes['headerLineThick']) && data.push({
                'type': 'plain',
                'id': 'headerLineThick',
                'responsive': true,
                'selector': `.${elementId} .gvnews_block_heading_1`,
                'properties': [
                    {
                        'name': 'border-bottom-width',
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
            break;


        case 'heading_3':
            isNotEmpty(attributes['headerFilterLineColor']) && data.push({
                'type': 'color',
                'id': 'headerFilterLineColor',
                'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_3 .gvnews_subcat_list li a.current`,
                'properties': [
                    {
                        'name': 'border-color',
                        'valueType': 'direct'
                    }
                ],
            });
            break;

        case 'heading_5':
            isNotEmpty(attributes['headerLineThick']) && data.push({
                'type': 'plain',
                'id': 'headerLineThick',
                'responsive': true,
                'selector': `.${elementId} .gvnews_block_heading_5 .line`,
                'properties': [
                    {
                        'name': 'border-bottom-width',
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
            break;

        case 'heading_6':
            isNotEmpty(attributes['headerLineThick']) && data.push({
                'type': 'plain',
                'id': 'headerLineThick',
                'responsive': true,
                'selector': `.${elementId} .gvnews_block_heading_6`,
                'properties': [
                    {
                        'name': 'border-bottom-width',
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

            isNotEmpty(attributes['headerLineThick']) && data.push({
                'type': 'plain',
                'id': 'headerLineThick',
                'responsive': true,
                'selector': `.${elementId} .gvnews_block_heading_6:after`,
                'properties': [
                    {
                        'name': 'height',
                        'valueType': 'pattern',
                        'pattern': '{value}px',
                        'patternValues': {
                            'value': {
                                'type': 'direct'
                            }
                        }
                    },
                    {
                        'name': 'bottom',
                        'valueType': 'pattern',
                        'pattern': '-{value}px',
                        'patternValues': {
                            'value': {
                                'type': 'direct'
                            }
                        }
                    }
                ],
            });
            break;

        case 'heading_7':
            isNotEmpty(attributes['headerLineThick']) && data.push({
                'type': 'plain',
                'id': 'headerLineThick',
                'responsive': true,
                'selector': `.${elementId} .gvnews_block_heading_7 .gvnews_block_title span`,
                'properties': [
                    {
                        'name': 'border-bottom-width',
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
            break;

        case 'heading_9':
            isNotEmpty(attributes['headerLineThick']) && data.push({
                'type': 'plain',
                'id': 'headerLineThick',
                'responsive': true,
                'selector': `.${elementId} .gvnews_block_heading_9`,
                'properties': [
                    {
                        'name': 'border-bottom-width',
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

            isNotEmpty(attributes['headerLineThick2']) && data.push({
                'type': 'plain',
                'id': 'headerLineThick2',
                'responsive': true,
                'selector': `.${elementId} .gvnews_block_heading_9`,
                'properties': [
                    {
                        'name': 'border-top-width',
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
            break;

        default:
            break;
    }



    /**
     * Panel Meta Style
     */
    if (showMeta) {
        isNotEmpty(attributes['typographyMeta']) && data.push({
            'type': 'typography',
            'id': 'typographyMeta',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_meta>div ,.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_meta .gvnews_meta_author .by `,
        });

        isNotEmpty(attributes['typographyMetaAuthor']) && data.push({
            'type': 'typography',
            'id': 'typographyMetaAuthor',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_meta .gvnews_meta_author a`,
        });

        isNotEmpty(attributes['metaColor']) && data.push({
            'type': 'color',
            'id': 'metaColor',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_meta , .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_meta .by`,
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
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_meta>div:not(.gvnews_meta_author) a:hover`,
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
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_meta .fa ,.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_meta .far , .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_meta .fas, .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_meta svg`,
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
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_meta>div:hover .fa ,.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_meta>div:hover .far , .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_meta>div:hover .fas, .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_meta>div:hover svg`,
            'properties': [
                {
                    'name': 'color',
                    'valueType': 'direct'
                }
            ],
        });

        if (showMetaAuthor) {
            isNotEmpty(attributes['metaAuthorColor']) && data.push({
                'type': 'color',
                'id': 'metaAuthorColor',
                'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_meta .gvnews_meta_author a`,
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
                'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_meta .gvnews_meta_author a:hover`,
                'properties': [
                    {
                        'name': 'color',
                        'valueType': 'direct'
                    }
                ],
            });
        }
    }

    /**
     * Panel Background
     */
    isNotEmpty(attributes['background']) && data.push({
        'type': 'background',
        'id': 'background',
        'selector': `.${elementId} .gvnews_postblock`,
    });

    isNotEmpty(attributes['backgroundHover']) && data.push({
        'type': 'background',
        'id': 'backgroundHover',
        'selector': `.${elementId} .gvnews_postblock:hover`,
    });

    /**
     * Panel Border
     */
    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `.${elementId} .gvnews_postblock`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.${elementId} .gvnews_postblock`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.${elementId} .gvnews_postblock:hover`,
    });

    isNotEmpty(attributes['borderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderHoverResponsive',
        'selector': `.${elementId} .gvnews_postblock:hover`,
    });

    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'selector': `.${elementId} .gvnews_postblock`,
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
        'selector': `.${elementId} .gvnews_postblock:hover`,
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
        'selector': `.${elementId} .gvnews_postblock`,
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
        'selector': `.${elementId} .gvnews_postblock`,
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
        'selector': `.${elementId} .gvnews_postblock`,
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
        'selector': gvnewsModule === 'GUTENVERSE\\NEWS\\Block\\Module\\Module_38' ? `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category span` : `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category`,
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
    * Panel Read More Style
    */

    isNotEmpty(attributes['readmoreButtonTypography']) && data.push({
        'type': 'typography',
        'id': 'readmoreButtonTypography',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore`,
    });

    isNotEmpty(attributes['readmoreButtonBackground']) && data.push({
        'type': 'color',
        'id': 'readmoreButtonBackground',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['readmoreButtonBackgroundHover']) && data.push({
        'type': 'color',
        'id': 'readmoreButtonBackgroundHover',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore:hover`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['readmoreButtonColor']) && data.push({
        'type': 'color',
        'id': 'readmoreButtonColor',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['readmoreButtonColorHover']) && data.push({
        'type': 'color',
        'id': 'readmoreButtonColorHover',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['readmoreButtonBorder']) && data.push({
        'type': 'border',
        'id': 'readmoreButtonBorder',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore`,
    });

    isNotEmpty(attributes['readmoreButtonBorderHover']) && data.push({
        'type': 'border',
        'id': 'readmoreButtonBorderHover',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore:hover`,
    });

    isNotEmpty(attributes['readmoreButtonBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'readmoreButtonBoxShadow',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore`,
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['readmoreButtonBoxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'readmoreButtonBoxShadowHover',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore:hover`,
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['readmoreButtonPadding']) && data.push({
        'type': 'dimension',
        'id': 'readmoreButtonPadding',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore`,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
    });

    isNotEmpty(attributes['readmoreButtonMargin']) && data.push({
        'type': 'dimension',
        'id': 'readmoreButtonMargin',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore`,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
    });

    // pagination styling
    isNotEmpty(attributes['paginationWrapperMargin']) && data.push({
        'type': 'dimension',
        'id': 'paginationWrapperMargin',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_block_navigation`,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        responsive: true,
    });
    isNotEmpty(attributes['paginationWrapperAlign']) && data.push(
        {
            'type': 'plain',
            'id': 'paginationWrapperAlign',
            'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav, .${elementId} .gvnews_block_navigation .gvnews_block_loadmore`,
            'properties': [
                {
                    'name': 'justify-content',
                    'valueType': 'direct'
                }
            ],
            'responsive': true,
        },
        {
            'type': 'plain',
            'id': 'paginationWrapperAlign',
            'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav:before, .${elementId} .gvnews_block_navigation .gvnews_block_loadmore:before`,
            'properties': [
                {
                    'name': 'display',
                    'valueType': 'function',
                    'functionName': 'modulePaginationAlign',
                    'functionProps': {
                        'selectTarget': 'before',
                    }
                }
            ],
            'responsive': true,
        },
        {
            'type': 'plain',
            'id': 'paginationWrapperAlign',
            'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav:after, .${elementId} .gvnews_block_navigation .gvnews_block_loadmore:after`,
            'properties': [
                {
                    'name': 'display',
                    'valueType': 'function',
                    'functionName': 'modulePaginationAlign',
                    'functionProps': {
                        'selectTarget': 'after',
                    }
                }
            ],
            'responsive': true,
        },
    );
    isNotEmpty(attributes['paginationDisableSeparator']) && attributes['paginationDisableSeparator'] && data.push({
        'type': 'plain',
        'id': 'paginationDisableSeparator',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav:before, .${elementId} .gvnews_block_navigation .gvnews_block_nav:after, .${elementId} .gvnews_block_navigation .gvnews_block_loadmore:before, .${elementId} .gvnews_block_navigation .gvnews_block_loadmore:after`,
        'properties': [
            {
                'name': 'display',
                'valueType': 'static',
                'staticValue': 'none !important',
            }
        ],
    });
    isNotEmpty(attributes['paginationBtnTypography']) && data.push({
        'type': 'typography',
        'id': 'paginationBtnTypography',
        'selector': `.${elementId}.gvnews-block.gvnews-block-wrapper .gvnews_block_navigation a`,
    });
    isNotEmpty(attributes['paginationBtnIconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'paginationBtnIconSize',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav i, .${elementId} .gvnews_block_navigation .gvnews_block_nav svg`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'direct',
            }
        ],
    });
    isNotEmpty(attributes['paginationBtnWidth']) && data.push({
        'type': 'unitPoint',
        'id': 'paginationBtnWidth',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a, .${elementId} .gvnews_block_navigation .gvnews_block_nav a, .${elementId} .gvnews_block_navigation .gvnews_block_nav.showtext a`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct',
            }
        ],
        'responsive': true,
    });
    isNotEmpty(attributes['paginationBtnHeight']) && data.push({
        'type': 'unitPoint',
        'id': 'paginationBtnHeight',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a, .${elementId} .gvnews_block_navigation .gvnews_block_nav a`,
        'properties': [
            {
                'name': 'height',
                'valueType': 'direct',
            }
        ],
        'responsive': true,
    });
    isNotEmpty(attributes['paginationBtnColor']) && data.push({
        'type': 'color',
        'id': 'paginationBtnColor',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a, .${elementId} .gvnews_block_navigation .gvnews_block_nav a:not(.disabled)`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
    });
    isNotEmpty(attributes['paginationBtnHoverColor']) && data.push({
        'type': 'color',
        'id': 'paginationBtnHoverColor',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a:hover, .${elementId} .gvnews_block_navigation .gvnews_block_nav a:not(.disabled):hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
    });
    isNotEmpty(attributes['paginationBtnDisableColor']) && data.push({
        'type': 'color',
        'id': 'paginationBtnDisableColor',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav a.disabled`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
    });
    isNotEmpty(attributes['paginationBtnBackground']) && data.push({
        'type': 'background',
        'id': 'paginationBtnBackground',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a, .${elementId} .gvnews_block_navigation .gvnews_block_nav a:not(.disabled)`,
    });
    isNotEmpty(attributes['paginationBtnHoverBackground']) && data.push({
        'type': 'background',
        'id': 'paginationBtnHoverBackground',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a:hover, .${elementId} .gvnews_block_navigation .gvnews_block_nav a:not(.disabled):hover`,
    });
    isNotEmpty(attributes['paginationBtnDisableBackground']) && data.push({
        'type': 'background',
        'id': 'paginationBtnDisableBackground',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav a.disabled`,
    });
    isNotEmpty(attributes['paginationBtnBorder']) && data.push({
        'type': 'border',
        'id': 'paginationBtnBorder',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a, .${elementId} .gvnews_pagination_nextprev .gvnews_block_navigation .gvnews_block_nav a`,
    });
    isNotEmpty(attributes['paginationBtnBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'paginationBtnBorderResponsive',
        'responsive': true,
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a, .${elementId} .gvnews_pagination_nextprev .gvnews_block_navigation .gvnews_block_nav a`,
    });
    isNotEmpty(attributes['paginationBtnHoverBorder']) && data.push({
        'type': 'border',
        'id': 'paginationBtnHoverBorder',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a:hover, .${elementId} .gvnews_pagination_nextprev .gvnews_block_navigation .gvnews_block_nav a:hover`,
    });
    isNotEmpty(attributes['paginationBtnHoverBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'paginationBtnHoverBorderResponsive',
        'responsive': true,
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a:hover, .${elementId} .gvnews_pagination_nextprev .gvnews_block_navigation .gvnews_block_nav a:hover`,
    });
    isNotEmpty(attributes['paginationBtnDisableBorder']) && data.push({
        'type': 'border',
        'id': 'paginationBtnDisableBorder',
        'selector': `.${elementId} .gvnews_pagination_nextprev .gvnews_block_navigation .gvnews_block_nav a.disabled`,
    });
    isNotEmpty(attributes['paginationBtnDisableBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'paginationBtnDisableBorderResponsive',
        'responsive': true,
        'selector': `.${elementId} .gvnews_pagination_nextprev .gvnews_block_navigation .gvnews_block_nav a.disabled`,
    });
    isNotEmpty(attributes['paginationBtnBoxShadow']) && data.push({
        'type': 'boxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'id': 'paginationBtnBoxShadow',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a, .${elementId} .gvnews_block_navigation .gvnews_block_nav a:not(.disabled)`,
    });
    isNotEmpty(attributes['paginationBtnHoverBoxShadow']) && data.push({
        'type': 'boxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'id': 'paginationBtnHoverBoxShadow',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a:hover, .${elementId} .gvnews_block_navigation .gvnews_block_nav a:not(.disabled):hover`,
    });
    isNotEmpty(attributes['paginationBtnDisableBoxShadow']) && data.push({
        'type': 'boxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'id': 'paginationBtnDisableBoxShadow',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav a.disabled`,
    });
    isNotEmpty(attributes['paginationSeparatorStyle']) && data.push({
        'type': 'plain',
        'id': 'paginationSeparatorStyle',
        'properties': [
            {
                'name': 'border-bottom-style',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav:before, .${elementId} .gvnews_block_navigation .gvnews_block_nav:after, .${elementId} .gvnews_block_navigation .gvnews_block_loadmore:before, .${elementId} .gvnews_block_navigation .gvnews_block_loadmore:after`,
    });
    isNotEmpty(attributes['paginationSeparatorColor']) && data.push({
        'type': 'color',
        'id': 'paginationSeparatorColor',
        'properties': [
            {
                'name': 'border-bottom-color',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav:before, .${elementId} .gvnews_block_navigation .gvnews_block_nav:after, .${elementId} .gvnews_block_navigation .gvnews_block_loadmore:before, .${elementId} .gvnews_block_navigation .gvnews_block_loadmore:after`,
    });
    isNotEmpty(attributes['paginationSeparatorWidth']) && data.push({
        'type': 'unitPoint',
        'id': 'paginationSeparatorWidth',
        'properties': [
            {
                'name': 'border-bottom-width',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav:before, .${elementId} .gvnews_block_navigation .gvnews_block_nav:after, .${elementId} .gvnews_block_navigation .gvnews_block_loadmore:before, .${elementId} .gvnews_block_navigation .gvnews_block_loadmore:after`,
    });
    isNotEmpty(attributes['paginationBtnGap']) && data.push({
        'type': 'unitPoint',
        'id': 'paginationBtnGap',
        'properties': [
            {
                'name': 'gap',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav, .${elementId} .gvnews_block_navigation .gvnews_block_loadmore`,
    });
    isNotEmpty(attributes['paginationBtnDisableOpacity']) && data.push({
        'type': 'plain',
        'id': 'paginationBtnDisableOpacity',
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav a.disabled`,
    });

    isNotEmpty(attributes['paginationBtnIconSpacing']) && attributes['paginationMode'] === 'nextprev' && attributes['showNavText'] && data.push(
        {
            'type': 'unitPoint',
            'id': 'paginationBtnIconSpacing',
            'properties': [
                {
                    'name': 'margin-left',
                    'valueType': 'direct'
                }
            ],
            'responsive': true,
            'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav.showtext .next i, .${elementId} .gvnews_block_navigation .gvnews_block_nav.showtext .next svg`,
        },
        {
            'type': 'unitPoint',
            'id': 'paginationBtnIconSpacing',
            'properties': [
                {
                    'name': 'margin-right',
                    'valueType': 'direct'
                }
            ],
            'responsive': true,
            'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav.showtext .prev i, .${elementId} .gvnews_block_navigation .gvnews_block_nav.showtext .prev svg`,
        },
    );

    isNotEmpty(attributes['headerTitlePadding']) && data.push({
        'type': 'dimension',
        'id': 'headerTitlePadding',
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.${elementId} .gvnews_block_heading .gvnews_block_title span`,
    });

    isNotEmpty(attributes['headerMargin']) && data.push({
        'type': 'dimension',
        'id': 'headerMargin',
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.${elementId} .gvnews_block_heading`,
    });


    isNotEmpty(attributes['headerHeight']) && data.push({
        'type': 'plain',
        'id': 'headerHeight',
        'responsive': true,
        'selector': `.${elementId} .gvnews_block_heading .gvnews_block_title span , .${elementId} .gvnews_block_heading `,
        'properties': [
            {
                'name': 'height',
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

    isNotEmpty(attributes['borderItem']) && data.push({
        'type': 'border',
        'id': 'borderItem',
        'selector': `.gvnews-block-wrapper.${elementId} .gvnews_postblock .${mainThumbnailClass}.gvnews_post`,
    });

    isNotEmpty(attributes['borderItemResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderItemResponsive',
        'selector': `.gvnews-block-wrapper.${elementId} .gvnews_postblock .${mainThumbnailClass}.gvnews_post`,
    });

    data = headerFilterStyle(elementId, attributes, data);
    data = contentContainerStyle(elementId, attributes, data, mainThumbnailClass, secondThumbnailClass);
    data = thumbnailAndOverlayStyle(elementId, attributes, data, mainThumbnailClass, secondThumbnailClass);
    data = titleContainerStyle(elementId, attributes, data);
    data = postItemStyle(elementId, attributes, data);
    data = noContentStyle(elementId, attributes, data);
    data = cardStyleModule(elementId, attributes, data, mainThumbnailClass, secondThumbnailClass);
    return data;
};

const headerFilterStyle = (elementId, attributes, data) => {

    const {
        headerCategory,
        headerAuthor,
        headerTag,
    } = attributes;
    const withHeaderFilter = isNotEmpty(headerCategory) || isNotEmpty(headerAuthor) || isNotEmpty(headerTag);
    if (withHeaderFilter) {

        isNotEmpty(attributes['filterDowndownTypography']) && data.push({
            'type': 'typography',
            'id': 'filterDowndownTypography',
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible .subclass-filter`,
        });

        isNotEmpty(attributes['filterDowndownWrapperBackground']) && data.push({
            'type': 'color',
            'id': 'filterDowndownWrapperBackground',
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible`,
            'properties': [
                {
                    'name': 'background',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['filterDropdownItemPadding']) && data.push({
            'type': 'dimension',
            'id': 'filterDropdownItemPadding',
            'properties': [
                {
                    'name': 'padding',
                    'valueType': 'direct'
                }
            ],
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible .subclass-filter`,
        });

        isNotEmpty(attributes['filterDropdownWrapperPadding']) && data.push({
            'type': 'dimension',
            'id': 'filterDropdownWrapperPadding',
            'properties': [
                {
                    'name': 'padding',
                    'valueType': 'direct'
                }
            ],
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible`,
        });

        isNotEmpty(attributes['filterDropdownWrapperBorder']) && data.push({
            'type': 'border',
            'id': 'filterDropdownWrapperBorder',
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible`,
        });


        isNotEmpty(attributes['filterDropdownBoxShadow']) && data.push({
            'type': 'boxShadow',
            'id': 'filterDropdownBoxShadow',
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible`,
            'properties': [
                {
                    'name': 'box-shadow',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['filterDowndownColor']) && data.push({
            'type': 'color',
            'id': 'filterDowndownColor',
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible .subclass-filter`,
            'properties': [
                {
                    'name': 'color',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['filterDowndownColorHover']) && data.push({
            'type': 'color',
            'id': 'filterDowndownColorHover',
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible .subclass-filter:hover`,
            'properties': [
                {
                    'name': 'color',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['filterDowndownColorActive']) && data.push({
            'type': 'color',
            'id': 'filterDowndownColorActive',
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible .subclass-filter.current`,
            'properties': [
                {
                    'name': 'color',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['filterDowndownItemBackground']) && data.push({
            'type': 'color',
            'id': 'filterDowndownItemBackground',
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible .subclass-filter`,
            'properties': [
                {
                    'name': 'background',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['filterDowndownItemBackgroundHover']) && data.push({
            'type': 'color',
            'id': 'filterDowndownItemBackgroundHover',
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible .subclass-filter:hover`,
            'properties': [
                {
                    'name': 'background',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['filterDowndownItemBackgroundActive']) && data.push({
            'type': 'color',
            'id': 'filterDowndownItemBackgroundActive',
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible .subclass-filter.current`,
            'properties': [
                {
                    'name': 'background',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['filterDropdownToogleColor']) && data.push({
            'type': 'color',
            'id': 'filterDropdownToogleColor',
            'selector': `.${elementId} .gvnews_subcat .okayNav__menu-toggle span`,
            'properties': [
                {
                    'name': 'background',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['filterDropdownToogleColorHover']) && data.push({
            'type': 'color',
            'id': 'filterDropdownToogleColorHover',
            'selector': `.${elementId} .gvnews_subcat .okayNav__menu-toggle:hover span`,
            'properties': [
                {
                    'name': 'background',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['filterDropdownToogleColorActive']) && data.push({
            'type': 'color',
            'id': 'filterDropdownToogleColorActive',
            'selector': `.${elementId} .gvnews_subcat .okayNav__menu-toggle.icon--active span`,
            'properties': [
                {
                    'name': 'background',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['filterDropdownItemBorder']) && data.push({
            'type': 'border',
            'id': 'filterDropdownItemBorder',
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible .subclass-filter`,
        });
        isNotEmpty(attributes['filterDropdownItemBorderHover']) && data.push({
            'type': 'border',
            'id': 'filterDropdownItemBorderHover',
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible .subclass-filter:hover`,
        });
        isNotEmpty(attributes['filterDropdownItemBorderActive']) && data.push({
            'type': 'border',
            'id': 'filterDropdownItemBorderActive',
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible .subclass-filter.current`,
        });

        isNotEmpty(attributes['headerFilterPadding']) && data.push({
            'type': 'dimension',
            'id': 'headerFilterPadding',
            'responsive': true,
            'properties': [
                {
                    'name': 'padding',
                    'valueType': 'direct'
                }
            ],
            'selector': `.${elementId} .gvnews_block_heading .gvnews_subcat`,
        });
    }
    return data;

};
const contentContainerStyle = (elementId, attributes, data, mainThumbnailClass, secondThumbnailClass) => {
    // Panel Content Container
    if (isNotEmpty(attributes['contentAlign'])) {
        data.push({
            'type': 'plain',
            'responsive': true,
            'id': 'contentAlign',
            'selector': [
                `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews_postblock_content`,
                `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews_postblock_heading`
            ],
            'properties': [
                {
                    'name': 'text-align',
                    'valueType': 'direct',
                }
            ],
        });
        data.push({
            'type': 'plain',
            'responsive': true,
            'id': 'contentAlign',
            'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews_postblock_content .gvnews_post_meta`,
            'properties': [
                {
                    'name': 'justify-content',
                    'valueType': 'function',
                    'functionName': 'handleAlignReverse'
                }
            ],
        });
    }

    isNotEmpty(attributes['contentAlignVertical']) && data.push({
        'type': 'plain',
        'responsive': true,
        'id': 'contentAlignVertical',
        'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass}`,
        'properties': [
            {
                'name': 'align-items',
                'valueType': 'direct',
            }
        ],
    });

    if (isNotEmpty(attributes['contentContainerBackground'])) {
        if (attributes['contentContainerBackground']?.color || attributes['contentContainerBackground']?.gradient) {
            data.push({
                'type': 'plain',
                'id': 'contentContainerBackground',
                'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews_postblock_content`,
                'properties': [
                    {
                        'name': 'background',
                        'valueType': 'pattern',
                        'pattern': 'initial',
                    }
                ],
            });
        }
        data.push({
            'type': 'background',
            'id': 'contentContainerBackground',
            'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews_postblock_content`,
        });
    }

    if (isNotEmpty(attributes['contentMargin'])) {
        data.push({
            'type': 'dimension',
            'id': 'contentMargin',
            'responsive': true,
            'properties': [
                {
                    'name': 'margin',
                    'valueType': 'direct'
                }
            ],
            'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews_postblock_content`,
        });
        data.push({
            'type': 'plain',
            'id': 'contentMargin',
            'responsive': true,
            'properties': [
                {
                    'name': 'column-gap',
                    'valueType': 'pattern',
                    'pattern': 'initial;',
                }
            ],
            'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass}`,
        });
    }

    isNotEmpty(attributes['contentPadding']) && data.push({
        'type': 'dimension',
        'id': 'contentPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews_postblock_content`,
    });

    isNotEmpty(attributes['contentBorder']) && data.push({
        'type': 'border',
        'id': 'contentBorder',
        'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews_postblock_content`,
    });

    isNotEmpty(attributes['contentBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'contentBorderResponsive',
        'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews_postblock_content`,
    });

    isNotEmpty(attributes['contentContainerShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'contentContainerShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews_postblock_content`,
    });

    // Panel Content Container Second
    isNotEmpty(attributes['contentAlignSecond']) && data.push({
        'type': 'plain',
        'responsive': true,
        'id': 'contentAlignSecond',
        'selector': `.${elementId} .gvnews_postblock .${secondThumbnailClass} .gvnews_postblock_content`,
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['contentAlignSecond']) && data.push({
        'type': 'plain',
        'responsive': true,
        'id': 'contentAlignSecond',
        'selector': `.${elementId} .gvnews_postblock .${secondThumbnailClass} .gvnews_postblock_content .gvnews_post_meta`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'function',
                'functionName': 'handleAlignReverse'
            }
        ],
    });

    isNotEmpty(attributes['contentAlignVerticalSecond']) && data.push({
        'type': 'plain',
        'responsive': true,
        'id': 'contentAlignVerticalSecond',
        'selector': `.${elementId} .gvnews_postblock .${secondThumbnailClass}`,
        'properties': [
            {
                'name': 'align-items',
                'valueType': 'direct',
            }
        ],
    });

    if (isNotEmpty(attributes['contentContainerBackgroundSecond'])) {
        if (attributes['contentContainerBackgroundSecond'].color || attributes['contentContainerBackground']?.gradient) {
            data.push({
                'type': 'plain',
                'id': 'contentContainerBackgroundSecond',
                'selector': `.${elementId} .gvnews_postblock .${secondThumbnailClass} .gvnews_postblock_content`,
                'properties': [
                    {
                        'name': 'background',
                        'valueType': 'pattern',
                        'pattern': 'initial',
                    }
                ],
            });
        }
        data.push({
            'type': 'background',
            'id': 'contentContainerBackgroundSecond',
            'selector': `.${elementId} .gvnews_postblock .${secondThumbnailClass} .gvnews_postblock_content`,
        });
    }

    if (isNotEmpty(attributes['contentMarginSecond'])) {
        data.push({
            'type': 'dimension',
            'id': 'contentMarginSecond',
            'responsive': true,
            'properties': [
                {
                    'name': 'margin',
                    'valueType': 'direct'
                }
            ],
            'selector': `.${elementId} .gvnews_postblock .${secondThumbnailClass} .gvnews_postblock_content`,
        });
    }

    isNotEmpty(attributes['contentPaddingSecond']) && data.push({
        'type': 'dimension',
        'id': 'contentPaddingSecond',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_postblock .${secondThumbnailClass} .gvnews_postblock_content`,
    });

    isNotEmpty(attributes['contentBorderSecond']) && data.push({
        'type': 'border',
        'id': 'contentBorderSecond',
        'selector': `.${elementId} .gvnews_postblock .${secondThumbnailClass} .gvnews_postblock_content`,
    });

    isNotEmpty(attributes['contentBorderResponsiveSecond']) && data.push({
        'type': 'borderResponsive',
        'id': 'contentBorderResponsiveSecond',
        'selector': `.${elementId} .gvnews_postblock .${secondThumbnailClass} .gvnews_postblock_content`,
    });

    isNotEmpty(attributes['contentContainerShadowSecond']) && data.push({
        'type': 'boxShadow',
        'id': 'contentContainerShadowSecond',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_postblock .${secondThumbnailClass} .gvnews_postblock_content`,
    });

    return data;
};
const thumbnailAndOverlayStyle = (elementId, attributes, data, mainThumbnailClass, secondThumbnailClass) => {
    // Panel Thumbnail
    if (isNotEmpty(mainThumbnailClass)) {
        isNotEmpty(attributes['borderMainThumbnail']) && data.push({
            'id': 'borderMainThumbnail',
            'type': 'border',
            'selector': [
                `.${elementId} .gvnews_postblock .${mainThumbnailClass} .thumbnail-container`,
                `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews_thumb::before`
            ]
        });
        isNotEmpty(attributes['borderResponsiveMainThumbnail']) && data.push({
            'id': 'borderResponsiveMainThumbnail',
            'type': 'borderResponsive',
            'selector': [
                `.${elementId} .gvnews_postblock .${mainThumbnailClass} .thumbnail-container`,
                `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews_thumb::before`
            ]
        });
        isNotEmpty(attributes['overlayBackgroundMain']) && data.push({
            'type': 'background',
            'id': 'overlayBackgroundMain',
            'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews-thumb-overlay`,
        });
        isNotEmpty(attributes['overlayOpacityMain']) && data.push({
            'type': 'plain',
            'id': 'overlayOpacityMain',
            'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews-thumb-overlay`,
            'properties': [
                {
                    'name': 'opacity',
                    'valueType': 'direct'
                }
            ]
        });
    }

    if (isNotEmpty(secondThumbnailClass)) {
        isNotEmpty(attributes['borderSecondThumbnail']) && data.push({
            'id': 'borderSecondThumbnail',
            'type': 'border',
            'selector': [
                `.${elementId} .gvnews_postblock .${secondThumbnailClass} .thumbnail-container`,
                `.${elementId} .gvnews_postblock .${secondThumbnailClass} .gvnews_thumb::before`
            ],
        });
        isNotEmpty(attributes['borderResponsiveSecondThumbnail']) && data.push({
            'id': 'borderResponsiveSecondThumbnail',
            'type': 'borderResponsive',
            'selector': [
                `.${elementId} .gvnews_postblock .${secondThumbnailClass} .thumbnail-container`,
                `.${elementId} .gvnews_postblock .${secondThumbnailClass} .gvnews_thumb::before`
            ]
        });
        isNotEmpty(attributes['overlayBackgroundSecond']) && data.push({
            'type': 'background',
            'id': 'overlayBackgroundSecond',
            'selector': `.${elementId} .gvnews_postblock .${secondThumbnailClass} .gvnews-thumb-overlay`,
        });
        isNotEmpty(attributes['overlayOpacitySecond']) && data.push({
            'type': 'plain',
            'id': 'overlayOpacitySecond',
            'selector': `.${elementId} .gvnews_postblock .${secondThumbnailClass} .gvnews-thumb-overlay`,
            'properties': [
                {
                    'name': 'opacity',
                    'valueType': 'direct'
                }
            ]
        });
    }

    return data;
};

// This is for Module 7
const titleContainerStyle = (elementId, attributes, data) => {
    const selector = `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock_7.gvnews_postblock .gvnews_post_title`;
    isNotEmpty(attributes['titleContainerAlign']) && data.push({
        'type': 'plain',
        'id': 'titleContainerAlign',
        'responsive': true,
        'selector': selector,
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'direct'
            }
        ]
    });
    isNotEmpty(attributes['titleContainerBackground']) && data.push({
        'type': 'background',
        'id': 'titleContainerBackground',
        'selector': selector,
    });
    isNotEmpty(attributes['titleContainerMargin']) && data.push({
        'type': 'dimension',
        'id': 'titleContainerMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': selector,
    });
    isNotEmpty(attributes['titleContainerPadding']) && data.push({
        'type': 'dimension',
        'id': 'titleContainerPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': selector,
    });

    return data;
};

const postItemStyle = (elementId, attributes, data) => {

    const {
        mainItemSelector = '.gvnews_block_container > .gvnews_post',
        secondListSelector,
        thirdListSelector,
        postItemGrid = false
    } = attributes;

    if (postItemGrid) {

        isNotEmpty(attributes['mainItemGap']) && data.push({
            'type': 'plain',
            'id': 'mainItemGap',
            'responsive': true,
            'selector': `.${elementId} ${mainItemSelector}`,
            'properties': [
                {
                    'name': 'margin-bottom',
                    'valueType': 'pattern',
                    'pattern': '{value}px',
                    'patternValues': {
                        'value': {
                            'type': 'direct'
                        }
                    }
                },
            ],
        });
        if (isNotEmpty(attributes['rowItemGap'])) {
            data.push({
                'type': 'plain',
                'id': 'rowItemGap',
                'responsive': true,
                'selector': `.${elementId} .gvnews_postblock .gvnews_posts`,
                'properties': [
                    {
                        'name': 'row-gap',
                        'valueType': 'pattern',
                        'pattern': '{value}px',
                        'patternValues': {
                            'value': {
                                'type': 'direct'
                            }
                        }
                    },
                ],
            });
            data.push({
                'type': 'plain',
                'id': 'rowItemGap',
                'responsive': true,
                'selector': `.${elementId} .gvnews_postblock .gvnews_block_navigation`,
                'properties': [
                    {
                        'name': 'margin-top',
                        'valueType': 'pattern',
                        'pattern': '{value}px',
                        'patternValues': {
                            'value': {
                                'type': 'direct'
                            }
                        }
                    },
                ],
            });
        }
        isNotEmpty(attributes['columnItemGap']) && data.push({
            'type': 'plain',
            'id': 'columnItemGap',
            'responsive': true,
            'selector': `.${elementId} .gvnews_postblock .gvnews_posts`,
            'properties': [
                {
                    'name': 'column-gap',
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
        if (isNotEmpty(secondListSelector)) {
            isNotEmpty(attributes['rowItemGap']) && data.push({
                'type': 'plain',
                'id': 'rowItemGap',
                'responsive': true,
                'selector': `.${elementId} .gvnews_postblock_1 .gvnews_block_container`,
                'properties': [
                    {
                        'name': 'gap',
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
            isNotEmpty(attributes['columnItemGapSecond']) && data.push({
                'type': 'plain',
                'id': 'columnItemGapSecond',
                'responsive': true,
                'selector': `.${elementId} ${secondListSelector}`,
                'properties': [
                    {
                        'name': 'gap',
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
            isNotEmpty(attributes['columnItemGapThird']) && data.push({
                'type': 'plain',
                'id': 'columnItemGapThird',
                'responsive': true,
                'selector': `.${elementId} ${thirdListSelector}`,
                'properties': [
                    {
                        'name': 'gap',
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
        }
    } else {
        if (isNotEmpty(attributes['rowItemGap'])) {
            data.push({
                'type': 'plain',
                'id': 'rowItemGap',
                'responsive': true,
                'selector': `.${elementId} .gvnews_postblock .gvnews_posts .gvnews_post:not(:last-of-type)`,
                'properties': [
                    {
                        'name': 'margin-bottom',
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

            data.push({
                'type': 'plain',
                'id': 'rowItemGap',
                'responsive': true,
                'selector': `.${elementId} .gvnews_postblock .gvnews_block_navigation`,
                'properties': [
                    {
                        'name': 'margin-top',
                        'valueType': 'pattern',
                        'pattern': '{value}px',
                        'patternValues': {
                            'value': {
                                'type': 'direct'
                            }
                        }
                    },
                ],
            });
        }

    }



    return data;

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

const cardStyleModule = (elementId, attributes, data, mainThumbnailClass) => {
    const str = attributes['gvnewsModule'].split('\\');
    const gvnewsModule = str[str.length - 1];
    const modulesWithBoxWrap = ['Module_32', 'Module_33', 'Module_34', 'Module_35', 'Module_36', 'Module_37', 'Module_39'];
    const selector = modulesWithBoxWrap.includes(gvnewsModule) ?
        `.${elementId} .gvnews_postblock .gvnews_post .box_wrap` :
        `.${elementId} .gvnews_postblock .gvnews_post:not(.gvnews_pl_xs_2)`;

    // Main
    isNotEmpty(attributes['cardBorder']) && data.push({
        'type': 'border',
        'id': 'cardBorder',
        'selector': selector,
    });
    isNotEmpty(attributes['cardBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'cardBorderResponsive',
        'responsive': true,
        'selector': selector,
    });
    isNotEmpty(attributes['cardPadding']) && data.push({
        'type': 'dimension',
        'id': 'cardPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': selector,
    });
    // TODO: Add width control
    // isNotEmpty(attributes['cardWidth']) && data.push({
    //     'type': 'unitPoint',
    //     'id': 'cardWidth',
    //     'properties': [
    //         {
    //             'name': 'width',
    //             'valueType': 'direct'
    //         }
    //     ],
    //     'selector': `.${elementId} .gvnews_postblock .${firstClass}`,
    //     'responsive': true
    // })
    return data;
};

export default getBlockStyle;
