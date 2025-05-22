import { isNotEmpty } from 'gutenverse-core/helper';

const getBlockStyle = (elementId, attributes) => {
    let data = [];

    /**
     * Panel General
     */
    isNotEmpty(attributes['textColor']) && data.push({
        'type': 'color',
        'id': 'textColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_breadcrumbs span a`,
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
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_breadcrumbs span a:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['arrowColor']) && data.push({
        'type': 'color',
        'id': 'arrowColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_breadcrumbs i`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['fontSize']) && data.push({
        'type': 'plain',
        'id': 'fontSize',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_breadcrumbs span a`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_breadcrumbs i`
        ],
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'direct'
            }
        ],
    });

    /**
     * Panel Design
     */
    isNotEmpty(attributes['breadcrumbTypography']) && data.push({
        'type': 'typography',
        'id': 'breadcrumbTypography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_breadcrumbs span a, .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_breadcrumbs i`,
    });

    /**
     * Panel Background
     */
    isNotEmpty(attributes['background']) && data.push({
        'type': 'background',
        'id': 'background',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId}`,
    });

    isNotEmpty(attributes['backgroundHover']) && data.push({
        'type': 'background',
        'id': 'backgroundHover',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId}:hover`,
    });

    /**
     * Panel Border
     */
    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `.${elementId} .gvnews_breadcrumbs`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.${elementId} .gvnews_breadcrumbs`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.${elementId} .gvnews_breadcrumbs:hover`,
    });

    isNotEmpty(attributes['borderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderHoverResponsive',
        'selector': `.${elementId} .gvnews_breadcrumbs:hover`,
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
        'selector': `.${elementId} .gvnews_breadcrumbs`,
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
        'selector': `.${elementId} .gvnews_breadcrumbs`,
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
        'selector': `.${elementId} .gvnews_breadcrumbs`,
    });

    return data;
};


export default getBlockStyle;