import { __ } from '@wordpress/i18n';
import { advancePanel, backgroundPanel, borderPanel, responsivePanel, conditionPanel } from 'gutenverse-core/controls';
import { filterPanel } from '../../../control-panel/panel-filter';
import { headerSettingsPanel, HeaderFilterDropdownPanel, headerStylesPanel } from '../../../control-panel/panel-header';
import { settingPanel } from '../../../control-panel/panel-setting';
import { paginationPanel } from '../../../control-panel/panel-pagination';
import { designPanel } from '../../../control-panel/panel-design';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { categoryStylePanel } from '../../../control-panel/panel-category-style';
import { readmoreStylePanel } from '../../../control-panel/panel-readmore-style';
import { applyFilters } from '@wordpress/hooks';
import { headerFilterPanel } from '../../../control-panel/panel-header-filter';
import { paginationStylePanel } from '../../../control-panel/panel-pagination-style';
import { metaPanel } from '../../../control-panel/panel-meta';
import { metaStylePanel } from '../../../control-panel/panel-meta-style';
import { thumbnailSettingPanel } from '../../../control-panel/panel-thumbnail-setting';
import { thumbnailOverlayPanel } from '../../../control-panel/panel-thumbnail-overlay';
import { contentContainerPanel } from '../../../control-panel/panel-content-container';

export const panelList = () => {
    return applyFilters(
        'gutenverse.news.block.panels',
        [
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
                panelArray: (props) => metaPanel(props, ['author', 'date', 'comment']),
                tabRole: TabSetting
            },
            {
                title: __('Pagination', 'gutenverse-news'),
                initialOpen: false,
                panelArray: paginationPanel,
                tabRole: TabSetting
            },
            // Style
            {
                title: __('Header', 'gutenverse-news'),
                initialOpen: false,
                panelArray: (props) => headerStylesPanel({
                    ...props,
                }),
                tabRole: TabStyle
            },
            {
                title: __('Header Filter Dropdown', 'gutenverse-news'),
                initialOpen: false,
                panelArray: HeaderFilterDropdownPanel,
                tabRole: TabStyle
            },
            {
                title: __('Design', 'gutenverse-news'),
                initialOpen: false,
                panelArray: designPanel,
                tabRole: TabStyle
            },
            {
                title: __('Thumbnail', 'gutenverse-news'),
                initialOpen: false,
                panelArray: thumbnailSettingPanel,
                tabRole: TabStyle,
            },
            {
                title: __('Thumbnail Overlay', 'gutenverse-news'),
                initialOpen: false,
                panelArray: thumbnailOverlayPanel,
                tabRole: TabStyle,
            },
            {
                title: __('Content Container', 'gutenverse-news'),
                initialOpen: false,
                panelArray: contentContainerPanel,
                tabRole: TabStyle,
            },
            {
                title: __('Meta Style', 'gutenverse-news'),
                initialOpen: false,
                panelArray: (props) => metaStylePanel(props, ['author', 'date', 'comment']),
                tabRole: TabStyle
            },
            {
                title: __('Category Label', 'gutenverse-news'),
                initialOpen: false,
                panelArray: categoryStylePanel,
                tabRole: TabStyle
            },
            {
                title: __('Read More Button', 'gutenverse-news'),
                initialOpen: false,
                panelArray: readmoreStylePanel,
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
                tabRole: TabSetting
            },
            {
                title: __('Condition', 'gutenverse-news'),
                panelArray: conditionPanel,
                initialOpen: false,
                pro: true
            },
        ]);
};