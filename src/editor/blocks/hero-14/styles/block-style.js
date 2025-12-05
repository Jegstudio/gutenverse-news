import { isNotEmpty } from 'gutenverse-core/helper';

const getBlockStyle = (elementId, attributes) => {
    let data = [];

    const {
        showMeta = true,
        showMetaAuthor = true,
    } = attributes;

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
        'selector': `.${elementId} .gvnews_postblock`,
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
        'selector': `.${elementId} .gvnews_postblock:hover`,
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

    /**
    * Panel Category Style
    */

    isNotEmpty(attributes['categoryButtonTypography']) && data.push({
        'type': 'typography',
        'id': 'categoryButtonTypography',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postbig .gvnews_post_category span a`,
    });

    isNotEmpty(attributes['categoryButtonBackground']) && data.push({
        'type': 'color',
        'id': 'categoryButtonBackground',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postbig .gvnews_post_category span a`,
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
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postbig .gvnews_post_category span a:hover`,
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
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postbig .gvnews_post_category span a`,
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
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postbig .gvnews_post_category span a:hover`,
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
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postbig .gvnews_post_category span a`,
    });

    isNotEmpty(attributes['categoryButtonBorderHover']) && data.push({
        'type': 'border',
        'id': 'categoryButtonBorderHover',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postbig .gvnews_post_category span a:hover`,
    });

    isNotEmpty(attributes['categoryButtonBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'categoryButtonBoxShadow',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postbig .gvnews_post_category span a`,
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
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postbig .gvnews_post_category span a:hover`,
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['sideCategoryButtonTypography']) && data.push({
        'type': 'typography',
        'id': 'sideCategoryButtonTypography',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pl_sm_2 .gvnews_post_category a`,
    });

    isNotEmpty(attributes['sideCategoryButtonColor']) && data.push({
        'type': 'color',
        'id': 'sideCategoryButtonColor',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pl_sm_2 .gvnews_post_category a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['sideCategoryButtonColorHover']) && data.push({
        'type': 'color',
        'id': 'sideCategoryButtonColorHover',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pl_sm_2 .gvnews_post_category a:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
    });
    /**
    * Panel Style
    */

    isNotEmpty(attributes['typography']) && data.push({
        'type': 'typography',
        'id': 'typography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heropost .gvnews_post_title a`,
    });

    isNotEmpty(attributes['secondTitleTypography']) && data.push({
        'type': 'typography',
        'id': 'secondTitleTypography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heropost .gvnews_pl_lg_7 .gvnews_post_title a`,
    });

    isNotEmpty(attributes['thridTitleTypography']) && data.push({
        'type': 'typography',
        'id': 'thridTitleTypography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heropost .gvnews_pl_md_box .gvnews_post_title a`,
    });

    isNotEmpty(attributes['titleColor']) && data.push({
        'type': 'color',
        'id': 'titleColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heropost .gvnews_post_title a`,
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
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heropost .gvnews_post_title a:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['thridTitleColor']) && data.push({
        'type': 'color',
        'id': 'thridTitleColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heropost .gvnews_postsmall.right .gvnews_post_title a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['thridTitleColorHover']) && data.push({
        'type': 'color',
        'id': 'thridTitleColorHover',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heropost .gvnews_postsmall.right .gvnews_post_title a:hover`,
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
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heropost .gvnews_post_meta>div ,.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_meta .gvnews_meta_author .by`,
        });

        isNotEmpty(attributes['metaColor']) && data.push({
            'type': 'color',
            'id': 'metaColor',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heropost .gvnews_post_meta>div ,.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_meta .gvnews_meta_author .by , .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heropost .gvnews_post_meta a`,
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
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heropost .gvnews_post_meta a:hover`,
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
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heropost .gvnews_post_meta a:hover .far`,
            'properties': [
                {
                    'name': 'color',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['thridMetaColor']) && data.push({
            'type': 'color',
            'id': 'thridMetaColor',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heropost .gvnews_postsmall.right .gvnews_post_meta a`,
            'properties': [
                {
                    'name': 'color',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['thridMetaColorHover']) && data.push({
            'type': 'color',
            'id': 'thridMetaColorHover',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heropost .gvnews_postsmall.right .gvnews_post_meta a:hover`,
            'properties': [
                {
                    'name': 'color',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['thridMetaIconColor']) && data.push({
            'type': 'color',
            'id': 'thridMetaIconColor',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postsmall.right .gvnews_post_meta .far `,
            'properties': [
                {
                    'name': 'color',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['thridMetaIconColorHover']) && data.push({
            'type': 'color',
            'id': 'thridMetaIconColorHover',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heropost .gvnews_postsmall.right .gvnews_post_meta a:hover .far`,
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
                'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heropost .gvnews_meta_author a`,
            });
            isNotEmpty(attributes['metaAuthorColor']) && data.push({
                'type': 'color',
                'id': 'metaAuthorColor',
                'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heropost .gvnews_meta_author a`,
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
                'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_heropost .gvnews_meta_author a:hover`,
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

export default getBlockStyle;