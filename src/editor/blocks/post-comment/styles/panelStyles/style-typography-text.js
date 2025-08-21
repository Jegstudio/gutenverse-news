import { isNotEmpty } from 'gutenverse-core/helper';

const typographyTextStyle = (elementId, attributes, data) => {

    isNotEmpty(attributes['typographyText']) && data.push({
        'type': 'typography',
        'id': 'typographyText',
        'selector': `.${elementId} .comment-form p`,
    });
    isNotEmpty(attributes['colorText']) && data.push({
        'type': 'color',
        'id': 'colorText',
        'selector': `.${elementId} .comment-form p`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });
    isNotEmpty(attributes['marginText']) && data.push({
        'type': 'dimension',
        'id': 'marginText',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .comment-form p`,
    });

    // Comment List
    isNotEmpty(attributes['typographyTextCommentList']) && data.push({
        'type': 'typography',
        'id': 'typographyTextCommentList',
        'selector': `.${elementId} .commentlist .comment-content p`,
    });
    isNotEmpty(attributes['colorTextCommentList']) && data.push({
        'type': 'color',
        'id': 'colorTextCommentList',
        'selector': `.${elementId} .commentlist .comment-content p`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });
    isNotEmpty(attributes['marginTextCommentList']) && data.push({
        'type': 'dimension',
        'id': 'marginTextCommentList',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .commentlist .comment-content p`,
    });

    return data;
};

export default typographyTextStyle;