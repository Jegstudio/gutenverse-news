import { __ } from '@wordpress/i18n';
import { AlertControl, ColorControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { isNotEmpty } from 'gutenverse-core/helper';

export const styleCommentPanel = (props) => {

    const {
        metaLeft,
        metaRight,
        switcher,
        setSwitcher,
    } = props;


    if ((isNotEmpty(metaLeft) && metaLeft.some(item => item.value === 'comment')) || (isNotEmpty(metaRight) && metaRight.some(item => item.value === 'comment'))) {
        return [
            {
                id: 'commentTypography',
                label: __('Comment Typography', 'gutenverse-news'),
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
                id: 'commentColor',
                label: __('Comment Color', 'gutenverse-news'),
                show: (!switcher.color || switcher.color === 'normal'),
                component: ColorControl,
            },
            {
                id: 'commentColorHover',
                label: __('Comment Color', 'gutenverse-news'),
                show: switcher.color === 'hover',
                component: ColorControl,
            },
        ];
    }

    return [
        {
            id: '__itemShowedComment',
            component: AlertControl,
            children: <>
                <span>{__('Please select at least one Comment element.', 'gutenverse-news')}</span>
            </>
        }
    ];

};