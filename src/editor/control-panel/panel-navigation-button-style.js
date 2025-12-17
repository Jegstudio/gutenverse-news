import { __ } from '@wordpress/i18n';
import {
    AlertControl,
    BorderControl,
    BorderResponsiveControl,
    ColorControl,
    DimensionControl,
    HeadingControl,
    RangeControl,
    SwitchControl,
} from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const navigationButtonStylePanel = (props) => {
    const {
        switcher,
        setSwitcher,
        sliderType,
        hideNavigationButton,
        elementId,
    } = props;
    const device = getDeviceType();

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
            id: 'buttonColor',
            show: switcher.styleType === 'normal' || !switcher.styleType,
            label: __('Icon Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'textColor',
            show: (switcher.styleType === 'normal' || !switcher.styleType) && ['slider-6', 'slider-7'].includes(sliderType),
            label: __('Text Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'buttonBgColor',
            show: switcher.styleType === 'normal' || !switcher.styleType,
            label: __('Background Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'borderButton',
            show: (switcher.styleType === 'normal' || !switcher.styleType) && device === 'Desktop',
            label: __('Border', 'gutenverse-news'),
            component: BorderControl,
        },
        {
            id: 'borderResponsiveButton',
            show: (switcher.styleType === 'normal' || !switcher.styleType) && device !== 'Desktop',
            label: __('Border', 'gutenverse-news'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
        },
        // Hover
        {
            id: 'buttonColorHover',
            show: switcher.styleType === 'hover',
            label: __('Icon Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'textColorHover',
            show: switcher.styleType === 'hover' && ['slider-6', 'slider-7'].includes(sliderType),
            label: __('Text Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'buttonBgColorHover',
            show: switcher.styleType === 'hover',
            label: __('Background Color', 'gutenverse-news'),
            component: ColorControl,
        },
        {
            id: 'borderButtonHover',
            show: (switcher.styleType === 'hover') && device === 'Desktop',
            label: __('Border', 'gutenverse-news'),
            component: BorderControl,
        },
        {
            id: 'borderResponsiveButtonHover',
            show: (switcher.styleType === 'hover') && device !== 'Desktop',
            label: __('Border', 'gutenverse-news'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
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