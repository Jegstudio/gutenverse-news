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
        'selector': `.${elementId}.gvnews-post-meta > div .meta-items.gvnews-meta-author`,
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
        'selector': `.${elementId}.gvnews-post-meta > div .meta-items.gvnews-meta-author a:hover`,
    });

    return data;
};

export default authorStyle;