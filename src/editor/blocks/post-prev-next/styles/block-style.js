import { isNotEmpty } from 'gutenverse-core/helper';

const getBlockStyle = (elementId, attributes) => {
    let data = [];

    /**
     * Panel Style
     */
    isNotEmpty(attributes['titleTypography']) && data.push({
        'type': 'typography',
        'id': 'titleTypography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .post-title`,
    });
    isNotEmpty(attributes['navTypography']) && data.push({
        'type': 'typography',
        'id': 'navTypography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_prevnext_post .caption`,
    });

    isNotEmpty(attributes['titleColor']) && data.push({
        'type': 'color',
        'id': 'titleColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .post-title`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });
    isNotEmpty(attributes['titleColorHover']) && data.push({
        'type': 'color',
        'id': 'titleColorHover',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} a:hover .post-title`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['navTextColor']) && data.push({
        'type': 'color',
        'id': 'navTextColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_prevnext_post .caption`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });
    isNotEmpty(attributes['navTextColorHover']) && data.push({
        'type': 'color',
        'id': 'navTextColorHover',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_prevnext_post a:hover .caption`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['accentColor']) && data.push({
        'type': 'color',
        'id': 'accentColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} a .post-title`,
        'properties': [
            {
                'name': 'border-left-color',
                'valueType': 'direct'
            }
        ]
    });isNotEmpty(attributes['accentColorHover']) && data.push({
        'type': 'color',
        'id': 'accentColorHover',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} a:hover .post-title`,
        'properties': [
            {
                'name': 'border-left-color',
                'valueType': 'direct'
            }
        ]
    });

    /**
     * Panel Border
     */
    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `.${elementId} .gvnews_prevnext_post`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.${elementId} .gvnews_prevnext_post`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.${elementId} .gvnews_prevnext_post:hover`,
    });

    isNotEmpty(attributes['borderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderHoverResponsive',
        'selector': `.${elementId} .gvnews_prevnext_post:hover`,
    });

    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'selector': `.${elementId} .gvnews_prevnext_post`,
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
        'selector': `.${elementId} .gvnews_prevnext_post:hover`,
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
        'selector': `.${elementId} .gvnews_prevnext_post`,
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
        'selector': `.${elementId} .gvnews_prevnext_post`,
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
        'selector': `.${elementId} .gvnews_prevnext_post`,
    });

    return data;
};

export default getBlockStyle;