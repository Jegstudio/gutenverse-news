import { isNotEmpty } from 'gutenverse-core/helper';

const bioStyle = (props) => {

    const {
        attributes,
        data,
        elementId,
    } = props;
    const selector = `.guten-element.${elementId}.gvnews-post-author .gvnews-author-desc`;

    isNotEmpty(attributes['bioTypography']) && data.push({
        'type': 'typography',
        'id': 'bioTypography',
        'selector': selector,
    });
    
    isNotEmpty(attributes['bioColor']) && data.push({
        'type': 'color',
        'id': 'bioColor',
        'selector': selector,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });
    
    isNotEmpty(attributes['bioColorHover']) && data.push({
        'type': 'color',
        'id': 'bioColorHover',
        'selector': `${selector}:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });
    
    isNotEmpty(attributes['bioTextShadow']) && data.push({
        'type': 'textShadow',
        'id': 'bioTextShadow',
        'selector': selector,
        'properties': [
            {
                'name': 'text-shadow',
                'valueType': 'direct'
            }
        ]
    });
    
    isNotEmpty(attributes['bioTextShadowHover']) && data.push({
        'type': 'textShadow',
        'id': 'bioTextShadowHover',
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

export default bioStyle;