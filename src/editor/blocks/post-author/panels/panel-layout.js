import { __ } from '@wordpress/i18n';
import { DimensionControl, NumberControl, SizeControl } from 'gutenverse-core/controls';

const layoutPanel = (props) => {
    const {
        elementId
    } = props;
    const selector = `.guten-element.${elementId}.gvnews-post-author`

    return [
        {
            id: 'margin',
            label: __('Margin', 'gutenverse-news'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
        },
        {
            id: 'padding',
            label: __('Padding', 'gutenverse-news'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
        },
        {
            id: 'width',
            label: __('Width', 'gutenverse-news'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 500,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: '%',
                },
            },
            liveStyle: [
                {
                    'id': 'width',
                    'type': 'unitPoint',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'pattern',
                            'pattern': '{value} !important',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                }
                            }
                        }
                    ],
                    'selector': selector,
                }
            ]
        },
        {
            id: 'height',
            label: __('Height', 'gutenverse-news'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 500,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: '%',
                },
            },
            liveStyle: [
                {
                    'id': 'height',
                    'type': 'unitPoint',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'height',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': selector,
                }
            ]
        },
        {
            id: 'zIndex',
            label: __('Z Index', '--gctd--'),
            component: NumberControl,
            allowDeviceControl: true,
            min: 1,
            max: 9999,
            step: 1,
        },
    ];
};

export default layoutPanel;