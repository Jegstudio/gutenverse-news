import { __ } from '@wordpress/i18n';
import { advancePanel, backgroundPanel, borderPanel, responsivePanel } from 'gutenverse-core/controls';
import { generalPanel } from './panel-general';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
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
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'post-comment-advanced',
            }),
            tabRole: TabSetting
        },
        {
            title: __('Heading Typography', 'gutenverse-news'),
            panelArray: headingTypographyPanel,
            tabRole: TabStyle
        },
        {
            title: __('Text Typography', 'gutenverse-news'),
            panelArray: textTypographyPanel,
            tabRole: TabStyle
        },
        {
            title: __('Link Typography', 'gutenverse-news'),
            panelArray: linkTypographyPanel,
            tabRole: TabStyle
        },
        {
            title: __('Label Typography', 'gutenverse-news'),
            panelArray: labelTypographyPanel,
            tabRole: TabStyle
        },
        {
            title: __('Comment Inputs', 'gutenverse-news'),
            panelArray: inputPanel,
            tabRole: TabStyle
        },
        {
            title: __('Comment Main', 'gutenverse-news'),
            panelArray: mainCommentPanel,
            tabRole: TabStyle
        },
        {
            title: __('Comment Reply', 'gutenverse-news'),
            panelArray: replyPanel,
            tabRole: TabStyle
        },
        {
            title: __('Separator', 'gutenverse-news'),
            panelArray: separatorPanel,
            tabRole: TabStyle,
        },
        {
            title: __('Avatar', 'gutenverse-news'),
            panelArray: avatarPanel,
            tabRole: TabStyle
        },
        {
            title: __('Submit Button', 'gutenverse-news'),
            panelArray: buttonPanel,
            tabRole: TabStyle
        },
        {
            title: __('Background', 'gutenverse-news'),
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
            title: __('Border', 'gutenverse-news'),
            initialOpen: false,
            panelArray: borderPanel,
            tabRole: TabStyle
        },
    ];
};