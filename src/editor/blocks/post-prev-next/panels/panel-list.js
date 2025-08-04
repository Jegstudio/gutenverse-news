import { __ } from '@wordpress/i18n';
import { advancePanel, backgroundPanel, borderPanel, responsivePanel } from 'gutenverse-core/controls';
import { TabStyle, TabSetting } from 'gutenverse-core/controls';
import { stylePanel } from './panel-style';
import { applyFilters } from '@wordpress/hooks';

export const panelList = () => {
    const domain = 'gutenverse-news';
    const selector = (props) => `.gvnews-block.gvnews-block-wrapper.${props.elementId} .gvnews_prevnext_post`;
    return applyFilters(
        'gutenverse.news.post-next-prev.panels',
        [
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
                    selector: selector(props),
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
                panelArray: (props) => borderPanel({
                    ...props,
                    selector: selector(props),
                }),
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
                    normalSelector: selector(props),
                    hoverSelector: `${selector(props)}:hover`
                }),
                tabRole: TabStyle
            }
        ]
    );
};