
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { NewsSettings } from './settings/news-settings';

export const loadSettings = () => {
    addFilter(
        'gutenverse.dashboard.plugin-settings.navigation',
        'gutenverse/news/dashboard/plugin-settings/navigation',
        settings
    );

    addFilter(
        'gutenverse.dashboard.settings.news',
        'gutenverse/dashboard/settings/news',
        (body, settings, props) => {
            if (settings === 'news') {
                body = <NewsSettings {...props} />;
            }

            return body;
        }
    );
};

const settings = (nav) => {

    return {
        ...nav,
        news: {
            title: __('Gutenverse News', 'gutenverse-news'),
            pro: false,
            subMenu: [
                {
                    id: 'block_settings',
                    title: 'Global Block Settings'
                },
                {
                    id: 'manage_features',
                    title: 'Manage Features'
                }
            ]
        },
    };
}