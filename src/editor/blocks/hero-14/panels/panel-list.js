import { __ } from '@wordpress/i18n';
import { advancePanel, borderPanel, conditionPanel, responsivePanel } from 'gutenverse-core/controls';
import { filterHero } from '../../../control-panel/panel-herofilter';
import { settingHero } from './panel-herosetting';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { readmoreStylePanel } from '../../../control-panel/panel-readmore-style';
import { categoryStylePanel } from '../../../control-panel/panel-category-style';
import { applyFilters } from '@wordpress/hooks';

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
                title: __('Content Filter', 'gutenverse-news'),
                initialOpen: false,
                panelArray: filterHero,
                tabRole: TabSetting
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