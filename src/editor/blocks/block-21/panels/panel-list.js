import { __ } from '@wordpress/i18n';
import { advancePanel, backgroundPanel, borderPanel, responsivePanel } from 'gutenverse-core/controls';
import { filterPanel } from '../../../control-panel/panel-filter';
import { headerPanel } from '../../../control-panel/panel-header';
import { headerFilterPanel } from '../../../control-panel/panel-header-filter';
import { settingPanel } from '../../../control-panel/panel-setting';
import { paginationPanel } from '../../../control-panel/panel-pagination';
import { designPanel } from '../../../control-panel/panel-design';

export const panelList = () => {
    return [
        {
            title: __('Header', 'gutenverse-news'),
            initialOpen: false,
            panelArray: (props) => headerPanel({
                ...props,
                styleId: 'news-ticker-background',
                normalOptions: [ 'default', 'gradient' ],
            })
        },
        {
            title: __('Header Filter', 'gutenverse-news'),
            initialOpen: false,
            panelArray: (props) => headerFilterPanel({
                ...props,
                styleId: 'news-ticker-background',
                normalOptions: [ 'default', 'gradient' ],
            })
        },
        {
            title: __('Content Filter', 'gutenverse-news'),
            initialOpen: false,
            panelArray: filterPanel
        },
        {
            title: __('Content Setting', 'gutenverse-news'),
            initialOpen: false,
            panelArray: settingPanel
        },
        {
            title: __('Pagination', 'gutenverse-news'),
            initialOpen: false,
            panelArray: paginationPanel
        },
        {
            title: __('Design', 'gutenverse-news'),
            initialOpen: false,
            panelArray: designPanel
        },
        {
            title: __('Background', 'gutenverse-news'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'block-21-background',
                normalSelector: [ `.${props.elementId} .gvnews_pb_boxed`, `.${props.elementId}` ],
                hoverSelector: [ `.${props.elementId} .gvnews_pb_boxed:hover`, `.${props.elementId}:hover` ],
                normalOptions: [ 'default', 'gradient' ],
                hoverOptions: [ 'default', 'gradient' ],
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
                styleId: 'block-21-advance',
            })
        }
    ];
};