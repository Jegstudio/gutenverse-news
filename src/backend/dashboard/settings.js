
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
};