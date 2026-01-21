import { __ } from '@wordpress/i18n';
import { advancePanel, backgroundPanel, borderPanel, conditionPanel, positioningPanel, responsivePanel } from 'gutenverse-core/controls';
import { generalPanel } from './panel-general';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { stylePanel } from './panel-style';

export const panelList = () => {
    return [
        {
            title: __('General', 'gutenverse-news'),
            initialOpen: false,
            panelArray: generalPanel,
            tabRole: TabSetting
        },
        {
            title: __('Style', 'gutenverse-news'),
            initialOpen: false,
            panelArray: stylePanel,
            tabRole: TabStyle
        },
        {
            title: __('Background', 'gutenverse-news'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'archive-description-background',
                normalOptions: ['default', 'gradient'],
                hoverOptions: ['default', 'gradient'],
                normalSelector: `.gvnews-block.gvnews-block-wrapper.${props.elementId} .gvnews-archive-desc`,
                hoverSelector: `.gvnews-block.gvnews-block-wrapper.${props.elementId} .gvnews-archive-desc:hover`
            }),
            tabRole: TabStyle,
        },
        {
            title: __('Border', 'gutenverse-news'),
            initialOpen: false,
            panelArray: borderPanel,
            tabRole: TabStyle
        },
        {
            title: __('Display', 'gutenverse-news'),
            initialOpen: false,
            panelArray: responsivePanel,
            tabRole: TabSetting
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
                styleId: 'block-1-advance',
            }),
            tabRole: TabSetting
        }, {
            title: __('Condition', 'gutenverse-news'),
            panelArray: conditionPanel,
            initialOpen: false,
            pro: true
        }
    ];
};