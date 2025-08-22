import { isNotEmpty } from 'gutenverse-core/helper';

const commentStyle = (props) => {

    const {
        attributes,
        data,
        elementId
    } = props;

    isNotEmpty(attributes['commentTypography']) && data.push({
        'type': 'typography',
        'id': 'commentTypography',
        'selector': `.${elementId}.gvnews-post-meta > div .meta-items.gvnews-meta-comment a`,
    });

    isNotEmpty(attributes['commentColor']) && data.push({
        'id': 'commentColor',
        'type': 'color',
        'responsive': false,
        'properties': [
            {
                'valueType': 'direct',
                'name': 'color'
            }
        ],
        'selector': `.${elementId}.gvnews-post-meta > div .meta-items.gvnews-meta-comment a`,
    });


    isNotEmpty(attributes['commentColorHover']) && data.push({
        'id': 'commentColorHover',
        'type': 'color',
        'responsive': false,
        'properties': [
            {
                'valueType': 'direct',
                'name': 'color'
            }
        ],
        'selector': `.${elementId}.gvnews-post-meta > div .meta-items.gvnews-meta-comment a:hover`,
    });


    return data;
};

export default commentStyle;