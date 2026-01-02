import { isNotEmpty } from 'gutenverse-core/helper';
import getBlockStyle from '../../../control-panel/panel-styles/block-style';

const dedicatedStyle = (elementId, attributes) => {
    let data = getBlockStyle(elementId, attributes, 'gvnews_pl_md_box');


    isNotEmpty(attributes['rowItemGap']) && data.push({
        'type': 'plain',
        'id': 'rowItemGap',
        'responsive': true,
        'selector': `.${elementId} .gvnews_postblock .gvnews_posts_masonry .gvnews_posts.shuffle .gvnews_post:not(:last-of-type)`,
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

    isNotEmpty(attributes['gutterWidth']) && data.push({
        'type': 'plain',
        'id': 'gutterWidth',
        'selector': `.${elementId} .gvnews_postblock.gvnews_col_3o3 .gvnews_posts_masonry .gvnews_posts.shuffle .gvnews_post`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': 'calc((100% - (2 * {value}px)) /3)',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            },
        ]
    });

    isNotEmpty(attributes['gutterWidth']) && data.push({
        'type': 'plain',
        'id': 'gutterWidth',
        'selector': `.${elementId} .gvnews_postblock.gvnews_col_2o3 .gvnews_posts_masonry .gvnews_posts.shuffle .gvnews_post`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': 'calc((100% - {value}px) /2)',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            },
        ]
    });

    return data;
};


export default dedicatedStyle;