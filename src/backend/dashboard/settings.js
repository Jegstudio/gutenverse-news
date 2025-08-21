import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { NewsSettings } from './settings/news-settings';

export const loadSettings = () => {
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
    addFilter('gutenverse.settings.menu.plugin', 'gutenverse-news/dashboard/settings/menu-plugin',
        (menu, settingValues) => {
            menu.news = {
                title: __('Gutenverse News', 'gutenverse'),
                pro: false,
                subMenu: applyFilters('gutenverse.news.settings.submenu', [
                    {
                        id: 'block_settings',
                        title: 'Global Block Settings'
                    },
                    {
                        id: 'additional_features',
                        title: 'Addiitonal Features',
                        pro: true,
                        withAccess: true
                    }
                ], settingValues)
            }

            return menu;
        }
    );
};