import { backgroundStyle } from 'gutenverse-core/controls';
import { isNotEmpty } from 'gutenverse-core/helper';
import layoutStye from './panelStyle/layoutStyle';

const getBlockStyle = (elementId, attributes) => {
    let data = [];
    data = layoutStye({
        attributes,
        data,
        selector: `.gvnews-block.guten-element.${elementId}.gvnews-post-title .title-wrapper`,
    });
    data = backgroundStyle({
        elementId,
        attributes,
        data,
        backgroundSelector: `.guten-element.${elementId}.gvnews-post-title .title-wrapper`,
        backgroundHoverSelector: `.guten-element.${elementId}.gvnews-post-title .title-wrapper:hover`,
    });

    /**
     * Panel General
     */
    isNotEmpty(attributes['titleTypography']) && data.push({
        'type': 'typography',
        'id': 'titleTypography',
        'selector': `.guten-element.${elementId}.gvnews-post-title .title-wrapper h1.the-title`,
    });
    isNotEmpty(attributes['titleColor']) && data.push({
        'type': 'color',
        'id': 'titleColor',
        'selector': `.guten-element.${elementId}.gvnews-post-title .title-wrapper h1.the-title`,
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
        'selector': `.guten-element.${elementId}.gvnews-post-title .title-wrapper`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.guten-element.${elementId}.gvnews-post-title .title-wrapper`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.guten-element.${elementId}.gvnews-post-title .title-wrapper:hover`,
    });

    isNotEmpty(attributes['borderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderHoverResponsive',
        'selector': `.guten-element.${elementId}.gvnews-post-title .title-wrapper:hover`,
    });

    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'selector': `.guten-element.${elementId}.gvnews-post-title .title-wrapper`,
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
        'selector': `.guten-element.${elementId}.gvnews-post-title .title-wrapper:hover`,
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
    });

    return data;
};

export default getBlockStyle;