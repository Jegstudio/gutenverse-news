import { __ } from '@wordpress/i18n';
import { backgroundPanel, borderPanel, conditionPanel, positioningPanel, LockedProPanel, responsivePanel } from 'gutenverse-core/controls';
import { biographyStylePanel } from './panel-biography-style';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import layoutPanel from './panel-layout';
import { avatarStylePanel } from './panel-avatar-style';
import { nameStylePanel } from './panel-name-style';
import { iconStylePanel } from './panel-icon-style';
import { generalPanel } from './panel-general';
import { applyFilters } from '@wordpress/hooks';
import LockedNewsAuthorDonation from '../../../controls/locked/locked-news-author-donation';

export const panelList = () => {
    return applyFilters('gvnews.post-author.panel.panelList', [
        {
            id: 'general',
            title: __('General', 'gutenverse-news'),
            initialOpen: false,
            panelArray: generalPanel,
            tabRole: TabSetting
        },
        {
            id: 'display',
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
            id: 'spacing',
            title: __('Spacing', 'gutenverse-news'),
            initialOpen: false,
            panelArray: layoutPanel,
            tabRole: TabSetting
        },
        // Style
        {
            id: 'nameStyle',
            title: __('Name Style', 'gutenverse'),
            initialOpen: false,
            panelArray: nameStylePanel,
            tabRole: TabStyle
        },
        {
            id: 'biographyStyle',
            title: __('Biography Style', 'gutenverse'),
            initialOpen: false,
            panelArray: biographyStylePanel,
            tabRole: TabStyle
        },
        {
            id: 'avatarStyle',
            title: __('Avatar Style', 'gutenverse'),
            initialOpen: false,
            panelArray: avatarStylePanel,
            tabRole: TabStyle
        },
        {
            id: 'iconStyle',
            title: __('Social Icon Style', 'gutenverse'),
            initialOpen: false,
            panelArray: iconStylePanel,
            tabRole: TabStyle
        },
        {
            title: __('Donation Style', 'gutenverse-news'),
            id: 'donationStyle',
            initialOpen: false,
            panelArray: () => {
                return [{
                    component: LockedNewsAuthorDonation,
                }];
            },
            pro: true,
            tabRole: TabStyle,
        },
        {
            id: 'background',
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
            id: 'border',
            title: __('Border', 'gutenverse-news'),
            initialOpen: false,
            panelArray: borderPanel,
            tabRole: TabStyle
        },
        {
            id: 'condition',
            title: __('Condition', 'gutenverse-news'),
            panelArray: conditionPanel,
            initialOpen: false,
            pro: true
        },
    ]);
};
