import { __ } from '@wordpress/i18n';
import { ColorControl, TextControl } from 'gutenverse-core/controls';
import { handleColor } from 'gutenverse-core/styling';

export const generalPanel = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'textColor',
            label: __('Text Color', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: [`.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_archive_description`],
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
                    selector: [`.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_archive_description`],
                    render: value => `font-size: ${value}`
                }
            ],
        },
    ];
};