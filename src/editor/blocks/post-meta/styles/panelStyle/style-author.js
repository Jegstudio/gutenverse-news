import { isNotEmpty } from 'gutenverse-core/helper';

const authorStyle = (props) => {

    const {
        attributes,
        data,
        elementId
    } = props;

    isNotEmpty(attributes['authorTypography']) && data.push({
        'type': 'typography',
        'id': 'authorTypography',
        'selector': `.${elementId}.gvnews-post-meta > div .meta-items.gvnews-meta-author a`,
    });

    isNotEmpty(attributes['authorColor']) && data.push({
        'id': 'authorColor',
        'type': 'color',
        'responsive': false,
        'properties': [
            {
                'valueType': 'direct',
                'name': 'color'
            }
        ],
        'selector': `.${elementId}.gvnews-post-meta > div .meta-items.gvnews-meta-author a`,
    });

    isNotEmpty(attributes['authorColorHover']) && data.push({
        'id': 'authorColorHover',
        'type': 'color',
        'responsive': false,
        'properties': [
            {
                'valueType': 'direct',
                'name': 'color'
            }
        ],
        'selector': `.${elementId}.gvnews-post-meta>div .gvnews-meta-author img`,
    });

    isNotEmpty(attributes['avatarSize']) && data.push({
        'type': 'plain',
        'id': 'avatarSize',
        'responsive': true,
        'selector': `.${elementId}.gvnews-post-meta>div .gvnews-meta-author img`,
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

    isNotEmpty(attributes['avatarGap']) && data.push({
        'type': 'plain',
        'id': 'avatarGap',
        'responsive': true,
        'properties': [
            {
                'name': 'margin-right',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ],
        'selector': `.${elementId}.gvnews-post-meta>div .gvnews-meta-author img`,
    });

    isNotEmpty(attributes['avatarOpacity']) && data.push({
        'type': 'plain',
        'id': 'avatarOpacity',
        'selector': `.${elementId}.gvnews-post-meta>div .gvnews-meta-author img`,
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'pattern',
                'pattern': 'calc({value}/100)',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },

                }
            }
        ],
    });


    isNotEmpty(attributes['avatarBorder']) && data.push({
        'type': 'border',
        'id': 'avatarBorder',
        'selector': `.${elementId}.gvnews-post-meta>div .gvnews-meta-author img`,
    });

    isNotEmpty(attributes['avatarBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'avatarBorderResponsive',
        'selector': `.${elementId}.gvnews-post-meta>div .gvnews-meta-author img`,
    });

    isNotEmpty(attributes['avatarBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'avatarBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.gvnews-post-meta>div .gvnews-meta-author img`,
    });


    isNotEmpty(attributes['authorPrefixTypography']) && data.push({
        'type': 'typography',
        'id': 'authorPrefixTypography',
        'selector': `.${elementId}.gvnews-post-meta > div .meta-items.gvnews-meta-author span`,
    });

    isNotEmpty(attributes['authorPrefixColor']) && data.push({
        'id': 'authorPrefixColor',
        'type': 'color',
        'properties': [
            {
                'valueType': 'direct',
                'name': 'color'
            }
        ],
        'selector': `.${elementId}.gvnews-post-meta > div .meta-items.gvnews-meta-author span`,
    });

    isNotEmpty(attributes['authorPrefixGap']) && data.push({
        'type': 'plain',
        'id': 'authorPrefixGap',
        'responsive': true,
        'properties': [
            {
                'name': 'margin-right',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ],
        'selector': `.${elementId}.gvnews-post-meta > div .meta-items.gvnews-meta-author span`,
    });

    return data;
};

export default authorStyle;