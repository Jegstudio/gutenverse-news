import { isNotEmpty } from 'gutenverse-core/helper';
import { positioningStyle } from '../../../control-panel/panel-styles/positioning-style';

const getBlockStyle = (elementId, attributes) => {
    let data = [];
    data = positioningStyle(elementId, attributes, data, `.gvnews-block.gvnews-block-wrapper.${elementId}`);

    /**
     * Panel General
     */
    isNotEmpty(attributes['nameColor']) && data.push({
        'type': 'color',
        'id': 'nameColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist-name`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['descColor']) && data.push({
        'type': 'color',
        'id': 'descColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.${attributes['listStyle']} .gvnews_userlist-desc`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['borderColor']) && data.push({
        'type': 'color',
        'id': 'borderColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.${attributes['listStyle']} .gvnews_userlist-wrap`,
        'properties': [
            {
                'name': 'border-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['accentColor']) && data.push({
        'type': 'color',
        'id': 'accentColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist-name:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['blockColor']) && data.push({
        'type': 'background',
        'id': 'blockColor',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-1 .gvnews_userlist-wrap`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-2 .gvnews_userlist-wrap`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-5 .gvnews_userlist-wrap`,
        ],
    });

    isNotEmpty(attributes['subBtnBg']) && data.push({
        'type': 'color',
        'id': 'subBtnBg',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-2 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a `,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-3 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a `,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-5 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a `,
        ],
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['subBtnCl']) && data.push({
        'type': 'color',
        'id': 'subBtnCl',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-2 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a `,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-3 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a `,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-5 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a `
        ],
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['subBtnBd']) && data.push({
        'type': 'color',
        'id': 'subBtnBd',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-2 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a `,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-3 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a `,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-5 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a `
        ],
        'properties': [
            {
                'name': 'border-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['subBtnBgHv']) && data.push({
        'type': 'color',
        'id': 'subBtnBgHv',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-2 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a:hover`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-3 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a:hover`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-5 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a:hover`
        ],
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['subBtnClHv']) && data.push({
        'type': 'color',
        'id': 'subBtnBgHv',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-2 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a:hover`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-3 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a:hover`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-5 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a:hover`
        ],
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['subBtnBdHv']) && data.push({
        'type': 'color',
        'id': 'subBtnBdHv',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-2 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a:hover`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-3 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a:hover`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist.style-5 .gvnews_userlist-content .gvnews_meta_subscribe .follow-wrapper a:hover`
        ],
        'properties': [
            {
                'name': 'border-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['metaColor']) && data.push({
        'type': 'color',
        'id': 'metaColor',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_subscribe_count`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .follow-wrapper a`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_userlist-socials a i`
        ],
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    /**
     * Panel Header
     */
    isNotEmpty(attributes['headerBackgroundColor']) && data.push({
        'type': 'color',
        'id': 'headerBackgroundColor',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_1 .gvnews_block_title span`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_2 .gvnews_block_title span`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_4 .gvnews_block_title span`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_5 .gvnews_block_title span`
        ],
        'properties': [
            {
                'name': 'background',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['headerBackgroundColor2']) && data.push({
        'type': 'color',
        'id': 'headerBackgroundColor2',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_3`,
        'properties': [
            {
                'name': 'background',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['headerTextColor']) && data.push({
        'type': 'color',
        'id': 'headerTextColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_title span`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['headerSecondColor']) && data.push({
        'type': 'color',
        'id': 'headerSecondColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_2`,
        'properties': [
            {
                'name': 'background',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['headerLineColor']) && data.push({
        'type': 'color',
        'id': 'headerLineColor',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_1`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_6`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_9`
        ],
        'properties': [
            {
                'name': 'border-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['headerLineColor2']) && data.push({
        'type': 'color',
        'id': 'headerLineColor2',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_5:before`,
        'properties': [
            {
                'name': 'border-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['headerAccentColor']) && data.push({
        'type': 'color',
        'id': 'headerAccentColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_6:after`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['headerAccentColor2']) && data.push({
        'type': 'color',
        'id': 'headerAccentColor2',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_block_heading_7 .gvnews_block_title span`,
        'properties': [
            {
                'name': 'border-color',
                'valueType': 'direct'
            }
        ],
    });

    /**
     * Panel Border
     */
    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `.${elementId} .gvnews_userlist`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.${elementId} .gvnews_userlist`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.${elementId} .gvnews_userlist:hover`,
    });

    isNotEmpty(attributes['borderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderHoverResponsive',
        'selector': `.${elementId} .gvnews_userlist:hover`,
    });

    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'selector': `.${elementId} .gvnews_userlist`,
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['boxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadowHover',
        'selector': `.${elementId} .gvnews_userlist:hover`,
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
    });

    /**
     * Panel Spacing
     */
    isNotEmpty(attributes['margin']) && data.push({
        'type': 'dimension',
        'id': 'margin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_userlist`,
    });

    isNotEmpty(attributes['padding']) && data.push({
        'type': 'dimension',
        'id': 'padding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_userlist`,
    });

    isNotEmpty(attributes['zIndex']) && data.push({
        'type': 'plain',
        'id': 'zIndex',
        'responsive': true,
        'properties': [
            {
                'name': 'z-index',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_userlist`,
    });

    if (isNotEmpty(attributes['rowItemGap'])) {
        data.push({
            'type': 'plain',
            'id': 'rowItemGap',
            'responsive': true,
            'selector': `.${elementId} .gvnews_userlist ul`,
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
        'selector': `.${elementId} .gvnews_userlist ul`,
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

export default getBlockStyle;