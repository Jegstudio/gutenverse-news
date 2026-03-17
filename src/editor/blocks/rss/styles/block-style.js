import { isNotEmpty } from 'gutenverse-core/helper';
import { positioningStyle } from '../../../control-panel/panel-styles/positioning-style';

const getBlockStyle = (elementId, attributes, mainThumbnailClass = null,
    secondThumbnailClass = null) => {
    const { headerType } = attributes;

    let data = [];

    data = positioningStyle(elementId, attributes, data, `.gvnews-block.gvnews-block-wrapper.${elementId}`);


    /**
     * Panel Design
     */
    isNotEmpty(attributes['typography']) && data.push({
        'type': 'typography',
        'id': 'typography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post .gvnews_post_title`,
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
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_title a`,
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

    isNotEmpty(attributes['headerTextTypography']) && data.push({
        'type': 'typography',
        'id': 'headerTextTypography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_title span , .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_title`,
    });

    /**
     * Panel Border
     */
    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `.${elementId} .gvnews-raw-wrapper`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.${elementId} .gvnews-raw-wrapper`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.${elementId} .gvnews-raw-wrapper:hover`,
    });

    isNotEmpty(attributes['borderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderHoverResponsive',
        'selector': `.${elementId} .gvnews-raw-wrapper:hover`,
    });

    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'selector': `.${elementId} .gvnews-raw-wrapper`,
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
        'selector': `.${elementId} .gvnews-raw-wrapper:hover`,
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
        'selector': `.${elementId} .gvnews-raw-wrapper`,
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
        'selector': `.${elementId} .gvnews-raw-wrapper`,
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
        'selector': `.${elementId} .gvnews-raw-wrapper`,
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

    data = thumbnailAndOverlayStyle(elementId, attributes, data, mainThumbnailClass, secondThumbnailClass);
    data = cardStyleModule(elementId, attributes, data, mainThumbnailClass);
    data = contentContainerStyle(elementId, attributes, data, mainThumbnailClass, secondThumbnailClass);
    data = metaStyle(elementId, attributes, data);
    data = noContentStyle(elementId, attributes, data);

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

const metaStyle = (elementId, attributes, data) => {
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

export default getBlockStyle;