import { __ } from '@wordpress/i18n';
import { ColorControl, SwitchControl } from 'gutenverse-core/controls';
import { nextButtonStylePanel } from './panel-next-button-style';
import { prevButtonStylePanel } from './panel-prev-button-style';

export const navigationButtonStylePanel = (props) => {
    const {
        switcher,
        setSwitcher,
        sliderType,
        hideNavigationButton,
    } = props;


    const result = [
        {
            id: '__buttonType',
            component: SwitchControl,
            show: !props.hideNavigationButton,
            options: [
                {
                    value: 'next',
                    label: 'Next'
                },
                {
                    value: 'prev',
                    label: 'Previous'
                }
            ],
            onChange: ({ __buttonType }) => setSwitcher({ ...switcher, buttonType: __buttonType })
        },
    ];
    if (switcher.buttonType === 'next' || !switcher.buttonType) {
        result.push(...nextButtonStylePanel(props));
    }
    if (switcher.buttonType === 'prev') {
        result.push(...prevButtonStylePanel(props));
    }
    return result;
};