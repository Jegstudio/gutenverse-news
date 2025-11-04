import { isNotEmpty } from 'gutenverse-core/helper';
import getSliderStyle from '../../../control-panel/panel-styles/slider-styles';

export const getBolockStyle = (elementId, attributes) => {
    let data = getSliderStyle(elementId, attributes);

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

    isNotEmpty(attributes['hideNavigationButton']) && data.push({
        'type': 'plain',
        'id': 'hideNavigationButton',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls`,
        'properties': [
            {
                'name': 'display',
                'valueType': 'pattern',
                'pattern': 'none !important',
            }
        ]
    });

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

    isNotEmpty(attributes['tootlipColor']) && data.push({
        'type': 'color',
        'id': 'tootlipColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} #tns2-mw.tns-ovh`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['nextButtonColor']) && data.push({
        'type': 'color',
        'id': 'nextButtonColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-next i`,
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
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-next:hover i`,
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
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-prev i`,
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
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-prev:hover i`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['nextButtonSize']) && data.push({
        'type': 'plain',
        'id': 'nextButtonSize',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-next`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px; height: auto; width: auto;',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            },
        ],
    });

    isNotEmpty(attributes['prevButtonSize']) && data.push({
        'type': 'plain',
        'id': 'prevButtonSize',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-prev`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px; height: auto; width: auto;',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            },
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

    isNotEmpty(attributes['nextButtonOffsetProperties']) && data.push({
        'type': 'dimension',
        'id': 'nextButtonOffsetProperties',
        'responsive': true,
        'properties': [
            {
                'name': '',
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

    isNotEmpty(attributes['prevButtonOffsetProperties']) && data.push({
        'type': 'dimension',
        'id': 'prevButtonOffsetProperties',
        'responsive': true,
        'properties': [
            {
                'name': '',
                'valueType': 'direct'
            }
        ],
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-next`,
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

    if (isNotEmpty(attributes['nextButtonTransition'])) {
        data.push({
            'type': 'plain',
            'id': 'nextButtonTransition',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-next`,
            'properties': [
                {
                    'name': 'transition',
                    'valueType': 'pattern',
                    'pattern': 'background-color {value}ms;',
                    'patternValues': {
                        'value': {
                            'type': 'direct',
                        }
                    }
                },
            ],
        });
        data.push({
            'type': 'plain',
            'id': 'nextButtonTransition',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-next i`,
            'properties': [
                {
                    'name': 'transition',
                    'valueType': 'pattern',
                    'pattern': 'color {value}ms;',
                    'patternValues': {
                        'value': {
                            'type': 'direct',
                        }
                    }
                },
            ],
        });
    }

    if (isNotEmpty(attributes['prevButtonTransition'])) {
        data.push({
            'type': 'plain',
            'id': 'prevButtonTransition',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-prev`,
            'properties': [
                {
                    'name': 'transition',
                    'valueType': 'pattern',
                    'pattern': 'background-color {value}ms;',
                    'patternValues': {
                        'value': {
                            'type': 'direct',
                        }
                    }
                },
            ],
        });
        data.push({
            'type': 'plain',
            'id': 'prevButtonTransition',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-prev i`,
            'properties': [
                {
                    'name': 'transition',
                    'valueType': 'pattern',
                    'pattern': 'color {value}ms;',
                    'patternValues': {
                        'value': {
                            'type': 'direct',
                        }
                    }
                },
            ],
        });
    }

    return data;
};