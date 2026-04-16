import { isNotEmpty } from 'gutenverse-core/helper';
import getBlockStyle from '../../../control-panel/panel-styles/block-style';

const dedicatedStyle = (elementId, attributes) => {
    let data = getBlockStyle(elementId, attributes, 'gvnews_pl_md_box', 'gvnews_pl_sm');

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

    isNotEmpty(attributes['boxMetaColor']) && data.push({
        type: 'color',
        id: 'boxMetaColor',
        selector: `.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_pl_md_box .gvnews_post_meta, .gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_pl_md_box .gvnews_post_meta .by`,
        properties: [{ name: 'color', valueType: 'direct' }],
    });

    isNotEmpty(attributes['boxMetaColorHover']) && data.push({
        type: 'color',
        id: 'boxMetaColorHover',
        selector: `.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_pl_md_box .gvnews_post_meta>div:not(.gvnews_meta_author) a:hover`,
        properties: [{ name: 'color', valueType: 'direct' }],
    });

    isNotEmpty(attributes['boxMetaIconColor']) && data.push({
        type: 'color',
        id: 'boxMetaIconColor',
        selector: `.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_pl_md_box .gvnews_post_meta .fa, .gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_pl_md_box .gvnews_post_meta .far, .gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_pl_md_box .gvnews_post_meta .fas, .gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_pl_md_box .gvnews_post_meta svg`,
        properties: [{ name: 'color', valueType: 'direct' }],
    });

    isNotEmpty(attributes['boxMetaIconColorHover']) && data.push({
        type: 'color',
        id: 'boxMetaIconColorHover',
        selector: `.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_pl_md_box .gvnews_post_meta>div:hover .fa, .gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_pl_md_box .gvnews_post_meta>div:hover .far, .gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_pl_md_box .gvnews_post_meta>div:hover .fas, .gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_pl_md_box .gvnews_post_meta>div:hover svg`,
        properties: [{ name: 'color', valueType: 'direct' }],
    });

    isNotEmpty(attributes['metaColor']) && data.push({
        type: 'color',
        id: 'metaColor',
        selector: `.${elementId} .gvnews_postblock .gvnews_pl_sm .gvnews_post_meta, .${elementId} .gvnews_postblock .gvnews_pl_sm .gvnews_post_meta .by`,
        properties: [{ name: 'color', valueType: 'direct' }],
    });

    isNotEmpty(attributes['metaColorHover']) && data.push({
        type: 'color',
        id: 'metaColorHover',
        selector: `.${elementId} .gvnews_postblock .gvnews_pl_sm .gvnews_post_meta>div:not(.gvnews_meta_author) a:hover`,
        properties: [{ name: 'color', valueType: 'direct' }],
    });

    isNotEmpty(attributes['metaIconColor']) && data.push({
        type: 'color',
        id: 'metaIconColor',
        selector: `.${elementId} .gvnews_postblock .gvnews_pl_sm .gvnews_post_meta .fa, .${elementId} .gvnews_postblock .gvnews_pl_sm .gvnews_post_meta svg`,
        properties: [{ name: 'color', valueType: 'direct' }],
    });

    isNotEmpty(attributes['metaIconColorHover']) && data.push({
        'type': 'color',
        'id': 'metaIconColorHover',
        'selector': `.${elementId} .gvnews_postblock .gvnews_post_meta>div:hover .fa , .${elementId} .gvnews_postblock .gvnews_post_meta>div:hover .far , .${elementId} .gvnews_postblock .gvnews_post_meta>div:hover .fas, .${elementId} .gvnews_postblock .gvnews_post_meta>div:hover svg`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    return data;
};


export default dedicatedStyle;