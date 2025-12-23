import { __ } from '@wordpress/i18n';
import { AlertControl, ColorControl, DimensionControl, RangeControl, SwitchControl } from 'gutenverse-core/controls';

export const navigationButtonStylePanel = (props) => {
    const {
        switcher,
        setSwitcher,
        hideNavigationButton,
        elementId
    } = props;


    if (hideNavigationButton) {
        return [
            {
                id: 'sticky-notice',
                component: AlertControl,
                children: <>
                    <span>{__('Navigation button disabled. The Navigation button panel will be hidden.')}</span>
                </>
            },
        ];
    }

    return [
        {
            id: 'tootlipColor',
            description: __('Active slider marker in image navigation', 'gutenverse-news'),
            show: !props.hideImageNavigation,
            label: __('Tootlip Color', 'gutenverse-news'),
            component: ColorControl,
        },
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
        // Next
        {
            id: 'nextButtonColor',
            show: (!switcher.buttonType || switcher.buttonType === 'next') && !props.hideNavigationButton,
            label: __('Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'nextButtonColorHover',
            show: (!switcher.buttonType || switcher.buttonType === 'next') && !props.hideNavigationButton,
            label: __('Color Hover', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'nextButtonBgColor',
            show: (!switcher.buttonType || switcher.buttonType === 'next') && !props.hideNavigationButton,
            label: __('Background Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'nextButtonBgColorHover',
            show: (!switcher.buttonType || switcher.buttonType === 'next') && !props.hideNavigationButton,
            label: __('Background Color Hover', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'nextButtonSize',
            show: (!switcher.buttonType || switcher.buttonType === 'next') && !props.hideNavigationButton,
            label: __('Size', 'gutenverse-news'),
            component: RangeControl,
			allowDeviceControl: true,
            min: 1,
            max: 100,
            unit: 'px',
            step: 1,
            liveStyle: [
				{
					'type': 'plain',
					'id': 'nextButtonSize',
					'responsive': true,
					'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls button.tns-next`,
					'properties': [
						{
							'name': 'font-size',
							'valueType': 'pattern',
							'pattern': '{value}px; height: fit-content; width: fit-content;',
							'patternValues': {
								'value': {
									'type': 'direct',
								}
							}
						},
					],
				}
			]
        },
        {
            id: 'nextButtonPadding',
            show: (!switcher.buttonType || switcher.buttonType === 'next') && !props.hideNavigationButton,
            label: __('Padding', 'gutenverse-news'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
        },
        // Prev
        {
            id: 'prevButtonColor',
            show: (switcher.buttonType === 'prev') && !props.hideNavigationButton,
            label: __('Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'prevButtonColorHover',
            show: (switcher.buttonType === 'prev') && !props.hideNavigationButton,
            label: __('Color Hover', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'prevButtonBgColor',
            show: (switcher.buttonType === 'prev') && !props.hideNavigationButton,
            label: __('Background Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'prevButtonBgColorHover',
            show: (switcher.buttonType === 'prev') && !props.hideNavigationButton,
            label: __('Background Color Hover', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'prevButtonSize',
            show: (switcher.buttonType === 'prev') && !props.hideNavigationButton,
            label: __('Size', 'gutenverse-news'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 100,
            unit: 'px',
            step: 1,
            liveStyle: [
				{
					'type': 'plain',
					'id': 'prevButtonSize',
					'responsive': true,
					'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls button.tns-prev`,
					'properties': [
						{
							'name': 'font-size',
							'valueType': 'pattern',
							'pattern': '{value}px; height: fit-content; width: fit-content;',
							'patternValues': {
								'value': {
									'type': 'direct',
								}
							}
						},
					],
				}
			]
        },
        {
            id: 'prevButtonPadding',
            show: (switcher.buttonType === 'prev') && !props.hideNavigationButton,
            label: __('Padding', 'gutenverse-news'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
        },
    ];
};