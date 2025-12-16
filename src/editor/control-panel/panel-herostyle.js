import { __ } from '@wordpress/i18n';
import { BackgroundControl, ColorControl, TypographyControl, CheckboxControl, RepeaterControl, HeadingControl, SwitchControl, BorderControl, BorderResponsiveControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const styleHero = (props, typeCount = 1) => {
    const {
        switcher,
        setSwitcher,
    } = props;
    let numberItem = 0;
    const device = getDeviceType();

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
            onChange: ({ __typeCount }) => setSwitcher({ ...switcher, typeCount: __typeCount })
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
            show: switcher.typeCount === 'second',
            label: __('Second List Title Typography', 'gutenverse-news'),
            description: __('This option will override the post title typography setting on the second list.', 'gutenverse-news'),
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
            show: switcher.typeCount === 'third',
            label: __('Thrid List Title Typography', 'gutenverse-news'),
            description: __('This option will override the post title typography setting on the thrid list.', 'gutenverse-news'),
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
            label: __('Hero Style', 'gutenverse-news'),
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