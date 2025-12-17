import { __ } from '@wordpress/i18n';
import { AlertControl, ColorControl, DimensionControl, HeadingControl, RangeControl, SwitchControl } from 'gutenverse-core/controls';
import { nextButtonStylePanel } from './panel-next-button-style';
import { prevButtonStylePanel } from './panel-prev-button-style';

export const navigationButtonStylePanel = (props) => {
    const {
        switcher,
        setSwitcher,
        sliderType,
        hideNavigationButton,
        elementId,
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
            id: 'buttonGap',
            show: ['slider-6', 'slider-7'].includes(sliderType),
            label: __('Text Gap', 'gutenverse-news'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 100,
            unit: 'px',
            step: 1,
        },
		{
			id: 'buttonSize',
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
					'id': 'buttonSize',
					'responsive': true,
					'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls button`,
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
            id: '__styleType',
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
            onChange: ({ __styleType }) => setSwitcher({ ...switcher, styleType: __styleType })
        },
        // Normal
        {
            id: 'nextButtonColor',
            show: switcher.styleType === 'normal' || !switcher.styleType,
            label: __('Next Icon Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'prevButtonColor',
            show: switcher.styleType === 'normal' || !switcher.styleType,
            label: __('Prev Icon Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'nextTextColor',
            show: (switcher.styleType === 'normal' || !switcher.styleType) && ['slider-6', 'slider-7'].includes(sliderType),
            label: __('Next Text Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'prevTextColor',
            show: (switcher.styleType === 'normal' || !switcher.styleType) && ['slider-6', 'slider-7'].includes(sliderType),
            label: __('Prev Text Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'nextButtonBgColor',
            show: switcher.styleType === 'normal' || !switcher.styleType,
            label: __('Next Background Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'prevButtonBgColor',
            show: switcher.styleType === 'normal' || !switcher.styleType,
            label: __('Prev Background Color', 'gutenverse-news'),
            component: ColorControl,
        },
        // Hover
        {
            id: 'nextButtonColorHover',
            show: switcher.styleType === 'hover',
            label: __('Next Icon Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'prevButtonColorHover',
            show: switcher.styleType === 'hover',
            label: __('Prev Icon Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'nextTextColorHover',
            show: switcher.styleType === 'hover' && ['slider-6', 'slider-7'].includes(sliderType),
            label: __('Next Text Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'prevTextColorHover',
            show: switcher.styleType === 'hover' && ['slider-6', 'slider-7'].includes(sliderType),
            label: __('Prev Text Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'nextButtonBgColorHover',
            show: switcher.styleType === 'hover',
            label: __('Next Background Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'prevButtonBgColorHover',
            show: switcher.styleType === 'hover',
            label: __('Prev Background Color', 'gutenverse-news'),
            component: ColorControl,
        },
        // End Switcher
        {
            id: '__headingPadding',
            component: HeadingControl,
        },
        {
            id: 'buttonPadding',
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