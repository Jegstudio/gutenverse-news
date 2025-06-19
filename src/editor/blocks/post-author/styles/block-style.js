import { backgroundStyle } from 'gutenverse-core/controls';
import { isNotEmpty } from 'gutenverse-core/helper';
import layoutStye from './panelStyle/layoutStyle';

const getBlockStyle = (elementId, attributes) => {
    let data = [];
    data = layoutStye({data, attributes, selector: `.gvnews-block-wrapper.${elementId}.gvnews-post-author .gvnews-authorbox`});
    data = backgroundStyle({
        elementId,
        attributes,
        data,
        backgroundSelector: `.gvnews-block-wrapper.${elementId}.gvnews-post-author .gvnews-authorbox`,
        backgroundHoverSelector: `.gvnews-block-wrapper.${elementId}.gvnews-post-author .gvnews-authorbox:hover`,
    });

    /**
     * Panel General
     */
    isNotEmpty(attributes['authorTypography']) && data.push({
        'type': 'typography',
        'id': 'authorTypography',
        'selector': `.gvnews-block-wrapper.${elementId}.gvnews-post-author .gvnews-authorbox`,
    });

    /**
     * Panel Border
     */
    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `.gvnews-block-wrapper.${elementId}.gvnews-post-author .gvnews-authorbox`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.gvnews-block-wrapper.${elementId}.gvnews-post-author .gvnews-authorbox`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.gvnews-block-wrapper.${elementId}.gvnews-post-author .gvnews-authorbox:hover`,
    });

    isNotEmpty(attributes['borderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderHoverResponsive',
        'selector': `.gvnews-block-wrapper.${elementId}.gvnews-post-author .gvnews-authorbox:hover`,
    });

    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'selector': `.gvnews-block-wrapper.${elementId}.gvnews-post-author .gvnews-authorbox`,
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
        'selector': `.gvnews-block-wrapper.${elementId}.gvnews-post-author .gvnews-authorbox:hover`,
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
        'selector': `.gvnews-block-wrapper.${elementId}.gvnews-post-author .gvnews-authorbox`,
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
        'selector': `.gvnews-block-wrapper.${elementId}.gvnews-post-author .gvnews-authorbox`,
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
        'selector': `.gvnews-block-wrapper.${elementId}.gvnews-post-author .gvnews-authorbox`,
    });

    return data;
};

export default getBlockStyle;