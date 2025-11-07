import { isNotEmpty } from 'gutenverse-core/helper';

const getBlockStyle = (
    elementId,
    attributes,
    mainThumbnailClass = null,
    secondThumbnailClass = null
) => {
    let data = [];

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
     * Panel Design
     */
    isNotEmpty(attributes['typography']) && data.push({
        'type': 'typography',
        'id': 'typography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_title a`,
    });

    isNotEmpty(attributes['typographyMeta']) && data.push({
        'type': 'typography',
        'id': 'typographyMeta',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_meta>div`,
    });

    isNotEmpty(attributes['typographyContent']) && data.push({
        'type': 'typography',
        'id': 'typographyContent',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_excerpt p`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_excerpt .gvnews_readmore`
        ],
    });

    isNotEmpty(attributes['titleColor']) && data.push({
        'type': 'color',
        'id': 'titleColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_title a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['aHover']) && data.push({
        'type': 'color',
        'id': 'aHover',
        'selector': [
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_meta_author a`,
            `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_title a:hover`
        ],
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['metaColor']) && data.push({
        'type': 'color',
        'id': 'metaColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_meta`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['excerptColor']) && data.push({
        'type': 'color',
        'id': 'excerptColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_post_excerpt`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });


    /**
     * Panel Background
     */
    isNotEmpty(attributes['background']) && data.push({
        'type': 'background',
        'id': 'background',
        'selector': `.${elementId} .gvnews_postblock`,
    });

    isNotEmpty(attributes['backgroundHover']) && data.push({
        'type': 'background',
        'id': 'backgroundHover',
        'selector': `.${elementId} .gvnews_postblock:hover`,
    });

    /**
     * Panel Border
     */
    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `.${elementId} .gvnews_postblock`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.${elementId} .gvnews_postblock`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.${elementId} .gvnews_postblock:hover`,
    });

    isNotEmpty(attributes['borderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderHoverResponsive',
        'selector': `.${elementId} .gvnews_postblock:hover`,
    });

    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'selector': `.${elementId} .gvnews_postblock`,
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
        'selector': `.${elementId} .gvnews_postblock:hover`,
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
        'selector': `.${elementId} .gvnews_postblock`,
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
        'selector': `.${elementId} .gvnews_postblock`,
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
        'selector': `.${elementId} .gvnews_postblock`,
    });

    /**
    * Panel Category Style
    */

    isNotEmpty(attributes['categoryButtonTypography']) && data.push({
        'type': 'typography',
        'id': 'categoryButtonTypography',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category span a`,
    });

    isNotEmpty(attributes['categoryButtonBackground']) && data.push({
        'type': 'color',
        'id': 'categoryButtonBackground',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category span a`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['categoryButtonBackgroundHover']) && data.push({
        'type': 'color',
        'id': 'categoryButtonBackgroundHover',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category span a:hover`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['categoryButtonColor']) && data.push({
        'type': 'color',
        'id': 'categoryButtonColor',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category span a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['categoryButtonColorHover']) && data.push({
        'type': 'color',
        'id': 'categoryButtonColorHover',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category span a:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['categoryButtonBorder']) && data.push({
        'type': 'border',
        'id': 'categoryButtonBorder',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category span a`,
    });

    isNotEmpty(attributes['categoryButtonBorderHover']) && data.push({
        'type': 'border',
        'id': 'categoryButtonBorderHover',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category span a:hover`,
    });

    isNotEmpty(attributes['categoryButtonBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'categoryButtonBoxShadow',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category span a`,
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['categoryButtonBoxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'categoryButtonBoxShadowHover',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_category span a:hover`,
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
    });

    /**
    * Panel Read More Style
    */

    isNotEmpty(attributes['readmoreButtonTypography']) && data.push({
        'type': 'typography',
        'id': 'readmoreButtonTypography',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore`,
    });

    isNotEmpty(attributes['readmoreButtonBackground']) && data.push({
        'type': 'color',
        'id': 'readmoreButtonBackground',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['readmoreButtonBackgroundHover']) && data.push({
        'type': 'color',
        'id': 'readmoreButtonBackgroundHover',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore:hover`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['readmoreButtonColor']) && data.push({
        'type': 'color',
        'id': 'readmoreButtonColor',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['readmoreButtonColorHover']) && data.push({
        'type': 'color',
        'id': 'readmoreButtonColorHover',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['readmoreButtonBorder']) && data.push({
        'type': 'border',
        'id': 'readmoreButtonBorder',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore`,
    });

    isNotEmpty(attributes['readmoreButtonBorderHover']) && data.push({
        'type': 'border',
        'id': 'readmoreButtonBorderHover',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore:hover`,
    });

    isNotEmpty(attributes['readmoreButtonBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'readmoreButtonBoxShadow',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore`,
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['readmoreButtonBoxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'readmoreButtonBoxShadowHover',
        'selector': `.editor-styles-wrapper .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_post_excerpt .gvnews_readmore:hover`,
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
    });

    // pagination styling
    isNotEmpty(attributes['paginationWrapperMargin']) && data.push({
        'type': 'dimension',
        'id': 'paginationWrapperMargin',
        'selector': `.${elementId} .gvnews_block_navigation, .${elementId} .gvnews_block_navigation .gvnews_block_nav, .${elementId} .gvnews_block_navigation .gvnews_loadmore`,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        responsive:true,
    });
    isNotEmpty(attributes['paginationWrapperAlign']) && data.push(
        {
            'type': 'plain',
            'id': 'paginationWrapperAlign',
            'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav, .${elementId} .gvnews_block_navigation .gvnews_block_loadmore`,
            'properties': [
                {
                    'name': 'justify-content',
                    'valueType': 'direct'
                }
            ],
            'responsive': true,
        },
        {
            'type': 'plain',
            'id': 'paginationWrapperAlign',
            'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav:before, .${elementId} .gvnews_block_navigation .gvnews_block_loadmore:before`,
            'properties': [
                {
                    'name': 'display',
                    'valueType': 'function',
                    'functionName': 'modulePaginationAlign',
                    'functionProps': {
                        'selectTarget' : 'before',
                    }
                }
            ],
            'responsive': true,
        },
        {
            'type': 'plain',
            'id': 'paginationWrapperAlign',
            'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav:after, .${elementId} .gvnews_block_navigation .gvnews_block_loadmore:after`,
            'properties': [
                {
                    'name': 'display',
                    'valueType': 'function',
                    'functionName': 'modulePaginationAlign',
                    'functionProps': {
                        'selectTarget' : 'after',
                    }
                }
            ],
            'responsive': true,
        },
    );
    isNotEmpty(attributes['paginationDisableSeparator']) && attributes['paginationDisableSeparator'] && data.push({
        'type': 'plain',
        'id': 'paginationDisableSeparator',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav:before, .${elementId} .gvnews_block_navigation .gvnews_block_nav:after, .${elementId} .gvnews_block_navigation .gvnews_block_loadmore:before, .${elementId} .gvnews_block_navigation .gvnews_block_loadmore:after`,
        'properties': [
            {
                'name': 'display',
                'valueType': 'static',
                'staticValue': 'none !important',
            }
        ],
    });
    isNotEmpty(attributes['paginationBtnTypography']) && data.push({
        'type': 'typography',
        'id': 'paginationBtnTypography',
        'selector': `.${elementId}.gvnews-block.gvnews-block-wrapper .gvnews_block_navigation a`,
    });
    isNotEmpty(attributes['paginationBtnIconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'paginationBtnIconSize',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav i`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'direct',
            }
        ],
    });
    isNotEmpty(attributes['paginationBtnWidth']) && data.push({
        'type': 'unitPoint',
        'id': 'paginationBtnWidth',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a, .${elementId} .gvnews_block_navigation .gvnews_block_nav a, .${elementId} .gvnews_block_navigation .gvnews_block_nav.showtext a`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct',
            }
        ],
        'responsive': true,
    });
    isNotEmpty(attributes['paginationBtnHeight']) && data.push({
        'type': 'unitPoint',
        'id': 'paginationBtnHeight',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a, .${elementId} .gvnews_block_navigation .gvnews_block_nav a`,
        'properties': [
            {
                'name': 'height',
                'valueType': 'direct',
            }
        ],
        'responsive': true,
    });
    isNotEmpty(attributes['paginationBtnColor']) && data.push({
        'type': 'color',
        'id': 'paginationBtnColor',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a, .${elementId} .gvnews_block_navigation .gvnews_block_nav a:not(.disabled)`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
    });
    isNotEmpty(attributes['paginationBtnHoverColor']) && data.push({
        'type': 'color',
        'id': 'paginationBtnHoverColor',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a:hover, .${elementId} .gvnews_block_navigation .gvnews_block_nav a:not(.disabled):hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
    });
    isNotEmpty(attributes['paginationBtnDisableColor']) && data.push({
        'type': 'color',
        'id': 'paginationBtnDisableColor',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav a.disabled`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
    });
    isNotEmpty(attributes['paginationBtnBackground']) && data.push({
        'type': 'background',
        'id': 'paginationBtnBackground',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a, .${elementId} .gvnews_block_navigation .gvnews_block_nav a:not(.disabled)`,
    });
    isNotEmpty(attributes['paginationBtnHoverBackground']) && data.push({
        'type': 'background',
        'id': 'paginationBtnHoverBackground',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a:hover, .${elementId} .gvnews_block_navigation .gvnews_block_nav a:not(.disabled):hover`,
    });
    isNotEmpty(attributes['paginationBtnDisableBackground']) && data.push({
        'type': 'background',
        'id': 'paginationBtnDisableBackground',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav a.disabled`,
    });
    isNotEmpty(attributes['paginationBtnBorder']) && data.push({
        'type': 'border',
        'id': 'paginationBtnBorder',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a, .${elementId} .gvnews_pagination_nextprev .gvnews_block_navigation .gvnews_block_nav a`,
    });
    isNotEmpty(attributes['paginationBtnBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'paginationBtnBorderResponsive',
        'responsive': true,
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a, .${elementId} .gvnews_pagination_nextprev .gvnews_block_navigation .gvnews_block_nav a`,
    });
    isNotEmpty(attributes['paginationBtnHoverBorder']) && data.push({
        'type': 'border',
        'id': 'paginationBtnHoverBorder',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a:hover, .${elementId} .gvnews_pagination_nextprev .gvnews_block_navigation .gvnews_block_nav a:hover`,
    });
    isNotEmpty(attributes['paginationBtnHoverBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'paginationBtnHoverBorderResponsive',
        'responsive': true,
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a:hover, .${elementId} .gvnews_pagination_nextprev .gvnews_block_navigation .gvnews_block_nav a:hover`,
    });
    isNotEmpty(attributes['paginationBtnDisableBorder']) && data.push({
        'type': 'border',
        'id': 'paginationBtnDisableBorder',
        'selector': `.${elementId} .gvnews_pagination_nextprev .gvnews_block_navigation .gvnews_block_nav a.disabled`,
    });
    isNotEmpty(attributes['paginationBtnDisableBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'paginationBtnDisableBorderResponsive',
        'responsive': true,
        'selector': `.${elementId} .gvnews_pagination_nextprev .gvnews_block_navigation .gvnews_block_nav a.disabled`,
    });
    isNotEmpty(attributes['paginationBtnBoxShadow']) && data.push({
        'type': 'boxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'id': 'paginationBtnBoxShadow',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a, .${elementId} .gvnews_block_navigation .gvnews_block_nav a:not(.disabled)`,
    });
    isNotEmpty(attributes['paginationBtnHoverBoxShadow']) && data.push({
        'type': 'boxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'id': 'paginationBtnHoverBoxShadow',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_loadmore a:hover, .${elementId} .gvnews_block_navigation .gvnews_block_nav a:not(.disabled):hover`,
    });
    isNotEmpty(attributes['paginationBtnDisableBoxShadow']) && data.push({
        'type': 'boxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'id': 'paginationBtnDisableBoxShadow',
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav a.disabled`,
    });
    isNotEmpty(attributes['paginationSeparatorStyle']) && data.push({
        'type': 'plain',
        'id': 'paginationSeparatorStyle',
        'properties': [
            {
                'name': 'border-bottom-style',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav:before, .${elementId} .gvnews_block_navigation .gvnews_block_nav:after, .${elementId} .gvnews_block_navigation .gvnews_block_loadmore:before, .${elementId} .gvnews_block_navigation .gvnews_block_loadmore:after`,
    });
    isNotEmpty(attributes['paginationSeparatorColor']) && data.push({
        'type': 'color',
        'id': 'paginationSeparatorColor',
        'properties': [
            {
                'name': 'border-bottom-color',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav:before, .${elementId} .gvnews_block_navigation .gvnews_block_nav:after, .${elementId} .gvnews_block_navigation .gvnews_block_loadmore:before, .${elementId} .gvnews_block_navigation .gvnews_block_loadmore:after`,
    });
    isNotEmpty(attributes['paginationSeparatorWidth']) && data.push({
        'type': 'unitPoint',
        'id': 'paginationSeparatorWidth',
        'properties': [
            {
                'name': 'border-bottom-width',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav:before, .${elementId} .gvnews_block_navigation .gvnews_block_nav:after, .${elementId} .gvnews_block_navigation .gvnews_block_loadmore:before, .${elementId} .gvnews_block_navigation .gvnews_block_loadmore:after`,
    });
    isNotEmpty(attributes['paginationBtnGap']) && data.push({
        'type': 'unitPoint',
        'id': 'paginationBtnGap',
        'properties': [
            {
                'name': 'gap',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav, .${elementId} .gvnews_block_navigation .gvnews_block_loadmore`,
    });
    isNotEmpty(attributes['paginationBtnDisableOpacity']) && data.push({
        'type': 'plain',
        'id': 'paginationBtnDisableOpacity',
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav a.disabled`,
    });

    isNotEmpty(attributes['paginationBtnIconSpacing']) && attributes['paginationMode'] === 'nextprev' && attributes['showNavText'] && data.push(
        {
            'type': 'unitPoint',
            'id': 'paginationBtnIconSpacing',
            'properties': [
                {
                    'name': 'margin-left',
                    'valueType': 'direct'
                }
            ],
            'responsive': true,
            'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav.showtext .next i`,
        },
        {
            'type': 'unitPoint',
            'id': 'paginationBtnIconSpacing',
            'properties': [
                {
                    'name': 'margin-right',
                    'valueType': 'direct'
                }
            ],
            'responsive': true,
            'selector': `.${elementId} .gvnews_block_navigation .gvnews_block_nav.showtext .prev i`,
        },
    );

    // Panel Thumbnail
    if (isNotEmpty(mainThumbnailClass)) {
        isNotEmpty(attributes['borderMainThumbnail']) && data.push({
            'id': 'borderMainThumbnail',
            'type': 'border',
            'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .thumbnail-container`,
        });
        isNotEmpty(attributes['borderResponsiveMainThumbnail']) && data.push({
            'id': 'borderResponsiveMainThumbnail',
            'type': 'borderResponsive',
            'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .thumbnail-container`,
        });
    }

    if (isNotEmpty(secondThumbnailClass)) {
        isNotEmpty(attributes['borderSecondThumbnail']) && data.push({
            'id': 'borderSecondThumbnail',
            'type': 'border',
            'selector': `.${elementId} .gvnews_postblock .${secondThumbnailClass} .thumbnail-container`,
        });
        isNotEmpty(attributes['borderResponsiveSecondThumbnail']) && data.push({
            'id': 'borderResponsiveSecondThumbnail',
            'type': 'borderResponsive',
            'selector': `.${elementId} .gvnews_postblock .${secondThumbnailClass} .thumbnail-container`,
        });
    }

    return data;
};


export default getBlockStyle;