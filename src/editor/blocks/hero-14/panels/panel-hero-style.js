import { __ } from '@wordpress/i18n';
import { CheckboxControl, ColorControl, SwitchControl, TypographyControl, IconSVGControl } from 'gutenverse-core/controls';

export const styleHero = (props, typeCount = 1, hero14 = false) => {
    const {
        switcher,
        setSwitcher,
        showPostFormatIcon = false
    } = props;

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
            id: 'showPostFormatIcon',
            label: __('Show Post Format Icon', 'gutenverse'),
            component: CheckboxControl,
            show: hero14,
        },
        {
            id: 'galleryFormatIcon',
            show: showPostFormatIcon && hero14,
            label: __('Gallery Icon', 'gutenverse-news'),
            description: __('Choose icon for gallery post format overlay icon.', 'gutenverse-news'),
            component: IconSVGControl
        },
        {
            id: 'videoFormatIcon',
            show: showPostFormatIcon && hero14,
            label: __('Video Icon', 'gutenverse-news'),
            description: __('Choose icon for video post format overlay icon.', 'gutenverse-news'),
            component: IconSVGControl
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
            id: 'excerptColor',
            label: __('Excerpt Color', 'gutenverse-news'),
            show: isNormal,
            component: ColorControl,
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
            show: isNormal,
        },

        {
            id: 'secondTitleColorHover',
            label: __('Second List Title Color', 'gutenverse-news'),
            description: __('This option will override the post title color setting on the second list on hover condition.', 'gutenverse-news'),
            component: ColorControl,
            show: !isNormal,

        },
        {
            id: 'thridTitleColor',
            label: __('Thrid List Title Color', 'gutenverse-news'),
            component: ColorControl,
            description: __('This option will override the post title color setting on the thrid list on hover condition.', 'gutenverse-news'),
            show: isNormal,
        },

        {
            id: 'thridTitleColorHover',
            label: __('Thrid List Title Color', 'gutenverse-news'),
            description: __('This option will override the post title color setting on the thrid list on hover condition.', 'gutenverse-news'),
            component: ColorControl,
            show: !isNormal,

        },
    ];
};