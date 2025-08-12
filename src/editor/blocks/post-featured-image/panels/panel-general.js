import { __ } from '@wordpress/i18n';
import { SelectControl, CheckboxControl } from 'gutenverse-core/controls';

export const generalPanel = (props) => {
    const {
        shareStyle,
    } = props;
    return [
        {
            id: 'imageSize',
            label: __('Featured Image Size', 'gutenverse-news'),
            description: __('choose which feature image size', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    label: __('1140x570', 'gutenverse-news'),
                    value: '1140x570'
                },
                {
                    label: __('750x375', 'gutenverse-news'),
                    value: '750x375'
                },
                {
                    label: __('1140x815', 'gutenverse-news'),
                    value: '1140x815'
                },
                {
                    label: __('750x536', 'gutenverse-news'),
                    value: '750x536'
                },
                {
                    label: __('Width 1140', 'gutenverse-news'),
                    value: 'featured-1140'
                },
                {
                    label: __('Width 750', 'gutenverse-news'),
                    value: 'featured-750'
                },
            ],
        },
        {
            id: 'gallerySize',
            label: __('Gallery Image Size', 'gutenverse-news'),
            description: __('choose which gallery image size', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    label: __('1140x570', 'gutenverse-news'),
                    value: '1140x570'
                },
                {
                    label: __('750x375', 'gutenverse-news'),
                    value: '750x375'
                },
                {
                    label: __('1140x815', 'gutenverse-news'),
                    value: '1140x815'
                },
                {
                    label: __('750x536', 'gutenverse-news'),
                    value: '750x536'
                },
                {
                    label: __('Width 1140', 'gutenverse-news'),
                    value: 'featured-1140'
                },
            ],
        },
    ];
};