import { __ } from '@wordpress/i18n';
import {
    BackgroundControl,
    HeadingControl,
    SwitchControl,
    BorderControl,
    BorderResponsiveControl
} from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const cardStylePanelModule = (props) => {
    const {
        cardType = 1,
        hasSecondClass = false,
        switcher,
        setSwitcher,
    } = props;
    const device = getDeviceType();

    return [
            {
                id: '__cardType',
                show: hasSecondClass,
                component: SwitchControl,
                options: [
                    {
                        value: 'main',
                        label: 'Main'
                    },
                    {
                        value: 'second',
                        label: 'Second'
                    }
                ],
                onChange: ({ __cardType }) => setSwitcher({ ...switcher, cardType: __cardType })
            },
        // Main
        {
            id: 'cardBorder',
            component: BorderControl,
            show: (switcher.cardType === 'main' || !switcher.cardType) && device === 'Desktop',
            label: __('Border', 'gutenverse-news'),
        },
        {
            id: 'cardBorderResponsive',
            component: BorderResponsiveControl,
            show: (switcher.cardType === 'main' || !switcher.cardType) && device !== 'Desktop',
            label: __('Border', 'gutenverse-news'),
            allowDeviceControl: true,
        },
        // Second
        {
            id: 'cardBorderSecond',
            component: BorderControl,
            show: (switcher.cardType === 'second') && device === 'Desktop',
            label: __('Border', 'gutenverse-news'),
        },
        {
            id: 'cardBorderResponsiveSecond',
            component: BorderResponsiveControl,
            show: (switcher.cardType === 'second') && device !== 'Desktop',
            label: __('Border', 'gutenverse-news'),
            allowDeviceControl: true,
        },
    ];
};