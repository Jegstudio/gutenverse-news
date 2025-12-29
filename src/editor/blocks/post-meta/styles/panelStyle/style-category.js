import { isNotEmpty } from 'gutenverse-core/helper';

const categoryStyle = (props) => {

    const {
        attributes,
        data,
        elementId
    } = props;

    isNotEmpty(attributes['categoryTypography']) && data.push({
        'type': 'typography',
        'id': 'categoryTypography',
        'selector': `.${elementId}.gvnews-post-meta > div .meta-items.gvnews-meta-category a`,
    });

    isNotEmpty(attributes['categoryColor']) && data.push({
        'id': 'categoryColor',
        'type': 'color',
        'responsive': false,
        'properties': [
            {
                'valueType': 'direct',
                'name': 'color'
            }
        ],
        'selector': `.${elementId}.gvnews-post-meta > div .meta-items.gvnews-meta-category a`,
    });

    isNotEmpty(attributes['categoryColorHover']) && data.push({
        'id': 'categoryColorHover',
        'type': 'color',
        'responsive': false,
        'properties': [
            {
                'valueType': 'direct',
                'name': 'color'
            }
        ],
        'selector': `.${elementId}.gvnews-post-meta > div .meta-items.gvnews-meta-category a:hover`,
    });

    isNotEmpty(attributes['categoryPrefixTypography']) && data.push({
        'type': 'typography',
        'id': 'categoryPrefixTypography',
        'selector': `.${elementId}.gvnews-post-meta > div .meta-items.gvnews-meta-category span`,
    });

    isNotEmpty(attributes['categoryPrefixColor']) && data.push({
        'id': 'categoryPrefixColor',
        'type': 'color',
        'properties': [
            {
                'valueType': 'direct',
                'name': 'color'
            }
        ],
        'selector': `.${elementId}.gvnews-post-meta > div .meta-items.gvnews-meta-category span`,
    });

    isNotEmpty(attributes['categoryPrefixGap']) && data.push({
        'type': 'plain',
        'id': 'categoryPrefixGap',
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
        'selector': `.${elementId}.gvnews-post-meta > div .meta-items.gvnews-meta-category span`,
    });

    return data;
};

export default categoryStyle;