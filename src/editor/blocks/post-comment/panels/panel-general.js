import { __ } from '@wordpress/i18n';
import { CheckboxControl } from 'gutenverse-core/controls';

export const generalPanel = () => {
    return [
        {
            id: '__isLogin',
            label: __('Act as login user', 'gutenverse-news'),
            description: __('Changes the comment form based on the user login status.', 'gutenverse-news'),
            component: CheckboxControl,
        },
    ];
};