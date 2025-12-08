import { __ } from '@wordpress/i18n';
import { ColorControl, RangeControl, IconControl, SwitchControl, BackgroundControl } from 'gutenverse-core/controls';
import { handleColor, handleUnitPoint } from 'gutenverse-core/styling';

export const iconPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: '__socialIconHover',
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
            onChange: ({ __socialIconHover }) => setSwitcher({ ...switcher, socialIconHover: __socialIconHover })
        },
        // Normal
        {
            id: 'iconColor',
            show: !switcher.socialIconHover || switcher.socialIconHover === 'normal',
            label: __('Icon Color', 'gutenverse-news'),
            component: ColorControl,
        },
        // Hover
        {
            id: 'iconColorHover',
            show: switcher.socialIconHover === 'hover',
            label: __('Icon Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: '__socialIconBgType',
            component: SwitchControl,
            options: [
                {
                    value: 'color',
                    label: 'Color'
                },
                {
                    value: 'gradient',
                    label: 'Gradient'
                }
            ],
            onChange: ({ __socialIconBgType }) => setSwitcher({ ...switcher, socialIconBgType: __socialIconBgType })
        },
        // Color Type
        {
            id: 'iconBackground',
            show: (!switcher.socialIconHover || switcher.socialIconHover === 'normal') && (!switcher.socialIconBgType || switcher.socialIconBgType === 'color'),
            label: __('Icon Background', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'iconBackgroundHover',
            show: (switcher.socialIconHover === 'hover') && (!switcher.socialIconBgType || switcher.socialIconBgType === 'color'),
            label: __('Icon Background', 'gutenverse-news'),
            component: ColorControl,
        },
        // Gradient Type
        {
            id: 'iconBackgroundGradient',
            show: (!switcher.socialIconHover || switcher.socialIconHover === 'normal') && (switcher.socialIconBgType === 'gradient'),
            label: __('Icon Background', 'gutenverse-news'),
            component: BackgroundControl,
            options: ['gradient'],
        },
        {
            id: 'iconBackgroundGradientHover',
            show: (switcher.socialIconHover === 'hover') && (switcher.socialIconBgType === 'gradient'),
            label: __('Icon Background', 'gutenverse-news'),
            component: BackgroundControl,
            options: ['gradient'],
        },
    ];
};
