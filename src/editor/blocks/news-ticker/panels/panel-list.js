import { __ } from '@wordpress/i18n';
import { advancePanel, borderPanel, responsivePanel, positioningPanel } from 'gutenverse-core/controls';
import { settingPanel } from './panel-setting';
import { generalPanel } from './panel-general';
import { designPanel } from './panel-design';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';

export const panelList = () => {
    return [
        /* Put Your List Here */
        {
            title: __('General', 'gutenverse-news'),
            panelArray: (props) => generalPanel({
                ...props,
            }),
            tabRole: TabSetting
        },
        {
            title: __('Content Filter', 'gutenverse-news'),
            initialOpen: false,
            panelArray: settingPanel,
            tabRole: TabSetting
        },
        {
            title: __('Design', 'gutenverse-news'),
            panelArray: (props) => designPanel({
                ...props,
                styleId: 'news-ticker-background',
                normalOptions: [ 'default', 'gradient' ],
            }),
            tabRole: TabSetting
        },
        {
            title: __('Border', 'gutenverse-news'),
            initialOpen: false,
            panelArray: (props) => borderPanel({
                ...props,
                styleId: 'news-ticker-border',
            }),
            tabRole: TabStyle,
        },
        {
            title: __('Display', 'gutenverse-news'),
            initialOpen: false,
            panelArray: responsivePanel,
            tabRole: TabStyle,
        },
        {
            title: __('Positioning', 'gutenverse-news'),
            initialOpen: false,
            panelArray: positioningPanel,
            tabRole: TabStyle,
        },
        {
            title: __('Spacing', 'gutenverse-news'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'news-ticker-advance',
            }),
            tabRole: TabStyle,
        }
    ];
};