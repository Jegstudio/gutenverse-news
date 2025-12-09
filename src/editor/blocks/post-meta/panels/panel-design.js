import { __ } from '@wordpress/i18n';
import { CheckboxControl } from 'gutenverse-core/controls';

export const designPanel = () => {
    return [
        {
            id: 'forceColumnLeft',
            label: __('Force 1 Column', 'gutenverse-news'),
            description: __('Enable this option to display all left meta on 1 column on mobile device', 'gutenverse-news'),
            component: CheckboxControl,
        },
        {
            id: 'forceColumnRight',
            label: __('Force 1 Column', 'gutenverse-news'),
            description: __('Enable this option to display all right meta on 1 column on mobile device', 'gutenverse-news'),
            component: CheckboxControl,
        },
        {
            id: 'authorHideMobile',
            label: __('Hide Author on Mobile', 'gutenverse-news'),
            component: CheckboxControl,
        },
        {
            id: 'dateHideMobile',
            label: __('Hide Date on Mobile', 'gutenverse-news'),
            component: CheckboxControl,
        },
        {
            id: 'categoryHideMobile',
            label: __('Hide Category on Mobile', 'gutenverse-news'),
            component: CheckboxControl,
        },
        {
            id: 'commentHideMobile',
            label: __('Hide Comment on Mobile', 'gutenverse-news'),
            component: CheckboxControl,
        }

    ];

};
