import { __ } from '@wordpress/i18n';
import { AlertControl, ColorControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { isNotEmpty } from 'gutenverse-core/helper';

export const styleDatePanel = (props) => {

    const {
        metaLeft,
        metaRight,
        switcher,
        setSwitcher,
    } = props;

    let itemsShowed = false;
    const showControl = () => {
        const show =  (isNotEmpty(metaLeft) && metaLeft.some(item => item.value === 'date')) || (isNotEmpty(metaRight) && metaRight.some(item => item.value === 'date'));
        if (show) {
            itemsShowed = true;
        }
        return show;
    };

    return [
        {
            id: 'dateTypography',
            label: __('Date Typography', 'gutenverse-news'),
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
            id: 'dateColor',
            label: __('Date Color', 'gutenverse-news'),
            show: showControl() && (!switcher.color || switcher.color === 'normal'),
            component: ColorControl,
        },
        {
            id: 'dateColorHover',
            label: __('Date Color', 'gutenverse-news'),
            show: showControl() && switcher.color === 'hover',
            component: ColorControl,
        },
        {
            id: '__itemShowedDate',
            show: !itemsShowed,
            component: AlertControl,
            children: <>
                <span>{__('Please select at least one Date element.', 'gutenverse-news')}</span>
            </>
        }
    ];
};