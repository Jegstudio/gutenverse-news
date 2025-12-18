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
        typeCount = 1,
        switcher,
        setSwitcher,
    } = props;
    const device = getDeviceType();
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
            id: '__typeCount',
            component: SwitchControl,
            show: typeCount > 1,
            options: swicthValues(),
            onChange: ({ __typeCount }) => setSwitcher({ ...switcher, typeCount: __typeCount }),
        },
        // First
        {
            id: 'cardBorder',
            component: BorderControl,
            show: (switcher.typeCount === 'first' || !switcher.typeCount) && device === 'Desktop',
            label: __('Border', 'gutenverse-news'),
        },
        {
            id: 'cardBorderResponsive',
            component: BorderResponsiveControl,
            show: (switcher.typeCount === 'first' || !switcher.typeCount) && device !== 'Desktop',
            label: __('Border', 'gutenverse-news'),
            allowDeviceControl: true,
        },
        // Second
        {
            id: 'cardBorderSecond',
            component: BorderControl,
            show: (switcher.typeCount === 'second') && device === 'Desktop',
            label: __('Border', 'gutenverse-news'),
        },
        {
            id: 'cardBorderResponsiveSecond',
            component: BorderResponsiveControl,
            show: (switcher.typeCount === 'second') && device !== 'Desktop',
            label: __('Border', 'gutenverse-news'),
            allowDeviceControl: true,
        },
    ];
};