import { isNotEmpty } from 'gutenverse-core/helper';

const typographyLabelStyle = (elementId, attributes, data) => {

    const selector = `
        .${elementId} label, 
        .${elementId} .comment-form-author label, 
        .${elementId} .comment-form-comment label, 
        .${elementId} .comment-form-email label, 
        .${elementId} .comment-form-url label
        `;

    isNotEmpty(attributes['typographyLabel']) && data.push({
        'type': 'typography',
        'id': 'typographyLabel',
        'selector': selector,
    });

    isNotEmpty(attributes['colorLabel']) && data.push({
        'type': 'color',
        'id': 'colorLabel',
        'selector': selector,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['colorRequired']) && data.push({
        'type': 'color',
        'id': 'colorRequired',
        'selector': `.${elementId}.gvnews-post-comment label span.required`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['marginLabel']) && data.push({
        'type': 'dimension',
        'id': 'marginLabel',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': selector,
    });

    return data;
};

export default typographyLabelStyle;