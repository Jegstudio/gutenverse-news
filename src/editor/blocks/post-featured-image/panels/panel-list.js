import { __ } from '@wordpress/i18n';
import { advancePanel, responsivePanel } from 'gutenverse-core/controls';
import { generalPanel } from './panel-general';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { imageBorderPanel } from './panel-image-border';
import { containerBorderPanel } from './pane-container-border';

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
                styleId: 'post-featured-advanced',
            }),
            tabRole: TabSetting
        },
        {
            title: __('Image Border', 'gutenverse-news'),
            initialOpen: false,
            panelArray: imageBorderPanel,
            tabRole: TabStyle
        },
        {
            title: __('Container Border', 'gutenverse-news'),
            initialOpen: false,
            panelArray: containerBorderPanel,
            tabRole: TabStyle
        },
    ];
};