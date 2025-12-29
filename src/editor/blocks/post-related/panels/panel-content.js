import { __ } from '@wordpress/i18n';
import { IconControl, RangeControl, TextControl } from 'gutenverse-core/controls';

export const contentPanel = props => {
    const {
        templateType,
        enableExcerpt = true
    } = props;

    const withListIcon = ['template_1', 'template_16', 'template_24'].includes(templateType);
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
            id: 'listIcon',
            show: withListIcon,
            label: __('Item List Icon', 'gutenverse-news'),
            description: __('Choose icon for post list icon.', 'gutenverse-news'),
            component: IconControl
        },
    ];
};