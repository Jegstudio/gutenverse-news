import { __ } from '@wordpress/i18n';
import { backgroundPanel, borderPanel, responsivePanel } from 'gutenverse-core/controls';
import { generalPanel } from './panel-general';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import layoutPanel from './panel-layout';
import { headingTypographyPanel } from './panel-typography-heading';
import { textTypographyPanel } from './panel-typography-text';
import { linkTypographyPanel } from './panel-typography-link';
import { labelTypographyPanel } from './panel-typography-label';
import { avatarPanel } from './panel-avatar';
import { buttonPanel } from './panel-button';
import { inputPanel } from './panel-input';
import { replyPanel } from './panel-reply';
import { mainCommentPanel } from './panel-main-comment';
import { separatorPanel } from './panel-separator';


export const panelList = () => {
    const domain = 'gutenverse-news';

    return [
        {
            title: __('General', domain),
            initialOpen: false,
            panelArray: generalPanel,
            tabRole: TabSetting
        },
        {
            title: __('Heading Typography', domain),
            panelArray: headingTypographyPanel,
            tabRole: TabStyle
        },
        {
            title: __('Text Typography', domain),
            panelArray: textTypographyPanel,
            tabRole: TabStyle
        },
        {
            title: __('Link Typography', domain),
            panelArray: linkTypographyPanel,
            tabRole: TabStyle
        },
        {
            title: __('Label Typography', domain),
            panelArray: labelTypographyPanel,
            tabRole: TabStyle
        },
        {
            title: __('Comment Inputs', domain),
            panelArray: inputPanel,
            tabRole: TabStyle
        },
        {
            title: __('Comment Main', domain),
            panelArray: mainCommentPanel,
            tabRole: TabStyle
        },
        {
            title: __('Comment Reply', domain),
            panelArray: replyPanel,
            tabRole: TabStyle
        },
        {
            title: __('Separator', domain),
            panelArray: separatorPanel,
            tabRole: TabStyle,
        },
        {
            title: __('Avatar', domain),
            panelArray: avatarPanel,
            tabRole: TabStyle
        },
        {
            title: __('Submit Button', domain),
            panelArray: buttonPanel,
            tabRole: TabStyle
        },
        {
            title: __('Layout', domain),
            initialOpen: false,
            panelArray: layoutPanel,
            tabRole: TabStyle
        },
        {
            title: __('Background', domain),
            initialOpen: false,
            panelArray: props => backgroundPanel({
                ...props,
                styleId: 'post-comment-background',
                normalOptions: ['default', 'gradient'],
                hoverOptions: ['default', 'gradient'],
                normalSelector: `.${props.elementId}.gvnews-post-comment`,
                hoverSelector: `.${props.elementId}.gvnews-post-comment:hover`
            }),
            tabRole: TabStyle,
        },
        {
            title: __('Border', domain),
            initialOpen: false,
            panelArray: borderPanel,
            tabRole: TabStyle
        },
        {
            title: __('Display', domain),
            initialOpen: false,
            panelArray: responsivePanel,
            tabRole: TabStyle
        },
    ];
};