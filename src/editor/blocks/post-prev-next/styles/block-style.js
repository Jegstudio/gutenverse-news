import { backgroundStyle } from 'gutenverse-core/controls';
import { isNotEmpty } from 'gutenverse-core/helper';

const getBlockStyle = (elementId, attributes) => {
    let data = [];
    const baseSelector = `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_prevnext_post`;
    data = backgroundStyle({
        elementId,
        data,
        attributes,
        backgroundSelector: baseSelector,
        backgroundHoverSelector: `${baseSelector}:hover`
    });

    /**
     * Panel Style
     */
    isNotEmpty(attributes['titleTypography']) && data.push({
        'type': 'typography',
        'id': 'titleTypography',
        'selector': `${baseSelector} .post-title`,
    });
    isNotEmpty(attributes['navTypography']) && data.push({
        'type': 'typography',
        'id': 'navTypography',
        'selector': `${baseSelector} .caption`,
    });

    isNotEmpty(attributes['titleColor']) && data.push({
        'type': 'color',
        'id': 'titleColor',
        'selector': `${baseSelector} .post-title`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });
    if (isNotEmpty(attributes['widthMode'])) {
        data.push({
            'type': 'plain',
            'id': 'widthMode',
            'responsive': false,
            'specificDevice': 'Mobile',
            'selector': baseSelector,
            'properties': [
                {
                    'name': 'flex-direction',
                    'valueType': 'pattern',
                    'pattern': 'column',
                }
            ]
        });
        data.push({
            'type': 'plain',
            'id': 'widthMode',
            'responsive': false,
            'specificDevice': 'Mobile',
            'selector': `${baseSelector} a`,
            'properties': [
                {
                    'name': 'width',
                    'valueType': 'pattern',
                    'pattern': '100%',
                }
            ]
        });
    }
    isNotEmpty(attributes['gap']) && data.push({
        'type': 'plain',
        'id': 'gap',
        'responsive': true,
        'selector': baseSelector,
        'properties': [
            {
                'name': 'gap',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ]
    });
    isNotEmpty(attributes['titleColorHover']) && data.push({
        'type': 'color',
        'id': 'titleColorHover',
        'selector': `${baseSelector} a:hover .post-title`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['navTextColor']) && data.push({
        'type': 'color',
        'id': 'navTextColor',
        'selector': `${baseSelector} .caption`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });
    isNotEmpty(attributes['navTextColorHover']) && data.push({
        'type': 'color',
        'id': 'navTextColorHover',
        'selector': `${baseSelector} a:hover .caption`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['accentColor']) && data.push({
        'type': 'color',
        'id': 'accentColor',
        'selector': `${baseSelector} a .post-title`,
        'properties': [
            {
                'name': 'border-left-color',
                'valueType': 'direct'
            }
        ]
    }); isNotEmpty(attributes['accentColorHover']) && data.push({
        'type': 'color',
        'id': 'accentColorHover',
        'selector': `${baseSelector} a:hover .post-title`,
        'properties': [
            {
                'name': 'border-left-color',
                'valueType': 'direct'
            }
        ]
    });

    /**
     * Panel Border
     */
    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': baseSelector,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': baseSelector,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `${baseSelector}:hover`,
    });

    isNotEmpty(attributes['borderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderHoverResponsive',
        'selector': `${baseSelector}:hover`,
    });

    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'selector': baseSelector,
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['boxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadowHover',
        'selector': `${baseSelector}:hover`,
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
    });

    /**
     * Panel Spacing
     */
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
        'selector': baseSelector,
    });

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
        'selector': baseSelector,
    });

    isNotEmpty(attributes['zIndex']) && data.push({
        'type': 'plain',
        'id': 'zIndex',
        'responsive': true,
        'properties': [
            {
                'name': 'z-index',
                'valueType': 'direct'
            }
        ],
        'selector': baseSelector,
    });

    return data;
};

export default getBlockStyle;