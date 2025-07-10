import { isNotEmpty } from 'gutenverse-core/helper';

const separatorStyle = (elementId, attributes, data) => {

    const selector = `.${elementId}.gvnews-post-comment hr.separator`;

    isNotEmpty(attributes['separatorStyle']) && data.push({
        'id': 'separatorStyle',
        'type': 'plain',
        'properties': [
            {
                'name': 'border-top-style',
                'valueType': 'direct',
            }
        ],
        selector
    });

    isNotEmpty(attributes['separatorColor']) && data.push({
        'id': 'separatorColor',
        'type': 'color',
        'properties': [
            {
                'name': 'border-top-color',
                'valueType': 'direct',
            }
        ],
        selector
    });

    isNotEmpty(attributes['separatorWidth']) && data.push({
        'id': 'separatorWidth',
        'type': 'unitPoint',
        'responsive': true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct',
            }
        ],
        selector
    });

    isNotEmpty(attributes['separatorHeight']) && data.push({
        'id': 'separatorHeight',
        'type': 'unitPoint',
        'responsive': true,
        'properties': [
            {
                'name': 'border-top-width',
                'valueType': 'direct',
            }
        ],
        selector
    });

    isNotEmpty(attributes['separatorMargin']) && data.push({
        'id': 'separatorMargin',
        'type': 'dimension',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct',
            }
        ],
        selector
    });

    return data;
};

export default separatorStyle;