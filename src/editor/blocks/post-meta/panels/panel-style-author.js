import { __ } from '@wordpress/i18n';
import { AlertControl, ColorControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { isNotEmpty } from 'gutenverse-core/helper';

export const styleAuthorPanel = (props) => {

    const {
        metaLeft,
        metaRight,
        switcher,
        setSwitcher,
    } = props;

    let itemsShowed = false;
    const showControl = () => {
        const show =  (isNotEmpty(metaLeft) && metaLeft.some(item => item.value === 'author')) || (isNotEmpty(metaRight) && metaRight.some(item => item.value === 'author'));
        if (show) {
            itemsShowed = true;
        }
        return show;
    };

    return [
        {
            id: 'authorTypography',
            label: __('Author Typography', 'gutenverse-news'),
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
            id: 'authorColor',
            label: __('Author Color', 'gutenverse-news'),
            show: showControl() && (!switcher.color || switcher.color === 'normal'),
            component: ColorControl,
        },
        {
            id: 'authorColorHover',
            label: __('Author Color', 'gutenverse-news'),
            show: showControl() && switcher.color === 'hover',
            component: ColorControl,
        },
        {
            id: '__itemShowedAuthor',
            show: !itemsShowed,
            component: AlertControl,
            children: <>
                <span>{__('Please select at least one Author element.', 'gutenverse-news')}</span>
            </>
        }
    ];
};