import { isNotEmpty } from 'gutenverse-core/helper';
import getBlockStyle from '../../../control-panel/panel-styles/block-style';

const dedicatedStyle = (elementId, attributes) => {
    let data = getBlockStyle(elementId, attributes, 'gvnews_pl_lg_1', 'gvnews_pl_md_1');

    if (isNotEmpty(attributes['rowItemGap'])) {
        data.push({
            'type': 'plain',
            'id': 'rowItemGap',
            'responsive': true,
            'selector': `.${elementId} .gvnews-posts-row .gvnews_postsmall , .${elementId} .gvnews-posts-row, .${elementId} .gvnews_posts_wrap .gvnews_posts , .${elementId} .gvnews_block_container`,
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

    }
    isNotEmpty(attributes['columnItemGap']) && data.push({
        'type': 'plain',
        'id': 'columnItemGap',
        'responsive': true,
        'selector': `.${elementId} .gvnews_postblock_13 .gvnews-posts-row , .${elementId} .gvnews_postblock_13 .gvnews_posts_wrap .gvnews_posts`,
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
            }
        ],
    });
    return data;
};


export default dedicatedStyle;