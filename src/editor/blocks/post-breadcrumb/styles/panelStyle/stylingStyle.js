import { isNotEmpty } from 'gutenverse-core/helper';

const stylingStyle = (props) => {

    const {
        elementId,
        attributes,
        data,
    } = props;

    isNotEmpty(attributes['typography']) && data.push({
        'id': 'typography',
        'type': 'typography',
        'selector': `.guten-element.${elementId}.gvnews-post-breadcrumb span a`,
    });

    isNotEmpty(attributes['gap']) && data.push({
        'id': 'gap',
        'type': 'plain',
        'properties': [
            {
                'name': 'margin-right',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            }
        ],
        'selector': `.guten-element.${elementId}.gvnews-post-breadcrumb span a, .guten-element.${elementId}.gvnews-post-breadcrumb i`,
    });

    isNotEmpty(attributes['textColor']) && data.push({
        'type': 'color',
        'id': 'textColor',
        'selector': `.guten-element.${elementId}.gvnews-post-breadcrumb span a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['textColorHover']) && data.push({
        'type': 'color',
        'id': 'textColorHover',
        'selector': `.guten-element.${elementId}.gvnews-post-breadcrumb span a:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['arrowColor']) && data.push({
        'type': 'color',
        'id': 'arrowColor',
        'selector': `.guten-element.${elementId}.gvnews-post-breadcrumb i`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    return data;
};

export default stylingStyle;