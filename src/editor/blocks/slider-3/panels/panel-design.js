import { __ } from '@wordpress/i18n';
import { ColorControl, RangeControl, SizeControl, TypographyControl } from 'gutenverse-core/controls';
export const designPanel = () => {

    return [
        {
            id: 'typography',
            label: __('Title Typography', 'gutenverse-news'),
            description: __('This option will change your title typography.', 'gutenverse-news'),
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
        // TODO: Add gap item and item width
        // {
        //     id: 'gapItem',
        //     label: __('Gap Item', 'gutenverse-news'),
        //     component: RangeControl,
        //     allowDeviceControl: true,
        //     min: 0,
        //     max: 100,
        //     step: 1,
        //     unit: 'px',
        // },
        // {
        //     id: 'itemWidth',
        //     label: __('Width Item', 'gutenverse-news'),
        //     component: SizeControl,
        //     allowDeviceControl: true,
        //     defaultUnit: '%',
        //     units: {
        //         px: {
        //             text: 'px',
        //             min: 1,
        //             max: 300,
        //             step: 1,
        //             unit: 'px',
        //         },
        //         ['%']: {
        //             text: '%',
        //             min: 1,
        //             max: 20,
        //             step: 1,
        //             unit: '%',
        //         },
        //     },
        // },
    ];
};