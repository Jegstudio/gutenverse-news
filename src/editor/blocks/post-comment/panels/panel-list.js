import { __ } from '@wordpress/i18n';
import { advancePanel, backgroundPanel, borderPanel, responsivePanel } from 'gutenverse-core/controls';
import { generalPanel } from './panel-general';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import layoutPanel from './panel-layout';

export const panelList = () => {
    return [
        {
            title: __('General', 'gutenverse-news'),
            initialOpen: false,
            panelArray: generalPanel,
            tabRole: TabSetting
        },
        {
            title: __('Layout', 'gutenverse-news'),
            initialOpen: false,
            panelArray: layoutPanel,
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
        {
            title: __('Display', 'gutenverse-news'),
            initialOpen: false,
            panelArray: responsivePanel,
            tabRole: TabStyle
        },
    ];
};