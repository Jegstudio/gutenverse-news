import { __ } from '@wordpress/i18n';

import { SwitchControl, DimensionControl, ColorControl, TypographyControl, BorderControl, BoxShadowControl } from 'gutenverse-core/controls';

export const mainCategoryStylePanel = (props) => {
    const {
        switcher,
        setSwitcher,
    } = props;

    return [
        {
            id: 'categoryButtonTypography',
            label: __('Typography', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'categoryButtonPadding',
            label: __('Padding', 'gutenverse-news'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'categoryButtonMargin',
            label: __('Margin', 'gutenverse-news'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: '__categoryHover',
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
            onChange: ({ __categoryHover }) => setSwitcher({ ...switcher, category: __categoryHover })
        },
        {
            id: 'categoryButtonBackground',
            label: __('Background Color', 'gutenverse-news'),
            show: !switcher.category || switcher.category === 'normal',
            component: ColorControl,
        },
        {
            id: 'categoryButtonBackgroundHover',
            label: __('Background Color', 'gutenverse-news'),
            show: switcher.category === 'hover',
            component: ColorControl,
        },
        {
            id: 'categoryButtonColor',
            label: __('Text Color', 'gutenverse-news'),
            show: !switcher.category || switcher.category === 'normal',
            component: ColorControl,
        },
        {
            id: 'categoryButtonColorHover',
            label: __('Text Color', 'gutenverse-news'),
            show: switcher.category === 'hover',
            component: ColorControl,
        },
        {
            id: 'categoryButtonBorder',
            label: __('Border', 'gutenverse-news'),
            show: !switcher.category || switcher.category === 'normal',
            component: BorderControl,
        },
        {
            id: 'categoryButtonBorderHover',
            label: __('Border', 'gutenverse-news'),
            show: switcher.category === 'hover',
            component: BorderControl,
        },
        {
            id: 'categoryButtonBoxShadow',
            show: !switcher.category || switcher.category === 'normal',
            label: __('Box Shadow', 'gutenverse-news'),
            component: BoxShadowControl,
        },
        {
            id: 'categoryButtonBoxShadowHover',
            show: switcher.category === 'hover',
            label: __('Box Shadow', 'gutenverse-news'),
            component: BoxShadowControl,
        },
    ];
};

export const sideCategoryStylePanel = (props) => {
    const {
        switcher,
        setSwitcher,
    } = props;

    return [
        {
            id: 'sideCategoryButtonTypography',
            label: __('Typography', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: '__categoryHover',
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
            onChange: ({ __categoryHover }) => setSwitcher({ ...switcher, category: __categoryHover })
        },
        {
            id: 'sideCategoryButtonColor',
            label: __('Text Color', 'gutenverse-news'),
            show: !switcher.category || switcher.category === 'normal',
            component: ColorControl,
        },
        {
            id: 'sideCategoryButtonColorHover',
            label: __('Text Color', 'gutenverse-news'),
            show: switcher.category === 'hover',
            component: ColorControl,
        },
    ];
};