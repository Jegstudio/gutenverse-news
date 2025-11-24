import { __ } from '@wordpress/i18n';
import { advancePanel, borderPanel, responsivePanel, LockedProPanel, conditionPanel } from 'gutenverse-core/controls';
import { filterPanel } from '../../../control-panel/panel-filter';;
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { applyFilters } from '@wordpress/hooks';
import { metaPanel } from '../../../control-panel/panel-meta';
import { metaStylePanel } from '../../../control-panel/panel-meta-style';
import { carouselDesignPanel } from '../../../control-panel/panel-design';
import { categoryStylePanel } from '../../../control-panel/panel-category-style';

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
                panelArray: (props) => metaPanel(props, ['date']),
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
                title: __('Spacing', 'gutenverse-news'),
                initialOpen: false,
                panelArray: (props) => advancePanel({
                    ...props,
                }),
                tabRole: TabStyle
            }, {
                title: __('Condition', 'gutenverse-news'),
                panelArray: conditionPanel,
                initialOpen: false,
                pro: true
            },
        ]
    );
};