import { __ } from '@wordpress/i18n';
import { ColorControl, RangeControl, SizeControl } from 'gutenverse-core/controls';

export const iconStylePanel = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'socialIconSize',
            label: __('Size', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 100,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 1,
                    max: 100,
                    step: 0.1
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'socialIconSize',
                    'responsive': true,
                    'selector': `.guten-element.${elementId}.gvnews-post-author .gvnews-author-socials i`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'socialIconGap',
            label: __('Gap', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 0,
            max: 100,
            step: 1,
            unit: 'px',
            liveStyle: [
                {
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
                }
            ]
        },
        {
            id: 'socialIconColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'socialIconColorHover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
        },
    ];
};