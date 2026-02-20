import { backgroundStyle } from 'gutenverse-core/controls';
import { isNotEmpty } from 'gutenverse-core/helper';

const getBlockStyle = (elementId, attributes) => {
    let data = [];
    data = backgroundStyle({
        data,
        elementId,
        attributes,
        backgroundSelector: `.gvnews-block.gvnews-block-wrapper.${elementId}.gvnews-archive-desc .archive-desc`,
        backgroundHoverSelector: `.gvnews-block.gvnews-block-wrapper.${elementId}.gvnews-archive-desc .archive-desc:hover`,
    });

    /**
     * Panel General
     */
    isNotEmpty(attributes['descTypography']) && data.push({
        'id': 'descTypography',
        'type': 'typography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId}.gvnews-archive-desc .archive-desc`,
    });
    isNotEmpty(attributes['textColor']) && data.push({
        'type': 'color',
        'id': 'textColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId}.gvnews-archive-desc .archive-desc`,
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
        'selector': `.${elementId}.gvnews-block.gvnews-block-wrapper .archive-desc`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.${elementId}.gvnews-block.gvnews-block-wrapper .archive-desc`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.${elementId}.gvnews-block.gvnews-block-wrapper .archive-desc:hover`,
    });

    isNotEmpty(attributes['borderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderHoverResponsive',
        'selector': `.${elementId}.gvnews-block.gvnews-block-wrapper .archive-desc:hover`,
    });

    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'selector': `.${elementId}.gvnews-block.gvnews-block-wrapper .archive-desc`,
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
        'selector': `.${elementId}.gvnews-block.gvnews-block-wrapper .archive-desc:hover`,
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
        'selector': `.${elementId}.gvnews-block.gvnews-block-wrapper .archive-desc`,
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
        'selector': `.${elementId}.gvnews-block.gvnews-block-wrapper .archive-desc`,
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
        'selector': `.${elementId}.gvnews-block.gvnews-block-wrapper .archive-desc`,
    });

    isNotEmpty(attributes['textAlign']) && data.push({
        'type': 'plain',
        'id': 'textAlign',
        'selector': `.${elementId}.gvnews-archive-desc .archive-desc`,
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'direct',
            }
        ],
    });

    return data;
};


export default getBlockStyle;
