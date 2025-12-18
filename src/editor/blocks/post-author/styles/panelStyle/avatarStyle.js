import { isNotEmpty } from 'gutenverse-core/helper';

const avatarStyle = (props) => {

    const {
        attributes,
        data,
        elementId,
    } = props;
    const selector = `.guten-element.${elementId}.gvnews-post-author .gvnews-author-image img`;

   isNotEmpty(attributes['avatarSize']) && data.push({
        'type': 'unitPoint',
        'id': 'avatarSize',
        'responsive': true,
        'selector': `.guten-element.${elementId}.gvnews-post-author .gvnews-author-image`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct'
            },
        ],
    });

    isNotEmpty(attributes['avatarOpacity']) && data.push({
        'type': 'plain',
        'id': 'avatarOpacity',
        'selector': selector,
        'responsive': true,
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

    isNotEmpty(attributes['avatarRotate']) && data.push({
        'type': 'plain',
        'id': 'avatarRotate',
        'selector': selector,
        'responsive': true,
        'properties': [
            {
                'name': 'transform',
                'valueType': 'pattern',
                'pattern': 'rotate({value}deg)',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },

                }
            }
        ],
    });

    isNotEmpty(attributes['avatarBorder'])  && data.push({
        'type': 'border',
        'id': 'avatarBorder',
        'selector': selector,
    });

    isNotEmpty(attributes['avatarBorderResponsive'])  && data.push({
        'type': 'borderResponsive',
        'id': 'avatarBorderResponsive',
        'selector': selector,
    });

    isNotEmpty(attributes['avatarBoxShadow'])  && data.push({
        'type': 'boxShadow',
        'id': 'avatarBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': selector,
    });
    isNotEmpty(attributes['avatarMargin']) && data.push({
        'type': 'dimension',
        'id': 'avatarMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-element.${elementId}.gvnews-post-author .gvnews-author-image`,
    });

    return data;
};

export default avatarStyle;