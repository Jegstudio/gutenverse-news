import { __ } from '@wordpress/i18n';
import {
    BackgroundControl,
    ColorControl,
    TypographyControl,
    CheckboxControl,
    RepeaterControl,
    HeadingControl,
    SwitchControl,
    BorderResponsiveControl,
    RangeControl,
    DimensionControl
} from 'gutenverse-core/controls';

export const styleHero = (props, typeCount = 1) => {
    const {
        switcher,
        setSwitcher,
        elementId,
        heroStyle,
        gvnewsModule
    } = props;
    let numberItem = 0;

    const getNumberItem = () => {
        if (!props.heroItemOverlay) {
            return;
        }
        if ((numberItem + 1) > props.heroItemOverlay.length) {
            numberItem = 0;
        }
        numberItem++;
        return numberItem;
    };
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
    return [
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
            id: 'typography',
            show: switcher.typeCount === 'first' || !switcher.typeCount,
            label: __('Title Typography', 'gutenverse-news'),
            description: __('This option will change your title typography.', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'contentWidth',
            label: __('Content Width', 'gutenverse-news'),
            component: RangeControl,
            show: gvnewsModule === 'GUTENVERSE\\NEWS\\Block\\Hero\\Hero_13',
            unit: '%',
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'contentWidth',
                    'responsive': true,
                    'selector': heroStyle === '4' ? `.${elementId}.gvnews-block .gvnews_heroblock_13.gvnews_col_3o3.gvnews_hero_style_4 .gvnews_post_info` : `.${elementId}.gvnews-block .gvnews_heroblock_13.gvnews_heroblock .gvnews_postblock_content`,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'pattern',
                            'pattern': '{value}%',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                }
                            }
                        }
                    ],
                }
            ]
        },
        {
            id: 'contentPadding',
            label: __('Padding', 'gutenverse-news'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            show: gvnewsModule === 'GUTENVERSE\\NEWS\\Block\\Hero\\Hero_13' && heroStyle !== '5',
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'borderItem',
            show: switcher.typeCount === 'first' || !switcher.typeCount,
            label: __('Border Item', 'gutenverse-news'),
            description: __('This option will change your border item.', 'gutenverse-news'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
        },
        // Second Item
        {
            id: 'secondTitleTypography',
            show: switcher.typeCount === 'second',
            label: __('Second List Title Typography', 'gutenverse-news'),
            description: __('This option will override the post title typography setting on the second list.', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'borderItemSecond',
            show: switcher.typeCount === 'second',
            label: __('Second Border Item', 'gutenverse-news'),
            description: __('This option will change your border item.', 'gutenverse-news'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
        },
        // Third Item
        {
            id: 'thridTitleTypography',
            show: switcher.typeCount === 'third',
            label: __('Thrid List Title Typography', 'gutenverse-news'),
            description: __('This option will override the post title typography setting on the thrid list.', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'borderItemThird',
            show: switcher.typeCount === 'third',
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
        {
            id: 'heroItemOverlay',
            component: RepeaterControl,
            titleFormat: () => {
                return `Item ${getNumberItem()}`;
            },
            isAddNew: false,
            isRemove: false,
            isDuplicate: false,
            isDragable: false,
            options: [
                {
                    id: 'overlayEnable',
                    label: __('Override overlay', 'gutenverse-news'),
                    description: __('Align social icon vertical.', 'gutenverse-news'),
                    component: CheckboxControl,
                },
                {
                    show: value => value.overlayEnable,
                    id: 'OverlayGradient',
                    allowDeviceControl: true,
                    options: ['gradient'],
                    component: BackgroundControl,
                },
            ],
        },
    ];
};