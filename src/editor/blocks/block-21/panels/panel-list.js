import { __ } from '@wordpress/i18n';
import { advancePanel, backgroundPanel, borderPanel, responsivePanel, conditionPanel } from 'gutenverse-core/controls';
import { filterPanel } from '../../../control-panel/panel-filter';
import { headerPanel } from '../../../control-panel/panel-header';
import { settingPanel } from '../../../control-panel/panel-setting';
import { paginationPanel } from '../../../control-panel/panel-pagination';
import { designPanel } from '../../../control-panel/panel-design';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { applyFilters } from '@wordpress/hooks';
import { headerFilterPanel } from '../../../control-panel/panel-header-filter';

export const panelList = () => {
    return applyFilters(
        'gutenverse.news.block.panels',
        [
            {
                title: __('Header', 'gutenverse-news'),
                initialOpen: false,
                panelArray: (props) => headerPanel({
                    ...props,
                    styleId: 'news-ticker-background',
                    normalOptions: ['default', 'gradient'],
                }),
                tabRole: TabSetting
            },
            {
                id: 'header-filter',
                title: __('Header Filter', 'gutenverse-news'),
                initialOpen: false,
                panelArray: (props) => {
                    return headerFilterPanel(props);
                },
                tabRole: TabSetting,

            },
            {
                title: __('Content Filter', 'gutenverse-news'),
                initialOpen: false,
                panelArray: filterPanel,
                tabRole: TabSetting
            },
            {
                title: __('Content Setting', 'gutenverse-news'),
                initialOpen: false,
                panelArray: settingPanel,
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
                title: __('Background', 'gutenverse-news'),
                initialOpen: false,
                panelArray: (props) => backgroundPanel({
                    ...props,
                    styleId: 'block-21-background',
                    normalSelector: [`.${props.elementId} .gvnews_pb_boxed`, `.${props.elementId}`],
                    hoverSelector: [`.${props.elementId} .gvnews_pb_boxed:hover`, `.${props.elementId}:hover`],
                    normalOptions: ['default', 'gradient'],
                    hoverOptions: ['default', 'gradient'],
                }),
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
                panelArray: responsivePanel,
                tabRole: TabStyle
            },
            {
                title: __('Spacing', 'gutenverse-news'),
                initialOpen: false,
                panelArray: (props) => advancePanel({
                    ...props,
                    styleId: 'block-21-advance',
                }),
                tabRole: TabStyle
            },
            {
                title: __('Condition', 'gutenverse'),
                panelArray: conditionPanel,
                initialOpen: false,
                pro: true
            },
        ]
    );
};