import { __ } from '@wordpress/i18n';
import { advancePanel, borderPanel, responsivePanel } from 'gutenverse-core/controls';
import { generalPanel } from './panel-general';
import { headerPanel } from './panel-header';
import { filterPanel } from './panel-filter';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';

export const panelList = () => {
    return [
        {
            title: __('General', 'gutenverse-news'),
            initialOpen: false,
            panelArray: generalPanel,
            tabRole: TabSetting
        },
        {
            title: __('Header', 'gutenverse-news'),
            initialOpen: false,
            panelArray: headerPanel,
            tabRole: TabSetting
        },
        {
            title: __('Filter', 'gutenverse-news'),
            initialOpen: false,
            panelArray: (props) => filterPanel({
                ...props,
            }),
            tabRole: TabSetting
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
        {
            title: __('Spacing', 'gutenverse-news'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'block-1-advance',
            }),
            tabRole: TabStyle
        }
    ];
};