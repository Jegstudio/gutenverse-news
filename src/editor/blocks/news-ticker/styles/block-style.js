import { isNotEmpty } from 'gutenverse-core/helper';

const getBlockStyle = (elementId, attributes) => {
    let data = [];



    /**
     * Panel Design
     */
    isNotEmpty(attributes['titleTextColor']) && data.push({
        'type': 'color',
        'id': 'titleTextColor',
        'selector': `.${elementId} .gvnews_breakingnews_title`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['titleBackgroundColor']) && data.push({
        'type': 'background',
        'id': 'titleBackgroundColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_breakingnews_title`,
    });

    /**
     * Panel Border
     */
    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `.${elementId} .gvnews_breakingnews`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
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
        'selector': `.${elementId} .gvnews_breakingnews`,
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

    isNotEmpty(attributes['navColor']) && data.push({
        'type': 'color',
        'id': 'navColor',
        'selector': `.${elementId} .gvnews_news_ticker_control i`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
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

    isNotEmpty(attributes['navHoverColor']) && data.push({
        'type': 'color',
        'id': 'navHoverColor',
        'selector': `.${elementId} .gvnews_news_ticker_control  .gvnews_news_ticker_arrow:hover i`,
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

    isNotEmpty(attributes['navIconSize']) && data.push({
        'type': 'plain',
        'id': 'navIconSize',
        'responsive': true,
        'selector': `.${elementId} .gvnews_news_ticker_control i`,
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

    isNotEmpty(attributes['postTitleTypography']) && data.push({
        'type': 'typography',
        'id': 'postTitleTypography',
        'selector': `.${elementId} .gvnews_news_ticker_item a`,
    });

    isNotEmpty(attributes['postTitleColor']) && data.push({
        'type': 'color',
        'id': 'postTitleColor',
        'selector': `.${elementId} .gvnews_news_ticker_item a`,
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

    isNotEmpty(attributes['containerBorderWidth']) && data.push({
        'type': 'plain',
        'id': 'containerBorderWidth',
        'responsive': true,
        'selector': `.${elementId} .gvnews_news_ticker`,
        'properties': [
            {
                'name': 'border-width',
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

    console.log(attributes);

    return data;
};


export default getBlockStyle;