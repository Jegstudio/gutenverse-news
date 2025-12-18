import { __ } from '@wordpress/i18n';
import { AlertControl, ColorControl, DimensionControl, RangeControl } from 'gutenverse-core/controls';

export const prevButtonStylePanel = (props) => {
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
			id: 'prevButtonColor',
			show: !hideNavigationButton,
			label: __('Icon Color', 'gutenverse-news'),
			component: ColorControl,
		},
		{
			id: 'prevButtonColorHover',
			show: !hideNavigationButton,
			label: __('Icon Color Hover', 'gutenverse-news'),
			component: ColorControl,
		},
		{
			id: 'prevTextColor',
			show: !hideNavigationButton && ['slider-6', 'slider-7'].includes(sliderType),
			label: __('Text Color', 'gutenverse-news'),
			component: ColorControl,
		},
		{
			id: 'prevTextColorHover',
			show: !hideNavigationButton && ['slider-6', 'slider-7'].includes(sliderType),
			label: __('Text Color Hover', 'gutenverse-news'),
			component: ColorControl,
		},
		{
			id: 'prevButtonBgColor',
			show: !hideNavigationButton,
			label: __('Background Color', 'gutenverse-news'),
			component: ColorControl,
		},
		{
			id: 'prevButtonBgColorHover',
			show: !hideNavigationButton,
			label: __('Background Color Hover', 'gutenverse-news'),
			component: ColorControl,
		},
		{
			id: 'prevButtonTransition',
			show: !hideNavigationButton,
			label: __('Transition Hover Duration', 'gutenverse-news'),
			component: RangeControl,
			min: 0,
			max: 10000,
			unit: 'ms',
			step: 100,
		},
		{
			id: 'prevButtonSize',
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
					'id': 'prevButtonSize',
					'responsive': true,
					'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .tns-controls .tns-prev`,
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
			id: 'prevButtonGap',
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
			id: 'prevButtonPadding',
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
