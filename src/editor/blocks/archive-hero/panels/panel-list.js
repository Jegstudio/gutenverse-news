import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, conditionPanel, positioningPanel, responsivePanel } from 'gutenverse-core/controls';
import { generalPanel } from './panel-general';
import { heroDesignPanel } from './panel-hero-design';
import { heroStylePanel } from './panel-hero-style';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { typePanel } from './panel-type';
import { categoryStylePanel } from '../../../control-panel/panel-category-style';
import { metaPanel } from './panel-meta';
import { metaStylePanel } from './panel-meta-style';
import { noContentPanel } from '../../../control-panel/panel-no-content';

export const panelList = () => {
    return [
        {
            title: __('General', 'gutenverse-news'),
            initialOpen: false,
            panelArray: generalPanel,
            tabRole: TabSetting
        },
        {
            title: __('Hero Type', 'gutenverse-news'),
            initialOpen: false,
            panelArray: typePanel,
            tabRole: TabSetting
        },
        {
            title: __('Meta Settings', 'gutenverse-news'),
            initialOpen: false,
            panelArray: metaPanel,
            tabRole: TabSetting
        },
        {
            title: __('Hero Style', 'gutenverse-news'),
            initialOpen: false,
            panelArray: heroStylePanel,
            tabRole: TabStyle
        },
        {
            title: __('Hero Design', 'gutenverse-news'),
            initialOpen: false,
            panelArray: heroDesignPanel,
            tabRole: TabStyle
        },
        {
            title: __('Meta Style', 'gutenverse-news'),
            initialOpen: false,
            panelArray: metaStylePanel,
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
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'archive-hero-background',
                normalOptions: ['default', 'gradient'],
                hoverOptions: ['default', 'gradient'],
                normalSelector: `.${props.elementId} .gvnews_heroblock`,
                hoverSelector: `.${props.elementId} .gvnews_heroblock:hover`
            }),
            tabRole: TabStyle
        },
        {
            title: __('Border', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => borderPanel({
                ...props,
                styleId: 'archive-pagination-border',
            }),
            tabRole: TabStyle
        },
        {
            title: __('Display', 'gutenverse'),
            initialOpen: false,
            panelArray: responsivePanel,
            tabRole: TabStyle
        },
        {
            title: __('Positioning', 'gutenverse'),
            initialOpen: false,
            panelArray: positioningPanel,
            tabRole: TabStyle
        },
        {
            title: __('Animation Effects', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => animationPanel({
                ...props,
                styleId: 'archive-pagination-animation'
            }),
            tabRole: TabStyle
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'archive-pagination-advance',
            }),
            tabRole: TabSetting
        }, {
            title: __('Condition', 'gutenverse-news'),
            panelArray: conditionPanel,
            initialOpen: false,
            pro: true
        }
    ]
};