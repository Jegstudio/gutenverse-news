import { __, sprintf } from '@wordpress/i18n';
import { handleBackground } from 'gutenverse-core/styling';
import {
    CheckboxControl,
    ColorControl,
    BackgroundControl,
    TypographyControl,
    SwitchControl,
    BorderControl,
    BorderResponsiveControl,
    HeadingControl
} from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const heroStylePanel = (props) => {
    const {
        elementId,
        heroType,
        switcher,
        setSwitcher,
        showPostFormatIcon = false
    } = props;

    const heroTypes = [1, 2, 3, 4, 5, 6, 7];
    const device = getDeviceType();
    let itemAmount;
    let typeCount = 1;

    if (['1', '3', '12'].includes(heroType)) {
        typeCount = 3;
    } else if (['2', '4', '5', '6', '10', '11'].includes(heroType)) {
        typeCount = 2;
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

    const swicthValues = () => {
        const result = [
            {
                label: __('First', 'gutenverse-news'),
                value: 'first'
            },
        ];
        if (typeCount >= 2) {
            result.push({
                label: __('Second', 'gutenverse-news'),
                value: 'second'
            });
        }
        if (typeCount >= 3) {
            result.push({
                label: __('Third', 'gutenverse-news'),
                value: 'third'
            });
        }
        return result;
    }
    const switchDescription = () => {
        if (typeCount >= 3) {
            return __('First styling applies to all items. Second styling overrides it for items of the second and third types. Third styling overrides for items of the third type.', 'gutenverse-news');
        }
        if (typeCount >= 2) {
            return __('First styling applies to all items. Second styling overrides it for items of the second types.', 'gutenverse-news');
        }
        return '';
    }

    let heroItemOption = [
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
        {
            id: '__typeCount',
            component: SwitchControl,
            show: typeCount > 1,
            options: swicthValues(),
            onChange: ({ __typeCount }) => setSwitcher({ ...switcher, typeCount: __typeCount }),
            description: switchDescription(),
        },
        // First Item
        {
            id: 'overlayIconSizeMain',
            show: showPostFormatIcon && gvnewsEssentialsActive && (!switcher.typeCount || switcher.typeCount === 'first'),
            label: __('Icon Size', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 5,
            max: 100,
            step: 1,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'overlayIconSizeMain',
                    'responsive': true,
                    'selector': `.${elementId} .gvnews_postblock .${mainThumbnailClass} .gvnews-thumb-overlay-icon`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'overlayIconColorMain',
            show: showPostFormatIcon && gvnewsEssentialsActive && (!switcher.typeCount || switcher.typeCount === 'first'),
            label: __('Icon Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'titleTypography',
            show: switcher.typeCount === 'first' || !switcher.typeCount,
            label: __('Title Typography', 'gutenverse-news'),
            description: __('This option will change your title typography.', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'borderItem',
            show: switcher.typeCount === 'first' || !switcher.typeCount && device === 'Desktop',
            label: __('Border Item', 'gutenverse-news'),
            description: __('This option will change your border item.', 'gutenverse-news'),
            component: BorderControl,
        },
        {
            id: 'borderResponsiveItem',
            show: switcher.typeCount === 'first' || !switcher.typeCount && device !== 'Desktop',
            label: __('Border Item', 'gutenverse-news'),
            description: __('This option will change your border item.', 'gutenverse-news'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
        },
        // Second Item
        {
            id: 'secondTitleTypography',
            label: __('Second List Title Typography', 'gutenverse-news'),
            description: __('This option will override the post title typography setting on the second list.', 'gutenverse-news'),
            show: switcher.typeCount === 'second',
            component: TypographyControl,
        },
        {
            id: 'borderItemSecond',
            show: switcher.typeCount === 'second' && device === 'Desktop',
            label: __('Second Border Item', 'gutenverse-news'),
            description: __('This option will change your border item.', 'gutenverse-news'),
            component: BorderControl,
        },
        {
            id: 'borderResponsiveItemSecond',
            show: switcher.typeCount === 'second' && device !== 'Desktop',
            label: __('Second Border Item', 'gutenverse-news'),
            description: __('This option will change your border item.', 'gutenverse-news'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
        },
        // Third Item
        {
            id: 'thridTitleTypography',
            label: __('Thrid List Title Typography', 'gutenverse-news'),
            description: __('This option will override the post title typography setting on the thrid list.', 'gutenverse-news'),
            show: switcher.typeCount === 'third',
            component: TypographyControl,
        },
        {
            id: 'borderItemThird',
            show: switcher.typeCount === 'third' && device === 'Desktop',
            label: __('Third Border Item', 'gutenverse-news'),
            description: __('This option will change your border item.', 'gutenverse-news'),
            component: BorderControl,
        },
        {
            id: 'borderResponsiveItemThird',
            show: switcher.typeCount === 'third' && device !== 'Desktop',
            label: __('Third Border Item', 'gutenverse-news'),
            description: __('This option will change your border item.', 'gutenverse-news'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
        },
        // End Switcher
        {
            id: '__overlayHeader',
            label: __('Hero Style Overlay', 'gutenverse-news'),
            component: HeadingControl,
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
