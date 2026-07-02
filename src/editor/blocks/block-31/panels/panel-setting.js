import { __ } from '@wordpress/i18n';
import { TextControl, RangeControl, CheckboxControl } from 'gutenverse-core/controls';

export const settingPanel = (props) => {
    const {
        enableExcerpt,
    } = props;

    return [
        {
            id: 'enableExcerpt',
            component: CheckboxControl,
            label: __( 'Enable Excerpt', 'gutenverse-news' ),
        },
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
    ];
};
