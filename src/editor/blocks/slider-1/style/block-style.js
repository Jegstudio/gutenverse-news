import { isNotEmpty } from 'gutenverse-core/helper';

export const getBlockStyle = (elementId, attributes) => {
    let data = [];

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

    isNotEmpty(attributes['hideImageNavigation']) && data.push({
        'type': 'plain',
        'id': 'hideImageNavigation',
        'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_thumbnail_wrapper .tns-ovh`,
        'properties': [
            {
                'name': 'display',
                'valueType': 'pattern',
                'pattern': 'none !important',
            }
        ]
    });

    if (isNotEmpty(attributes['tootlipColor'])) {
        data.push({
            'type': 'color',
            'id': 'tootlipColor',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_thumbnail_wrapper .tns-ovh`,
            'properties': [
                {
                    'name': 'background-color',
                    'valueType': 'direct'
                },
            ],
        });
        data.push({
            'type': 'color',
            'id': 'tootlipColor',
            'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_slider_thumbnail .tns-slide-active.current .gvnews_slide_thumbnail_item:before`,
            'properties': [
                {
                    'name': 'border-top-color',
                    'valueType': 'direct'
                },
            ],
        });
    }

    return data;
};