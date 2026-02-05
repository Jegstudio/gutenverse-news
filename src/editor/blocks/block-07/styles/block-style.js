import { isNotEmpty } from 'gutenverse-core/helper';
import getBlockStyle from '../../../control-panel/panel-styles/block-style';

const dedicatedStyle = (elementId, attributes) => {
    let data = getBlockStyle(elementId, attributes, 'gvnews_pl_lg_6', null, ['cardStyle']);

    const {
        cardUseBorder = true,
    } = attributes;
    isNotEmpty(attributes['cardPadding']) && data.push({
        'type': 'dimension',
        'id': 'cardPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gvnews_postblock .gvnews_pl_lg_6`,
    });

    if (cardUseBorder) {
        isNotEmpty(attributes['cardBorder']) && data.push({
            'type': 'border',
            'id': 'cardBorder',
            'selector': `.${elementId} .gvnews_postblock .gvnews_pl_lg_6`,
        });
        isNotEmpty(attributes['cardBorderResponsive']) && data.push({
            'type': 'borderResponsive',
            'id': 'cardBorderResponsive',
            'responsive': true,
            'selector': `.${elementId} .gvnews_postblock .gvnews_pl_lg_6`,
        });
    } else {
        isNotEmpty(attributes['cardLineColor']) && data.push({
            'type': 'color',
            'id': 'cardLineColor',
            'selector': `.${elementId} .gvnews_postblock .gvnews_pl_lg_6:not(:last-of-type)`,
            'properties': [
                {
                    'name': 'border-color',
                    'valueType': 'direct'
                }
            ],
        });

        isNotEmpty(attributes['cardLineThick']) && data.push({
            'type': 'plain',
            'id': 'cardLineThick',
            'responsive': true,
            'selector': `.${elementId} .gvnews_postblock .gvnews_pl_lg_6:not(:last-of-type)`,
            'properties': [
                {
                    'name': 'border-width',
                    'valueType': 'pattern',
                    'pattern': '{value}px',
                    'patternValues': {
                        'value': {
                            'type': 'direct'
                        }
                    }
                }
            ],
        });
    }

    return data;
};


export default dedicatedStyle;