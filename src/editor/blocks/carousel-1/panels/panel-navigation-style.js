import { __ } from '@wordpress/i18n';
import { AlertControl, DimensionControl, IconRadioControl, SizeControl, CheckboxControl, SelectControl, ColorControl } from 'gutenverse-core/controls';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const navigationStylePanel = (props) => {
    const {
        elementId,
        showNav,
        navigationEnableSeparator = false,
        navigationWrapperAlign,
    } = props;
    const device = getDeviceType();
    const controlsSelector = `.${elementId} .tns-outer .tns-controls`;
    const separatorSelector = `${controlsSelector}:before, ${controlsSelector}:after`;

    return [
        {
            id: 'enableNotice',
            component: AlertControl,
            show: !showNav,
            children: <>
                <span>{__('Show naviation to use these options.', 'gutenverse-news')}</span>
            </>
        },
        {
            id: 'navigationWrapperMargin',
            label: __('Margin', '--gctd--'),
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
            show: showNav,
            liveStyle: [
                {
                    type: 'dimension',
                    id: 'navigationWrapperMargin',
                    responsive: true,
                    properties: [
                        {
                            name: 'margin',
                            valueType: 'direct'
                        }
                    ],
                    selector: controlsSelector,
                }
            ]
        },
        {
            id: 'navigationWrapperAlign',
            label: __('Alignment', 'gutenverse-news'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse-news'),
                    value: 'start',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse-news'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse-news'),
                    value: 'end',
                    icon: <AlignRight />,
                },
                {
                    label: __('Edge', 'gutenverse-news'),
                    value: 'space-between',
                    icon: <AlignJustify />,
                },
            ],
            show: showNav,
            liveStyle: [
                {
                    type: 'plain',
                    id: 'navigationWrapperAlign',
                    responsive: true,
                    properties: [
                        {
                            name: 'justify-content',
                            valueType: 'direct'
                        }
                    ],
                    selector: controlsSelector,
                }
            ]
        },
        {
            id: 'navigationBtnGap',
            label: __('Gap', 'gutenverse-news'),
            component: SizeControl,
            show: showNav && navigationWrapperAlign?.[device] !== 'space-between',
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: 'px',
                },
            },
            allowDeviceControl: true,
            liveStyle: [
                {
                    type: 'unitPoint',
                    id: 'navigationBtnGap',
                    properties: [
                        {
                            name: 'gap',
                            valueType: 'direct'
                        }
                    ],
                    responsive: true,
                    selector: controlsSelector,
                }
            ]
        },
        {
            id: 'navigationEnableSeparator',
            label: __('Enable Separator', 'gutenverse-news'),
            component: CheckboxControl,
            show: showNav && navigationWrapperAlign?.[device] !== 'space-between',
        },
        {
            id: 'navigationSeparatorStyle',
            label: __('Separator Style', 'gutenverse-news'),
            component: SelectControl,
            show: showNav && navigationEnableSeparator && navigationWrapperAlign?.[device] !== 'space-between',
            options: [
                {
                    label: __('Default', 'gutenverse-news'),
                    value: '',
                },
                {
                    label: __('Solid', 'gutenverse-news'),
                    value: 'solid',
                },
                {
                    label: __('Double', 'gutenverse-news'),
                    value: 'double',
                },
                {
                    label: __('Dotted', 'gutenverse-news'),
                    value: 'dotted',
                },
                {
                    label: __('Dashed', 'gutenverse-news'),
                    value: 'dashed',
                },
            ]
        },
        {
            id: 'navigationSeparatorColor',
            component: ColorControl,
            show: showNav && navigationEnableSeparator && navigationWrapperAlign?.[device] !== 'space-between',
            label: __('Separator Color', 'gutenverse-news'),
            liveStyle: [
                {
                    type: 'color',
                    id: 'navigationSeparatorColor',
                    properties: [
                        {
                            name: 'border-bottom-color',
                            valueType: 'direct'
                        }
                    ],
                    selector: separatorSelector,
                }
            ]
        },
        {
            id: 'navigationSeparatorWidth',
            label: __('Separator Width', 'gutenverse-news'),
            component: SizeControl,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 50,
                    step: 1,
                    unit: 'px',
                },
            },
            show: showNav && navigationEnableSeparator && navigationWrapperAlign?.[device] !== 'space-between',
            liveStyle: [
                {
                    type: 'unitPoint',
                    id: 'navigationSeparatorWidth',
                    properties: [
                        {
                            name: 'border-bottom-width',
                            valueType: 'direct'
                        }
                    ],
                    selector: separatorSelector,
                }
            ]
        },
    ];
};
