import { isNotEmpty } from 'gutenverse-core/helper';

const getBlockStyle = (elementId, attributes) => {
    const { headerType } = attributes;

    let data = [];

    /**
     * Panel Header
     */
    isNotEmpty(attributes['headerBackgroundColor']) && data.push({
        'type': 'color',
        'id': 'headerBackgroundColor',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_1 .gvnews_block_title span`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_2 .gvnews_block_title span`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_4 .gvnews_block_title span`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_5 .gvnews_block_title span`
        ],
        'properties': [
            {
                'name': 'background',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['headerBackgroundColor2']) && data.push({
        'type': 'color',
        'id': 'headerBackgroundColor2',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_3`,
        'properties': [
            {
                'name': 'background',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['headerTextColor']) && data.push({
        'type': 'color',
        'id': 'headerTextColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_title span`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['headerSecondColor']) && data.push({
        'type': 'color',
        'id': 'headerSecondColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_2`,
        'properties': [
            {
                'name': 'background',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['headerLineColor']) && data.push({
        'type': 'color',
        'id': 'headerLineColor',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_1`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_6`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_9`
        ],
        'properties': [
            {
                'name': 'border-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['headerLineColor2']) && data.push({
        'type': 'color',
        'id': 'headerLineColor2',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_5:before`,
        'properties': [
            {
                'name': 'border-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['headerAccentColor']) && data.push({
        'type': 'color',
        'id': 'headerAccentColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_6:after`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['headerAccentColor2']) && data.push({
        'type': 'color',
        'id': 'headerAccentColor2',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_7 .gvnews_block_title span`,
        'properties': [
            {
                'name': 'border-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['headerHeight']) && data.push({
        'type': 'plain',
        'id': 'headerHeight',
        'responsive': true,
        'selector': `.${elementId} .gvnews_block_heading .gvnews_block_title span , .${elementId} .gvnews_block_heading `,
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
        ],
    });

    isNotEmpty(attributes['headerTitlePadding']) && data.push({
        'type': 'dimension',
        'id': 'headerTitlePadding',
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.${elementId} .gvnews_block_heading .gvnews_block_title span`,
    });

    isNotEmpty(attributes['headerMargin']) && data.push({
        'type': 'dimension',
        'id': 'headerMargin',
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.${elementId} .gvnews_block_heading`,
    });

    isNotEmpty(attributes['headerTextTypography']) && data.push({
        'type': 'typography',
        'id': 'headerTextTypography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_title span , .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_title`,
    });

    /**
     * Panel Border
     */
    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `.${elementId} .gvnews-raw-wrapper`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.${elementId} .gvnews-raw-wrapper`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.${elementId} .gvnews-raw-wrapper:hover`,
    });

    isNotEmpty(attributes['borderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderHoverResponsive',
        'selector': `.${elementId} .gvnews-raw-wrapper:hover`,
    });

    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'selector': `.${elementId} .gvnews-raw-wrapper`,
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
        'selector': `.${elementId} .gvnews-raw-wrapper:hover`,
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
        'selector': `.${elementId} .gvnews-raw-wrapper`,
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
        'selector': `.${elementId} .gvnews-raw-wrapper`,
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
        'selector': `.${elementId} .gvnews-raw-wrapper`,
    });

    switch (headerType) {
        case 'heading_1':
            isNotEmpty(attributes['headerLineThick']) && data.push({
                'type': 'plain',
                'id': 'headerLineThick',
                'responsive': true,
                'selector': `.${elementId} .gvnews_block_heading_1`,
                'properties': [
                    {
                        'name': 'border-bottom-width',
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
            break;


        case 'heading_3':
            isNotEmpty(attributes['headerFilterLineColor']) && data.push({
                'type': 'color',
                'id': 'headerFilterLineColor',
                'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_3 .gvnews_subcat_list li a.current`,
                'properties': [
                    {
                        'name': 'border-color',
                        'valueType': 'direct'
                    }
                ],
            });
            break;

        case 'heading_5':
            isNotEmpty(attributes['headerLineThick']) && data.push({
                'type': 'plain',
                'id': 'headerLineThick',
                'responsive': true,
                'selector': `.${elementId} .gvnews_block_heading_5 .line`,
                'properties': [
                    {
                        'name': 'border-bottom-width',
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
            break;

        case 'heading_6':
            isNotEmpty(attributes['headerLineThick']) && data.push({
                'type': 'plain',
                'id': 'headerLineThick',
                'responsive': true,
                'selector': `.${elementId} .gvnews_block_heading_6`,
                'properties': [
                    {
                        'name': 'border-bottom-width',
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

            isNotEmpty(attributes['headerLineThick']) && data.push({
                'type': 'plain',
                'id': 'headerLineThick',
                'responsive': true,
                'selector': `.${elementId} .gvnews_block_heading_6:after`,
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
                    },
                    {
                        'name': 'bottom',
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
            break;

        case 'heading_7':
            isNotEmpty(attributes['headerLineThick']) && data.push({
                'type': 'plain',
                'id': 'headerLineThick',
                'responsive': true,
                'selector': `.${elementId} .gvnews_block_heading_7 .gvnews_block_title span`,
                'properties': [
                    {
                        'name': 'border-bottom-width',
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
            break;

        case 'heading_9':
            isNotEmpty(attributes['headerLineThick']) && data.push({
                'type': 'plain',
                'id': 'headerLineThick',
                'responsive': true,
                'selector': `.${elementId} .gvnews_block_heading_9`,
                'properties': [
                    {
                        'name': 'border-bottom-width',
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

            isNotEmpty(attributes['headerLineThick2']) && data.push({
                'type': 'plain',
                'id': 'headerLineThick2',
                'responsive': true,
                'selector': `.${elementId} .gvnews_block_heading_9`,
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
            break;

        default:
            break;
    }

    data = headerFilterStyle(elementId, attributes, data);

    return data;
};

const headerFilterStyle = (elementId, attributes, data) => {

    const {
        headerCategory,
        headerAuthor,
        headerTag,
    } = attributes;
    const withHeaderFilter = isNotEmpty(headerCategory) || isNotEmpty(headerAuthor) || isNotEmpty(headerTag);

    if (withHeaderFilter) {

        isNotEmpty(attributes['filterDowndownTypography']) && data.push({
            'type': 'typography',
            'id': 'filterDowndownTypography',
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible .subclass-filter`,
        });

        isNotEmpty(attributes['filterDowndownWrapperBackground']) && data.push({
            'type': 'color',
            'id': 'filterDowndownWrapperBackground',
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible`,
            'properties': [
                {
                    'name': 'background',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['filterDropdownItemPadding']) && data.push({
            'type': 'dimension',
            'id': 'filterDropdownItemPadding',
            'properties': [
                {
                    'name': 'padding',
                    'valueType': 'direct'
                }
            ],
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible .subclass-filter`,
        });

        isNotEmpty(attributes['filterDropdownWrapperPadding']) && data.push({
            'type': 'dimension',
            'id': 'filterDropdownWrapperPadding',
            'properties': [
                {
                    'name': 'padding',
                    'valueType': 'direct'
                }
            ],
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible`,
        });

        isNotEmpty(attributes['filterDropdownWrapperBorder']) && data.push({
            'type': 'border',
            'id': 'filterDropdownWrapperBorder',
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible`,
        });


        isNotEmpty(attributes['filterDropdownBoxShadow']) && data.push({
            'type': 'boxShadow',
            'id': 'filterDropdownBoxShadow',
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible`,
            'properties': [
                {
                    'name': 'box-shadow',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['filterDowndownColor']) && data.push({
            'type': 'color',
            'id': 'filterDowndownColor',
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible .subclass-filter`,
            'properties': [
                {
                    'name': 'color',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['filterDowndownColorHover']) && data.push({
            'type': 'color',
            'id': 'filterDowndownColorHover',
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible .subclass-filter:hover`,
            'properties': [
                {
                    'name': 'color',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['filterDowndownColorActive']) && data.push({
            'type': 'color',
            'id': 'filterDowndownColorActive',
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible .subclass-filter.current`,
            'properties': [
                {
                    'name': 'color',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['filterDowndownItemBackground']) && data.push({
            'type': 'color',
            'id': 'filterDowndownItemBackground',
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible .subclass-filter`,
            'properties': [
                {
                    'name': 'background',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['filterDowndownItemBackgroundHover']) && data.push({
            'type': 'color',
            'id': 'filterDowndownItemBackgroundHover',
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible .subclass-filter:hover`,
            'properties': [
                {
                    'name': 'background',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['filterDowndownItemBackgroundActive']) && data.push({
            'type': 'color',
            'id': 'filterDowndownItemBackgroundActive',
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible .subclass-filter.current`,
            'properties': [
                {
                    'name': 'background',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['filterDropdownToogleColor']) && data.push({
            'type': 'color',
            'id': 'filterDropdownToogleColor',
            'selector': `.${elementId} .gvnews_subcat .okayNav__menu-toggle span`,
            'properties': [
                {
                    'name': 'background',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['filterDropdownToogleColorHover']) && data.push({
            'type': 'color',
            'id': 'filterDropdownToogleColorHover',
            'selector': `.${elementId} .gvnews_subcat .okayNav__menu-toggle:hover span`,
            'properties': [
                {
                    'name': 'background',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['filterDropdownToogleColorActive']) && data.push({
            'type': 'color',
            'id': 'filterDropdownToogleColorActive',
            'selector': `.${elementId} .gvnews_subcat .okayNav__menu-toggle.icon--active span`,
            'properties': [
                {
                    'name': 'background',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['filterDropdownItemBorder']) && data.push({
            'type': 'border',
            'id': 'filterDropdownItemBorder',
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible .subclass-filter`,
        });
        isNotEmpty(attributes['filterDropdownItemBorderHover']) && data.push({
            'type': 'border',
            'id': 'filterDropdownItemBorderHover',
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible .subclass-filter:hover`,
        });
        isNotEmpty(attributes['filterDropdownItemBorderActive']) && data.push({
            'type': 'border',
            'id': 'filterDropdownItemBorderActive',
            'selector': `.${elementId} .gvnews_subcat .okayNav__nav--invisible .subclass-filter.current`,
        });

        isNotEmpty(attributes['headerFilterPadding']) && data.push({
            'type': 'dimension',
            'id': 'headerFilterPadding',
            'responsive': true,
            'properties': [
                {
                    'name': 'padding',
                    'valueType': 'direct'
                }
            ],
            'selector': `.${elementId} .gvnews_block_heading .gvnews_subcat`,
        });
    }
    return data;

};


export default getBlockStyle;