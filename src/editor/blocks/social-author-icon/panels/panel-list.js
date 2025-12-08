import { __ } from '@wordpress/i18n';
import { TabSetting, TabStyle, conditionPanel, responsivePanel, backgroundPanel, borderPanel } from 'gutenverse-core/controls';
import { generalPanel } from './panel-general';
import { iconPanel } from './panel-icon';

export const panelList = () => {
    return [
        {
            title: __('General', 'gutenverse-news'),
            initialOpen: true,
            panelArray: generalPanel,
            tabRole: TabSetting
        },
        {
            title: __('Color', 'gutenverse-news'),
            initialOpen: false,
            panelArray: iconPanel,
            tabRole: TabStyle
        },
        {
            title: __('Display', 'gutenverse-news'),
            initialOpen: false,
            panelArray: responsivePanel,
            tabRole: TabSetting
        },
        {
            title: __('Background', 'gutenverse-news'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'social-author-icon-background',
                normalOptions: ['default', 'gradient'],
                hoverOptions: ['default', 'gradient'],
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
            title: __('Condition', 'gutenverse-news'),
            panelArray: conditionPanel,
            initialOpen: false,
            pro: true
        },
    ];
};
