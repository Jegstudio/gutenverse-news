import { isNotEmpty } from 'gutenverse-core/helper';

const nameStyle = (props) => {

    const {
        attributes,
        data,
        elementId,
    } = props;
    const selector = `.guten-element.${elementId}.gvnews-post-author .gvnews-author-name`;

    isNotEmpty(attributes['nameTypography']) && data.push({
        'type': 'typography',
        'id': 'nameTypography',
        'selector': selector,
    });
    
    isNotEmpty(attributes['nameColor']) && data.push({
        'type': 'color',
        'id': 'nameColor',
        'selector': selector,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });
    
    isNotEmpty(attributes['nameColorHover']) && data.push({
        'type': 'color',
        'id': 'nameColorHover',
        'selector': `${selector}:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });
    
    isNotEmpty(attributes['nameTextShadow']) && data.push({
        'type': 'textShadow',
        'id': 'nameTextShadow',
        'selector': selector,
        'properties': [
            {
                'name': 'text-shadow',
                'valueType': 'direct'
            }
        ]
    });
    
    isNotEmpty(attributes['nameTextShadowHover']) && data.push({
        'type': 'textShadow',
        'id': 'nameTextShadowHover',
        'selector': `${selector}:hover`,
        'properties': [
            {
                'name': 'text-shadow',
                'valueType': 'direct'
            }
        ]
    });

    return data;
};

export default nameStyle;