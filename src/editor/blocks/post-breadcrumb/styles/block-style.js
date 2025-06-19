import { backgroundStyle } from 'gutenverse-core/controls';
import { isNotEmpty } from 'gutenverse-core/helper';
import layoutStye from '../../../control-panel/panel-styles/parts/post-layout-style';
import stylingStyle from './panelStyle/stylingStyle';

const getBlockStyle = (elementId, attributes) => {
    let data = [];

    data = layoutStye({attributes, elementId, data, selector: `.${elementId}.gvnews-post-breadcrumb`});
    data = stylingStyle({attributes, elementId, data});
    data = backgroundStyle({
        elementId,
        attributes,
        data,
        backgroundSelector: `.${elementId}.gvnews-post-breadcrumb`,
        backgroundHoverSelector: `.${elementId}.gvnews-post-breadcrumb:hover`,
    });

    /**
     * Panel Border
     */
    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `.${elementId}.gvnews-post-breadcrumb`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.${elementId}.gvnews-post-breadcrumb`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.${elementId}.gvnews-post-breadcrumb:hover`,
    });

    isNotEmpty(attributes['borderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderHoverResponsive',
        'selector': `.${elementId}.gvnews-post-breadcrumb:hover`,
    });

    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'selector': `.${elementId}.gvnews-post-breadcrumb`,
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
        'selector': `.${elementId}.gvnews-post-breadcrumb:hover`,
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