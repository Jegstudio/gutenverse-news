import { __ } from '@wordpress/i18n';
import { SelectControl, CheckboxControl, BackgroundControl } from 'gutenverse-core/controls';
import { handleBackground } from 'gutenverse-core/styling';

export const overlaySliderPanel = (props) => {
    return [
        {
            id: 'enableFullscreen',
            label: __('Enable Full Screen', 'gutenverse-news'),
            component: CheckboxControl,
        },
        {
            id: 'showNav',
            label: __('Show Navigation', 'gutenverse-news'),
            component: CheckboxControl,
        },
        {
            id: 'normalImage',
            label: __('Use Normal Image Load', 'gutenverse-news'),
            description: __('Force it to use normal load image and optimize Largest Contentful Paint (LCP) when using this element at the top of your site.', 'gutenverse-news'),
            component: CheckboxControl
        },
        {
            id: 'overlayOption',
            label: __('Overlay Option', 'gutenverse-news'),
            description: __('Choose which date format you want to use.', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    label: __('Gradient Overlay', 'gutenverse-news'),
                    value: 'gradient'
                },
                {
                    label: __('No Overlay', 'gutenverse-news'),
                    value: 'no'
                },
            ],
        },
    ];
};

export const overlaySliderPanelStyle = (props) => {
    const {
        elementId,
        overlayOption,
    } = props;
    return [
        {
            id: 'overrideOverlay',
            show: overlayOption == 'gradient',
            allowDeviceControl: true,
            options: ['gradient'],
            component: BackgroundControl,
            style: [
                {
                    selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_overlay_slider_wrapper:before`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
    ];
};