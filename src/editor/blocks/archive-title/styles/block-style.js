import { backgroundStyle } from 'gutenverse-core/controls';
import { isNotEmpty } from 'gutenverse-core/helper';

const getBlockStyle = (elementId, attributes) => {
    let data = [];
    data = backgroundStyle({
        elementId,
        data,
        attributes,
        backgroundSelector: `.gvnews-block.gvnews-block-wrapper.${elementId}.gvnews-archive-title`,
        backgroundHoverSelector: `.gvnews-block.gvnews-block-wrapper.${elementId}.gvnews-archive-title:hover`,
    });

    /**
     * Panel General
     */
    isNotEmpty(attributes['titleTypography']) && data.push({
        id: 'titleTypography',
        type: 'typography',
        selector: `.gvnews-block.gvnews-block-wrapper.${elementId}.gvnews-archive-title h1`,
    });
    isNotEmpty(attributes['titleColor']) && data.push({
        'type': 'color',
        'id': 'titleColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId}.gvnews-archive-title h1`,
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
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId}.gvnews-archive-title`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId}.gvnews-archive-title`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.${elementId} .gvnews-archive-title:hover`,
    });

    isNotEmpty(attributes['borderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderHoverResponsive',
        'selector': `.${elementId} .gvnews-archive-title:hover`,
    });

    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId}.gvnews-archive-title`,
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
        'selector': `.${elementId} .gvnews-archive-title:hover`,
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
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId}.gvnews-archive-title`,
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
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId}.gvnews-archive-title`,
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
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId}.gvnews-archive-title`,
    });


    return data;
};


export default getBlockStyle;