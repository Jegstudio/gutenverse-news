import { isNotEmpty } from 'gutenverse-core/helper';
import getBlockStyle from '../../../control-panel/panel-styles/block-style';

const dedicatedStyle = (elementId, attributes) => {
    let data = getBlockStyle(elementId, attributes, 'gvnews_pl_sm');

    isNotEmpty(attributes['mainAdditionalGap']) && data.push({
        'type': 'plain',
        'id': 'mainAdditionalGap',
        'responsive': true,
        'selector': `.${elementId} .gvnews_pl_sm`,
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
    return data;
};


export default dedicatedStyle;