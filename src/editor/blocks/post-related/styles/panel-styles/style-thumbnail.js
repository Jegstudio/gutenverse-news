import { isNotEmpty } from 'gutenverse-core/helper';

export const thumbnailAndOverlayStyle = (elementId, attributes, data) => {
    const mainThumbnailClass = attributes['mainClass'];
    const secondThumbnailClass = attributes['secondClass'];
    // Panel Thumbnail main
    if (isNotEmpty(mainThumbnailClass)) {
        isNotEmpty(attributes['borderMainThumbnail']) && data.push({
            'id': 'borderMainThumbnail',
            'type': 'border',
            'selector': [
                `.${elementId} .gvnews_postblock ${mainThumbnailClass} .thumbnail-container`,
                `.${elementId} .gvnews_postblock ${mainThumbnailClass} .gvnews_thumb::before`
            ]
        });
        isNotEmpty(attributes['borderResponsiveMainThumbnail']) && data.push({
            'id': 'borderResponsiveMainThumbnail',
            'type': 'borderResponsive',
            'selector': [
                `.${elementId} .gvnews_postblock ${mainThumbnailClass} .thumbnail-container`,
                `.${elementId} .gvnews_postblock ${mainThumbnailClass} .gvnews_thumb::before`
            ]
        });
        isNotEmpty(attributes['overlayBackgroundMain']) && data.push({
            'type': 'background',
            'id': 'overlayBackgroundMain',
            'selector': `.${elementId} .gvnews_postblock ${mainThumbnailClass} .gvnews-thumb-overlay`,
        });
        isNotEmpty(attributes['overlayOpacityMain']) && data.push({
            'type': 'plain',
            'id': 'overlayOpacityMain',
            'selector': `.${elementId} .gvnews_postblock ${mainThumbnailClass} .gvnews-thumb-overlay`,
            'properties': [
                {
                    'name': 'opacity',
                    'valueType': 'direct'
                }
            ]
        });
    }
    // Panel Thumbnail second
    if (isNotEmpty(secondThumbnailClass)) {
        isNotEmpty(attributes['borderSecondThumbnail']) && data.push({
            'id': 'borderSecondThumbnail',
            'type': 'border',
            'selector': [
                `.${elementId} .gvnews_postblock ${secondThumbnailClass} .thumbnail-container`,
                `.${elementId} .gvnews_postblock ${secondThumbnailClass} .gvnews_thumb::before`
            ]
        });
        isNotEmpty(attributes['borderResponsiveSecondThumbnail']) && data.push({
            'id': 'borderResponsiveSecondThumbnail',
            'type': 'borderResponsive',
            'selector': [
                `.${elementId} .gvnews_postblock ${secondThumbnailClass} .thumbnail-container`,
                `.${elementId} .gvnews_postblock ${secondThumbnailClass} .gvnews_thumb::before`
            ]
        });
        isNotEmpty(attributes['overlayBackgroundSecond']) && data.push({
            'type': 'background',
            'id': 'overlayBackgroundSecond',
            'selector': `.${elementId} .gvnews_postblock ${secondThumbnailClass} .gvnews-thumb-overlay`,
        });
        isNotEmpty(attributes['overlayOpacitySecond']) && data.push({
            'type': 'plain',
            'id': 'overlayOpacitySecond',
            'selector': `.${elementId} .gvnews_postblock ${secondThumbnailClass} .gvnews-thumb-overlay`,
            'properties': [
                {
                    'name': 'opacity',
                    'valueType': 'direct'
                }
            ]
        });
    }
    return data;
};