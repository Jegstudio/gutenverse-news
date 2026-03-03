import { __ } from '@wordpress/i18n';
import { advancePanel, borderPanel, conditionPanel, positioningPanel, responsivePanel } from 'gutenverse-core/controls';
import { filterPanel } from '../../../control-panel/panel-filter';
import { sliderPanel } from './panel-slider';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { applyFilters } from '@wordpress/hooks';
import { metaPanel } from '../../../control-panel/panel-meta';
import { metaStylePanel } from '../../../control-panel/panel-meta-style';
import { designPanel } from './panel-design';
import { categoryStylePanel } from '../../../control-panel/panel-category-style';
import { dotStylePanel } from '../../../control-panel/panel-dot-style';
import { noContentPanel } from '../../../control-panel/panel-no-content';

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
                title: __('Dot Style', 'gutenverse-news'),
                initialOpen: false,
                panelArray: (props) => dotStylePanel({
                    ...props,
                    sliderType: 'slider-2'
                }),
                tabRole: TabStyle
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
        ]
    );
};