import { __ } from '@wordpress/i18n';
import { IconControl, TextControl, ColorControl, ImageRadioControl } from 'gutenverse-core/controls';
import { handleColor } from 'gutenverse-core/styling';

export const headerPanel = (props) => {
    const {
        elementId,
        headerType,
        title
    } = props;

    const {
        imgDir
    } = window['GVNewsConfig'];

    return [
        {
            id: 'icon',
            show: title !== '',
            label: __('Icon', 'gutenverse-news'),
            description: __('Choose icon for this block icon.', 'gutenverse-news'),
            component: IconControl
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
            label: __('URL Title', 'gutenverse-news'),
            description: __('Insert URL of heading title.', 'gutenverse-news'),
            component: TextControl,
        },
    ];
};