import { __ } from '@wordpress/i18n';
import { BackgroundControl, ColorControl, RangeControl, CheckboxControl, RepeaterControl, CompositeControl } from 'gutenverse-core/controls';

export const styleHero = (props) => {

    return [
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