import { __ } from '@wordpress/i18n';
import { AlertControl, ColorControl, DimensionControl, RangeControl } from 'gutenverse-core/controls';

export const nextButtonStylePanel = (props) => {
	const {
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
			id: 'nextButtonColor',
			show: !hideNavigationButton,
			label: __('Icon Color', 'gutenverse-news'),
			component: ColorControl,
		},
		{
			id: 'nextButtonColorHover',
			show: !hideNavigationButton,
			label: __('Icon Color Hover', 'gutenverse-news'),
			component: ColorControl,
		},
		{
			id: 'nextButtonBgColor',
			show: !hideNavigationButton,
			label: __('Background Color', 'gutenverse-news'),
			component: ColorControl,
		},
		{
			id: 'nextTextColor',
			show: !hideNavigationButton && ['slider-6', 'slider-7'].includes(sliderType),
			label: __('Text Color', 'gutenverse-news'),
			component: ColorControl,
		},
		{
			id: 'nextTextColorHover',
			show: !hideNavigationButton && ['slider-6', 'slider-7'].includes(sliderType),
			label: __('Text Color Hover', 'gutenverse-news'),
			component: ColorControl,
		},
		{
			id: 'nextButtonBgColorHover',
			show: !hideNavigationButton,
			label: __('Background Color Hover', 'gutenverse-news'),
			component: ColorControl,
		},
		{
			id: 'nextButtonTransition',
			show: !hideNavigationButton,
			label: __('Transition Hover Duration', 'gutenverse-news'),
			component: RangeControl,
			min: 0,
			max: 10000,
			unit: 'ms',
			step: 100,
		},
		{
			id: 'nextButtonSize',
			show: !hideNavigationButton,
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
					'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-next`,
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
			id: 'nextButtonGap',
			show: !hideNavigationButton && ['slider-6', 'slider-7'].includes(sliderType),
			label: __('Text Gap', 'gutenverse-news'),
			component: RangeControl,
			allowDeviceControl: true,
			min: 1,
			max: 100,
			unit: 'px',
			step: 1,
		},
		{
			id: 'nextButtonPadding',
			show: !hideNavigationButton,
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
