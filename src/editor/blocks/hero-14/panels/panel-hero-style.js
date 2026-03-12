import { __ } from '@wordpress/i18n';
import { CheckboxControl, ColorControl, RangeControl, SwitchControl, TypographyControl, IconSVGControl } from 'gutenverse-core/controls';
import { gvnewsEssentialsActive } from '../../../utils/helper';

export const styleHero = (props, typeCount = 1) => {
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
            show: gvnewsEssentialsActive,
            label: __('Show Post Format Icon', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'overlayIconColor',
            show: showPostFormatIcon && gvnewsEssentialsActive,
            label: __('Icon Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'overlayIconSizeMain',
            show: showPostFormatIcon && gvnewsEssentialsActive,
            label: __('Main Icon Size', 'gutenverse'),
            description: __('This option will the post format icon size on the main content.', 'gutenverse-news'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 5,
            max: 100,
            step: 1,
            unit: 'px',
        },
        {
            id: 'overlayIconSizeSecond',
            show: showPostFormatIcon && gvnewsEssentialsActive,
            label: __('Second Icon Size', 'gutenverse'),
            description: __('This option will the post format icon size on the side content.', 'gutenverse-news'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 5,
            max: 100,
            step: 1,
            unit: 'px',
        },
        {
            id: 'galleryFormatIcon',
            show: gvnewsEssentialsActive && showPostFormatIcon,
            label: __('Gallery Icon', 'gutenverse-news'),
            description: __('Choose icon for gallery post format overlay icon.', 'gutenverse-news'),
            component: IconSVGControl
        },
        {
            id: 'videoFormatIcon',
            show: gvnewsEssentialsActive && showPostFormatIcon,
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