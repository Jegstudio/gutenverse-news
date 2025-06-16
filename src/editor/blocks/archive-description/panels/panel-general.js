import { __ } from '@wordpress/i18n';
import { ColorControl, TextControl, TypographyControl } from 'gutenverse-core/controls';
import { handleColor } from 'gutenverse-core/styling';

export const generalPanel = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'typography',
            label: __('Text Typography', 'gutenverse-news'),
            component: TypographyControl,
            liveStyle: [
                {
                    'id': 'typography',
                    'type': 'typography',
                    'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews-archive-desc`,
                }
            ],
        },
        {
            id: 'textColor',
            label: __('Text Color', 'gutenverse-news'),
            component: ColorControl,
            liveStyle: [
                {
                    selector: [`.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews-archive-desc`],
                    render: value => handleColor(value, 'color')
                }
            ],
        },
    ];
};