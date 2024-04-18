import { __ } from '@wordpress/i18n';
import { BackgroundControl, ColorControl } from 'gutenverse-core/controls';
import { handleColor, handleBackground } from 'gutenverse-core/styling';

export const designPanel = (props) => {
    const {
        elementId,
        normalOptions,
    } = props;

    return [
        {
            id: 'titleTextColor',
            label: __('Title Text Color', 'gutenverse-news'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .gvnews_breakingnews_title`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'titleBackgroundColor',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: normalOptions,
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_breakingnews_title`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
    ];
};