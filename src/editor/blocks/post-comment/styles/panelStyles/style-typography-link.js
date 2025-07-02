import { isNotEmpty } from 'gutenverse-core/helper';

const typographyLlinkStyle = (elementId, attributes, data) => {

    const selector = `.${elementId}.gvnews-post-comment.guten-element`;

    // Form Comment
    isNotEmpty(attributes['typographyLink']) && data.push({
        'type': 'typography',
        'id': 'typographyLink',
        'selector': `${selector} .comment-form a`,
    });
    isNotEmpty(attributes['colorLink']) && data.push({
        'type': 'color',
        'id': 'colorLink',
        'selector': `${selector} .comment-form a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });
    isNotEmpty(attributes['marginLink']) && data.push({
        'type': 'dimension',
        'id': 'marginLink',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `${selector} .comment-form a`,
    });

    // User
    isNotEmpty(attributes['userNameTypography']) && data.push({
        'type': 'typography',
        'id': 'userNameTypography',
        'selector': `${selector} .commentlist b.fn a.url`,
    });
    isNotEmpty(attributes['userNameColor']) && data.push({
        'type': 'color',
        'id': 'userNameColor',
        'selector': `${selector} .commentlist b.fn a.url`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    // Date
    isNotEmpty(attributes['dateTypography']) && data.push({
        'type': 'typography',
        'id': 'dateTypography',
        'selector': `${selector} .commentlist .comment-metadata a time`,
    });
    isNotEmpty(attributes['dateColor']) && data.push({
        'type': 'color',
        'id': 'dateColor',
        'selector': `${selector} .commentlist .comment-metadata a time`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    // Reply
    isNotEmpty(attributes['replyLinkTypography']) && data.push({
        'type': 'typography',
        'id': 'replyLinkTypography',
        'selector': `${selector} .commentlist .reply .comment-reply-link`,
    });
    isNotEmpty(attributes['replyLinkColor']) && data.push({
        'type': 'color',
        'id': 'replyLinkColor',
        'selector': `${selector} .commentlist .reply .comment-reply-link`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    return data;
};

export default typographyLlinkStyle;