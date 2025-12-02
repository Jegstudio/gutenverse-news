import { __ } from '@wordpress/i18n';
import { ColorControl, RangeControl, TypographyControl } from 'gutenverse-core/controls';

export const designPanel = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'postTitleTypography',
            label: __('Post Tile Typography', 'gutenverse-news'),
            description: __('This option will change your post tile typography.', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'postTitleColor',
            label: __('Post Tile Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'postTitleHoverColor',
            label: __('Post Tile Hover Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'containerBorderWidth',
            label: __('Container Border Width', 'gutenverse-news'),
            component: RangeControl,
            unit: 'px',
            min: 1,
            max: 50,
            step: 1,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'containerBorderWidth',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_news_ticker`,
                    'properties': [
                        {
                            'name': 'border-width',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                }
                            }
                        }
                    ],
                }
            ]
        },
    ];
};