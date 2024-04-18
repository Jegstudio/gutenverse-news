import { __ } from '@wordpress/i18n';
import { advancePanel, borderPanel, responsivePanel } from 'gutenverse-core/controls';
import { filterHero } from '../../../control-panel/panel-herofilter';
import { settingHero } from '../../../control-panel/panel-herosetting';
import { designHero } from '../../../control-panel/panel-herodesign';
import { styleHero } from '../../../control-panel/panel-herostyle';
import { sliderHero } from '../../../control-panel/panel-heroslider';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';

export const panelList = () => {
    return [
        {
            title: __('Hero Setting', 'gutenverse-news'),
            initialOpen: false,
            panelArray: settingHero,
            tabRole: TabSetting
        },
        {
            title: __('Content Filter', 'gutenverse-news'),
            initialOpen: false,
            panelArray: filterHero,
            tabRole: TabSetting
        },
        {
            title: __('Hero Design', 'gutenverse-news'),
            initialOpen: false,
            panelArray: designHero,
            tabRole: TabStyle
        },
        {
            title: __('Hero Style', 'gutenverse-news'),
            initialOpen: false,
            panelArray: styleHero,
            tabRole: TabStyle
        },
        {
            title: __('Hero Slider', 'gutenverse-news'),
            initialOpen: false,
            panelArray: sliderHero,
            tabRole: TabStyle
        },
        {
            title: __('Border', 'gutenverse-news'),
            initialOpen: false,
            panelArray: (props) => borderPanel({
                ...props,
                selector: [ `.${props.elementId} .gvnews_heroblock` ],
            }),
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