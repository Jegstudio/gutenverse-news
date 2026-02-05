import { isNotEmpty } from 'gutenverse-core/helper';

const withGrid = ['template_2', 'template_8', 'template_9', 'template_11', 'template_13', 'template_14', 'template_15', 'template_16', 'template_17', 'template_19', 'template_20', 'template_21', 'template_22', 'template_23', 'template_24', 'template_27'];


export const postItemStyle = (elementId, attributes, data) => {

    const {
        templateType = 'template_3'
    } = attributes;
    const postItemGrid = withGrid.includes(templateType);

    isNotEmpty(attributes['rowItemGap']) && data.push({
        'type': 'plain',
        'id': 'rowItemGap',
        'responsive': true,
        'selector': `.${elementId} .gvnews_postblock .gvnews_block_navigation`,
        'properties': [
            {
                'name': 'margin-top',
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

    if (templateType === 'template_1') {
        isNotEmpty(attributes['rowItemGap']) && data.push({
            'type': 'plain',
            'id': 'rowItemGap',
            'responsive': true,
            'selector': `.${elementId} .gvnews_postblock_1 .gvnews_block_container`,
            'properties': [
                {
                    'name': 'gap',
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
        isNotEmpty(attributes['columnItemGapSecond']) && data.push({
            'type': 'plain',
            'id': 'columnItemGapSecond',
            'responsive': true,
            'selector': `.${elementId} .gvnews_postblock_1 .gvnews_posts .gvnews_postsmall:first-of-type`,
            'properties': [
                {
                    'name': 'gap',
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
        isNotEmpty(attributes['columnItemGapThird']) && data.push({
            'type': 'plain',
            'id': 'columnItemGapThird',
            'responsive': true,
            'selector': `.${elementId} .gvnews_postblock_1 .gvnews_posts .gvnews_postsmall:nth-of-type(2)`,
            'properties': [
                {
                    'name': 'gap',
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
    } else if (postItemGrid) {

        isNotEmpty(attributes['mainItemGap']) && (templateType === 'template_14' || templateType === 'template_2') && data.push({
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
    } else {
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
