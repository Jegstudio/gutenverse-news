import { isNotEmpty } from 'gutenverse-core/helper';

export const contentContainerStyle = (elementId, attributes, data ) => {
    const mainThumbnailClass = attributes['mainClass'];
    // Panel Content Container
    if (isNotEmpty(attributes['contentAlign'])) {
        data.push({
            'type': 'plain',
            'responsive': true,
            'id': 'contentAlign',
            'selector': [
                `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews_postblock_content`,
                `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews_postblock_heading`
            ],
            'properties': [
                {
                    'name': 'text-align',
                    'valueType': 'direct',
                }
            ],
        });
        data.push({
            'type': 'plain',
            'responsive': true,
            'id': 'contentAlign',
            'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews_postblock_content .gvnews_post_meta`,
            'properties': [
                {
                    'name': 'justify-content',
                    'valueType': 'function',
                    'functionName': 'handleAlignReverse'
                }
            ],
        });
    }

    isNotEmpty(attributes['contentAlignVertical']) && data.push({
        'type': 'plain',
        'responsive': true,
        'id': 'contentAlignVertical',
        'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass}`,
        'properties': [
            {
                'name': 'align-items',
                'valueType': 'direct',
            }
        ],
    });

    if (isNotEmpty(attributes['contentContainerBackground'])) {
        if (attributes['contentContainerBackground']?.color || attributes['contentContainerBackground']?.gradient) {
            data.push({
                'type': 'plain',
                'id': 'contentContainerBackground',
                'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews_postblock_content`,
                'properties': [
                    {
                        'name': 'background',
                        'valueType': 'pattern',
                        'pattern': 'initial',
                    }
                ],
            })
        }
        data.push({
            'type': 'background',
            'id': 'contentContainerBackground',
            'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews_postblock_content`,
        })
    };

    if (isNotEmpty(attributes['contentMargin'])) {
        data.push({
            'type': 'dimension',
            'id': 'contentMargin',
            'responsive': true,
            'properties': [
                {
                    'name': 'margin',
                    'valueType': 'direct'
                }
            ],
            'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews_postblock_content`,
        });
        data.push({
            'type': 'plain',
            'id': 'contentMargin',
            'responsive': true,
            'properties': [
                {
                    'name': 'column-gap',
                    'valueType': 'pattern',
                    'pattern': 'initial;',
                }
            ],
            'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass}`,
        });
    }

    isNotEmpty(attributes['contentPadding']) && data.push({
        'type': 'dimension',
        'id': 'contentPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews_postblock_content`,
    });

    isNotEmpty(attributes['contentBorder']) && data.push({
        'type': 'border',
        'id': 'contentBorder',
        'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews_postblock_content`,
    });

    isNotEmpty(attributes['contentBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'contentBorderResponsive',
        'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews_postblock_content`,
    });

    isNotEmpty(attributes['contentContainerShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'contentContainerShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews_postblock_content`,
    });
    return data;
}