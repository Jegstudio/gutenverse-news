import { __ } from '@wordpress/i18n';
import { advancePanel, borderPanel, conditionPanel, responsivePanel, backgroundPanel } from 'gutenverse-core/controls';
import { generalPanel } from './panel-general';
import { headerSettingsPanel, headerStylesPanel } from '../../../control-panel/panel-header';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { applyFilters } from '@wordpress/hooks';
import { designPanel } from '../../../control-panel/panel-design';
import { postItemPanel } from '../../../control-panel/panel-post-item';
import { contentContainerPanel } from '../../../control-panel/panel-content-container';
import { thumbnailSettingPanel } from '../../../control-panel/panel-thumbnail-setting';
import { thumbnailOverlayPanel } from '../../../control-panel/panel-thumbnail-overlay';
import { cardStylePanelModule } from '../../../control-panel/panel-card-style-module';
import { metaStylePanel } from '../../../control-panel/panel-meta-style';
import { noContentPanel } from '../../../control-panel/panel-no-content';

export const panelList = () => {
    return applyFilters(
        'gutenverse.news.block.panels',
        [
            {
                title: __('Header', 'gutenverse-news'),
                initialOpen: true,
                panelArray: (props) => headerSettingsPanel({
                    ...props,
                }),
                tabRole: TabSetting
            },
            {
                title: __('General', 'gutenverse-news'),
                initialOpen: false,
                panelArray: generalPanel,
                tabRole: TabSetting,
            },
            {
                title: __('Spacing', 'gutenverse-news'),
                initialOpen: false,
                panelArray: (props) => advancePanel({
                    ...props,
                    styleId: 'block-1-advance',
                }),
                tabRole: TabSetting
            }, {
                title: __('Condition', 'gutenverse-news'),
                panelArray: conditionPanel,
                initialOpen: false,
                pro: true
            },
            // style
            {
                title: __('Header', 'gutenverse-news'),
                initialOpen: true,
                panelArray: (props) => headerStylesPanel({
                    ...props,
                    isFeed: true,
                }),
                tabRole: TabStyle
            },
            {
                title: __('Design', 'gutenverse-news'),
                initialOpen: false,
                panelArray: (props) => designPanel({
                    ...props,
                    enableExcerpt: true
                }),
                tabRole: TabStyle
            },
            {
                title: __('Post Item', 'gutenverse-news'),
                initialOpen: false,
                panelArray: postItemPanel,
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
                title: __('Card Style', 'gutenverse-news'),
                initialOpen: false,
                panelArray: cardStylePanelModule,
                tabRole: TabStyle,
            },
            {
                title: __('Content Container', 'gutenverse-news'),
                initialOpen: false,
                panelArray: (props) => contentContainerPanel({
                    ...props,
                    contentAlignVertical: {
                        main: true,
                    }
                }),
                tabRole: TabStyle,
            },
            {
                title: __('Meta Style', 'gutenverse-news'),
                initialOpen: false,
                panelArray: (props) => metaStylePanel(props, ['author', 'date', 'comment']),
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
        ]
    );
};