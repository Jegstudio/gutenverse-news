import { __ } from '@wordpress/i18n';
import { backgroundPanel, borderPanel, responsivePanel } from 'gutenverse-core/controls';
import { TabStyle } from 'gutenverse-core/controls';
import { layoutPanel } from './panel-layout';
import { stylingPanel } from './panel-styling';

export const panelList = () => {
    return [
        {
            title: __('Style', 'gutenverse-news'),
            initialOpen: false,
            panelArray: stylingPanel,
            tabRole: TabStyle,
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
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'post-breadcumb-background',
                normalOptions: ['default', 'gradient'],
                hoverOptions: ['default', 'gradient'],
                normalSelector: `.${props.elementId} .gvnews_breadcrumb_container`,
                hoverSelector: `.${props.elementId} .gvnews_breadcrumb_container:hover`
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