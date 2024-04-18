import { __ } from '@wordpress/i18n';
import { TextControl, ColorControl } from 'gutenverse-core/controls';
import { handleColor } from 'gutenverse-core/styling';

export const generalPanel = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'title',
            label: __('Title', 'gutenverse-news'),
            component: TextControl
        },
        {
            id: 'titleColor',
            label: __('Title Color', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: [`.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_archive_title`],
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'fontSize',
            label: __('Font Size', 'gutenverse-news'),
            component: TextControl,
            style: [
                {
                    selector: [`.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_archive_title`],
                    render: value => `font-size: ${value}`
                }
            ],
        },
    ];
};