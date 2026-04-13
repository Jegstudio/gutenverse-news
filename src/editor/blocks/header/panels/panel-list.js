import { __ } from '@wordpress/i18n';
import { advancePanel, borderPanel, conditionPanel, positioningPanel, responsivePanel } from 'gutenverse-core/controls';
import { headerPanel } from './panel-header';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { stylePanel } from './panel-style';

export const panelList = () => {
    return [
        {
            title: __('Header', 'gutenverse-news'),
            initialOpen: false,
            panelArray: headerPanel,
            tabRole: TabSetting
        },
        {
            title: __('Style', 'gutenverse-news'),
            initialOpen: false,
            panelArray: stylePanel,
            tabRole: TabStyle
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
        },
        {
            title: __('Condition', 'gutenverse-news'),
            panelArray: conditionPanel,
            initialOpen: false,
            pro: true
        },
    ];
};