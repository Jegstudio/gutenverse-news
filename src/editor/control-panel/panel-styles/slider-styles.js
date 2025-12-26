import { isNotEmpty } from 'gutenverse-core/helper';

const getSliderStyle = (elementId, attributes, data = []) => {
    const {
        showMeta = true,
        showMetaAuthor = true,
        gvnewsModule,
    } = attributes;
    data = getNavigationStyle(elementId, attributes, data);
    data = getDotStyle(elementId, attributes, data);

    /**
     * Panel General
     */
    if (isNotEmpty(attributes['overrideOverlay']) && isNotEmpty(attributes['isOverrideOverlay']) && attributes['overlayOption'] === 'gradient') {
        data.push({
            'type': 'plain',
            'id': 'overrideOverlay',
            'properties': [
                {
                    'name': 'background',
                    'valueType': 'function',
                    'functionName': 'customHandleBackground',
                }
            ],
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slide_item:before`,
        });
    }

    if (isNotEmpty(attributes['normalOverlay']) && attributes['overlayOption'] === 'normal') {
        data.push({
            'type': 'color',
            'id': 'normalOverlay',
            'properties': [
                {
                    'name': 'background-color',
                    'valueType': 'direct',
                },
            ],
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slide_item:before`,
        });
    }

    /**
     * Panel Border
     */
    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `.${elementId} .gvnews_slider_wrapper`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.${elementId} .gvnews_slider_wrapper`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.${elementId} .gvnews_slider_wrapper:hover`,
    });

    isNotEmpty(attributes['borderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderHoverResponsive',
        'selector': `.${elementId} .gvnews_slider_wrapper:hover`,
    });

    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'selector': `.${elementId} .gvnews_slider_wrapper`,
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
        'selector': `.${elementId} .gvnews_slider_wrapper:hover`,
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
        'selector': `.${elementId} .gvnews_slider_wrapper`,
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
        'selector': `.${elementId} .gvnews_slider_wrapper`,
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
        'selector': `.${elementId} .gvnews_slider_wrapper`,
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
    * Panel Read More Style
    */

    isNotEmpty(attributes['readmoreButtonTypography']) && data.push({
        'type': 'typography',
        'id': 'readmoreButtonTypography',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_readmore`,
    });

    isNotEmpty(attributes['readmoreButtonBackground']) && data.push({
        'type': 'color',
        'id': 'readmoreButtonBackground',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_readmore`,
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
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_readmore:hover`,
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
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_readmore`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['readmoreButtonColor']) && data.push({
        'type': 'color',
        'id': 'readmoreButtonColor',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId}.gvnews-slider-7 .gvnews_slider_type_7 .gvnews_readmore:before`,
        'properties': [
            {
                'name': 'background',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['readmoreButtonColorHover']) && data.push({
        'type': 'color',
        'id': 'readmoreButtonColorHover',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_readmore:hover`,
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
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId}.gvnews-slider-7 .gvnews_slider_type_7 .gvnews_readmore:hover:before`,
        'properties': [
            {
                'name': 'background',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['readmoreButtonBorder']) && data.push({
        'type': 'border',
        'id': 'readmoreButtonBorder',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_readmore`,
    });

    isNotEmpty(attributes['readmoreButtonBorderHover']) && data.push({
        'type': 'border',
        'id': 'readmoreButtonBorderHover',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_readmore:hover`,
    });

    isNotEmpty(attributes['readmoreButtonBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'readmoreButtonBoxShadow',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_readmore`,
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
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_readmore:hover`,
        'properties': [
            {
                'name': 'box-shadow',
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
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} ${'GUTENVERSE\\NEWS\\Block\\Slider\\Slider_8' === gvnewsModule ? ' .gvnews_slider_type_8 .gvnews_post_title' : ' .gvnews_slider_wrapper .gvnews_slide_caption .gvnews_post_title'}`,

    });

    isNotEmpty(attributes['secondTitleTypography']) && data.push({
        'type': 'typography',
        'id': 'secondTitleTypography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_wrapper .gvnews_pl_sm .gvnews_post_title`,
    });


    isNotEmpty(attributes['titleColor']) && data.push({
        'type': 'color',
        'id': 'titleColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_wrapper .gvnews_post_title a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });
    isNotEmpty(attributes['secondTitleColor']) && data.push({
        'type': 'color',
        'id': 'secondTitleColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_type_9_thumb .gvnews_post_title a`,
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
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_wrapper .gvnews_post_title a:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });
    isNotEmpty(attributes['hideTitleStyling']) && data.push({ // For slider 4
        'type': 'plain',
        'id': 'hideTitleStyling',
        'selector': [
            `.gvnews-slider-4.${elementId} .gvnews_slider_type_4_wrapper.gvnews_slider_wrapper .gvnews_slider_type_4 .tns-slide-active .gvnews_slide_caption:before`,
            `.gvnews-slider-4.${elementId} .gvnews_slider_type_4_wrapper.gvnews_slider_wrapper .gvnews_slider_type_4 .tns-slide-active .gvnews_slide_caption:after`,
        ],
        'properties': [
            {
                'name': 'content',
                'valueType': 'pattern',
                'pattern': 'none',
            }
        ],
    });

    isNotEmpty(attributes['typographyContent']) && data.push({
        'type': 'typography',
        'id': 'typographyContent',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider .gvnews_slide_caption .gvnews_post_excerpt`,
    });

    isNotEmpty(attributes['excerptColor']) && data.push({
        'type': 'color',
        'id': 'excerptColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider .gvnews_slide_caption .gvnews_post_excerpt`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    if (isNotEmpty(attributes['containerWidth'])) {

        switch (gvnewsModule) {
            case 'GUTENVERSE\\NEWS\\Block\\Slider\\Slider_1':
                data.push({
                    'type': 'plain',
                    'id': 'containerWidth',
                    'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider .gvnews_slide_caption .gvnews_caption_container`,
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'max-width',
                            'valueType': 'pattern',
                            'pattern': '{value}%',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                }
                            }
                        },
                    ],
                });

                break;

            case 'GUTENVERSE\\NEWS\\Block\\Slider\\Slider_4':
                data.push({
                    'type': 'plain',
                    'id': 'containerWidth',
                    'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider .gvnews_slide_caption`,
                    'responsive': true,
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
                        },
                        {
                            'name': 'max-width',
                            'valueType': 'static',
                            'staticValue': 'unset',
                        }
                    ],
                });

                break;

            default:
                data.push({
                    'type': 'plain',
                    'id': 'containerWidth',
                    'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider .gvnews_slide_caption`,
                    'responsive': true,
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
                        },
                    ],
                });

                break;
        }
    }


    isNotEmpty(attributes['containerPadding']) && data.push({
        'type': 'dimension',
        'id': 'containerPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': gvnewsModule === 'GUTENVERSE\\NEWS\\Block\\Slider\\Slider_8' ? `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider .gvnews_item_caption` : `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider .gvnews_slide_caption`,
    });

    /**
     * Panel Meta Style
     */
    if (showMeta) {
        isNotEmpty(attributes['typographyMeta']) && data.push({
            'type': 'typography',
            'id': 'typographyMeta',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_wrapper .gvnews_post_meta`,
        });

        isNotEmpty(attributes['typographyMetaAuthor']) && data.push({
            'type': 'typography',
            'id': 'typographyMetaAuthor',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slide_caption .gvnews_meta_author a`,
        });

        isNotEmpty(attributes['metaColor']) && data.push({
            'type': 'color',
            'id': 'metaColor',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_wrapper .gvnews_post_meta , .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_meta .gvnews_meta_author .by , .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_wrapper .gvnews_post_meta .gvnews_meta_date a`,
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
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_meta .fa ,.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_meta .far , .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_meta .fas`,
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
                'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slide_caption .gvnews_meta_author a`,
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
                'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slide_caption .gvnews_meta_author a:hover`,
                'properties': [
                    {
                        'name': 'color',
                        'valueType': 'direct'
                    }
                ],
            });
        }
    }

    return data;
};

const getWidthSelector = (templateType) => {
    switch (templateType) {
        case 'GUTENVERSE\\NEWS\\Block\\Slider\\Slider_1':
            return '.gvnews_slider .gvnews_slide_caption .gvnews_caption_container';
    }

    return '.gvnews_slider .gvnews_slide_caption';
};

const getDotStyle = (elementId, attributes, data = []) => {
    const baseSelector = `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_wrapper`;
    isNotEmpty(attributes['alwaysShowDot']) && data.push({
        'id': 'alwaysShowDot',
        'type': 'plain',
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'pattern',
                'pattern': '1 !important',
            }
        ],
        'selector': `${baseSelector} .tns-nav`,
    });
    isNotEmpty(attributes['hideDot']) && data.push({
        'id': 'hideDot',
        'type': 'plain',
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'pattern',
                'pattern': '0 !important',
            }
        ],
        'selector': `${baseSelector} .tns-nav`,
    });
    isNotEmpty(attributes['dotGap']) && data.push({
        'id': 'dotGap',
        'type': 'plain',
        'responsive': true,
        'properties': [
            {
                'name': 'gap',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            }
        ],
        'selector': `${baseSelector} .tns-nav`,
    });

    // Normal
    isNotEmpty(attributes['dotNormalColor']) && data.push({
        'id': 'dotNormalColor',
        'type': 'color',
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct',
            }
        ],
        'selector': `${baseSelector} .tns-nav button`,
    });
    isNotEmpty(attributes['dotBorderNormalColor']) && data.push({
        'id': 'dotBorderNormalColor',
        'type': 'color',
        'properties': [
            {
                'name': 'border-color',
                'valueType': 'direct',
            }
        ],
        'selector': `${baseSelector} .tns-nav button`,
    });
    isNotEmpty(attributes['dotNormalSize']) && data.push({
        'id': 'dotNormalSize',
        'type': 'plain',
        'responsive': true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            },
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            },
            {
                'name': 'border-radius',
                'valueType': 'pattern',
                'pattern': '100%',
            }
        ],
        'selector': `${baseSelector} .tns-nav button`,
    });

    // Hover
    isNotEmpty(attributes['dotHoverColor']) && data.push({
        'id': 'dotHoverColor',
        'type': 'color',
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct',
            }
        ],
        'selector': `${baseSelector} .tns-nav button:hover`,
    });
    isNotEmpty(attributes['dotBorderHoverColor']) && data.push({
        'id': 'dotBorderHoverColor',
        'type': 'color',
        'properties': [
            {
                'name': 'border-color',
                'valueType': 'direct',
            }
        ],
        'selector': `${baseSelector} .tns-nav button:hover`,
    });
    if (isNotEmpty(attributes['dotHoverSize'])) {
        data.push({
            'id': 'dotHoverSize',
            'type': 'plain',
            'responsive': true,
            'properties': [
                {
                    'name': 'width',
                    'valueType': 'pattern',
                    'pattern': '{value}px',
                    'patternValues': {
                        'value': {
                            'type': 'direct',
                        },
                    }
                },
                {
                    'name': 'height',
                    'valueType': 'pattern',
                    'pattern': '{value}px',
                    'patternValues': {
                        'value': {
                            'type': 'direct',
                        },
                    }
                },
                {
                    'name': 'border-radius',
                    'valueType': 'pattern',
                    'pattern': '100%',
                }
            ],
            'selector': `${baseSelector} .tns-nav button:hover`,
        });
    }

    // Active
    isNotEmpty(attributes['dotActiveColor']) && data.push({
        'id': 'dotActiveColor',
        'type': 'color',
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct',
            }
        ],
        'selector': `${baseSelector} .tns-nav button.tns-nav-active`,
    });
    isNotEmpty(attributes['dotBorderActiveColor']) && data.push({
        'id': 'dotBorderActiveColor',
        'type': 'color',
        'properties': [
            {
                'name': 'border-color',
                'valueType': 'direct',
            }
        ],
        'selector': `${baseSelector} .tns-nav button.tns-nav-active`,
    });
    isNotEmpty(attributes['dotActiveSize']) && data.push({
        'id': 'dotActiveSize',
        'type': 'plain',
        'responsive': true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            },
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            },
            {
                'name': 'border-radius',
                'valueType': 'pattern',
                'pattern': '100%',
            }
        ],
        'selector': `${baseSelector} .tns-nav button.tns-nav-active`,
    });

    return data;
}

const getNavigationStyle = (elementId, attributes, data = []) => {

    isNotEmpty(attributes['hideNavigationButton']) && data.push({
        'type': 'plain',
        'id': 'hideNavigationButton',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls`,
        'properties': [
            {
                'name': 'display',
                'valueType': 'pattern',
                'pattern': 'none !important',
            }
        ]
    });

    isNotEmpty(attributes['alwaysShowNavigationButton']) && data.push({
        'type': 'plain',
        'id': 'alwaysShowNavigationButton',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls button`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls`
        ],
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'pattern',
                'pattern': '1 !important',
            }
        ]
    });

    if (isNotEmpty(attributes['transitionShow'])) {
        data.push({
            'type': 'plain',
            'id': 'transitionShow',
            'selector': [
                `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls button`,
                `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls`,
                `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_type_7 .gvnews_block_nav a`
            ],
            'properties': [
                {
                    'name': 'transition',
                    'valueType': 'pattern',
                    'pattern': 'opacity {value}ms;',
                    'patternValues': {
                        'value': {
                            'type': 'direct',
                        }
                    }
                }
            ]
        });
    }

    if (isNotEmpty(attributes['buttonPosition'])) {
        data.push({
            'type': 'plain',
            'id': 'buttonPosition',
            'responsive': true,
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls button.tns-next`,
            'properties': [
                {
                    'name': 'right',
                    'valueType': 'pattern',
                    'pattern': '{value}px;',
                    'patternValues': {
                        'value': {
                            'type': 'direct',
                        }
                    }
                },
            ],
        });
        data.push({
            'type': 'plain',
            'id': 'buttonPosition',
            'responsive': true,
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls button.tns-prev`,
            'properties': [
                {
                    'name': 'left',
                    'valueType': 'pattern',
                    'pattern': '{value}px;',
                    'patternValues': {
                        'value': {
                            'type': 'direct',
                        }
                    }
                },
            ],
        })
    }

    isNotEmpty(attributes['buttonTextTypography']) && data.push({
        'type': 'typography',
        'id': 'buttonTextTypography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls button span`,
    })

    isNotEmpty(attributes['gapBetweenButton']) && data.push({
        'type': 'plain',
        'id': 'gapBetweenButton',
        'responsive': true,
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls`,
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
        ]
    });
    isNotEmpty(attributes['iconSize']) && data.push({
        'type': 'plain',
        'id': 'iconSize',
        'responsive': true,
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls button`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_type_7 .gvnews_block_nav a`
        ],
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
            },
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': 'fit-content',
            },
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': 'fit-content',
            }
        ],
    });
    isNotEmpty(attributes['buttonHeight']) && data.push({
        'type': 'plain',
        'id': 'buttonHeight',
        'responsive': true,
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_type_7 .gvnews_block_nav a`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls button.tns-next`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls button.tns-prev`
        ],
        'properties': [
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': '{value}px;',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            },
        ],
    },);
    isNotEmpty(attributes['buttonWidth']) && data.push({
        'type': 'plain',
        'id': 'buttonWidth',
        'responsive': true,
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_type_7 .gvnews_block_nav a`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls button.tns-next`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls button.tns-prev`
        ],
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': '{value}px;',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            },
        ],
    },);
    isNotEmpty(attributes['buttonPadding']) && data.push({
        'type': 'dimension',
        'id': 'buttonPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls button`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_type_7 .gvnews_block_nav a`
        ],
    });
    isNotEmpty(attributes['buttonGap']) && data.push({
        'type': 'plain',
        'id': 'buttonGap',
        'responsive': true,
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls button`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_type_7 .gvnews_block_nav a`
        ],
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
            },
        ],
    });

    isNotEmpty(attributes['buttonColor']) && data.push({
        'type': 'color',
        'id': 'buttonColor',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls button i`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_type_7 .gvnews_block_nav a i`
        ],
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });
    isNotEmpty(attributes['buttonColorHover']) && data.push({
        'type': 'color',
        'id': 'buttonColorHover',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls button:hover i`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_type_7 .gvnews_block_nav a:hover i`
        ],
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });
    isNotEmpty(attributes['textColor']) && data.push({
        'type': 'color',
        'id': 'textColor',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls button span`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_type_7 .gvnews_block_nav a span`
        ],
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });
    isNotEmpty(attributes['textColorHover']) && data.push({
        'type': 'color',
        'id': 'textColorHover',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls button:hover span`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_type_7 .gvnews_block_nav a:hover span`
        ],
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });
    isNotEmpty(attributes['buttonBgColor']) && data.push({
        'type': 'color',
        'id': 'buttonBgColor',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls button`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_type_7 .gvnews_block_nav a`
        ],
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });
    isNotEmpty(attributes['buttonBgColorHover']) && data.push({
        'type': 'color',
        'id': 'buttonBgColorHover',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls button:hover`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_type_7 .gvnews_block_nav a:hover`
        ],
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });
    isNotEmpty(attributes['borderButton']) && data.push({
        'type': 'border',
        'id': 'borderButton',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls button`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_type_7 .gvnews_block_nav a`
        ],
    });
    isNotEmpty(attributes['borderButtonHover']) && data.push({
        'type': 'border',
        'id': 'borderButtonHover',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls button:hover`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_type_7 .gvnews_block_nav a:hover`
        ],
    });
    isNotEmpty(attributes['borderResponsiveButton']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsiveButton',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls button`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_type_7 .gvnews_block_nav a`
        ],
    });
    isNotEmpty(attributes['borderResponsiveButtonHover']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsiveButtonHover',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls button:hover`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_type_7 .gvnews_block_nav a:hover`
        ],
    });
    return data;
}

export default getSliderStyle;