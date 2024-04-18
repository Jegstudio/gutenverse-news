import { __ } from '@wordpress/i18n';
import { CheckboxControl } from 'gutenverse-core/controls';

export const extendedDesigOption = (props) => {
    return [
        {
            id: 'showBorder',
            label: __('Show bottom border', 'gutenverse-news'),
            description: __('Enable this option to show bottom border line for each article.', 'gutenverse-news'),
            component: CheckboxControl
        },
    ];
};