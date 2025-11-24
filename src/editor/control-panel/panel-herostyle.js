import { __ } from '@wordpress/i18n';
import { BackgroundControl, CheckboxControl, ColorControl, CompositeControl, TypographyControl } from 'gutenverse-core/controls';

export const styleHero = (props, typeCount = 1) => {

    return [
        {
            id: 'typography',
            label: __('Title Typography', 'gutenverse-news'),
            description: __('This option will change your title typography.', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'secondTitleTypography',
            label: __('Second List Title Typography', 'gutenverse-news'),
            description: __('This option will override the post title typography setting on the second list.', 'gutenverse-news'),
            show: typeCount >= 2,
            component: TypographyControl,
        },
        {
            id: 'thridTitleTypography',
            label: __('Thrid List Title Typography', 'gutenverse-news'),
            description: __('This option will override the post title typography setting on the thrid list.', 'gutenverse-news'),
            show: typeCount >= 3,
            component: TypographyControl,
        },
        {
            id: 'titleColor',
            label: __('Title Color', 'gutenverse-news'),
            component: ColorControl,
        },

        {
            id: 'titleColorHover',
            label: __('Title Color Hover', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'heroItemOverlay',
            label: __('Hero Style', 'gutenverse-news'),
            component: CompositeControl,
            titleFormat: (value, index) => {
                return `Item ${index+1}`;
            },
            allowAddItem: false,
            options: [
                {
                    id: 'overlayEnable',
                    label: __('Override overlay', 'gutenverse-news'),
                    description: __('Align social icon vertical.', 'gutenverse-news'),
                    component: CheckboxControl,
                },
                {
                    show: value => value.overlayEnable,
                    id: 'OverlayGradient',
                    allowDeviceControl: true,
                    options: [ 'gradient' ],
                    component: BackgroundControl,
                },
            ],
        },
    ];
};