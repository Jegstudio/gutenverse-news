import { isNotEmpty } from 'gutenverse-core/helper';
import { positioningStyle } from '../../../control-panel/panel-styles/positioning-style';

const getBlockStyle = (elementId, attributes) => {

    const {
        headerType,
    } = attributes;
    let data = [];
    data = positioningStyle(elementId, attributes, data, `.gvnews-block.gvnews-block-wrapper.${elementId}`);

    const withSecondText = ['heading_5', 'heading_6', 'heading_7', 'heading_8'].includes(headerType);
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

    isNotEmpty(attributes['headerTextTypography']) && data.push({
        'type': 'typography',
        'id': 'headerTextTypography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_title span`,
    });

    isNotEmpty(attributes['headerSecondTextTypography']) && withSecondText && data.push({
        'type': 'typography',
        'id': 'headerSecondTextTypography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_title span strong`,
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

    isNotEmpty(attributes['headerIconColor']) && data.push({
        'type': 'color',
        'id': 'headerIconColor',
        'selector': `
            .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_title span .gutenverse-icon-svg,
            .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_title span i
        `,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['headerSecondTextColor']) && withSecondText && data.push({
        'type': 'color',
        'id': 'headerSecondTextColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_title span strong`,
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
        'selector': `.${elementId} .gvnews_block_heading_5 .line`,
        'properties': [
            {
                'name': 'border-bottom-color',
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

    /**
     * Panel Border
     */
    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `.${elementId} .gvnews_block_heading`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.${elementId} .gvnews_block_heading`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.${elementId} .gvnews_block_heading:hover`,
    });

    isNotEmpty(attributes['borderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderHoverResponsive',
        'selector': `.${elementId} .gvnews_block_heading:hover`,
    });

    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'selector': `.${elementId} .gvnews_block_heading`,
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
        'selector': `.${elementId} .gvnews_block_heading:hover`,
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
        'selector': `.${elementId} .gvnews_block_heading`,
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
        'selector': `.${elementId} .gvnews_block_heading`,
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
        'selector': `.${elementId} .gvnews_block_heading`,
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

    return data;
};


export default getBlockStyle;