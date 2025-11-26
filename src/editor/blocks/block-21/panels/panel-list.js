import { __ } from '@wordpress/i18n';
import { advancePanel, backgroundPanel, borderPanel, responsivePanel, conditionPanel } from 'gutenverse-core/controls';
import { filterPanel } from '../../../control-panel/panel-filter';
import { settingPanel } from '../../../control-panel/panel-setting';
import { paginationPanel } from '../../../control-panel/panel-pagination';
import { designPanel } from '../../../control-panel/panel-design';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { headerFilterPanel } from '../../../control-panel/panel-header-filter';
import { paginationStylePanel } from '../../../control-panel/panel-pagination-style';
import { metaPanel } from '../../../control-panel/panel-meta';
import { metaStylePanel } from '../../../control-panel/panel-meta-style';
import { headerSettingsPanel, headerStylesPanel } from '../../../control-panel/panel-header';


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
            title: __('Meta Settings', 'gutenverse-news'),
            initialOpen: false,
            panelArray: (props) => metaPanel(props, ['date']),
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
            title: __('Meta Style', 'gutenverse-news'),
            initialOpen: false,
            panelArray: (props) => metaStylePanel(props, ['date']),
            tabRole: TabStyle
        },
        {
            title: __('Pagination Style', 'gutenverse-news'),
            initialOpen: false,
            panelArray: paginationStylePanel,
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
            title: __('Condition', 'gutenverse-news'),
            panelArray: conditionPanel,
            initialOpen: false,
            pro: true
        },
    ];
};