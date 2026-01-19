import { __ } from '@wordpress/i18n';
import { CheckboxControl, RangeControl , SelectControl } from 'gutenverse-core/controls';
import { getDefaultImageLoad } from "../../../utils/helper";

export const sliderPanel = (props) => {
    const {
        autoplay,
        normalImage,
        imageLoad = ""
    } = props;
    const defaultImageLoad = getDefaultImageLoad(imageLoad, normalImage);

    return [
        {
            id: 'ncolumn',
            label: __('Number of Column', 'gutenverse-news'),
            component: RangeControl,
            min: 1,
            max: 5,
            step: 1,
        },
        {
            id: 'autoplay',
            label: __('Enable Autoplay', 'gutenverse-news'),
            component: CheckboxControl
        },
        {
            id: 'autoplayDelay',
            label: __('Autoplay Delay', 'gutenverse-news'),
            show: autoplay,
            component: RangeControl,
            min: 1000,
            max: 10000,
            step: 500,
        },
        {
            id: 'imageLoad',
            label: __('Image Load', 'gutenverse'),
            component: SelectControl,
            defaultValue: defaultImageLoad,
            options: [
                {
                    label: __('Normal Load', 'gutenverse'),
                    value: 'eager'
                },
                {
                    label: __('Lazy Load', 'gutenverse'),
                    value: 'lazy'
                },
            ],
        },
    ];
};