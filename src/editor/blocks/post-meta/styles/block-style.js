import { backgroundStyle } from 'gutenverse-core/controls';
import { isNotEmpty } from 'gutenverse-core/helper';
import layoutStye from './panelStyle/style-layout';
import authorStyle from './panelStyle/style-author';
import categoryStyle from './panelStyle/style-category';
import commentStyle from './panelStyle/style-comment';
import dateStyle from './panelStyle/style-date';

const getBlockStyle = (elementId, attributes) => {
    let data = [];
    data = layoutStye({attributes, data, selector: `.gvnews-block.${elementId}.gvnews-post-meta`});
    data = authorStyle({attributes, data, elementId});
    data = categoryStyle({attributes, data, elementId});
    data = commentStyle({attributes, data, elementId});
    data = dateStyle({attributes, data, elementId});
    data = backgroundStyle({
        data,
        attributes,
        elementId,
        backgroundSelector: `.${elementId}.gvnews-post-meta.gvnews-block`,
        backgroundHoverSelector: `.${elementId}.gvnews-post-meta.gvnews-block:hover`,
    });

    /**
     * Panel Border
     */
    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `.${elementId}.gvnews-post-meta`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.${elementId}.gvnews-post-meta`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.${elementId}.gvnews-post-meta:hover`,
    });

    isNotEmpty(attributes['borderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderHoverResponsive',
        'selector': `.${elementId}.gvnews-post-meta:hover`,
    });

    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'selector': `.${elementId}.gvnews-post-meta`,
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
        'selector': `.${elementId}.gvnews-post-meta:hover`,
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
        'selector': `.${elementId}.gvnews-post-meta`,
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
        'selector': `.${elementId}.gvnews-post-meta`,
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
        'selector': `.${elementId}.gvnews-post-meta`,
    });


    isNotEmpty(attributes['forceColumnLeft']) && data.push({
        'type': 'plain',
        'id': 'forceColumnLeft',
        'responsive': false,
        'specificDevice': 'Mobile',
        'selector': `.${elementId}.gvnews-post-meta .meta-left`,
        'properties': [
            {
                'name': 'flex-direction',
                'valueType': 'static',
                'staticValue': 'column',
            },
            {
                'name': 'align-items',
                'valueType': 'static',
                'staticValue': 'flex-start',
            }
        ],
    });

    isNotEmpty(attributes['forceColumnLeft']) && attributes['forceColumnLeft'] && data.push({
        'type': 'plain',
        'id': 'forceColumnLeft',
        'responsive': false,
        'specificDevice': 'Mobile',
        'selector': `.${elementId}.gvnews-post-meta .meta-left`,
        'properties': [
            {
                'name': 'flex-direction',
                'valueType': 'static',
                'staticValue': 'column',
            },
            {
                'name': 'align-items',
                'valueType': 'static',
                'staticValue': 'flex-start',
            }
        ],
    });


    isNotEmpty(attributes['authorHideMobile']) && attributes['authorHideMobile'] && data.push({
        'type': 'plain',
        'id': 'authorHideMobile',
        'responsive': false,
        'specificDevice': 'Mobile',
        'selector': `.${elementId}.gvnews-post-meta .meta-part .gvnews-meta-author`,
        'properties': [
            {
                'name': 'display',
                'valueType': 'static',
                'staticValue': 'none',
            }
        ],
    });

    isNotEmpty(attributes['dateHideMobile']) && attributes['dateHideMobile'] && data.push({
        'type': 'plain',
        'id': 'dateHideMobile',
        'responsive': false,
        'specificDevice': 'Mobile',
        'selector': `.${elementId}.gvnews-post-meta .meta-part .gvnews-meta-date`,
        'properties': [
            {
                'name': 'display',
                'valueType': 'static',
                'staticValue': 'none',
            }
        ],
    });

    isNotEmpty(attributes['categoryHideMobile']) && attributes['categoryHideMobile'] && data.push({
        'type': 'plain',
        'id': 'categoryHideMobile',
        'responsive': false,
        'specificDevice': 'Mobile',
        'selector': `.${elementId}.gvnews-post-meta .meta-part .gvnews-meta-category`,
        'properties': [
            {
                'name': 'display',
                'valueType': 'static',
                'staticValue': 'none',
            }
        ],
    });

    isNotEmpty(attributes['commentHideMobile']) && attributes['commentHideMobile'] && data.push({
        'type': 'plain',
        'id': 'commentHideMobile',
        'responsive': false,
        'specificDevice': 'Mobile',
        'selector': `.${elementId}.gvnews-post-meta .meta-part .gvnews-meta-comment`,
        'properties': [
            {
                'name': 'display',
                'valueType': 'static',
                'staticValue': 'none',
            }
        ],
    });


    isNotEmpty(attributes['forceColumnRight']) && attributes['forceColumnRight'] && data.push({
        'type': 'plain',
        'id': 'forceColumnRight',
        'responsive': false,
        'specificDevice': 'Mobile',
        'selector': `.${elementId}.gvnews-post-meta .meta-right`,
        'properties': [
            {
                'name': 'flex-direction',
                'valueType': 'static',
                'staticValue': 'column',
            },
            {
                'name': 'align-items',
                'valueType': 'static',
                'staticValue': 'flex-start',
            }
        ],
    });

    return data;
};

export default getBlockStyle;