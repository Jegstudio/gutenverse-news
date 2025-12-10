import { __ } from '@wordpress/i18n';
import { IconSVGControl, SelectControl, TextControl, RangeControl, CheckboxControl } from 'gutenverse-core/controls';

export const settingPanel = (props, withListIcon = false) => {
    const {
        enableExcerpt,
    } = props;
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
            id: 'normalImage',
            label: __('Use Normal Image Load', 'gutenverse-news'),
            description: __('Force it to use normal load image and optimize Largest Contentful Paint (LCP) when using this element at the top of your site.', 'gutenverse-news'),
            component: CheckboxControl
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
