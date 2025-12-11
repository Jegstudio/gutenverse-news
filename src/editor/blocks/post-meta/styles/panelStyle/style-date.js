import { isNotEmpty } from 'gutenverse-core/helper';

const dateStyle = (props) => {

    const {
        attributes,
        data,
        elementId
    } = props;

    isNotEmpty(attributes['dateTypography']) && data.push({
        'type': 'typography',
        'id': 'dateTypography',
        'selector': `.${elementId}.gvnews-post-meta > div .meta-items.gvnews-meta-date a`,
    });

    isNotEmpty(attributes['dateColor']) && data.push({
        'id': 'dateColor',
        'type': 'color',
        'responsive': false,
        'properties': [
            {
                'valueType': 'direct',
                'name': 'color'
            }
        ],
        'selector': `.${elementId}.gvnews-post-meta > div .meta-items.gvnews-meta-date a`,
    });

    isNotEmpty(attributes['dateColorHover']) && data.push({
        'id': 'dateColorHover',
        'type': 'color',
        'responsive': false,
        'properties': [
            {
                'valueType': 'direct',
                'name': 'color'
            }
        ],
        'selector': `.${elementId}.gvnews-post-meta > div .meta-items.gvnews-meta-date a:hover`,
    });

    isNotEmpty(attributes['datePrefixColor']) && data.push({
        'id': 'datePrefixColor',
        'type': 'color',
        'properties': [
            {
                'valueType': 'direct',
                'name': 'color'
            }
        ],
        'selector': `.${elementId}.gvnews-post-meta > div .meta-items.gvnews-meta-date::before`,
    });

    return data;
};

export default dateStyle;