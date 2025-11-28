import { isNotEmpty } from 'gutenverse-core/helper';

const getSecondTypographySelector = (templateType) => {
    switch (templateType) {
        case 'template_13':
            return '.gvnews_pl_md_1 .gvnews_post_title';
        case 'template_14':
            return '.gvnews_posts .gvnews_pl_md_1 .gvnews_post_title';
        case 'template_16':
            return '.gvnews_posts .gvnews_pl_xs_2 .gvnews_post_title';
        case 'template_20':
            return '.gvnews_pl_xs .gvnews_post_title';
        case 'template_24':
            return '.gvnews_pl_xs_4 .gvnews_post_title';
    }

    return '.gvnews_pl_sm .gvnews_post_title';
};

const getTitleColorSelector = (templateType) => {
    switch (templateType) {
        case 'template_14':
            return '.gvnews_posts .gvnews_pl_md_1 .gvnews_post_title a';
        case 'template_24':
            return '.gvnews_pl_xs_4 .gvnews_post_title a';
    }

    return '.gvnews_postblock .gvnews_post_title a';
};

const getBlockStyle = (elementId, attributes) => {
    let data = [];

    const {
        showMeta = true,
        showMetaAuthor = true,
        headerType,
        templateType
    } = attributes;

    const withSecondText = ['heading_5', 'heading_6', 'heading_7', 'heading_8'].includes(headerType);

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
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} ${getSecondTypographySelector(templateType)}`,
    });

    'template_1' === templateType && isNotEmpty(attributes['thridTitleTypography']) && data.push({
        'type': 'typography',
        'id': 'thridTitleTypography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pl_xs_2 .gvnews_post_title a`,
    });

    isNotEmpty(attributes['typographyContent']) && data.push({
        'type': 'typography',
        'id': 'typographyContent',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_excerpt p`
        ],
    });

    isNotEmpty(attributes['titleColor']) && data.push({
        'type': 'color',
        'id': 'titleColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} ${getTitleColorSelector(templateType)}`,
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
            `.gvnews-block.gvnews-block-wrapper.${elementId} ${getTitleColorSelector(templateType)}:hover`
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
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} ${'template_24' === templateType ? '.gvnews_pl_xs_4 .gvnews_postblock_content>i' : '.gvnews_pl_xs_2>i'}`,
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
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_meta .fa ,.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_meta .far , .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_meta .fas`,
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
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_meta>div:hover .fa ,.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_meta>div:hover .far , .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_meta>div:hover .fas`,
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
   * Panel Category Style
   */

    isNotEmpty(attributes['categoryButtonTypography']) && data.push({
        'type': 'typography',
        'id': 'categoryButtonTypography',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category span a`,
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

    // pagination styling
    isNotEmpty(attributes['paginationWrapperMargin']) && data.push({
        'type': 'dimension',
        'id': 'paginationWrapperMargin',
        'selector': `.${elementId} .gvnews_block_navigation, .${elementId} .gvnews_block_navigation .gvnews_block_nav, .${elementId} .gvnews_block_navigation .gvnews_loadmore`,
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
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav i`,
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
            'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav.showtext .next i`,
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
            'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav.showtext .prev i`,
        },
    );


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
     * Panel Mask
     */
    isNotEmpty(attributes['mask']) && data.push({
        'type': 'mask',
        'id': 'mask',
        'responsive': true,
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
    });

    /**
     * Panel Background
     */

    isNotEmpty(attributes['background']) && data.push({
        'type': 'background',
        'id': 'background',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
    });

    isNotEmpty(attributes['backgroundHover']) && data.push({
        'type': 'background',
        'id': 'backgroundHover',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element:hover`,
    });

    isNotEmpty(attributes['backgroundTransition']) && data.push({
        'type': 'unitPoint',
        'id': 'backgroundTransition',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
        'properties': [
            {
                'name': 'transition',
                'valueType': 'pattern',
                'pattern': '{value}',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            },
        ],
    });

    //Positioning Panel
    isNotEmpty(attributes['positioningType']) && data.push(
        {
            'type': 'positioning',
            'id': 'positioningType',
            'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
            'skipDeviceType': 'first',
            'attributeType': 'type',
            'multiAttr': {
                'positioningType': attributes['positioningType'],
                'inBlock': attributes['inBlock']
            }
        },
    );
    isNotEmpty(attributes['positioningType']) && isNotEmpty(attributes['positioningWidth']) && data.push(
        {
            'type': 'positioning',
            'id': 'positioningType',
            'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
            'skipDeviceType': 'second',
            'attributeType': 'type',
            'multiAttr': {
                'positioningWidth': attributes['positioningWidth'],
                'positioningType': attributes['positioningType'],
                'inBlock': attributes['inBlock']
            }
        }
    );
    isNotEmpty(attributes['positioningWidth']) && isNotEmpty(attributes['positioningType']) && data.push({
        'type': 'positioning',
        'id': 'positioningWidth',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
        'skipDeviceType': 'first',
        'attributeType': 'width',
        'multiAttr': {
            'positioningWidth': attributes['positioningWidth'],
            'positioningType': attributes['positioningType'],
            'inBlock': attributes['inBlock']
        }
    });
    isNotEmpty(attributes['positioningAlign']) && data.push(
        {
            'type': 'plain',
            'id': 'positioningAlign',
            'responsive': true,
            'properties': [
                {
                    'name': 'align-self',
                    'valueType': 'direct'
                }
            ],
            'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
        },
        {
            'type': 'positioning',
            'id': 'positioningAlign',
            'properties': [
                {
                    'name': 'vertical-align',
                    'valueType': 'direct'
                }
            ],
            'attributeType': 'align',
            'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
        }
    );
    isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'plain',
        'id': 'positioningLocation',
        'properties': [
            {
                'name': 'position',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
    });
    isNotEmpty(attributes['positioningLeft']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningLeft',
        'properties': [
            {
                'name': 'left',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningRight']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningRight',
        'properties': [
            {
                'name': 'right',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningTop']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningTop',
        'properties': [
            {
                'name': 'top',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningBottom']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningBottom',
        'properties': [
            {
                'name': 'bottom',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
        'attributeType': 'custom',
    });

    return data;
};

export default getBlockStyle;