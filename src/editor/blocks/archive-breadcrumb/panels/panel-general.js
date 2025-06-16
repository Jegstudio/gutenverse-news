import { __ } from '@wordpress/i18n';
import { TextControl, ColorControl } from 'gutenverse-core/controls';
import { handleColor } from 'gutenverse-core/styling';

export const generalPanel = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'textColor',
            component: ColorControl,
            label: __('Text Color', 'gutenverse-news'),
            description: __('Set text color.', 'gutenverse-news'),
            style: [
                {
                    selector: [`.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_breadcrumbs span a`],
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'textColorHover',
            component: ColorControl,
            label: __('Hover Text Color', 'gutenverse-news'),
            description: __('Set hover text color.', 'gutenverse-news'),
            style: [
                {
                    selector: [`.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_breadcrumbs span a:hover`],
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'arrowColor',
            component: ColorControl,
            label: __('Arrow Color', 'gutenverse-news'),
            description: __('Set arrow icon color.', 'gutenverse-news'),
            style: [
                {
                    selector: [`.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_breadcrumbs i`],
                    render: value => handleColor(value, 'color')
                }
            ]
        },
    ];
};