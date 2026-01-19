import { __ } from '@wordpress/i18n';
import { SelectControl } from 'gutenverse-core/controls';
import { getDefaultImageLoad } from "../../../utils/helper";


export const settingHero = (props) => {
    const { normalImage, imageLoad = "" } = props;
    const defaultImageLoad = getDefaultImageLoad(imageLoad, normalImage);
    return [
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