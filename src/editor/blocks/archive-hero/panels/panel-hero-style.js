import { __, sprintf } from '@wordpress/i18n';
import { handleBackground } from 'gutenverse-core/styling';
import { CheckboxControl, ColorControl, BackgroundControl, TypographyControl } from 'gutenverse-core/controls';

export const heroStylePanel = (props) => {
    const { elementId, heroType } = props;
    const heroTypes = [1, 2, 3, 4, 5, 6, 7];
    let itemAmount;
    let typoCount = 1;
    if (['1', '3', '12'].includes(heroType)) {
        typoCount = 3;
    } else if (['2', '4', '5', '6', '10', '11'].includes(heroType)) {
        typoCount = 2;
    }

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

    let heroItemOption = [
        {
            id: 'titleTypography',
            label: __('Title Typography', 'gutenverse-news'),
            description: __('This option will change your title typography.', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'secondTitleTypography',
            label: __('Second List Title Typography', 'gutenverse-news'),
            description: __('This option will override the post title typography setting on the second list.', 'gutenverse-news'),
            show: typoCount >= 2,
            component: TypographyControl,
        },
        {
            id: 'thridTitleTypography',
            label: __('Thrid List Title Typography', 'gutenverse-news'),
            description: __('This option will override the post title typography setting on the thrid list.', 'gutenverse-news'),
            show: typoCount >= 3,
            component: TypographyControl,
        },
        {
            id: 'titleColor',
            label: __('Title Color', 'gutenverse-news'),
            component: ColorControl,
        },

        {
            id: 'titleColorHover',
            label: __('Title Color Hover', 'gutenverse-news'),
            component: ColorControl,
        },
    ];
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
