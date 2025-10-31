import { __ } from '@wordpress/i18n';
import { BackgroundControl, ColorControl, TypographyControl, CheckboxControl, RepeaterControl } from 'gutenverse-core/controls';

export const styleHero = (props) => {
    let numberItem = 0;

    const getNumberItem = () => {
        if (!props.heroItemOverlay) {
            return;
        }
        if ((numberItem + 1) > props.heroItemOverlay.length) {
            numberItem = 0;
        }
        numberItem++;
        return numberItem;
    };
    return [
        {
            id: 'heroItemOverlay',
            label: __('Hero Style', 'gutenverse-news'),
            component: RepeaterControl,
            titleFormat: () => {
                return `Item ${getNumberItem()}`;
            },
            isAddNew: false,
            isRemove: false,
            isDuplicate: false,
            isDragable: false,
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
                    options: ['gradient'],
                    component: BackgroundControl,
                },
                {
                    id: 'titleTypography',
                    label: __('Title Typography', 'gutenverse-news'),
                    component: TypographyControl,
                },
                {
                    id: 'metaTypography',
                    label: __('Meta Typography', 'gutenverse-news'),
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
                    id: 'metaColor',
                    label: __('Meta Color', 'gutenverse-news'),
                    component: ColorControl,
                },
            ],
        },
    ];
};