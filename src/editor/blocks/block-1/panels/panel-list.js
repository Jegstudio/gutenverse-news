import { __ } from '@wordpress/i18n';
import { advancePanel, backgroundPanel, borderPanel, responsivePanel } from 'gutenverse-core/controls';
import { filterPanel } from '../../../control-panel/panel-filter';
import { headerSettingsPanel, headerStylesPanel } from '../../../control-panel/panel-header';
import { headerFilterPanel } from '../../../control-panel/panel-header-filter';
import { settingPanel } from '../../../control-panel/panel-setting';
import { paginationPanel } from '../../../control-panel/panel-pagination';
import { designPanel } from '../../../control-panel/panel-design';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';

export const panelList = () => {
    return [
        {
            title: __('Header', 'gutenverse-news'),
            initialOpen: false,
            panelArray: (props) => headerSettingsPanel({
                ...props,
            }),
            tabRole: TabSetting
        },
        {
            title: __('Header Filter', 'gutenverse-news'),
            initialOpen: false,
            panelArray: (props) => headerFilterPanel({
                ...props,
            }),
            tabRole: TabSetting
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
            title: __('Header', 'gutenverse-news'),
            initialOpen: false,
            panelArray: (props) => headerStylesPanel({
                ...props,
            }),
            tabRole: TabStyle
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
                styleId: 'block-1-background',
                normalSelector: [`.${props.elementId} .gvnews_postblock`],
                hoverSelector: [`.${props.elementId} .gvnews_postblock:hover`],
                normalOptions: ['default', 'gradient'],
                hoverOptions: ['default', 'gradient'],
            }),
            tabRole: TabStyle
        },
        {
            title: __('Border', 'gutenverse-news'),
            initialOpen: false,
            panelArray: (props) => borderPanel({
                ...props,
                selector: [`.${props.elementId} .gvnews_postblock`],
            }),
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
                styleId: 'block-1-advance',
            }),
            tabRole: TabStyle
        },
    ];
};
