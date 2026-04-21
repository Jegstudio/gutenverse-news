import { isNotEmpty } from 'gutenverse-core/helper';

export const getBlockStyle = (elementId, attributes) => {
    let data = [];

    data = noContentStyle(elementId, attributes, data);

    // ---- START TITLE STYLE -----

    isNotEmpty(attributes['titleTypography']) && data.push({
        'type': 'typography',
        'id': 'titleTypography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slide_item h2.gvnews_post_title a`,
    });

    isNotEmpty(attributes['titleColor']) && data.push({
        'type': 'color',
        'id': 'titleColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slide_item h2.gvnews_post_title a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['titleColorHover']) && data.push({
        'type': 'color',
        'id': 'titleColorHover',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slide_item h2.gvnews_post_title:hover a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    // ----- START NAVIGATION STYLE -----

    isNotEmpty(attributes['hideImageNavigation']) && data.push({
        'type': 'plain',
        'id': 'hideImageNavigation',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} #tns2-mw.tns-ovh`,
        'properties': [
            {
                'name': 'display',
                'valueType': 'pattern',
                'pattern': 'none !important',
            }
        ]
    });

    if (isNotEmpty(attributes['tootlipColor'])) {
        data.push({
            'type': 'color',
            'id': 'tootlipColor',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} #tns2-mw.tns-ovh`,
            'properties': [
                {
                    'name': 'background-color',
                    'valueType': 'direct'
                },
            ],
        });
        data.push({
            'type': 'color',
            'id': 'tootlipColor',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_thumbnail .tns-slide-active.current .gvnews_slide_thumbnail_item:before`,
            'properties': [
                {
                    'name': 'border-top-color',
                    'valueType': 'direct'
                },
            ],
        });
    }

    isNotEmpty(attributes['nextButtonColor']) && data.push({
        'type': 'color',
        'id': 'nextButtonColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-next`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['nextButtonColorHover']) && data.push({
        'type': 'color',
        'id': 'nextButtonColorHover',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-next:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['prevButtonColor']) && data.push({
        'type': 'color',
        'id': 'prevButtonColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-prev`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['prevButtonColorHover']) && data.push({
        'type': 'color',
        'id': 'prevButtonColorHover',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-prev:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['nextIconSize']) && data.push({
        'type': 'plain',
        'id': 'nextIconSize',
        'responsive': true,
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-next`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            },
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': 'fit-content',
            },
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': 'fit-content',
            }
        ],
    });

    isNotEmpty(attributes['prevIconSize']) && data.push({
        'type': 'plain',
        'id': 'prevIconSize',
        'responsive': true,
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-prev`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            },
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': 'fit-content',
            },
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': 'fit-content',
            }
        ],
    });

    isNotEmpty(attributes['nextButtonPadding']) && data.push({
        'type': 'dimension',
        'id': 'nextButtonPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-next`,
    });

    isNotEmpty(attributes['prevButtonPadding']) && data.push({
        'type': 'dimension',
        'id': 'prevButtonPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-prev`,
    });

    isNotEmpty(attributes['nextButtonBgColor']) && data.push({
        'type': 'color',
        'id': 'nextButtonBgColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-next`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['prevButtonBgColor']) && data.push({
        'type': 'color',
        'id': 'prevButtonBgColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-prev`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['nextButtonBgColorHover']) && data.push({
        'type': 'color',
        'id': 'nextButtonBgColorHover',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-next:hover`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['prevButtonBgColorHover']) && data.push({
        'type': 'color',
        'id': 'prevButtonBgColorHover',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-prev:hover`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['nextButtonHeight']) && data.push({
        'type': 'plain',
        'id': 'nextButtonHeight',
        'responsive': true,
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls button.tns-next`,
        'properties': [
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': '{value}px;',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            },
        ],
    });
    isNotEmpty(attributes['nextButtonWidth']) && data.push({
        'type': 'plain',
        'id': 'nextButtonWidth',
        'responsive': true,
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls button.tns-next`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': '{value}px;',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            },
        ],
    });
    isNotEmpty(attributes['prevButtonHeight']) && data.push({
        'type': 'plain',
        'id': 'prevButtonHeight',
        'responsive': true,
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls button.tns-prev`,
        'properties': [
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': '{value}px;',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            },
        ],
    });
    isNotEmpty(attributes['prevButtonWidth']) && data.push({
        'type': 'plain',
        'id': 'prevButtonWidth',
        'responsive': true,
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls button.tns-prev`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': '{value}px;',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            },
        ],
    });
    return data;
};

const noContentStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['noContentTextAlign']) && data.push({
        'type': 'plain',
        'id': 'noContentTextAlign',
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_empty_module`,
    });

    isNotEmpty(attributes['noContentTypography']) && data.push({
        'type': 'typography',
        'id': 'noContentTypography',
        'selector': `.${elementId} .gvnews_empty_module`,
    });

    isNotEmpty(attributes['noContentColor']) && data.push({
        'type': 'color',
        'id': 'noContentColor',
        'selector': `.${elementId} .gvnews_empty_module`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['noContentBackground']) && data.push({
        'type': 'background',
        'id': 'noContentBackground',
        'selector': `.${elementId} .gvnews_empty_module`,
    });

    isNotEmpty(attributes['noContentBorder']) && data.push({
        'type': 'borderResponsive',
        'id': 'noContentBorder',
        'selector': `.${elementId} .gvnews_empty_module`,
    });

    isNotEmpty(attributes['noContentPadding']) && data.push({
        'type': 'dimension',
        'id': 'noContentPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_empty_module`,
    });
    return data;

};