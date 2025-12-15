import { __ } from '@wordpress/i18n';
import { advancePanel, borderPanel, conditionPanel, responsivePanel } from 'gutenverse-core/controls';
import { filterPanel } from '../../../control-panel/panel-filter';
import { sliderPanel } from './panel-slider';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { readmoreStylePanel } from '../../../control-panel/panel-readmore-style';
import { categoryStylePanel } from '../../../control-panel/panel-category-style';
import { applyFilters } from '@wordpress/hooks';
import { designPanel } from './panel-design';
import { nextButtonStylePanel } from '../../../control-panel/panel-next-button-style';
import { prevButtonStylePanel } from '../../../control-panel/panel-prev-button-style';

export const panelList = () => {
    return applyFilters(
        'gutenverse.news.slider.panels',
        [
            {
                title: __('General', 'gutenverse-news'),
                initialOpen: false,
                panelArray: sliderPanel,
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
                panelArray: designPanel,
                tabRole: TabStyle
            },
            {
                title: __('Next Button Style', 'gutenverse-news'),
                initialOpen: false,
                panelArray: (props) => nextButtonStylePanel({
                    ...props,
                    sliderType: 'slider-7',
                }),
                tabRole: TabStyle,
            },
            {
                title: __('Prev Button Style', 'gutenverse-news'),
                initialOpen: false,
                panelArray: (props) => prevButtonStylePanel({
                    ...props,
                    sliderType: 'slider-7',
                }),
                tabRole: TabStyle,
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