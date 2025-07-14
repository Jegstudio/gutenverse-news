import { __ } from '@wordpress/i18n';
import { advancePanel, borderPanel, responsivePanel } from 'gutenverse-core/controls';
import { TabStyle, TabSetting } from 'gutenverse-core/controls';
import { stylePanel } from './panel-style';

export const panelList = () => {
    const domain = 'gutenverse-news';
    return [
        {
            title: __('Display', domain),
            initialOpen: false,
            panelArray: responsivePanel,
            tabRole: TabSetting
        },
        {
            title: __('Spacing', domain),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'block-1-advance',
            }),
            tabRole: TabSetting
        },
        {
            title: __('Style', domain),
            initialOpen: false,
            panelArray: stylePanel,
            tabRole: TabStyle,
        },
        {
            title: __('Border', domain),
            initialOpen: false,
            panelArray: borderPanel,
            tabRole: TabStyle
        },
    ];
};