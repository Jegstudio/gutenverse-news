import { __ } from '@wordpress/i18n';
import { advancePanel, borderPanel, responsivePanel, LockedProPanel, conditionPanel, positioningPanel } from 'gutenverse-core/controls';
import { filterPanel } from '../../../control-panel/panel-filter';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { applyFilters } from '@wordpress/hooks';
import { metaPanel } from '../../../control-panel/panel-meta';
import { metaStylePanel } from '../../../control-panel/panel-meta-style';
import { carouselDesignPanel } from '../../../control-panel/panel-design';
import { categoryStylePanel } from '../../../control-panel/panel-category-style';
import { thumbnailSettingPanel } from '../../../control-panel/panel-thumbnail-setting';
import { noContentPanel } from '../../../control-panel/panel-no-content';
import { carouselThumbnailOverlayPanel } from '../../../control-panel/panel-thumbnail-overlay';

export const panelList = () => {

    return applyFilters(
        'gutenverse.news.carousel.panels',
        [
            {
                id: 'carousel-panel',
                title: __('General', 'gutenverse-news'),
                initialOpen: false,
                pro: true,
                panelArray: () => {
                    return [{
                        component: LockedProPanel,
                    }];
                },
                tabRole: TabSetting
            },
            {
                title: __('Meta Settings', 'gutenverse-news'),
                initialOpen: false,
                panelArray: (props) => metaPanel(props, ['date', 'review']),
                tabRole: TabSetting
            },
            {
                title: __('Content Filter', 'gutenverse-news'),
                initialOpen: false,
                panelArray: filterPanel,
                tabRole: TabSetting
            },
            {
                title: __('Design', 'gutenverse-news'),
                initialOpen: false,
                panelArray: carouselDesignPanel,
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
                panelArray: (props) => carouselThumbnailOverlayPanel(props, true),

                tabRole: TabStyle,
            },
            {
                title: __('Meta Style', 'gutenverse-news'),
                initialOpen: false,
                panelArray: (props) => metaStylePanel(props, ['date'], true, 'disable'),
                tabRole: TabStyle
            },
            {
                title: __('Category Label', 'gutenverse-news'),
                initialOpen: false,
                panelArray: categoryStylePanel,
                tabRole: TabStyle
            },
            {
                title: __('No Content', 'gutenverse-news'),
                initialOpen: false,
                panelArray: noContentPanel,
                tabRole: TabStyle
            },
            {
                title: __('Border', 'gutenverse-news'),
                initialOpen: false,
                panelArray: (props) => borderPanel({
                    ...props,
                    selector: [`.${props.elementId} `],
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
                }),
                tabRole: TabSetting
            }, {
                title: __('Condition', 'gutenverse-news'),
                panelArray: conditionPanel,
                initialOpen: false,
                pro: true
            },
        ],
        ['postTitleHtmlTag', 'fetchPriorityHigh', 'responsiveItem']
    );
};