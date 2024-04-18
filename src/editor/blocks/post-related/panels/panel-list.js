import { __ } from '@wordpress/i18n';
import { advancePanel, borderPanel, responsivePanel } from 'gutenverse-core/controls';
import { contentPanel } from './panel-content';
import { designPanel } from './panel-design';
import { headerPanel } from '../../../control-panel/panel-header';
import { filterPanel } from './panel-filter';
import { paginationPanel } from '../../../control-panel/panel-pagination';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';

export const panelList = () => {
    return [
        {
            title: __('Header', 'gutenverse-news'),
            initialOpen: false,
            panelArray: (props) => headerPanel({
                ...props,
                styleId: 'news-ticker-background',
                normalOptions: [ 'default', 'gradient' ],
            }),
            tabRole: TabSetting
        },
        {
            title: __('General', 'gutenverse-news'),
            initialOpen: false,
            panelArray: (props) => contentPanel({
                ...props
            }),
            tabRole: TabSetting
        },
        {
            title: __('Filter', 'gutenverse-news'),
            initialOpen: false,
            panelArray: (props) => filterPanel({
                ...props
            }),
            tabRole: TabSetting
        },
        {
            title: __('Pagination', 'gutenverse-news'),
            initialOpen: false,
            panelArray: paginationPanel,
            tabRole: TabSetting
        },
        {
            title: __('Design', 'gutenverse-news'),
            initialOpen: false,
            panelArray: designPanel,
            tabRole: TabStyle
        },
        {
            title: __('Border', 'gutenverse-news'),
            initialOpen: false,
            panelArray: borderPanel,
            tabRole: TabStyle
        },
        {
            title: __('Display', 'gutenverse-news'),
            initialOpen: false,
            panelArray: responsivePanel
        },
        {
            title: __('Spacing', 'gutenverse-news'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'block-1-advance',
            }),
            tabRole: TabStyle
        }
    ];
};