import { __ } from '@wordpress/i18n';
import { AlertControl, ColorControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { isNotEmpty } from 'gutenverse-core/helper';

export const styleCategoryPanel = (props) => {

    const {
        metaLeft,
        metaRight,
        switcher,
        setSwitcher,
    } = props;

    let itemsShowed = false;
    const showControl = () => {
        const show =  (isNotEmpty(metaLeft) && metaLeft.some(item => item.value === 'category')) || (isNotEmpty(metaRight) && metaRight.some(item => item.value === 'category'));
        if (show) {
            itemsShowed = true;
        }
        return show;
    };

    return [
        {
            id: 'categoryTypography',
            label: __('Category Typography', 'gutenverse-news'),
            show: showControl(),
            component: TypographyControl
        },
        {
            id: '__colorHover',
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
            onChange: ({ __colorHover }) => setSwitcher({ ...switcher, color: __colorHover })
        },
        {
            id: 'categoryColor',
            label: __('Category Color', 'gutenverse-news'),
            show: showControl() && (!switcher.color || switcher.color === 'normal'),
            component: ColorControl,
        },
        {
            id: 'categoryColorHover',
            label: __('Category Color', 'gutenverse-news'),
            show: showControl() && switcher.color === 'hover',
            component: ColorControl,
        },
        {
            id: '__itemShowedCategory',
            show: !itemsShowed,
            component: AlertControl,
            children: <>
                <span>{__('Please select at least one Category element.', 'gutenverse-news')}</span>
            </>
        }
    ];
};