import { isNotEmpty } from 'gutenverse-core/helper';
import getCarouselStyle from '../../../control-panel/panel-styles/carousel-style';

const getBlockStyle = (elementId, attributes) => {
    let data = getCarouselStyle(elementId, attributes);
    data = navigationStyle(elementId, attributes, data);

    return data;
};

const navigationStyle = (elementId, attributes, data) => {
    const controlsSelector = `.${elementId} .tns-outer .tns-controls`;
    const separatorSelector = '.gvnews_postblock_carousel_1.with-nav-separator .tns-outer .tns-controls:before, .gvnews_postblock_carousel_1.with-nav-separator .tns-outer .tns-controls:after';

    isNotEmpty(attributes['navigationWrapperMargin']) && data.push({
        'type': 'dimension',
        'id': 'navigationWrapperMargin',
        'responsive': true,
        'properties': [
            {
                name: 'margin',
                valueType: 'direct'
            }
        ],
        'selector': controlsSelector,
    });

    isNotEmpty(attributes['navigationWrapperAlign']) && data.push(
        {
            'type': 'plain',
            'id': 'navigationWrapperAlign',
            'responsive': true,
            'properties': [
                {
                    name: 'justify-content',
                    valueType: 'direct'
                }
            ],
            'selector': controlsSelector,
        },
        {
            'type': 'plain',
            'id': 'navigationWrapperAlign',
            'selector': `${controlsSelector}:before`,
            'properties': [
                {
                    'name': 'display',
                    'valueType': 'function',
                    'functionName': 'modulePaginationAlign',
                    'functionProps': {
                        'selectTarget': 'before',
                    }
                }
            ],
            'responsive': true,
        },
        {
            'type': 'plain',
            'id': 'navigationWrapperAlign',
            'selector': `${controlsSelector}:after`,
            'properties': [
                {
                    'name': 'display',
                    'valueType': 'function',
                    'functionName': 'modulePaginationAlign',
                    'functionProps': {
                        'selectTarget': 'after',
                    }
                }
            ],
            'responsive': true,
        }
    );

    isNotEmpty(attributes['navigationBtnGap']) && data.push({
        'type': 'unitPoint',
        'id': 'navigationBtnGap',
        'properties': [
            {
                name: 'gap',
                valueType: 'direct'
            }
        ],
        'responsive': true,
        'selector': controlsSelector,
    });

    isNotEmpty(attributes['navigationSeparatorStyle']) && data.push({
        'type': 'plain',
        'id': 'navigationSeparatorStyle',
        'properties': [
            {
                'name': 'border-bottom-style',
                'valueType': 'direct'
            }
        ],
        'selector': separatorSelector,
    });

    isNotEmpty(attributes['navigationSeparatorColor']) && data.push({
        'type': 'color',
        'id': 'navigationSeparatorColor',
        'properties': [
            {
                'name': 'border-bottom-color',
                'valueType': 'direct'
            }
        ],
        'selector': separatorSelector,
    });

    isNotEmpty(attributes['navigationSeparatorWidth']) && data.push({
        'type': 'unitPoint',
        'id': 'navigationSeparatorWidth',
        'properties': [
            {
                'name': 'border-bottom-width',
                'valueType': 'direct'
            }
        ],
        'selector': separatorSelector,
    });

    isNotEmpty(attributes['navigationBtnIconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'navigationBtnIconSize',
        'selector': `${controlsSelector} button .gutenverse-icon-svg svg`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
    });

    isNotEmpty(attributes['navigationBtnWidth']) && data.push({
        'type': 'unitPoint',
        'id': 'navigationBtnWidth',
        'selector': `${controlsSelector} button`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
    });

    isNotEmpty(attributes['navigationBtnHeight']) && data.push({
        'type': 'unitPoint',
        'id': 'navigationBtnHeight',
        'selector': `${controlsSelector} button`,
        'properties': [
            {
                'name': 'height',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
    });

    isNotEmpty(attributes['navigationBtnColor']) && data.push({
        'type': 'color',
        'id': 'navigationBtnColor',
        'selector': `${controlsSelector} button`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['navigationBtnBgColor']) && data.push({
        'type': 'color',
        'id': 'navigationBtnBgColor',
        'selector': `${controlsSelector} button`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['navigationBtnBorderResponsive']) && data.push({
        'id': 'navigationBtnBorderResponsive',
        'type': 'borderResponsive',
        'responsive': true,
        'selector': `${controlsSelector} button`,
    });

    isNotEmpty(attributes['navigationBtnBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'navigationBtnBoxShadow',
        'selector': `${controlsSelector} button`,
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['navigationBtnColorHover']) && data.push({
        'type': 'color',
        'id': 'navigationBtnColorHover',
        'selector': `${controlsSelector} button:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['navigationBtnBgColorHover']) && data.push({
        'type': 'color',
        'id': 'navigationBtnBgColorHover',
        'selector': `${controlsSelector} button:hover`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['navigationBtnBorderResponsiveHover']) && data.push({
        'id': 'navigationBtnBorderResponsiveHover',
        'type': 'borderResponsive',
        'responsive': true,
        'selector': `${controlsSelector} button:hover`,
    });

    isNotEmpty(attributes['navigationBtnBoxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'navigationBtnBoxShadowHover',
        'selector': `${controlsSelector} button:hover`,
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
    });

    return data;
};

export default getBlockStyle;