import { isNotEmpty } from 'gutenverse-core/helper';

const getBlockStyle = (elementId, attributes) => {
    let data = [];

    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `.${elementId} .gvnews_breakingnews`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.${elementId} .gvnews_breakingnews:hover`,
    });

    isNotEmpty(attributes['borderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderHoverResponsive',
        'selector': `.${elementId} .gvnews_breakingnews:hover`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.${elementId} .gvnews_breakingnews`,
    });

    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'selector': `.${elementId} .gvnews_breakingnews`,
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
        'selector': `.${elementId} .gvnews_breakingnews:hover`,
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['contentBackground']) && data.push({
        'type': 'color',
        'id': 'contentBackground',
        'selector': `.${elementId} .gvnews_news_ticker`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['contentBorder']) && data.push({
        'type': 'border',
        'id': 'contentBorder',
        'selector': `.${elementId} .gvnews_news_ticker`,
    });

    isNotEmpty(attributes['contentBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'contentBorderResponsive',
        'selector': `.${elementId} .gvnews_news_ticker`,
    });

    isNotEmpty(attributes['contentHeight']) && data.push({
        'type': 'plain',
        'id': 'contentHeight',
        'responsive': true,
        'selector': `.${elementId} .gvnews_news_ticker, .${elementId} .gvnews_breakingnews .gvnews_breakingnews_title ,.${elementId} .gvnews_news_ticker_control`,
        'properties': [
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            }
        ],
    });

    isNotEmpty(attributes['contentPadding']) && data.push({
        'type': 'dimension',
        'id': 'contentPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_news_ticker`,
    });

    isNotEmpty(attributes['iconTextColor']) && data.push({
        'type': 'color',
        'id': 'iconTextColor',
        'selector': `.${elementId} .gvnews_breakingnews_title i, .${elementId} .gvnews_breakingnews_title svg`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['iconTextSize']) && data.push({
        'type': 'plain',
        'id': 'iconTextSize',
        'responsive': true,
        'selector': `.${elementId} .gvnews_breakingnews_title i, .${elementId} .gvnews_breakingnews_title svg`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            }
        ],
    });

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
        'selector': `.${elementId} .gvnews_breakingnews`,
    });

    isNotEmpty(attributes['metaColor']) && data.push({
        'type': 'color',
        'id': 'metaColor',
        'selector': `.${elementId} .gvnews_news_ticker_item .post-date`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['metaTypography']) && data.push({
        'type': 'typography',
        'id': 'metaTypography',
        'selector': `.${elementId} .gvnews_news_ticker_item .post-date`,
    });

    isNotEmpty(attributes['navBackgroundColor']) && data.push({
        'type': 'color',
        'id': 'navBackgroundColor',
        'selector': `.${elementId} .gvnews_news_ticker_control  .gvnews_news_ticker_arrow`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['navButtonBorder']) && data.push({
        'type': 'border',
        'id': 'navButtonBorder',
        'selector': `.${elementId} .gvnews_news_ticker_control .gvnews_news_ticker_arrow`,
    });

    isNotEmpty(attributes['navButtonBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'navButtonBorderResponsive',
        'selector': `.${elementId} .gvnews_news_ticker_control .gvnews_news_ticker_arrow`,
    });

    isNotEmpty(attributes['navButtonBorderHover']) && data.push({
        'type': 'border',
        'id': 'navButtonBorderHover',
        'selector': `.${elementId} .gvnews_news_ticker_control .gvnews_news_ticker_arrow:hover`,
    });

    isNotEmpty(attributes['navButtonBorderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'navButtonBorderHoverResponsive',
        'selector': `.${elementId} .gvnews_news_ticker_control .gvnews_news_ticker_arrow:hover`,
    });

    isNotEmpty(attributes['navButtonHeight']) && data.push({
        'type': 'plain',
        'id': 'navButtonHeight',
        'responsive': true,
        'selector': `.${elementId} .gvnews_news_ticker_control .gvnews_news_ticker_arrow ,.${elementId} .gvnews_news_ticker_control .nav-separator`,
        'properties': [
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            }
        ],
    });

    isNotEmpty(attributes['navButtonWidth']) && data.push({
        'type': 'plain',
        'id': 'navButtonWidth',
        'responsive': true,
        'selector': `.${elementId} .gvnews_news_ticker_control .gvnews_news_ticker_arrow`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            }
        ],
    });

    isNotEmpty(attributes['navColor']) && data.push({
        'type': 'color',
        'id': 'navColor',
        'selector': `.${elementId} .gvnews_news_ticker_control i, .${elementId} .gvnews_news_ticker_control svg`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['navHoverBackgroundColor']) && data.push({
        'type': 'color',
        'id': 'navHoverBackgroundColor',
        'selector': `.${elementId} .gvnews_news_ticker_control  .gvnews_news_ticker_arrow:hover`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['navHoverColor']) && data.push({
        'type': 'color',
        'id': 'navHoverColor',
        'selector': `.${elementId} .gvnews_news_ticker_control  .gvnews_news_ticker_arrow:hover i, .${elementId} .gvnews_news_ticker_control  .gvnews_news_ticker_arrow:hover svg`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['navIconSize']) && data.push({
        'type': 'plain',
        'id': 'navIconSize',
        'responsive': true,
        'selector': `.${elementId} .gvnews_news_ticker_control i, .${elementId} .gvnews_news_ticker_control svg`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            }
        ],
    });

    isNotEmpty(attributes['navSeparatorColor']) && data.push({
        'type': 'color',
        'id': 'navSeparatorColor',
        'selector': `.${elementId} .gvnews_news_ticker_control .nav-separator`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['navSeparatorWidth']) && data.push({
        'type': 'plain',
        'id': 'navSeparatorWidth',
        'responsive': true,
        'selector': `.${elementId} .gvnews_news_ticker_control .nav-separator`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            }
        ],
    });

    isNotEmpty(attributes['navWrapperBackgroundColor']) && data.push({
        'type': 'color',
        'id': 'navWrapperBackgroundColor',
        'selector': `.${elementId} .gvnews_news_ticker_control`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['navWrapperBorder']) && data.push({
        'type': 'border',
        'id': 'navWrapperBorder',
        'selector': `.${elementId} .gvnews_news_ticker_control`,
    });

    isNotEmpty(attributes['navWrapperBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'navWrapperBorderResponsive',
        'selector': `.${elementId} .gvnews_news_ticker_control`,
    });

    isNotEmpty(attributes['navWrapperPadding']) && data.push({
        'type': 'dimension',
        'id': 'navWrapperPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_news_ticker_control`,
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
        'selector': `.${elementId} .gvnews_breakingnews`,
    });

    isNotEmpty(attributes['postTitleColor']) && data.push({
        'type': 'color',
        'id': 'postTitleColor',
        'selector': `.${elementId} .gvnews_news_ticker_item a , .${elementId} .gvnews_news_ticker_item`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['postTitleHoverColor']) && data.push({
        'type': 'color',
        'id': 'postTitleHoverColor',
        'selector': `.${elementId} .gvnews_news_ticker_item a:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['postTitleTypography']) && data.push({
        'type': 'typography',
        'id': 'postTitleTypography',
        'selector': `.${elementId} .gvnews_news_ticker_item a`,
    });

    isNotEmpty(attributes['tickerLineHeight']) && data.push({
        'type': 'plain',
        'id': 'tickerLineHeight',
        'responsive': true,
        'selector': `.${elementId} .gvnews_news_ticker .gvnews_news_ticker_item`,
        'properties': [
            {
                'name': 'line-height',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            }
        ],
    });

    isNotEmpty(attributes['titleBackgroundColor']) && data.push({
        'type': 'color',
        'id': 'titleBackgroundColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_breakingnews_title`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['titleBorder']) && data.push({
        'type': 'border',
        'id': 'titleBorder',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_breakingnews_title`,

    });

    isNotEmpty(attributes['titleBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'titleBorderResponsive',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_breakingnews_title`,

    });

    isNotEmpty(attributes['titleTextColor']) && data.push({
        'type': 'color',
        'id': 'titleTextColor',
        'selector': `.${elementId} .gvnews_breakingnews_title span`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['titleTextGap']) && data.push({
        'type': 'plain',
        'id': 'titleTextGap',
        'responsive': true,
        'selector': `.${elementId} .gvnews_breakingnews_title`,
        'properties': [
            {
                'name': 'gap',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            }
        ],
    });

    isNotEmpty(attributes['titleTextPadding']) && data.push({
        'type': 'dimension',
        'id': 'titleTextPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_breakingnews_title`,
    });

    isNotEmpty(attributes['titleTextTypography']) && data.push({
        'type': 'typography',
        'id': 'titleTextTypography',
        'selector': `.${elementId} .gvnews_breakingnews_title span`,
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
        'selector': `.${elementId} .gvnews_breakingnews`,
    });

    return data;
};


export default getBlockStyle;