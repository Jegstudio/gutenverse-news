import { __ } from '@wordpress/i18n';
import { ColorControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';

export const styleHero = (props, typeCount = 1) => {
    const {
        gvnewsModule = '',
        switcher,
        setSwitcher,
    } = props;

    const showThridColor = 'GUTENVERSE\\NEWS\\Block\\Hero\\Hero_14' === gvnewsModule;
    const isNormal = !switcher.heroStyle || switcher.heroStyle === 'normal';

    return [
        {
            id: 'typography',
            label: __('Title Typography', 'gutenverse-news'),
            description: __('This option will change your title typography.', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: 'secondTitleTypography',
            label: __('Second List Title Typography', 'gutenverse-news'),
            description: __('This option will override the post title typography setting on the second list.', 'gutenverse-news'),
            show: typeCount >= 2,
            component: TypographyControl,
        },
        {
            id: 'thridTitleTypography',
            label: __('Thrid List Title Typography', 'gutenverse-news'),
            description: __('This option will override the post title typography setting on the thrid list.', 'gutenverse-news'),
            show: typeCount >= 3,
            component: TypographyControl,
        },
        {
            id: 'excerptTypography',
            label: __('Excerpt Typography', 'gutenverse-news'),
            description: __('This option will change your post excerpt typography.', 'gutenverse-news'),
            component: TypographyControl,
        },
        {
            id: '__heroStyleHover',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                }
            ],
            onChange: ({ __heroStyleHover }) => setSwitcher({ ...switcher, heroStyle: __heroStyleHover })
        },
        {
            id: 'titleColor',
            label: __('Title Color', 'gutenverse-news'),
            component: ColorControl,
            show: isNormal,
        },
        {
            id: 'titleColorHover',
            label: __('Title Color', 'gutenverse-news'),
            component: ColorControl,
            show: !isNormal,
        },
        {
            id: 'secondTitleColor',
            label: __('Second List Title Color', 'gutenverse-news'),
            component: ColorControl,
            description: __('This option will override the post title color setting on the second list on hover condition.', 'gutenverse-news'),
            show: showThridColor && isNormal,
        },

        {
            id: 'secondTitleColorHover',
            label: __('Second List Title Color', 'gutenverse-news'),
            description: __('This option will override the post title color setting on the second list on hover condition.', 'gutenverse-news'),
            component: ColorControl,
            show: showThridColor && !isNormal,

        },
        {
            id: 'thridTitleColor',
            label: __('Thrid List Title Color', 'gutenverse-news'),
            component: ColorControl,
            description: __('This option will override the post title color setting on the thrid list on hover condition.', 'gutenverse-news'),
            show: showThridColor && isNormal,
        },

        {
            id: 'thridTitleColorHover',
            label: __('Thrid List Title Color', 'gutenverse-news'),
            description: __('This option will override the post title color setting on the thrid list on hover condition.', 'gutenverse-news'),
            component: ColorControl,
            show: showThridColor && !isNormal,

        },
        {
            id: 'excerptColor',
            label: __('Excerpt Color', 'gutenverse-news'),
            component: ColorControl,
            show: showThridColor && isNormal,
        },
    ];
};