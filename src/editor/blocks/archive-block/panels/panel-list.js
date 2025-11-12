import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, conditionPanel, positioningPanel, responsivePanel } from 'gutenverse-core/controls';
import { designPanel } from './panel-design';
import { generalPanel } from './panel-general';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { panelType } from './panel-type';
import { readmoreStylePanel } from '../../../control-panel/panel-readmore-style';
import { metaPanel } from './panel-meta';
import { metaStylePanel } from './panel-meta-style';
import { categoryStylePanel } from '../../../control-panel/panel-category-style';


export const panelList = () => {
    return [
        {
            title: __('Block Type', 'gutenverse-news'),
            initialOpen: false,
            panelArray: panelType,
            tabRole: TabSetting,
        },
        {
            title: __('General', 'gutenverse-news'),
            initialOpen: false,
            panelArray: generalPanel,
            tabRole: TabSetting
        },
        {
            title: __('Meta Settings', 'gutenverse-news'),
            initialOpen: false,
            panelArray: metaPanel,
            tabRole: TabSetting
        },
        {
            title: __('Design', 'gutenverse-news'),
            initialOpen: false,
            panelArray: designPanel,
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
            title: __('Read More Button', 'gutenverse-news'),
            initialOpen: false,
            panelArray: readmoreStylePanel,
            tabRole: TabStyle
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'archive-block-background',
                normalOptions: ['default', 'gradient'],
                hoverOptions: ['default', 'gradient'],
                normalSelector: `.gvnews-block.gvnews-block-wrapper.${props.elementId}`,
                hoverSelector: `.gvnews-block.gvnews-block-wrapper.${props.elementId}:hover`
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
            panelArray: (props) => positioningPanel({
                ...props,
                selector: `.${props.elementId}`
            }),
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
            tabRole: TabStyle
        }, {
            title: __('Condition', 'gutenverse-news'),
            panelArray: conditionPanel,
            initialOpen: false,
            pro: true
        }
    ];
};