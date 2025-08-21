import { isNotEmpty } from 'gutenverse-core/helper';

const getHeroStyle = (elementId, attributes) => {
    let data = [];

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


const getHeroStyleOptions = (elementId, attribute, heroStyle) => {
    let additional = (heroStyle === '5') ? 'after' : 'before';
    return attribute.map((el, index) => {
        let arrOpt = [];

        el.overlayEnable && isNotEmpty(el.OverlayGradient) && arrOpt.push({
            'type': 'background',
            'id': 'OverlayGradient',
            'selector': `.${elementId} .gvnews_heroblock .gvnews_hero_item_${index + 1} .gvnews_thumb a > div:${additional}`,
        });

        return arrOpt;
    });
};


export default getHeroStyle;