import { backgroundStyle } from 'gutenverse-core/controls';
import { isNotEmpty } from 'gutenverse-core/helper';
import layoutStye from './panelStyles/layoutStyle';
import replyStyle from './panelStyles/style-reply';
import avatarStyle from './panelStyles/style-avatar';
import buttonStyle from './panelStyles/style-button';
import inputStyle from './panelStyles/style-input';
import mainCommentStyle from './panelStyles/style-main-comment';
import typographyHeadingStyle from './panelStyles/style-typography-heading';
import typographyLabelStyle from './panelStyles/style-typography-label';
import typographyLlinkStyle from './panelStyles/style-typography-link';
import typographyTextStyle from './panelStyles/style-typography-text';
import separatorStyle from './panelStyles/style-separator';

const getBlockStyle = (elementId, attributes) => {
    let data = [];
    //panel avatar
    data = avatarStyle(elementId, attributes, data);
    //panel button
    data = buttonStyle(elementId, attributes, data);
    //panel input
    data = inputStyle(elementId, attributes, data);
    //panel main comment
    data = mainCommentStyle(elementId, attributes, data);
    //panel reply
    data = replyStyle(elementId, attributes, data);
    //panel typography heading
    data = typographyHeadingStyle(elementId, attributes, data);
    //panel typography label
    data = typographyLabelStyle(elementId, attributes, data);
    //panel typography link
    data = typographyLlinkStyle(elementId, attributes, data);
    //panel typography text
    data = typographyTextStyle(elementId, attributes, data);
    //panel layout
    data = layoutStye({attributes, data, selector: `.guten-element.${elementId}.gvnews-post-comment`});
    //panel separator
    data = separatorStyle(elementId, attributes, data);
    //panel background
    data = backgroundStyle({
        elementId,
        attributes,
        data,
        backgroundSelector: `.guten-element.${elementId}.gvnews-post-comment`,
        backgroundHoverSelector: `.guten-element.${elementId}.gvnews-post-comment:hover`,
    });

    /**
     * Panel General
     */
    isNotEmpty(attributes['commentTypography']) && data.push({
        'type': 'typography',
        'id': 'commentTypography',
        'selector': `.${elementId}.gvnews-post-comment`,
    });

    /**
     * Panel Border
     */
    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `.guten-element.${elementId}.gvnews-post-comment`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.guten-element.${elementId}.gvnews-post-comment`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.guten-element.${elementId}.gvnews-post-comment:hover`,
    });

    isNotEmpty(attributes['borderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderHoverResponsive',
        'selector': `.guten-element.${elementId}.gvnews-post-comment:hover`,
    });

    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'selector': `.guten-element.${elementId}.gvnews-post-comment`,
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
        'selector': `.guten-element.${elementId}.gvnews-post-comment:hover`,
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
        'selector': `.guten-element.${elementId}.gvnews-post-comment`,
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
        'selector': `.guten-element.${elementId}.gvnews-post-comment`,
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
        'selector': `.guten-element.${elementId}.gvnews-post-comment`,
    });

    return data;
};

export default getBlockStyle;