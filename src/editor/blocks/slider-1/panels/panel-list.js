import { __ } from '@wordpress/i18n';
import { advancePanel, borderPanel, conditionPanel, responsivePanel } from 'gutenverse-core/controls';
import { filterPanel } from '../../../control-panel/panel-filter';
import { sliderPanel } from '../../../control-panel/panel-slider';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { categoryStylePanel } from '../../../control-panel/panel-category-style';
import { navigationButtonStylePanel } from '../../../control-panel/panel-navigation-button-style';
import { metaPanel } from '../../../control-panel/panel-meta';
import { metaStylePanel } from '../../../control-panel/panel-meta-style';
import { designPanel } from './panel-design';

export const panelList = () => {
    return [
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
            title: __('Navigation Button Style', 'gutenverse-news'),
            initialOpen: false,
            panelArray: (props) => navigationButtonStylePanel({
                ...props,
                sliderType: 'slider-1',
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
    ];
};