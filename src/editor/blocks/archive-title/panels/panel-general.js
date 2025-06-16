import { __ } from '@wordpress/i18n';
import { TextControl, ColorControl, TypographyControl } from 'gutenverse-core/controls';
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
            id: 'titleTypography',
            label: __('Title Typography', 'gutenverse-news'),
            component: TypographyControl,
            liveStyle: [
                {
                    id: 'titleTypography',
                    type: 'typography',
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId}.gvnews-archive-title`,
                }
            ],
        },
        {
            id: 'titleColor',
            label: __('Title Color', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: [`.gvnews-block.gvnews-block-wrapper.${elementId}.gvnews-archive-title`],
                    render: value => handleColor(value, 'color')
                }
            ],
        },
    ];
};