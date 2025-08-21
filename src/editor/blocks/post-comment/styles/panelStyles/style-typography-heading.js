import { isNotEmpty } from 'gutenverse-core/helper';

const typographyHeadingStyle = (elementId, attributes, data) => {

    // Form Heading
    isNotEmpty(attributes['typographyHeading']) && data.push({
        'type': 'typography',
        'id': 'typographyHeading',
        'selector': `.${elementId}.gvnews-post-comment.guten-element .comment-respond h3.comment-reply-title`,
    });
    isNotEmpty(attributes['colorHeading']) && data.push({
        'type': 'color',
        'id': 'colorHeading',
        'selector': `.${elementId}.gvnews-post-comment.guten-element .comment-respond h3.comment-reply-title`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });
    isNotEmpty(attributes['marginHeading']) && data.push({
        'type': 'dimension',
        'id': 'marginHeading',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.gvnews-post-comment.guten-element .comment-respond h3.comment-reply-title`,
    });

    // Comment Title
    isNotEmpty(attributes['typographyCommentTitle']) && data.push({
        'type': 'typography',
        'id': 'typographyCommentTitle',
        'selector': `.${elementId} .gvnews-comments .comments-title`,
    });
    isNotEmpty(attributes['colorCommentTitle']) && data.push({
        'type': 'color',
        'id': 'colorCommentTitle',
        'selector': `.${elementId} .gvnews-comments .comments-title`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });
    isNotEmpty(attributes['marginCommentTitle']) && data.push({
        'type': 'dimension',
        'id': 'marginCommentTitle',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews-comments .comments-title`,
    });

    // Comment Count
    isNotEmpty(attributes['commentCountTypography']) && data.push({
        'type': 'typography',
        'id': 'commentCountTypography',
        'selector': `.${elementId} .gvnews-comments .comments-title .count`,
    });
    isNotEmpty(attributes['commentCountColor']) && data.push({
        'type': 'color',
        'id': 'commentCountColor',
        'selector': `.${elementId} .gvnews-comments .comments-title .count`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });
    isNotEmpty(attributes['commentCountBackgroundColor']) && data.push({
        'type': 'color',
        'id': 'commentCountBackgroundColor',
        'selector': `.${elementId} .gvnews-comments .comments-title .count`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });

    return data;
};

export default typographyHeadingStyle;