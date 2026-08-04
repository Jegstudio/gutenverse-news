import { isNotEmpty } from 'gutenverse-core/helper';
import getBlockStyle from '../../../control-panel/panel-styles/block-style';

const dedicatedStyle = (elementId, attributes) => {
    let data = getBlockStyle(elementId, attributes, 'gvnews_pl_md_box');

    isNotEmpty(attributes['listIconSize']) && data.push({
        'type': 'plain',
        'id': 'listIconSize',
        'selector': [
            `.${elementId} .gvnews_postblock_16 .gvnews_pl_xs_2 > i:first-child`,
            `.${elementId} .gvnews_postblock_16 .gvnews_pl_xs_2 > .gutenverse-icon-svg:first-child svg`,
        ],
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
    });
    isNotEmpty(attributes['listIconSpacing']) && data.push({
        'type': 'plain',
        'id': 'listIconSpacing',
        'selector': `
            .${elementId} .gvnews_postblock_16 .gvnews_pl_xs_2
        `,
        'properties': [
            {
                'name': 'padding-left',
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
    isNotEmpty(attributes['listIconAlign']) && data.push({
        'type': 'plain',
        'id': 'listIconAlign',
        'selector': [
            `.${elementId} .gvnews_postblock_16 .gvnews_pl_xs_2 > i:first-child`,
            `.${elementId} .gvnews_postblock_16 .gvnews_pl_xs_2 > .gutenverse-icon-svg:first-child svg`,
        ],
        'properties': [
            {
                'name': 'top',
                'valueType': 'function',
                'valueFunc': (value) => {
                    if (value === 'center') {
                        return '50%; transform: translateY(-50%);';
                    }
                    if (value === 'bottom') {
                        return 'unset; bottom: 0;';
                    }
                    return '0';
                }
            }
        ],
    });
    return data;
};


export default dedicatedStyle;