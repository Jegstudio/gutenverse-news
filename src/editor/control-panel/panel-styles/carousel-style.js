import { isNotEmpty } from 'gutenverse-core/helper';

const getCarouselStyle = (elementId, attributes) => {
    let data = [];
    const {
        showMeta = true,
    } = attributes;

    data = thumbnailAndOverlayStyle(elementId, attributes, data);
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
    * Panel Design
    */
    isNotEmpty(attributes['typography']) && data.push({
        'type': 'typography',
        'id': 'typography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_carousel_post .gvnews_post .gvnews_post_title`,

    });
    isNotEmpty(attributes['titleColor']) && data.push({
        'type': 'color',
        'id': 'titleColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_carousel_post .gvnews_post_title a`,
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
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_carousel_post .gvnews_post_title a:hover`,
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
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_wrapper .gvnews_meta_date`,
        });

        isNotEmpty(attributes['metaColor']) && data.push({
            'type': 'color',
            'id': 'metaColor',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_wrapper .gvnews_meta_date a`,
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
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_wrapper .gvnews_meta_date .far, .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_wrapper .gvnews_meta_date svg`,
            'properties': [
                {
                    'name': 'color',
                    'valueType': 'direct'
                }
            ],
        });
    }


    /**
     * Panel Category Style
     */
    if ('GUTENVERSE\\NEWS\\Block\\Carousel\\Carousel_2' === attributes['gvnewsModule']) {
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
    }

    /*  review meta style */
    isNotEmpty(attributes['postReviewMetaStarColor']) && data.push({
        'type': 'color',
        'id': 'postReviewMetaStarColor',
        'selector': `.${elementId} .gvnews_post_meta>div.gvnews_meta_post_review .gutenverse-icon-svg svg`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });
    isNotEmpty(attributes['postReviewMetaStarSize']) && data.push({
        'type': 'unitPoint',
        'id': 'postReviewMetaStarSize',
        'selector': `.${elementId} .gvnews_post_meta>div.gvnews_meta_post_review .gutenverse-icon-svg svg`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'direct'
            }
        ],
    });

    return data;
};

const thumbnailAndOverlayStyle = (elementId, attributes, data) => {

    isNotEmpty(attributes['borderMainThumbnail']) && data.push({
        'id': 'borderMainThumbnail',
        'type': 'border',
        'selector': `.${elementId} .gvnews_postblock .gvnews_thumb`,
    });
    isNotEmpty(attributes['borderResponsiveMainThumbnail']) && data.push({
        'id': 'borderResponsiveMainThumbnail',
        'type': 'borderResponsive',
        'selector': `.${elementId} .gvnews_postblock .gvnews_thumb`,
    });
    isNotEmpty(attributes['overlayBackgroundMain']) && data.push({
        'type': 'background',
        'id': 'overlayBackgroundMain',
        'selector': `.${elementId} .gvnews_postblock .gvnews-thumb-overlay`,
    });
    isNotEmpty(attributes['overlayOpacityMain']) && data.push({
        'type': 'plain',
        'id': 'overlayOpacityMain',
        'selector': `.${elementId} .gvnews_postblock .gvnews-thumb-overlay`,
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'direct'
            }
        ]
    });

    return data;
}

export default getCarouselStyle;