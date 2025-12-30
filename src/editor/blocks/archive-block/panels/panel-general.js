import { __ } from '@wordpress/i18n';
import { TextControl, CheckboxControl, RangeControl, SelectControl } from 'gutenverse-core/controls';

export const generalPanel = (props) => {
    const {
        boxed
    } = props;
    return [
        {
            id: 'numberPost',
            component: RangeControl,
            label: __('Number of post', 'gutenverse-news'),
            min: 1,
            max: 100,
            step: 1,
            description: __('Set number of post for this block.', 'gutenverse-news'),
        },
        {
            id: 'boxed',
            component: CheckboxControl,
            label: __('Enable Boxed', 'gutenverse-news'),
            description: __('', 'gutenverse-news'),
        },
        {
            id: 'boxedShadow',
            show: boxed,
            component: CheckboxControl,
            label: __('Enable Shadow', 'gutenverse-news'),
            description: __('Enable excerpt ellipsis', 'gutenverse-news'),
        },
        {
            id: 'excerptLength',
            component: RangeControl,
            label: __('Excerpt Length', 'gutenverse-news'),
            min: 0,
            max: 200,
            step: 1,
            description: __('Set word length of excerpt on post block.', 'gutenverse-news'),
        },
        {
            id: 'excerptEllipsis',
            component: TextControl,
            label: __('Excerpt Ellipsis', 'gutenverse-news'),
            description: __('Define excerpt ellipsis', 'gutenverse-news'),
        },
        {
            id: 'firstPage',
            component: CheckboxControl,
            label: __('Only First Page', 'gutenverse-news'),
            description: __('Enable this option if you want to show this block only on the first page.', 'gutenverse-news'),
        },
    ];
};
