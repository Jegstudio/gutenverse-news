import { isNotEmpty } from 'gutenverse-core/helper';

// This is for Module 7
export const titleContainerStyle = (elementId, attributes, data) => {
    const selector = `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock_7.gvnews_postblock .gvnews_post_title`;
    isNotEmpty(attributes['titleContainerAlign']) && data.push({
        'type': 'plain',
        'id': 'titleContainerAlign',
        'responsive': true,
        'selector': selector,
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'direct'
            }
        ]
    });
    isNotEmpty(attributes['titleContainerBackground']) && data.push({
        'type': 'background',
        'id': 'titleContainerBackground',
        'selector': selector,
    });
    isNotEmpty(attributes['titleContainerMargin']) && data.push({
        'type': 'dimension',
        'id': 'titleContainerMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': selector,
    });
    isNotEmpty(attributes['titleContainerPadding']) && data.push({
        'type': 'dimension',
        'id': 'titleContainerPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': selector,
    });

    return data;
}