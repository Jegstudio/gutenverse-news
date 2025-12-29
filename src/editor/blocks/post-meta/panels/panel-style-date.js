import { __ } from '@wordpress/i18n';
import { AlertControl, ColorControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { isNotEmpty } from 'gutenverse-core/helper';

export const styleDatePanel = (props) => {

    const {
        metaLeft,
        metaRight,
        switcher,
        setSwitcher,
        datePrefix
    } = props;

    if ((isNotEmpty(metaLeft) && metaLeft.some(item => item.value === 'date')) || (isNotEmpty(metaRight) && metaRight.some(item => item.value === 'date'))) {
        return [
            {
                id: 'dateTypography',
                label: __('Date Typography', 'gutenverse-news'),
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
                show: (!switcher.color || switcher.color === 'normal'),
                component: ColorControl,
            },
            {
                id: 'datePrefixColor',
                label: __('Date Prefix Color', 'gutenverse-news'),
                show: (!switcher.color || switcher.color === 'normal') && datePrefix,
                component: ColorControl,
            },
            {
                id: 'dateColorHover',
                label: __('Date Color', 'gutenverse-news'),
                show: switcher.color === 'hover',
                component: ColorControl,
            }
        ];

    } else {
        return [
            {
                id: '__itemShowedDate',
                component: AlertControl,
                children: <>
                    <span>{__('Please select at least one Date element.', 'gutenverse-news')}</span>
                </>
            }
        ];
    }

    ;
};