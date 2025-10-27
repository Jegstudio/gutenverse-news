import { __ } from '@wordpress/i18n';
import { ColorControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { handleTypography } from 'gutenverse-core/styling';

export const stylePanel = (props) => {
    const {
        elementId,
        setSwitcher,
        switcher
    } = props;

    return [
        {
            id: 'titleTypography',
            label: __('Title Typography', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'navTypography',
            label: __('Nav Text Typography', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: '__stylePrevNextType',
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
            onChange: ({ __stylePrevNextType }) => setSwitcher({ ...switcher, stylePrevNextType: __stylePrevNextType })
        },
        // Normal
        {
            id: 'titleColor',
            show: !switcher.stylePrevNextType || switcher.stylePrevNextType === 'normal',
            label: __('Title Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'navTextColor',
            show: !switcher.stylePrevNextType || switcher.stylePrevNextType === 'normal',
            label: __('Nav Text Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'accentColor',
            show: !switcher.stylePrevNextType || switcher.stylePrevNextType === 'normal',
            label: __('Accent Color', 'gutenverse-news'),
            component: ColorControl,
        },
        // Hover
        {
            id: 'titleColorHover',
            show: switcher.stylePrevNextType === 'hover',
            label: __('Title Color Hover', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'navTextColorHover',
            show: switcher.stylePrevNextType === 'hover',
            label: __('Nav Text Color Hover', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'accentColorHover',
            show: switcher.stylePrevNextType === 'hover',
            label: __('Accent Color Hover', 'gutenverse-news'),
            component: ColorControl,
        },
    ];
};