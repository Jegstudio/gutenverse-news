import { isNotEmpty } from 'gutenverse-core/helper';
import getSliderStyle from '../../../control-panel/panel-styles/slider-styles';

const getBlockStyle = (elementId, attributes) => {
    let data = getSliderStyle(elementId, attributes);

    isNotEmpty(attributes['sliderHeight']) && data.push({
        'type': 'pattern',
        'id': 'sliderHeight',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_wrapper, .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_wrapper .gvnews_slide_item, .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_wrapper .gvnews_slide_wrapper, .gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_wrapper .gvnews_slider_type_9_thumb`,
        'responsive': true,
        'properties': [
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            }
        ],
    });

    return data;
};

export default getBlockStyle;