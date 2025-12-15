import { __ } from '@wordpress/i18n';
import { advancePanel, borderPanel, conditionPanel, responsivePanel } from 'gutenverse-core/controls';
import { filterPanel } from '../../../control-panel/panel-filter';
import { sliderPanel } from './panel-slider';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { categoryStylePanel } from '../../../control-panel/panel-category-style';
import { applyFilters } from '@wordpress/hooks';
import { metaPanel } from '../../../control-panel/panel-meta';
import { metaStylePanel } from '../../../control-panel/panel-meta-style';
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
                title: __('Meta Settings', 'gutenverse-news'),
                initialOpen: false,
                panelArray: (props) => metaPanel(props, ['author', 'date']),
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
                    sliderType: 'slider-6',
                }),
                tabRole: TabStyle,
            },
            {
                title: __('Prev Button Style', 'gutenverse-news'),
                initialOpen: false,
                panelArray: (props) => prevButtonStylePanel({
                    ...props,
                    sliderType: 'slider-6',
                }),
                tabRole: TabStyle,
            },
            {
                title: __('Meta Style', 'gutenverse-news'),
                initialOpen: false,
                panelArray: (props) => metaStylePanel(props, ['author', 'date'], false, 'author-only'),
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