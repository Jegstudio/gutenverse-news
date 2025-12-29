
import { addFilter } from '@wordpress/hooks';
import { ContentV300 } from './version/v3-0-0';
import { HeaderNotice } from './version/header-notice';
import { ContentV310 } from './version/v3-1-0';

export const loadUpgradeNotice = () => {
    addFilter(
        'gutenverse.dashboard.notice.header',
        'gutenverse-news/dashboard/notice/header',
        (header, plugin, version) => {
            if (plugin === 'gutenverse-news') {
                header = <HeaderNotice version={version} />;
            }

            return header;
        }
    );

    addFilter(
        'gutenverse.dashboard.notice.content',
        'gutenverse-news/dashboard/notice/content',
        (content, plugin, version) => {
            if (plugin === 'gutenverse-news') {
                switch (version) {
                    case '3.0.0':
                        content = <ContentV300 />;
                        break;
                    case '3.1.0':
                        content = <ContentV310 />;
                        break;
                }
            }

            return content;
        }
    );
};