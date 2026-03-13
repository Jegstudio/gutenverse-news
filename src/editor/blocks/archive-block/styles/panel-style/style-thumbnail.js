import { isNotEmpty } from 'gutenverse-core/helper';

export const thumbnailAndOverlayStyle = (elementId, attributes, data) => {
    const mainThumbnailClass = attributes['mainClass'];
    // Panel Thumbnail
    if (isNotEmpty(mainThumbnailClass)) {
        isNotEmpty(attributes['borderMainThumbnail']) && data.push({
            'id': 'borderMainThumbnail',
            'type': 'border',
            'selector': [
                `.${elementId} .gvnews_postblock .${mainThumbnailClass} .thumbnail-container`,
                `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews_thumb::before`
            ]
        });
        isNotEmpty(attributes['borderResponsiveMainThumbnail']) && data.push({
            'id': 'borderResponsiveMainThumbnail',
            'type': 'borderResponsive',
            'selector': [
                `.${elementId} .gvnews_postblock .${mainThumbnailClass} .thumbnail-container`,
                `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews_thumb::before`
            ]
        });
        isNotEmpty(attributes['overlayBackgroundMain']) && data.push({
            'type': 'background',
            'id': 'overlayBackgroundMain',
            'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews-thumb-overlay`,
        });
        isNotEmpty(attributes['overlayOpacityMain']) && data.push({
            'type': 'plain',
            'id': 'overlayOpacityMain',
            'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews-thumb-overlay`,
            'properties': [
                {
                    'name': 'opacity',
                    'valueType': 'direct'
                }
            ]
        });
    }

    isNotEmpty(attributes['overlayIconSizeMain']) && data.push({
        'type': 'plain',
        'id': 'overlayIconSizeMain',
        'responsive': true,
        'selector': `.${elementId} .gvnews_postblock .gvnews_post .gvnews-thumb-overlay-icon`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ],
    });

    isNotEmpty(attributes['overlayIconColorMain']) && data.push({
        'type': 'color',
        'id': 'overlayIconColorMain',
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId} .gvnews_postblock .gvnews_post .gvnews-thumb-overlay-icon`,
    });
    return data;
}