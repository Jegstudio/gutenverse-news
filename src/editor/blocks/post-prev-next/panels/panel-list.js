import { __ } from '@wordpress/i18n';
import { advancePanel, backgroundPanel, borderPanel, responsivePanel } from 'gutenverse-core/controls';
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
                styleId: 'post-prev-next-advance',
            }),
            tabRole: TabSetting
        },
        // Style
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
        {
            title: __('Background', domain),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'post-prev-next-background',
                normalOptions: ['default', 'gradient'],
                hoverOptions: ['default', 'gradient'],
            }),
            tabRole: TabStyle
        }
    ];
};