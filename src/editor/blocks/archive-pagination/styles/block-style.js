import { isNotEmpty } from 'gutenverse-core/helper';

const getBlockStyle = (elementId, attributes) => {
    let data = [];

    const { paginationMode, paginationAlign } = attributes
    const isType3 = paginationMode === 'nav_3';
    /**
     * Panel Design
     */
    isNotEmpty(attributes['paginationTypography']) && data.push({
        'type': 'typography',
        'id': 'paginationTypography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pagination .nav-item`,
    });

    isNotEmpty(attributes['pagintaionInfoTypography']) && data.push({
        'type': 'typography',
        'id': 'pagintaionInfoTypography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pagination .page_info`,
    });

    isNotEmpty(attributes['paginationButtonTypography']) && data.push({
        'type': 'typography',
        'id': 'paginationButtonTypography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pagenav_3 .page_nav`,
    });

    isNotEmpty(attributes['paginationColor']) && data.push({
        'type': 'color',
        'id': 'paginationColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pagination .nav-wrapper .nav-item:not(.active)`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['paginationInfoColor']) && data.push({
        'type': 'color',
        'id': 'paginationInfoColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pagination .page_info`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['paginationCurrentColor']) && data.push({
        'type': 'color',
        'id': 'paginationCurrentColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pagination .page_number.active`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isType3 && isNotEmpty(attributes['paginationCurrentColor']) && data.push({
        'type': 'color',
        'id': 'paginationCurrentColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pagination .page_number.active`,
        'properties': [
            {
                'name': 'border-top-color',
                'valueType': 'direct'
            }
        ],
    });


    isNotEmpty(attributes['paginationHoverColor']) && data.push({
        'type': 'color',
        'id': 'paginationHoverColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pagination .nav-wrapper a.nav-item:not(.active):hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    if (isType3) {
        isNotEmpty(attributes['nextPrevColor']) && data.push({
            'type': 'color',
            'id': 'nextPrevColor',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pagenav_3 a.page_nav`,
            'properties': [
                {
                    'name': 'color',
                    'valueType': 'direct'
                }
            ],
        });
        isNotEmpty(attributes['nextPrevHoverColor']) && data.push({
            'type': 'color',
            'id': 'nextPrevHoverColor',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pagenav_3  a.page_nav:hover`,
            'properties': [
                {
                    'name': 'color',
                    'valueType': 'direct'
                }
            ],
        });
        isNotEmpty(attributes['nextPrevBackground']) && data.push({
            'type': 'background',
            'id': 'nextPrevBackground',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pagenav_3 a.page_nav`,
        });
        isNotEmpty(attributes['nextPrevHoverBackground']) && data.push({
            'type': 'background',
            'id': 'nextPrevHoverBackground',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pagenav_3 a.page_nav:hover`,
        });
        isNotEmpty(attributes['paginationHoverColor']) && data.push({
            'type': 'color',
            'id': 'paginationHoverColor',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pagination a.nav-item:hover`,
            'properties': [
                {
                    'name': 'border-top-color',
                    'valueType': 'direct'
                }
            ],
        });
        isNotEmpty(attributes['paginationPadding']) && data.push({
            'type': 'dimension',
            'id': 'paginationPadding',
            'responsive': true,
            'properties': [
                {
                    'name': 'padding',
                    'valueType': 'direct'
                }
            ],
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pagenav_3 .page_nav`,
        });

        isNotEmpty(attributes['lineThick']) && data.push({
            'type': 'plain',
            'id': 'lineThick',
            'responsive': true,
            'selector': `.${elementId} .gvnews_pagenav_3 ,.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pagenav_3 .page_number`,
            'properties': [
                {
                    'name': 'border-top-width',
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

        isNotEmpty(attributes['lineThick']) && data.push({
            'type': 'plain',
            'id': 'lineThick',
            'responsive': true,
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pagenav_3 .page_number`,
            'properties': [
                {
                    'name': 'margin-top',
                    'valueType': 'pattern',
                    'pattern': '-{value}px',
                    'patternValues': {
                        'value': {
                            'type': 'direct'
                        }
                    }
                }
            ],
        });


        isNotEmpty(attributes['lineGap']) && data.push({
            'type': 'plain',
            'id': 'lineGap',
            'responsive': true,
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pagenav_3 .nav-wrapper .nav-item`,
            'properties': [
                {
                    'name': 'padding-top',
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
    } else {
        isNotEmpty(attributes['paginationBackground']) && data.push({
            'type': 'background',
            'id': 'paginationBackground',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pagination a:not(.active)`,
        });
        isNotEmpty(attributes['paginationCurrentBackground']) && data.push({
            'type': 'background',
            'id': 'paginationCurrentBackground',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pagination .page_number.active`,
        });
        isNotEmpty(attributes['paginationHoverBackground']) && data.push({
            'type': 'background',
            'id': 'paginationHoverBackground',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pagination a:hover`,
        });
        isNotEmpty(attributes['paginationPadding']) && data.push({
            'type': 'dimension',
            'id': 'paginationPadding',
            'responsive': true,
            'properties': [
                {
                    'name': 'padding',
                    'valueType': 'direct'
                }
            ],
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pagination .nav-wrapper .page_number , .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pagination .nav-wrapper .page_nav`,
        });
        isNotEmpty(attributes['paginationActiveBorder']) && data.push({
            'type': 'border',
            'id': 'paginationActiveBorder',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_navigation .page_number.active`,
        });

        isNotEmpty(attributes['paginationActiveBorderResponsive']) && data.push({
            'type': 'borderResponsive',
            'id': 'paginationActiveBorderResponsive',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_navigation .page_number.active`,
        });

        isNotEmpty(attributes['numberHeight']) && data.push({
            'type': 'plain',
            'id': 'numberHeight',
            'responsive': true,
            'selector': `.${elementId} .gvnews_pagination .nav-wrapper .nav-item:not(.page_nav)`,
            'properties': [
                {
                    'name': 'height',
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
    }



    isNotEmpty(attributes['numberGap']) && data.push({
        'type': 'plain',
        'id': 'numberGap',
        'responsive': true,
        'selector': `.${elementId} .gvnews_pagination .nav-wrapper`,
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

    isNotEmpty(attributes['nextPrevGap']) && data.push({
        'type': 'plain',
        'id': 'nextPrevGap',
        'responsive': true,
        'selector': `.${elementId} .gvnews_pagination .next-prev-button`,
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

    isNotEmpty(attributes['numberWidth']) && data.push({
        'type': 'plain',
        'id': 'numberWidth',
        'responsive': true,
        'selector': `.${elementId} .gvnews_pagination .nav-wrapper .nav-item:not(.page_nav)`,
        'properties': [
            {
                'name': 'width',
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

    isNotEmpty(attributes['nextPrevHeight']) && data.push({
        'type': 'plain',
        'id': 'nextPrevHeight',
        'responsive': true,
        'selector': `.${elementId} .gvnews_pagination .page_nav`,
        'properties': [
            {
                'name': 'height',
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

    isNotEmpty(attributes['nextPrevWidth']) && data.push({
        'type': 'plain',
        'id': 'nextPrevWidth',
        'responsive': true,
        'selector': `.${elementId} .gvnews_pagination .page_nav`,
        'properties': [
            {
                'name': 'width',
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


    paginationAlign === 'center' && isNotEmpty(attributes['infoGap']) && data.push({
        'type': 'plain',
        'id': 'infoGap',
        'responsive': true,
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} ${paginationMode === 'nav_3' ? '.gvnews_pagenav_3.gvnews_aligncenter' : '.gvnews_pagination .page_info'}`,
        'properties': [
            {
                'name': `${paginationMode === 'nav_3' ? 'padding-bottom' : 'margin-bottom'}`,
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

    isNotEmpty(attributes['paginationBorder']) && data.push({
        'type': 'border',
        'id': 'paginationBorder',
        'selector': isType3 ? `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pagenav_3 .page_nav` : `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_navigation .page_nav, .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_navigation .page_number`,
    });

    isNotEmpty(attributes['paginationBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'paginationBorderResponsive',
        'selector': isType3 ? `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pagenav_3 .page_nav` : `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_navigation .page_nav, .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_navigation .page_number`,
    });

    isNotEmpty(attributes['paginationHoverBorder']) && data.push({
        'type': 'border',
        'id': 'paginationHoverBorder',
        'selector': isType3 ? `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pagenav_3 .page_nav:hover` : `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_navigation .page_nav:hover, .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_navigation .page_number:hover`,
    });

    isNotEmpty(attributes['paginationHoverBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'paginationHoverBorderResponsive',
        'selector': isType3 ? `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_pagenav_3 .page_nav:hover` : `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_navigation .page_nav:hover, .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_navigation .page_number:hover`,
    });



    console.log(isType3);
    console.log(data);

    /**
     * Panel Background
     */
    isNotEmpty(attributes['background']) && data.push({
        'type': 'background',
        'id': 'background',
        'selector': `.${elementId} .gvnews_navigation`,
    });

    isNotEmpty(attributes['backgroundHover']) && data.push({
        'type': 'background',
        'id': 'backgroundHover',
        'selector': `.${elementId} .gvnews_navigation:hover`,
    });

    /**
     * Panel Border
     */
    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `.${elementId} .gvnews_navigation`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.${elementId} .gvnews_navigation`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.${elementId} .gvnews_navigation:hover`,
    });

    isNotEmpty(attributes['borderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderHoverResponsive',
        'selector': `.${elementId} .gvnews_navigation:hover`,
    });

    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'selector': `.${elementId} .gvnews_navigation`,
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
        'selector': `.${elementId} .gvnews_navigation:hover`,
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
    });

    /**
     * Panel Positioning
     */
    isNotEmpty(attributes['positioningType']) && data.push(
        {
            'type': 'positioning',
            'id': 'positioningType',
            'selector': `.${elementId} .gvnews_navigation`,
            'skipDeviceType': 'first',
            'attributeType': 'type',
            'multiAttr': {
                'positioningType': attributes['positioningType'],
                'inBlock': attributes['inBlock']
            }
        },
    );

    isNotEmpty(attributes['positioningType']) && isNotEmpty(attributes['positioningWidth']) && data.push(
        {
            'type': 'positioning',
            'id': 'positioningType',
            'selector': `.${elementId} .gvnews_navigation`,
            'skipDeviceType': 'second',
            'attributeType': 'type',
            'multiAttr': {
                'positioningWidth': attributes['positioningWidth'],
                'positioningType': attributes['positioningType'],
                'inBlock': attributes['inBlock']
            }
        }
    );

    isNotEmpty(attributes['positioningWidth']) && isNotEmpty(attributes['positioningType']) && data.push({
        'type': 'positioning',
        'id': 'positioningWidth',
        'selector': `.${elementId} .gvnews_navigation`,
        'skipDeviceType': 'first',
        'attributeType': 'width',
        'multiAttr': {
            'positioningWidth': attributes['positioningWidth'],
            'positioningType': attributes['positioningType'],
            'inBlock': attributes['inBlock']
        }
    });

    isNotEmpty(attributes['positioningAlign']) && data.push(
        {
            'type': 'plain',
            'id': 'positioningAlign',
            'responsive': true,
            'properties': [
                {
                    'name': 'align-self',
                    'valueType': 'direct'
                }
            ],
            'selector': `.${elementId} .gvnews_navigation`,
        },
        {
            'type': 'positioning',
            'id': 'positioningAlign',
            'properties': [
                {
                    'name': 'vertical-align',
                    'valueType': 'direct'
                }
            ],
            'attributeType': 'align',
            'selector': `.${elementId} .gvnews_navigation`,
        }
    );

    isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'plain',
        'id': 'positioningLocation',
        'properties': [
            {
                'name': 'position',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_navigation`,
    });

    isNotEmpty(attributes['positioningLeft']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningLeft',
        'properties': [
            {
                'name': 'left',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.${elementId} .gvnews_navigation`,
        'attributeType': 'custom',
    });

    isNotEmpty(attributes['positioningRight']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningRight',
        'properties': [
            {
                'name': 'right',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.${elementId} .gvnews_navigation`,
        'attributeType': 'custom',
    });

    isNotEmpty(attributes['positioningTop']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningTop',
        'properties': [
            {
                'name': 'top',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.${elementId} .gvnews_navigation`,
        'attributeType': 'custom',
    });

    isNotEmpty(attributes['positioningBottom']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningBottom',
        'properties': [
            {
                'name': 'bottom',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.${elementId} .gvnews_navigation`,
        'attributeType': 'custom',
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
        'selector': `.${elementId} .gvnews_navigation`,
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
        'selector': `.${elementId} .gvnews_navigation`,
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
        'selector': `.${elementId} .gvnews_navigation`,
    });

    return data;
};


export default getBlockStyle;