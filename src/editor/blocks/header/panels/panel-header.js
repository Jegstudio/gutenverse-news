import { __ } from '@wordpress/i18n';
import { IconSVGControl, TextControl, SelectControl,  } from 'gutenverse-core/controls';
export const headerPanel = (props) => {
    const {
        title
    } = props;


    return [
        {
            id: 'icon',
            show: title !== '',
            label: __('Icon', 'gutenverse-news'),
            description: __('Choose icon for this block icon.', 'gutenverse-news'),
            component: IconSVGControl
        },
        {
            id: 'title',
            label: __('Title', 'gutenverse-news'),
            description: __('Main title of Module Block.', 'gutenverse-news'),
            component: TextControl,
        },
        {
            id: 'second_title',
            label: __('Second Title', 'gutenverse-news'),
            description: __('Secondary title of Module Block.', 'gutenverse-news'),
            component: TextControl,
        },
        {
            id: 'url_title',
            label: __('Title URL', 'gutenverse-news'),
            description: __('Insert URL of heading title.', 'gutenverse-news'),
            component: TextControl,
        },
        {
            id: 'headerHtmlTag',
            label: __('HTML Tag', 'gutenverse-news'),
            description: __('Choose HTML tag for the block header.', 'gutenverse-news'),
            component: SelectControl,
            options: [
                {
                    label: __('H1', 'gutenverse-news'),
                    value: 'h1'
                },
                {
                    label: __('H2', 'gutenverse-news'),
                    value: 'h2'
                },
                {
                    label: __('H3', 'gutenverse-news'),
                    value: 'h3'
                },
                {
                    label: __('H4', 'gutenverse-news'),
                    value: 'h4'
                },
                {
                    label: __('H5', 'gutenverse-news'),
                    value: 'h5'
                },
                {
                    label: __('H6', 'gutenverse-news'),
                    value: 'h6'
                },
            ],
        },
    ];
};
