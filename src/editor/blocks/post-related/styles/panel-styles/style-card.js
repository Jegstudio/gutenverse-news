import { isNotEmpty } from 'gutenverse-core/helper';
export const cardStyleModule = (elementId, attributes, data) => {
    const {
        templateType = 'template_1',
        cardUseBorder = true,
    } = attributes;
    const useLine = templateType === 'template_7' && !cardUseBorder;
    if (useLine) {
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
    } else {
        isNotEmpty(attributes['cardBorder']) && data.push({
            'type': 'border',
            'id': 'cardBorder',
            'selector': `.${elementId} .gvnews_postblock .gvnews_post:not(.gvnews_pl_xs_2)`,
        })
        isNotEmpty(attributes['cardBorderResponsive']) && data.push({
            'type': 'borderResponsive',
            'id': 'cardBorderResponsive',
            'responsive': true,
            'selector': `.${elementId} .gvnews_postblock .gvnews_post:not(.gvnews_pl_xs_2)`,
        })
    }

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
        'selector': `.${elementId} .gvnews_postblock .gvnews_post:not(.gvnews_pl_xs_2)`,
    })
    // TODO: Add width control
    // isNotEmpty(attributes['cardWidth']) && data.push({
    //     'type': 'unitPoint',
    //     'id': 'cardWidth',
    //     'properties': [
    //         {
    //             'name': 'width',
    //             'valueType': 'direct'
    //         }
    //     ],
    //     'selector': `.${elementId} .gvnews_postblock .${firstClass}`,
    //     'responsive': true
    // })
    return data;
}