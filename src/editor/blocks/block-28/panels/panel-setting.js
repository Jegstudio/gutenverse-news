import { __ } from '@wordpress/i18n';
import { IconSVGControl } from 'gutenverse-core/controls';

export const settingPanel = (props) => {
    return [
        {
            id: 'listIcon',
            label: __('Item List Icon', 'gutenverse-news'),
            description: __('Choose icon for post list icon.', 'gutenverse-news'),
            component: IconSVGControl
        },
    ];
};
