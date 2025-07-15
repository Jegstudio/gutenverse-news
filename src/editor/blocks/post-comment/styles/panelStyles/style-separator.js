import { isNotEmpty } from 'gutenverse-core/helper';

const separatorStyle = (elementId, attributes, data) => {

    const separatorFormSelector = `.${elementId}.gvnews-post-comment hr.separator`;
    const separatorReplySelector = `.${elementId}.gvnews-post-comment .gvnews-comments .commentlist article.comment-body`;

    /**
     * Form Separator
     */
    isNotEmpty(attributes['separatorStyle']) && data.push({
        'id': 'separatorStyle',
        'type': 'plain',
        'properties': [
            {
                'name': 'border-top-style',
                'valueType': 'direct',
            }
        ],
        'selector': separatorFormSelector
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
        'selector': separatorFormSelector
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
        'selector': separatorFormSelector
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
        'selector': separatorFormSelector
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
        'selector': separatorFormSelector
    });

    /**
     * Reply Separator
     */
    isNotEmpty(attributes['separatorReplyStyle']) && data.push({
        'id': 'separatorReplyStyle',
        'type': 'plain',
        'properties': [
            {
                'name': 'border-top-style',
                'valueType': 'direct',
            }
        ],
        'selector': separatorReplySelector
    });

    isNotEmpty(attributes['separatorReplyColor']) && data.push({
        'id': 'separatorReplyColor',
        'type': 'color',
        'properties': [
            {
                'name': 'border-top-color',
                'valueType': 'direct',
            }
        ],
        'selector': separatorReplySelector
    });

    isNotEmpty(attributes['separatorReplyWidth']) && data.push({
        'id': 'separatorReplyWidth',
        'type': 'unitPoint',
        'responsive': true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct',
            }
        ],
        'selector': separatorReplySelector
    });

    isNotEmpty(attributes['separatorReplyHeight']) && data.push({
        'id': 'separatorReplyHeight',
        'type': 'unitPoint',
        'responsive': true,
        'properties': [
            {
                'name': 'border-top-width',
                'valueType': 'direct',
            }
        ],
        'selector': separatorReplySelector
    });

    return data;
};

export default separatorStyle;