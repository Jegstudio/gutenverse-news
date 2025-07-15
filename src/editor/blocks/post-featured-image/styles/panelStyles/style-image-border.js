import { isNotEmpty } from 'gutenverse-core/helper';

export const imageBorderStyle = (elementId, attributes, data) => {

    const selector = `.guten-element.${elementId} .gvnews_featured .thumbnail-container`;

    isNotEmpty(attributes['imageBorder']) && data.push({
        'id': 'imageBorder',
        'type': 'border',
        'selector': selector,
    });

    isNotEmpty(attributes['imageBorderResponsive']) && data.push({
        'id': 'imageBorderResponsive',
        'type': 'borderResponsive',
        'selector': selector,
    });

    isNotEmpty(attributes['imageBorderHover']) && data.push({
        'id': 'imageBorderHover',
        'type': 'border',
        'selector': `${selector}:hover`,
    });

    isNotEmpty(attributes['imageBorderHoverResponsive']) && data.push({
        'id': 'imageBorderHoverResponsive',
        'type': 'borderResponsive',
        'selector': `${selector}:hover`,
    });

    isNotEmpty(attributes['imageBoxShadow']) && data.push({
        'id': 'imageBoxShadow',
        'type': 'boxShadow',
        'selector': selector,
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['imageBoxShadowHover']) && data.push({
        'id': 'imageBoxShadowHover',
        'type': 'boxShadow',
        'selector': `${selector}:hover`,
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
    });

    return data;
};