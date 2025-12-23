import { backgroundStyle } from 'gutenverse-core/controls';
import { isNotEmpty } from 'gutenverse-core/helper';
import readmoreStyle from './panel-style/style-readmore';
import { cardStyleModule } from './panel-style/style-card';
import { contentContainerStyle } from './panel-style/style-content-container';
import { thumbnailAndOverlayStyle } from './panel-style/style-thumbnail';
import { titleContainerStyle } from './panel-style/style-title-container';

const getBlockStyle = (elementId, attributes) => {
    const {
        showMeta = true,
        showMetaAuthor = true,
        blockType
    } = attributes;
    let data = [];
    data = readmoreStyle({ elementId, attributes, data });
    data = backgroundStyle({
        attributes,
        data,
        elementId,
        backgroundSelector: `.${elementId} .gvnews_postblock`,
        backgroundHoverSelector: `.${elementId} .gvnews_postblock:hover`,
    });
    data = noContentStyle(elementId, attributes, data);
    data = cardStyleModule(elementId, attributes, data);
    data = contentContainerStyle(elementId, attributes, data);
    data = thumbnailAndOverlayStyle(elementId, attributes, data);
    data = titleContainerStyle(elementId, attributes, data);

        /**
         * Panel Design
         */
        isNotEmpty(attributes['titleTypography']) && data.push({
            'type': 'typography',
            'id': 'titleTypography',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post .gvnews_post_title`,
        });

    isNotEmpty(attributes['secondTitleTypography']) && data.push({
        'type': 'typography',
        'id': 'secondTitleTypography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_posts .gvnews_pl_md_1 .gvnews_post_title`,
    });

    isNotEmpty(attributes['metaTypography']) && data.push({
        'type': 'typography',
        'id': 'metaTypography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_meta>div`,
    });

    isNotEmpty(attributes['contentTypography']) && data.push({
        'type': 'typography',
        'id': 'contentTypography',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_excerpt p`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_excerpt .gvnews_readmore`
        ],
    });

    isNotEmpty(attributes['titleColor']) && data.push({
        'type': 'color',
        'id': 'titleColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} ${'14' === blockType ? '.gvnews_posts .gvnews_pl_md_1 .gvnews_post_title a ' : '.gvnews_postblock .gvnews_post_title a'}`,
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
            `.gvnews-block.gvnews-block-wrapper.${elementId}  ${'14' === blockType ? '.gvnews_posts .gvnews_pl_md_1 .gvnews_post_title a ' : '.gvnews_postblock .gvnews_post_title a'}:hover`
        ],
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['metaColor']) && data.push({
        'type': 'color',
        'id': 'metaColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_meta`,
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
     * Positioning Panel
     */
    isNotEmpty(attributes['positioningType']) && data.push(
        {
            'type': 'positioning',
            'id': 'positioningType',
            'selector': `.${elementId}`,
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
            'selector': `.${elementId}`,
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
        'selector': `.${elementId}`,
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
            'selector': `.${elementId}`,
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
            'selector': `.${elementId}`,
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
        'selector': `.${elementId}`,
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
        'selector': `.${elementId}`,
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
        'selector': `.${elementId}`,
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
        'selector': `.${elementId}`,
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
        'selector': `.${elementId}`,
        'attributeType': 'custom',
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

}


export default getBlockStyle;