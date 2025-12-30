import { __ } from '@wordpress/i18n';
import { ColorControl, TypographyControl } from 'gutenverse-core/controls';
import { handleColor } from 'gutenverse-core/styling';

export const stylePanel = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'descTypography',
            label: __('Text Typography', 'gutenverse-news'),
            component: TypographyControl,
            liveStyle: [
                {
                    'id': 'descTypography',
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