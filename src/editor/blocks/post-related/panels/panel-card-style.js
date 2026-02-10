import { __ } from '@wordpress/i18n';
import {
    BorderControl,
    BorderResponsiveControl,
    CheckboxControl,
    ColorControl,
    DimensionControl,
    RangeControl,
} from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const cardStylePanelModule = (props) => {
    const {
        elementId,
        templateType = 'template_1',
        cardUseBorder = true,
    } = props;
    const device = getDeviceType();
    const useLine = templateType === 'template_7' && !cardUseBorder;
    return [
        {
            id: 'cardPadding',
            component: DimensionControl,
            allowDeviceControl: true,
            label: __('Padding', 'gutenverse-news'),
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
        {
            id: 'cardUseBorder',
            label: __('Use Border', 'gutenverse-news'),
            component: CheckboxControl,
            show: templateType === 'template_7',
        },
        {
            id: 'cardLineThick',
            label: __('Line Thick', 'gutenverse-news'),
            component: RangeControl,
            allowDeviceControl: true,
            show: useLine,
            min: 1,
            max: 30,
            unit: 'px',
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'cardLineThick',
                    'responsive': true,
                    'selector': `.gvnews-block.gvnews-block-wrapper.${elementId} .gvnews_postblock .gvnews_pl_lg_6:not(:last-of-type)`,
                    'properties': [
                        {
                            'name': 'border-width',
                            'valueType': 'pattern',
                            'pattern': '{value}px;',
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
            id: 'cardLineColor',
            label: __('Line Color', 'gutenverse-news'),
            component: ColorControl,
            show: useLine,
        },
        {
            id: 'cardBorder',
            component: BorderControl,
            show: !useLine && device === 'Desktop',
            label: __('Border', 'gutenverse-news'),
        },
        {
            id: 'cardBorderResponsive',
            component: BorderResponsiveControl,
            show: !useLine && device !== 'Desktop',
            label: __('Border', 'gutenverse-news'),
            allowDeviceControl: true,
        },
    ];
};