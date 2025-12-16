import { __ } from '@wordpress/i18n';
import { backgroundPanel, borderPanel, conditionPanel, responsivePanel } from 'gutenverse-core/controls';
import { biographyStylePanel } from './panel-biography-style';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import layoutPanel from './panel-layout';
import { avatarStylePanel } from './panel-avatar-style';
import { nameStylePanel } from './panel-name-style';
import { iconStylePanel } from './panel-icon-style';
import { generalPanel } from './panel-general';

export const panelList = () => {
    return [
        {
            title: __('General', 'gutenverse-news'),
            initialOpen: false,
            panelArray: generalPanel,
            tabRole: TabSetting
        },
        {
            title: __('Display', 'gutenverse-news'),
            initialOpen: false,
            panelArray: responsivePanel,
            tabRole: TabSetting
        },
        {
            title: __('Spacing', 'gutenverse-news'),
            initialOpen: false,
            panelArray: layoutPanel,
            tabRole: TabSetting
        },
        {
            title: __('Name Style', 'gutenverse'),
            initialOpen: false,
            panelArray: nameStylePanel,
            tabRole: TabStyle
        },
        {
            title: __('Biography Style', 'gutenverse'),
            initialOpen: false,
            panelArray: biographyStylePanel,
            tabRole: TabStyle
        },
        {
            title: __('Avatar Style', 'gutenverse'),
            initialOpen: false,
            panelArray: avatarStylePanel,
            tabRole: TabStyle
        },
        {
            title: __('Social Icon Style', 'gutenverse'),
            initialOpen: false,
            panelArray: iconStylePanel,
            tabRole: TabStyle
        },
        {
            title: __('Background', 'gutenverse-news'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'post-author-background',
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