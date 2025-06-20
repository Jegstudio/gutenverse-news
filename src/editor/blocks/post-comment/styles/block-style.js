import { backgroundStyle } from 'gutenverse-core/controls';
import { isNotEmpty } from 'gutenverse-core/helper';
import layoutStye from './panelStyles/layoutStyle';

const getBlockStyle = (elementId, attributes) => {
    let data = [];
    data = layoutStye({attributes, data, selector: `.gvnews-block.${elementId}.gvnews-post-comment`});
    data = backgroundStyle({
        elementId,
        attributes,
        data,
        backgroundSelector: `.${elementId}.gvnews-post-comment`,
        backgroundHoverSelector: `.${elementId}.gvnews-post-comment:hover`,
    });

    /**
     * Panel General
     */
    isNotEmpty(attributes['commentTypography']) && data.push({
        'type': 'typography',
        'id': 'commentTypography',
        'selector': `.${elementId}.gvnews-post-comment`,
    });

    /**
     * Panel Border
     */
    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `.gvnews-block.${elementId}.gvnews-post-comment`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.gvnews-block.${elementId}.gvnews-post-comment`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.gvnews-block.${elementId}.gvnews-post-comment:hover`,
    });

    isNotEmpty(attributes['borderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderHoverResponsive',
        'selector': `.gvnews-block.${elementId}.gvnews-post-comment:hover`,
    });

    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'selector': `.gvnews-block.${elementId}.gvnews-post-comment`,
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
        'selector': `.gvnews-block.${elementId}.gvnews-post-comment:hover`,
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
        'selector': `.gvnews-block.${elementId}.gvnews-post-comment`,
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
        'selector': `.gvnews-block.${elementId}.gvnews-post-comment`,
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
        'selector': `.gvnews-block.${elementId}.gvnews-post-comment`,
    });

    return data;
};

export default getBlockStyle;