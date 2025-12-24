import { __ } from '@wordpress/i18n';

import { AlertControl, ColorControl, SizeControl, SwitchControl, TextShadowControl, TypographyControl } from 'gutenverse-core/controls';

export const nameStylePanel = (props) => {
    const {
        switcher,
        setSwitcher,
        hideName,
        elementId,
    } = props;

    if (hideName) {
        return [
            {
                id: 'sticky-notice',
                component: AlertControl,
                children: <>
                    <span>{__('Name disabled. The Name panel will be hidden.')}</span>
                </>
            },
        ];
    }

    return [
        {
            id: 'authorTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'nameSpaceBottom',
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
                    'id': 'nameSpaceBottom',
                    'selector': `.guten-element.${elementId}.gvnews-post-author .gvnews-author-name`,
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
        {
            id: '__styleHover',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                }
            ],
            onChange: ({ __styleHover }) => setSwitcher({ ...switcher, styleHover: __styleHover })
        },
        {
            id: 'nameColor',
            show: switcher.styleHover === 'normal' || !switcher.styleHover,
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'nameTextShadow',
            show: switcher.styleHover === 'normal' || !switcher.styleHover,
            label: __('Text Shadow', 'gutenverse'),
            component: TextShadowControl,
        },
        // Hover
        {
            id: 'nameColorHover',
            show: switcher.styleHover === 'hover',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'nameTextShadowHover',
            show: switcher.styleHover === 'hover',
            label: __('Text Shadow', 'gutenverse'),
            component: TextShadowControl,
        },
    ];
};

