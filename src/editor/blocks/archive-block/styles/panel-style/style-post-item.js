import { isNotEmpty } from 'gutenverse-core/helper';

const withGrid = ['8', '9', '11', '13', '14', '15', '16', '17', '19', '20', '21', '22', '23', '24', '27', '36', '37', '39'];
const withMasonry = ['32', '33', '34', '35'];


export const postItemStyle = (elementId, attributes, data) => {

    const {
        blockType = '3'
    } = attributes;
    const postItemGrid = withGrid.includes(blockType);
    const postItemMasonry = withMasonry.includes(blockType);

    if (postItemGrid) {

        isNotEmpty(attributes['mainItemGap']) && blockType === '14' && data.push({
            'type': 'plain',
            'id': 'mainItemGap',
            'responsive': true,
            'selector': `.${elementId} .gvnews_postbig > .gvnews_post`,
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
        if (isNotEmpty(attributes['rowItemGap'])) {
            data.push({
                'type': 'plain',
                'id': 'rowItemGap',
                'responsive': true,
                'selector': `.${elementId} .gvnews_postblock .gvnews_posts`,
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
            'selector': `.${elementId} .gvnews_postblock .gvnews_posts`,
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
    } else if (postItemMasonry) {

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
    } else {

        console.log('postItemStyle- bawah');
        console.log(attributes);
        console.log('e o postItemStyle- bawah');

        if (isNotEmpty(attributes['rowItemGap'])) {
            data.push({
                'type': 'plain',
                'id': 'rowItemGap',
                'responsive': true,
                'selector': `.${elementId} .gvnews_postblock .gvnews_posts .gvnews_post:not(:last-of-type)`,
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
                    }
                ],
            });
        }

    }

    return data;

};
