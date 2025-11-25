import { __ } from '@wordpress/i18n';
import { CheckboxControl } from 'gutenverse-core/controls';

export const settingHero = (props) => {
    return [
        {
            id: 'normalImage',
            label: __('Use Normal Image Load', 'gutenverse-news'),
            description: __('Force it to use normal load image and optimize Largest Contentful Paint (LCP) when using this element at the top of your site.', 'gutenverse-news'),
            component: CheckboxControl
        },
    ];
};