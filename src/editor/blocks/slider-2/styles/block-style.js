import { isNotEmpty, theDeviceType } from 'gutenverse-core/helper';

export const blockStyle = (elementId, attributes) => {
    let data = [];
    const {
        hoverRight,
        activeRight,
    } = getNewRightPosition(attributes);

    isNotEmpty(attributes['alwaysShowDot']) && data.push({
        'id': 'alwaysShowDot',
        'type': 'plain',
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'pattern',
                'pattern': '1 !important',
            }
        ],
        'selector': `.${elementId} .gvnews_slider_type_2_wrapper .tns-nav`,
    });
    isNotEmpty(attributes['dotGap']) && data.push({
        'id': 'dotGap',
        'type': 'plain',
        'responsive': true,
        'properties': [
            {
                'name': 'gap',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            }
        ],
        'selector': `.${elementId} .gvnews_slider_type_2_wrapper .tns-nav`,
    });

    // Normal
    isNotEmpty(attributes['dotNormalColor']) && data.push({
        'id': 'dotNormalColor',
        'type': 'color',
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId} .gvnews_slider_type_2_wrapper .tns-nav button`,
    });
    isNotEmpty(attributes['dotBorderNormalColor']) && data.push({
        'id': 'dotBorderNormalColor',
        'type': 'color',
        'properties': [
            {
                'name': 'border-color',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId} .gvnews_slider_type_2_wrapper .tns-nav button`,
    });
    isNotEmpty(attributes['dotNormalSize']) && data.push({
        'id': 'dotNormalSize',
        'type': 'plain',
        'responsive': true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            },
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            },
            {
                'name': 'border-radius',
                'valueType': 'pattern',
                'pattern': '100%',
            }
        ],
        'selector': `.${elementId} .gvnews_slider_type_2_wrapper .tns-nav button`,
    });

    // Hover
    isNotEmpty(attributes['dotHoverColor']) && data.push({
        'id': 'dotHoverColor',
        'type': 'color',
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId} .gvnews_slider_type_2_wrapper .tns-nav button:hover`,
    });
    isNotEmpty(attributes['dotBorderHoverColor']) && data.push({
        'id': 'dotBorderHoverColor',
        'type': 'color',
        'properties': [
            {
                'name': 'border-color',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId} .gvnews_slider_type_2_wrapper .tns-nav button:hover`,
    });
    if (isNotEmpty(attributes['dotHoverSize'])) {
        // isNotEmpty(attributes['dotHoverSize'][theDeviceType()]) && data.push({
        //     'id': 'dotHoverSize',
        //     'type': 'plain',
        //     'responsive': true,
        //     'properties': [
        //         {
        //             'name': 'right',
        //             'valueType': 'pattern',
        //             'pattern': `${hoverRight}px`,
        //         },
        //     ],
        //     'selector': `.${elementId} .gvnews_slider_type_2_wrapper .tns-nav:hover`,
        // });
        data.push({
            'id': 'dotHoverSize',
            'type': 'plain',
            'responsive': true,
            'properties': [
                {
                    'name': 'width',
                    'valueType': 'pattern',
                    'pattern': '{value}px',
                    'patternValues': {
                        'value': {
                            'type': 'direct',
                        },
                    }
                },
                {
                    'name': 'height',
                    'valueType': 'pattern',
                    'pattern': '{value}px',
                    'patternValues': {
                        'value': {
                            'type': 'direct',
                        },
                    }
                },
                {
                    'name': 'border-radius',
                    'valueType': 'pattern',
                    'pattern': '100%',
                }
            ],
            'selector': `.${elementId} .gvnews_slider_type_2_wrapper .tns-nav button:hover`,
        });
    }

    // Active
    isNotEmpty(attributes['dotActiveColor']) && data.push({
        'id': 'dotActiveColor',
        'type': 'color',
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct',
            }
        ],
        'selector': `.gvnews-slider-2.${elementId} .gvnews_slider_type_2_wrapper .tns-nav button.tns-nav-active`,
    });
    isNotEmpty(attributes['dotBorderActiveColor']) && data.push({
        'id': 'dotBorderActiveColor',
        'type': 'color',
        'properties': [
            {
                'name': 'border-color',
                'valueType': 'direct',
            }
        ],
        'selector': `.gvnews-slider-2.${elementId} .gvnews_slider_type_2_wrapper .tns-nav button.tns-nav-active`,
    });
    isNotEmpty(attributes['dotActiveSize']) && data.push({
        'id': 'dotActiveSize',
        'type': 'plain',
        'responsive': true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            },
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            },
            {
                'name': 'border-radius',
                'valueType': 'pattern',
                'pattern': '100%',
            }
        ],
        'selector': `.gvnews-slider-2.${elementId} .gvnews_slider_type_2_wrapper .tns-nav button.tns-nav-active`,
    });

    return data;
}

const getNewRightPosition = (attributes) => {
    const device = theDeviceType();

    let normalSize = '12';
    if (isNotEmpty(attributes['dotNormalSize']) && isNotEmpty(attributes['dotNormalSize'][device])) {
        normalSize = attributes['dotNormalSize'][device];
    }

    let hoverSize = '12';
    if (isNotEmpty(attributes['dotHoverSize']) && isNotEmpty(attributes['dotHoverSize'][device])) {
        hoverSize = attributes['dotHoverSize'][device];
    }

    let activeSize = '12';
    if (isNotEmpty(attributes['dotActiveSize']) && isNotEmpty(attributes['dotActiveSize'][device])) {
        activeSize = attributes['dotActiveSize'][device];
    }

    return {
        hoverRight: 20 + ((normalSize - hoverSize) / 2),
        activeRight: 20 + ((normalSize - activeSize) / 2),
    };
}