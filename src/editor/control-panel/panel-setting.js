import { __ } from '@wordpress/i18n';
import { IconSVGControl, SelectControl, TextControl, RangeControl } from 'gutenverse-core/controls';
import { getDefaultImageLoad } from "../utils/helper";

export const settingPanel = (props, withListIcon = false) => {
    const {
        enableExcerpt,
        normalImage,
        imageLoad = '',
    } = props;

    const defaultImageLoad = getDefaultImageLoad(imageLoad, normalImage);

    return [
        {
            id: 'excerptLength',
            show: enableExcerpt === true,
            label: __('Excerpt Length', 'gutenverse-news'),
            description: __('Set word length of excerpt on post block.', 'gutenverse-news'),
            component: RangeControl,
            min: 1,
            max: 200,
            step: 1
        },
        {
            id: 'excerptEllipsis',
            show: enableExcerpt === true,
            label: __('Excerpt Ellipsis', 'gutenverse-news'),
            description: __('Define excerpt ellipsis', 'gutenverse-news'),
            component: TextControl,
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
        {
            id: 'listIcon',
            show: withListIcon,
            label: __('Item List Icon', 'gutenverse-news'),
            description: __('Choose icon for post list icon.', 'gutenverse-news'),
            component: IconSVGControl
        },
    ];
};
