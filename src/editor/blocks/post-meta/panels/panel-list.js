import { __ } from '@wordpress/i18n';
import { backgroundPanel, borderPanel, responsivePanel } from 'gutenverse-core/controls';
import { generalPanel } from './panel-general';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import layoutPanel from './panel-layout';
import { styleAuthorPanel } from './panel-style-author';
import { styleDatePanel } from './panel-style-date';
import { styleCategoryPanel } from './panel-style-category';
import { styleCommentPanel } from './panel-style-comment';

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
            title: __('Author Style', 'gutenverse-news'),
            initialOpen: false,
            panelArray: styleAuthorPanel,
            tabRole: TabStyle,
        },
        {
            title: __('Date Style', 'gutenverse-news'),
            initialOpen: false,
            panelArray: styleDatePanel,
            tabRole: TabStyle,
        },
        {
            title: __('Category Style', 'gutenverse-news'),
            initialOpen: false,
            panelArray: styleCategoryPanel,
            tabRole: TabStyle,
        },
        {
            title: __('Comment Style', 'gutenverse-news'),
            initialOpen: false,
            panelArray: styleCommentPanel,
            tabRole: TabStyle,
        },
        {
            title: __('Background', 'gutenverse-news'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'post-meta-background',
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
    ];
};