import { __ } from '@wordpress/i18n';
import { advancePanel, borderPanel, responsivePanel } from 'gutenverse-core/controls';
import { generalPanel } from './panel-general';
import { headerPanel } from './panel-header';
import { filterPanel } from './panel-filter';

export const panelList = () => {
    return [
        {
            title: __('General', 'gutenverse-news'),
            initialOpen: false,
            panelArray: generalPanel
        },
        {
            title: __('Header', 'gutenverse-news'),
            initialOpen: false,
            panelArray: headerPanel
        },
        {
            title: __('Filter', 'gutenverse-news'),
            initialOpen: false,
            panelArray: (props) => filterPanel({
                ...props,
            })
        },
        {
            title: __('Border', 'gutenverse-news'),
            initialOpen: false,
            panelArray: borderPanel
        },
        {
            title: __('Display', 'gutenverse-news'),
            initialOpen: false,
            panelArray: responsivePanel
        },
        {
            title: __('Spacing', 'gutenverse-news'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'block-1-advance',
            })
        }
    ];
};