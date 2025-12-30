import { __ } from '@wordpress/i18n';
import { advancePanel, backgroundPanel, borderPanel, conditionPanel, maskPanel, positioningPanel, responsivePanel } from 'gutenverse-core/controls';
import { contentPanel } from './panel-content';
import { designPanel } from './panel-design';
import { headerPanel, headerStylesPanel } from '../../../control-panel/panel-header';
import { filterPanel } from './panel-filter';
import { paginationPanel } from '../../../control-panel/panel-pagination';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { panelType } from './panel-type';
import { metaPanel } from '../../../control-panel/panel-meta';
import { metaStylePanel } from '../../../control-panel/panel-meta-style';
import { categoryStylePanel } from '../../../control-panel/panel-category-style';
import { readmoreStylePanel } from '../../../control-panel/panel-readmore-style';
import { paginationStylePanel } from '../../../control-panel/panel-pagination-style';
import { noContentPanel } from '../../../control-panel/panel-no-content';
import { thumbnailSettingPanel } from './panel-thumbnail-setting';
import { thumbnailOverlayPanel } from './panel-thumbnail-overlay';
import { contentContainerPanel } from './panel-content-container';
import { cardStylePanelModule } from './panel-card-style';


export const panelList = () => {
    return [
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
            title: __('Block Type', 'gutenverse-news'),
            initialOpen: true,
            panelArray: panelType,
            tabRole: TabSetting,
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
            title: __('Meta Settings', 'gutenverse-news'),
            initialOpen: false,
            panelArray: (props) => metaPanel(props, ['author', 'date', 'comment']),
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
            title: __('Display', 'gutenverse-news'),
            initialOpen: false,
            panelArray: responsivePanel,
            tabRole: TabSetting
        },
        {
            title: __('Positioning', 'gutenverse'),
            initialOpen: false,
            panelArray: positioningPanel,
            tabRole: TabSetting
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
            title: __('Card Style', 'gutenverse-news'),
            initialOpen: false,
            panelArray: cardStylePanelModule,
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
            title: __('No Content', 'gutenverse-news'),
            initialOpen: false,
            panelArray: noContentPanel,
            tabRole: TabStyle
        },
        {
            title: __('Background', 'gutenverse-news'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'post-related-background',
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
            title: __('Masking', 'gutenverse'),
            initialOpen: false,
            panelArray: maskPanel,
            tabRole: TabStyle
        }, {
            title: __('Condition', 'gutenverse-news'),
            panelArray: conditionPanel,
            initialOpen: false,
            pro: true
        }
    ];
};