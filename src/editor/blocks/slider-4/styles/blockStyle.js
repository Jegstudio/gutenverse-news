import { isNotEmpty } from 'gutenverse-core/helper';
import getSliderStyle from '../../../control-panel/panel-styles/slider-styles';

export const getBolockStyle = (elementId, attributes) => {
    let data = getSliderStyle(elementId, attributes);

    // ---- START TITLE STYLE -----

    isNotEmpty(attributes['titleTypography']) && data.push({
        'type': 'typography',
        'id': 'titleTypography',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slide_item h2.gvnews_post_title a`,
    });

    isNotEmpty(attributes['titleColor']) && data.push({
        'type': 'color',
        'id': 'titleColor',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slide_item h2.gvnews_post_title a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['titleColorHover']) && data.push({
        'type': 'color',
        'id': 'titleColorHover',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slide_item h2.gvnews_post_title:hover a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    // ----- START NAVIGATION STYLE -----

    return data;
};