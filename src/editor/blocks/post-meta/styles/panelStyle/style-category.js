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
        'selector': `.${elementId}.gvnews-post-meta > div .meta-items.gvnews-meta-category`,
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

    return data;
};

export default categoryStyle;