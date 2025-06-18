import { isNotEmpty } from 'gutenverse-core/helper';

const layoutStye = (props) => {

    const {
        elementId,
        attributes,
        data,
    } = props;

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
        'selector': `.${elementId}.gvnews-post-breadcrumb`,
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
        'selector': `.${elementId}.gvnews-post-breadcrumb`,
    });

    isNotEmpty(attributes['width']) && data.push({
        'id': 'width',
        'type': 'unitPoint',
        'responsive': true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.gvnews-post-breadcrumb`,
    });

    isNotEmpty(attributes['height']) && data.push({
        'id': 'height',
        'type': 'unitPoint',
        'responsive': true,
        'properties': [
            {
                'name': 'height',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.gvnews-post-breadcrumb`,
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
        'selector': `.${elementId}.gvnews-post-breadcrumb`,
    });

    isNotEmpty(attributes['alignment']) && data.push({
        'type': 'plain',
        'id': 'alignment',
        'selector': `.${elementId}.gvnews-post-breadcrumb`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'direct',
            },
            {
                'name': 'text-align',
                'valueType': 'function',
                'functionName': 'handleAlign',
            }
        ],
        'responsive': true,
    });

    isNotEmpty(attributes['verticalAlignment']) && data.push({
        'type': 'plain',
        'id': 'verticalAlignment',
        'properties': [
            {
                'name': 'align-items',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.gvnews-post-breadcrumb`,
        'responsive': true
    });

    return data;
};

export default layoutStye;