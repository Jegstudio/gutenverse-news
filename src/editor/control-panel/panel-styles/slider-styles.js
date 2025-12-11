import { isNotEmpty } from 'gutenverse-core/helper';

const getSliderStyle = (elementId, attributes, data = []) => {
    const {
        showMeta = true,
        showMetaAuthor = true,
        gvnewsModule
    } = attributes;

    /**
     * PANEL NAVIGATION
     */

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

    isNotEmpty(attributes['nextButtonColor']) && data.push({
        'type': 'color',
        'id': 'nextButtonColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-next i`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['nextButtonColorHover']) && data.push({
        'type': 'color',
        'id': 'nextButtonColorHover',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-next:hover i`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['prevButtonColor']) && data.push({
        'type': 'color',
        'id': 'prevButtonColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-prev i`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['prevButtonColorHover']) && data.push({
        'type': 'color',
        'id': 'prevButtonColorHover',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-prev:hover i`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['nextButtonSize']) && data.push({
        'type': 'plain',
        'id': 'nextButtonSize',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-next`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px; height: auto; width: auto;',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            },
        ],
    });

    isNotEmpty(attributes['prevButtonSize']) && data.push({
        'type': 'plain',
        'id': 'prevButtonSize',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-prev`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px; height: auto; width: auto;',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            },
        ],
    });

    isNotEmpty(attributes['nextButtonPadding']) && data.push({
        'type': 'dimension',
        'id': 'nextButtonPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-next`,
    });

    isNotEmpty(attributes['prevButtonPadding']) && data.push({
        'type': 'dimension',
        'id': 'prevButtonPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-prev`,
    });

    isNotEmpty(attributes['nextButtonBgColor']) && data.push({
        'type': 'color',
        'id': 'nextButtonBgColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-next`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['prevButtonBgColor']) && data.push({
        'type': 'color',
        'id': 'prevButtonBgColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-prev`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['nextButtonBgColorHover']) && data.push({
        'type': 'color',
        'id': 'nextButtonBgColorHover',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-next:hover`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['prevButtonBgColorHover']) && data.push({
        'type': 'color',
        'id': 'prevButtonBgColorHover',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-prev:hover`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });

    if (isNotEmpty(attributes['nextButtonTransition'])) {
        data.push({
            'type': 'plain',
            'id': 'nextButtonTransition',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-next`,
            'properties': [
                {
                    'name': 'transition',
                    'valueType': 'pattern',
                    'pattern': 'background-color {value}ms;',
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
            'id': 'nextButtonTransition',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-next i`,
            'properties': [
                {
                    'name': 'transition',
                    'valueType': 'pattern',
                    'pattern': 'color {value}ms;',
                    'patternValues': {
                        'value': {
                            'type': 'direct',
                        }
                    }
                },
            ],
        });
    }

    if (isNotEmpty(attributes['prevButtonTransition'])) {
        data.push({
            'type': 'plain',
            'id': 'prevButtonTransition',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-prev`,
            'properties': [
                {
                    'name': 'transition',
                    'valueType': 'pattern',
                    'pattern': 'background-color {value}ms;',
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
            'id': 'prevButtonTransition',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-prev i`,
            'properties': [
                {
                    'name': 'transition',
                    'valueType': 'pattern',
                    'pattern': 'color {value}ms;',
                    'patternValues': {
                        'value': {
                            'type': 'direct',
                        }
                    }
                },
            ],
        });
    }

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


export default getSliderStyle;