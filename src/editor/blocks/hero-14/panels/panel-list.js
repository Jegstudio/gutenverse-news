import { __ } from '@wordpress/i18n';
import { advancePanel, borderPanel, conditionPanel, responsivePanel, animationPanel } from 'gutenverse-core/controls';
import { filterHero } from '../../../control-panel/panel-herofilter';
import { settingHero } from './panel-herosetting';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { readmoreStylePanel } from '../../../control-panel/panel-readmore-style';
import { categoryStylePanel } from '../../../control-panel/panel-category-style';
import { applyFilters } from '@wordpress/hooks';
import { metaPanel } from '../../../control-panel/panel-meta';
import { metaStylePanel } from '../../../control-panel/panel-meta-style';
import { styleHero } from './panel-hero-style';
import { mainCategoryStylePanel, sideCategoryStylePanel } from './panel-category-label';
import { mainContainerPanel } from "./panel-container";

export const panelList = () => {
    return applyFilters(
        'gutenverse.news.hero.panels',
        [
            {
                title: __('Hero Setting', 'gutenverse-news'),
                initialOpen: false,
                panelArray: settingHero,
                tabRole: TabSetting
            },
            {
                title: __('Meta Settings', 'gutenverse-news'),
                initialOpen: false,
                panelArray: (props) => metaPanel(props, ['date', 'author']),
                tabRole: TabSetting
            },
            {
                title: __('Content Filter', 'gutenverse-news'),
                initialOpen: false,
                panelArray: filterHero,
                tabRole: TabSetting
            },
            {
                title: __('Hero Style', 'gutenverse-news'),
                initialOpen: false,
                panelArray: (props) => styleHero(props, 3),
                tabRole: TabStyle
            },
            {
                title: __('Meta Style', 'gutenverse-news'),
                initialOpen: false,
                panelArray: (props) => metaStylePanel(props, ['date', 'author'], true),
                tabRole: TabStyle
            },
            {
                title: __('Main Container', 'gutenverse-news'),
                initialOpen: false,
                panelArray: mainContainerPanel,
                tabRole: TabStyle
            },
            {
                title: __('Main Category Label', 'gutenverse-news'),
                initialOpen: false,
                panelArray: mainCategoryStylePanel,
                tabRole: TabStyle
            },
            {
                title: __('Side Category Label', 'gutenverse-news'),
                initialOpen: false,
                panelArray: sideCategoryStylePanel,
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
                title: __('Border', 'gutenverse-news'),
                initialOpen: false,
                panelArray: (props) => borderPanel({
                    ...props,
                    selector: [`.${props.elementId} .gvnews_heroblock`],
                }),
                tabRole: TabStyle
            },
            {
                title: __('Display', 'gutenverse-news'),
                initialOpen: false,
                panelArray: responsivePanel,
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
                title: __('Animation Effects', 'gutenverse'),
                initialOpen: false,
                panelArray: animationPanel,
                tabRole: TabSetting
            },
            {
                title: __('Condition', 'gutenverse-news'),
                panelArray: conditionPanel,
                initialOpen: false,
                pro: true
            },
        ]
    );
};