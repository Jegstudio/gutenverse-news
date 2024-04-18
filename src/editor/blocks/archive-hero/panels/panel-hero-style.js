import { __, sprintf } from '@wordpress/i18n';
import { handleBackground } from 'gutenverse-core/styling';
import { CheckboxControl, BackgroundControl } from 'gutenverse-core/controls';

export const heroStylePanel = (props) => {
    const { elementId, heroType } = props;
    const heroTypes = [1, 2, 3, 4, 5, 6, 7];
    let itemAmount;

    if (['13'].includes(heroType)) {
        itemAmount = 1;
    } else if (['9', 'skew'].includes(heroType)) {
        itemAmount = 2;
    } else if (['4', '5', '8'].includes(heroType)) {
        itemAmount = 3;
    } else if (['1', '3', '6', '7'].includes(heroType)) {
        itemAmount = 4;
    } else if (['2', '11', '12'].includes(heroType)) {
        itemAmount = 5;
    } else if (['10'].includes(heroType)) {
        itemAmount = 7;
    } else if (['14'].includes(heroType)) {
        itemAmount = 8;
    }

    let heroItemOption = [];
    heroTypes.map((type) => {
        heroItemOption = [
            ...heroItemOption,
            {
                id: `heroItem${type}Enable`,
                show: type <= itemAmount,
                component: CheckboxControl,
                label: sprintf(__('Override overlay for item %s', 'gutenverse-news'), type),
                description: __('Override overlay style for this item', 'gutenverse-news'),
            },
            {
                id: `heroItem${type}Background`,
                show: props[`heroItem${type}Enable`] && type <= itemAmount,
                allowDeviceControl: true,
                options: ['gradient'],
                component: BackgroundControl,
                style: [
                    {
                        selector: `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_hero_item_${type} .gvnews_thumb a > div:${type === 5 ? 'after' : 'before'}`,
                        hasChild: true,
                        allowRender: () => props[`heroItem${type}Enable`] && type <= itemAmount,
                        render: (value) => handleBackground(value),
                    },
                ],
            },
        ];
    });
    return [...heroItemOption];
};
