import { __ } from '@wordpress/i18n';
import { advancePanel, backgroundPanel, borderPanel, conditionPanel, responsivePanel } from 'gutenverse-core/controls';
import { TabStyle, TabSetting } from 'gutenverse-core/controls';
import { stylePanel } from './panel-style';
import { applyFilters } from '@wordpress/hooks';

export const panelList = () => {
    const selector = (props) => `.gvnews-block.gvnews-block-wrapper.${props.elementId} .gvnews_prevnext_post`;
    return applyFilters(
        'gutenverse.news.post-next-prev.panels',
        [
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
                    styleId: 'post-prev-next-advance',
                    selector: selector(props),
                }),
                tabRole: TabSetting
            },
            // Style
            {
                title: __('Style', 'gutenverse-news'),
                initialOpen: false,
                panelArray: stylePanel,
                tabRole: TabStyle,
            },
            {
                title: __('Border', 'gutenverse-news'),
                initialOpen: false,
                panelArray: (props) => borderPanel({
                    ...props,
                    selector: selector(props),
                }),
                tabRole: TabStyle
            },
            {
                title: __('Background', 'gutenverse-news'),
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
            }, {
                title: __('Condition', 'gutenverse-news'),
                panelArray: conditionPanel,
                initialOpen: false,
                pro: true
            },
        ]
    );
};