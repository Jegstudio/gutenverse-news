import { isNotEmpty, theDeviceType } from 'gutenverse-core/helper';

export const blockStyle = (elementId, attributes) => {
    let data = [];

    isNotEmpty(attributes['gapItem']) && data.push({
        'id': 'gapItem',
        'type': 'plain',
        'responsive': true,
        'properties': [
            {
                'name': 'padding-right',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                        'value': {
                            'type': 'direct',
                        },
                    }
            }
        ],
        'selector': `.gvnews-slider-3.${elementId} .tns-inner #tns1 .tns-item`,
    });

    isNotEmpty(attributes['itemWidth']) && data.push({
        'id': 'itemWidth',
        'type': 'plain',
        'responsive': true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': 'calc({value}%)',
                'patternValues': {
                        'value': {
                            'type': 'direct',
                        },
                    }
            }
        ],
        'selector': `.gvnews-slider-3.${elementId} .tns-inner #tns1 .tns-item`,
    });
    
    return data;
}
