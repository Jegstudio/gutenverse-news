import { isNotEmpty } from 'gutenverse-core/helper';

const iconStyle = (props) => {

    const {
        attributes,
        data,
        elementId,
    } = props;

    isNotEmpty(attributes['socialIconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'socialIconSize',
        'responsive': true,
        'selector': `.guten-element.${elementId}.gvnews-post-author .gvnews-author-socials svg`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['socialIconGap']) && data.push({
        'type': 'plain',
        'id': 'socialIconGap',
        'responsive': true,
        'properties': [
            {
                'name': 'gap',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ],
        'selector': `.guten-element.${elementId}.gvnews-post-author .gvnews-author-socials`,
    });

    isNotEmpty(attributes['socialIconColor']) && data.push({
        'type': 'color',
        'id': 'socialIconColor',
        'selector': `.guten-element.${elementId}.gvnews-post-author .gvnews-author-socials svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['socialIconColorHover']) && data.push({
        'type': 'color',
        'id': 'socialIconColorHover',
        'selector': `.guten-element.${elementId}.gvnews-post-author .gvnews-author-socials a:hover svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ],
    });

    return data;
};

export default iconStyle;