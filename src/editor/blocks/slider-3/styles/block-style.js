import { isNotEmpty, theDeviceType } from 'gutenverse-core/helper';

export const blockStyle = (elementId, attributes) => {
    let data = [];

    data = noContentStyle(elementId, attributes, data);

    isNotEmpty(attributes['gapItem']) && data.push({
        'id': 'gapItem',
        'type': 'plain',
        'responsive': true,
        'properties': [
            {
                'name': 'padding-right',
                'valueType': 'pattern',
                'pattern': '{value}px !important',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            }
        ],
        'selector': `.gvnews-slider-3.${elementId} .tns-inner .gvnews_slider_type_3 .tns-item`,
    });

    isNotEmpty(attributes['itemWidth']) && data.push({
        'id': 'itemWidth',
        'type': 'unitPoint',
        'responsive': true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': '{value} !important',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            }
        ],
        'selector': `.gvnews-slider-3.${elementId} .tns-inner .gvnews_slider_type_3 .tns-item`,
    });

    return data;
};

const noContentStyle = (elementId, attributes, data) => {
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
