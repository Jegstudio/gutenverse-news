import { __ } from '@wordpress/i18n';

import { ColorControl, SwitchControl, TextShadowControl, TypographyControl } from 'gutenverse-core/controls';

export const nameStylePanel = (props) => {
    const {
        authorType,
        switcher,
        setSwitcher
    } = props;


    return [
        {
            id: 'nameTypography',
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
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'nameTextShadow',
            label: __('Text Shadow', 'gutenverse'),
            component: TextShadowControl,
        },
        {
            id: 'nameColorHover',
            label: __('Hover Text color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'nameTextShadowHover',
            label: __('Hover Text Shadow', 'gutenverse'),
            component: TextShadowControl,
        },
    ];
};

