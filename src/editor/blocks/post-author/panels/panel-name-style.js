import { __ } from '@wordpress/i18n';

import { ColorControl, SwitchControl, TextShadowControl, TypographyControl } from 'gutenverse-core/controls';

export const nameStylePanel = (props) => {
    const {
        switcher,
        setSwitcher
    } = props;


    return [
        {
            id: 'authorTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
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

