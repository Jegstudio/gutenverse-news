import { __ } from '@wordpress/i18n';
import {
    AlertControl,
    ColorControl,
    TypographyControl,
    TextShadowControl,
    SizeControl,
} from 'gutenverse-core/controls';

export const biographyStylePanel = (props) => {
    const {
        hideDesc,
        elementId,
    } = props;

    if (hideDesc) {
        return [
            {
                id: 'sticky-notice',
                component: AlertControl,
                children: <>
                    <span>{__('Description disabled. The Description panel will be hidden.')}</span>
                </>
            },
        ];
    }

    return [
        {
            id: 'bioTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'bioColor',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'bioTextShadow',
            label: __('Text Shadow', 'gutenverse'),
            component: TextShadowControl,
        },
        {
            id: 'bioSpaceBottom',
            label: __('Space Bottom', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 200,
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
                    'type': 'unitPoint',
                    'id': 'bioSpaceBottom',
                    'selector': `.guten-element.${elementId}.gvnews-post-author .gvnews-author-desc`,
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'margin-bottom',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
    ];
};
