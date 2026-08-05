import { isNotEmpty } from 'gutenverse-core/helper';
import getBlockStyle from '../../../control-panel/panel-styles/block-style';

const dedicatedStyle = (elementId, attributes) => {
    let data = getBlockStyle(elementId, attributes, 'gvnews_pl_md_box');

    isNotEmpty(attributes['mainAdditionalGap']) && data.push({
        'type': 'plain',
        'id': 'mainAdditionalGap',
        'responsive': true,
        'selector': `.${elementId} .gvnews_posts .gvnews_pl_md_box`,
        'properties': [
            {
                'name': 'margin-bottom',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            },
        ],
    });


    isNotEmpty(attributes['rowItemGap']) && data.push({
        'type': 'plain',
        'id': 'rowItemGap',
        'responsive': true,
        'selector': `.${elementId} .gvnews_postblock .gvnews_posts , .${elementId} .gvnews_postblock .gvnews_postsmall`,
        'properties': [
            {
                'name': 'row-gap',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            },
        ],
    });

    isNotEmpty(attributes['columnItemGap']) && data.push({
        'type': 'plain',
        'id': 'columnItemGap',
        'responsive': true,
        'selector': `.${elementId} .gvnews_postblock .gvnews_posts , .${elementId} .gvnews_postblock .gvnews_postsmall`,
        'properties': [
            {
                'name': 'column-gap',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            },
        ],
    });
    isNotEmpty(attributes['listIconSize']) && data.push({
        'type': 'plain',
        'id': 'listIconSize',
        'selector': [
            `.${elementId} .gvnews_postblock_24 .gvnews_pl_xs_4 .gvnews_postblock_content > .gutenverse-icon-svg:first-child svg`,
            `.${elementId} .gvnews_postblock_24 .gvnews_pl_xs_4 .gvnews_postblock_content > i:first-child`,
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
            .${elementId} .gvnews_postblock_24 .gvnews_pl_xs_4 .gvnews_postblock_content
        `,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'pattern',
                'pattern': '0 0 0 {value}px',
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
            `.${elementId} .gvnews_postblock_24 .gvnews_pl_xs_4 .gvnews_postblock_content > .gutenverse-icon-svg:first-child svg`,
            `.${elementId} .gvnews_postblock_24 .gvnews_pl_xs_4 .gvnews_postblock_content > i:first-child`,
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