import { __ } from '@wordpress/i18n';
import {
    ColorControl,
    TypographyControl,
    TextShadowControl,
    SwitchControl
} from 'gutenverse-core/controls';

export const biographyStylePanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: 'bioTypography',
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
            id: 'bioColor',
            show: (!switcher.styleHover || switcher.styleHover === 'normal'),
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'bioTextShadow',
            show: (!switcher.styleHover || switcher.styleHover === 'normal'),
            label: __('Text Shadow', 'gutenverse'),
            component: TextShadowControl,
        },
        {
            id: 'bioColorHover',
            show: switcher.styleHover === 'hover',
            label: __('Hover Text color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'bioTextShadowHover',
            show: switcher.styleHover === 'hover',
            label: __('Hover Text Shadow', 'gutenverse'),
            component: TextShadowControl,
        },
    ];
};
