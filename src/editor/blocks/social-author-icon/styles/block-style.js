import { isNotEmpty } from 'gutenverse-core/helper';

const getBlockStyle = (elementId, attributes) => {
    let data = [];

    // Icon Size
    isNotEmpty(attributes['iconSize']) && data.push({
        'type': 'plain',
        'id': 'iconSize',
        'responsive': true,
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
        'selector': `.guten-element.${elementId}.gvnews-social-author-icon.guten-social-icon i`,
    });

    // Icon Color
    isNotEmpty(attributes['iconColor']) && data.push({
        'type': 'color',
        'id': 'iconColor',
        'selector': `.guten-element.${elementId}.gvnews-social-author-icon.guten-social-icon a i`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconColorHover']) && data.push({
        'type': 'color',
        'id': 'iconColorHover',
        'selector': `.guten-element.${elementId}.gvnews-social-author-icon.guten-social-icon a:hover i`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    // Icon Background Color
    isNotEmpty(attributes['iconBackground']) && data.push({
        'type': 'color',
        'id': 'iconBackground',
        'selector': `.guten-element.${elementId}.gvnews-social-author-icon.guten-social-icon a`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconBackgroundHover']) && data.push({
        'type': 'color',
        'id': 'iconBackgroundHover',
        'selector': `.guten-element.${elementId}.gvnews-social-author-icon.guten-social-icon a:hover`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });

    // Icon Background Gradient
    isNotEmpty(attributes['iconBackgroundGradient']) && data.push({
        'type': 'background',
        'id': 'iconBackgroundGradient',
        'selector': `.guten-element.${elementId}.gvnews-social-author-icon.guten-social-icon a`,
    });

    isNotEmpty(attributes['iconBackgroundGradientHover']) && data.push({
        'type': 'background',
        'id': 'iconBackgroundGradientHover',
        'selector': `.guten-element.${elementId}.gvnews-social-author-icon.guten-social-icon a:hover`,
    });

    // Margin
    isNotEmpty(attributes['margin']) && data.push({
        'type': 'dimension',
        'id': 'margin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-element.${elementId}.gvnews-social-author-icon.guten-social-icon`,
    });

    // Padding
    isNotEmpty(attributes['padding']) && data.push({
        'type': 'dimension',
        'id': 'padding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-element.${elementId}.gvnews-social-author-icon.guten-social-icon`,
    });

    // Z-Index
    isNotEmpty(attributes['zIndex']) && data.push({
        'type': 'dimension',
        'id': 'zIndex',
        'responsive': true,
        'properties': [
            {
                'name': 'z-index',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-element.${elementId}.gvnews-social-author-icon.guten-social-icon`,
    });

    return data;
};

export default getBlockStyle;
